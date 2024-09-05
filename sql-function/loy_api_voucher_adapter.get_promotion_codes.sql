-- hàm này dùng để lấy danh sách các mã giảm giá (theo campaign đã sync từ Voucherify về).
-- mỗi 1 mã giảm giá tương ứng với 1 voucherify_campaign trên Voucherify.
-- Số lượng mã giảm giá còn lại phụ thuộc trên bảng voucherify_vouchers.
-- Lịch sử giao dịch dựa trên bảng voucherify_transaction_history

-- lý do sử dụng sql function để phục vụ paging và giảm thiểu code đỡ phức tạp.


CREATE OR REPLACE FUNCTION loy_api_voucher_adapter.get_promotion_codes(_h_bit_source text[], _segment text[], _transaction_amount double precision, _member_code text, _query_type text)
 RETURNS TABLE(id text, promotion_code_name text, type text, metadata jsonb, discount jsonb, join_once boolean, start_date timestamp with time zone, expiration_date timestamp with time zone, used integer, remaining integer, current_join_count integer, h_bit_source text, segment text, minspend double precision, is_eligible boolean)
 LANGUAGE sql
AS $function$
WITH
    campaign_data AS (
        SELECT
            campaign.campaign_id AS id,
            campaign.name AS promotion_code_name,
            'bulk_code' AS type,
            campaign.metadata,
            campaign.voucher -> 'discount' AS discount,
            campaign.join_once,
            campaign.start_date,
            campaign.expiration_date,
            COUNT(transaction_history.id) AS used,
            (
                select
                    case
                        when sum(
                                     case
                                         when voucherify_vouchers.redemption ->> 'quantity' is null then 1
                                         else 0
                                         end
                             ) > 0 then null
                        else coalesce(
                                sum(
                                        (voucherify_vouchers.redemption ->> 'quantity')::integer
                                ) - sum(
                                        (
                                            voucherify_vouchers.redemption ->> 'redeemed_quantity'
                                            )::integer
                                    ),
                                0
                             )
                        end as remaining
                from
                    loy_api_voucher_adapter.voucherify_vouchers
                where
                    voucherify_campaign_id = campaign.campaign_id
                  and is_active = true
            ) AS remaining,
            COUNT(transaction_history.id) FILTER (
                WHERE
                transaction_history.member_code = _member_code
                ) AS current_join_count,
            replace(campaign.metadata ->> 'h_bit_source', ' ', '') AS h_bit_source,
            replace(campaign.metadata ->> 'segment', ' ', '') AS segment,
            COALESCE(
                    nullif(campaign.metadata ->> 'minspend', '')::double precision,
                    0
            ) AS minspend
        FROM
            loy_api_voucher_adapter.voucherify_campaign AS campaign
                LEFT JOIN loy_api_voucher_adapter.voucherify_transaction_history AS transaction_history ON campaign.campaign_id::varchar = transaction_history.campaign_id
                AND transaction_history.redemption_status IN ('SUCCEEDED', 'PROCESSING')
        WHERE
            campaign.campaign_type = 'DISCOUNT_COUPONS'
          AND (
            (_query_type = 'USED_OR_EXPIRED' OR campaign.is_active = TRUE)
                AND campaign.voucher_count > 0
                AND campaign.start_date <= NOW()
            )
        GROUP BY
            campaign.campaign_id,
            campaign.metadata,
            campaign.voucher,
            campaign.expiration_date,
            campaign.voucher_count,
            campaign.join_once,
            campaign.start_date,
            campaign.name
        HAVING
            (
                (_query_type = 'USED_OR_EXPIRED')
                OR (campaign.voucher -> 'redemption' ->> 'quantity') IS NULL
                    OR (
                           select
                               case
                                   when sum(
                                                case
                                                    when voucherify_vouchers.redemption ->> 'quantity' is null then 1
                                                    else 0
                                                    end
                                        ) > 0 then null
                                   else coalesce(
                                           sum(
                                                   (voucherify_vouchers.redemption ->> 'quantity')::integer
                                           ) - sum(
                                                   (
                                                       voucherify_vouchers.redemption ->> 'redeemed_quantity'
                                                       )::integer
                                               ),
                                           0
                                        )
                                   end as remaining
                           from
                               loy_api_voucher_adapter.voucherify_vouchers
                           where
                               voucherify_campaign_id = campaign.campaign_id
                             and is_active = true
                       ) > 0
                )
           AND (
            campaign.join_once = FALSE
                OR (
                campaign.join_once = TRUE
                    AND (
                    _query_type = 'USED_OR_EXPIRED'
                        OR COUNT(transaction_history.id) FILTER (
                        WHERE
                        transaction_history.member_code = _member_code
                        ) = 0
                    )
                )
            )
    ),
    voucher_data AS (
        SELECT
            vouchers.voucher_id AS id,
            vouchers.additional_info AS promotion_code_name,
            'standalone_code' AS type,
            vouchers.metadata,
            vouchers.discount,
            FALSE AS join_once,
            vouchers.start_date,
            vouchers.expiration_date,
            COUNT(transaction_history.id) AS used,
            (vouchers.redemption ->> 'quantity')::integer - (vouchers.redemption ->> 'redeemed_quantity')::integer AS remaining,
            COUNT(transaction_history.id) FILTER (
                WHERE
                transaction_history.member_code = _member_code
                ) AS current_join_count,
            replace(vouchers.metadata ->> 'h_bit_source', ' ', '') AS h_bit_source,
            replace(vouchers.metadata ->> 'segment', ' ', '') AS segment,
            COALESCE(
                    nullif(vouchers.metadata ->> 'minspend', '')::double precision,
                    0
            ) AS minspend
        FROM
            loy_api_voucher_adapter.voucherify_vouchers AS vouchers
                LEFT JOIN loy_api_voucher_adapter.voucherify_transaction_history AS transaction_history ON vouchers.voucher_id = transaction_history.voucher_id
                AND transaction_history.redemption_status IN ('SUCCEEDED', 'PROCESSING')
        WHERE
            vouchers.voucherify_campaign_id IS NULL
          AND vouchers.type = 'DISCOUNT_VOUCHER'
          AND (_query_type = 'USED_OR_EXPIRED' OR vouchers.is_active = TRUE)
          AND vouchers.start_date <= NOW()
        GROUP BY
            vouchers.voucher_id,
            vouchers.metadata,
            vouchers.discount,
            vouchers.expiration_date,
            vouchers.start_date,
            vouchers.redemption,
            vouchers.additional_info
    ),
    combined_data AS (
        SELECT
            *
        FROM
            campaign_data
        UNION ALL
        SELECT
            *
        FROM
            voucher_data
    )
SELECT
    *,
    CASE
        WHEN (
                 _h_bit_source = '{}'
                     OR h_bit_source IS NULL
                     OR string_to_array(h_bit_source, ',')::text[] && _h_bit_source
                 )
            AND (
                 segment IS NULL
                     OR string_to_array(segment, ',')::text[] && _segment
                 )
            AND (
                 start_date <= NOW()
                     AND (
                     expiration_date IS NULL
                         OR NOW() <= expiration_date
                     )
                 )
            AND (
                 remaining IS NULL
                     OR remaining > 0
                 )
            AND (
                 _query_type <> 'ALL'
                     OR minspend <= _transaction_amount
                 )
            AND (
                 _query_type <> 'USED_OR_EXPIRED'
                     OR (
                     _query_type = 'USED_OR_EXPIRED'
                         AND (
                         join_once = FALSE
                             OR (current_join_count = 0)
                         )
                     )
                 ) THEN TRUE
        ELSE FALSE
        END AS is_eligible
FROM
    combined_data
WHERE
    (
        _h_bit_source = '{}'
--             OR h_bit_source IS NULL
            OR string_to_array(h_bit_source, ',')::text[] && _h_bit_source
        )
  AND CASE
          WHEN _query_type = 'ALL' THEN (expiration_date is null OR NOW() <= expiration_date)
          WHEN _query_type = 'UNUSED' THEN (current_join_count = 0 OR (current_join_count > 0 AND remaining > 0)) AND (expiration_date is null OR NOW() <= expiration_date)
          WHEN _query_type = 'USED_OR_EXPIRED' THEN (current_join_count > 0 OR (expiration_date < NOW() AND (segment IS NULL OR string_to_array(segment, ',')::text[] && _segment)))
          ELSE FALSE
    END
$function$
