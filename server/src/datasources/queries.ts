export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash, name, lastname)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, email, created_at, name, lastname
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
    SELECT_CATEGORY_TYPES: `SELECT ct.id, ct.kind FROM category_types ct`,
    SELECT_CATEGORY_BY_ID: `SELECT c.id, c.name, c.category_type_id 
                            FROM categories c
                            WHERE c.id = $1 and c.user_id = $2
                            `,
    UPDATE_CATEGORY_BY_ID: `with updated_category as (
                                UPDATE categories
                                SET
                                    name = $3
                                WHERE id = $1 and user_id = $2
                                RETURNING *
                            )
                            select uc.id,
                                   uc.name,
                                   sum(COALESCE(t.amount, 0)) as amount
                            from updated_category as uc
                                left outer join transactions t on uc.id = t.category_id
                            group by uc.id, uc.name
                            `,
    DELETE_CATEGORY_BY_ID: `DELETE from categories
                            WHERE id = $1 and user_id = $2
                            RETURNING *
                            `,
    SELECT_BALANCE_BY_USER_ID: `select (sum(tri.amount)::numeric(24, 8) - sum(tro.amount)::numeric(24, 8)) as amount
                                from categories c
                                         left outer join transactions tri on tri.category_id = c.id and c.category_type_id = '00000001-0000-0000-0000-000000000001'
                                         left outer join transactions tro on tro.category_id = c.id and c.category_type_id = '00000001-0000-0000-0000-000000000002'
                                where c.user_id = $1`,
    SELECT_TRANSACTIONS_BY_USER_ID: `select
                                         t.id,
                                         c.category_type_id,
                                         c.name,
                                         t."when",
                                         t.description,
                                         t.amount
                                     from categories c
                                              inner join transactions t on t.category_id = c.id
                                     where
                                         c.user_id = $1
                                `,

    SELECT_CATEGORY_BY_CATEGORY_TYPE: `select c.id, 
                                              c.name, 
                                              sum(COALESCE(t.amount, 0)) as amount
                                       from categories c
                                                left outer join transactions t on c.id = t.category_id
                                       where c.user_id = $1 and c.category_type_id = $2
                                       group by c.id, c.name
    `,
    SELECT_CATEGORY_BY_CATEGORY_TYPE_WITH_BALANCE: `select  
                                              sum(COALESCE(t.amount, 0)) as amount
                                       from categories c
                                                left outer join transactions t on c.id = t.category_id
                                       where c.user_id = $1 and c.category_type_id = $2
    `,
    APPEND_SIMPLE_CATEGORY: `with new_category as (
                                INSERT INTO categories (user_id, category_type_id, name) 
                                 VALUES ($1, $2, $3)
                                 RETURNING *
                             )
                             select nc.id, 
                                    nc.name, 
                                    nc.category_type_id,
                                    0::numeric(24, 8) as amount
                             from new_category as nc
                            `,
});
