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
    DELETE_TRANSACTIONS_BY_CATEGORY_ID: `DELETE from transactions
                                         WHERE category_id = $1 and user_id = $2`,
    SELECT_BALANCE_BY_USER_ID: `select (COALESCE(sum(tri.amount), 0)::numeric(24, 8) - COALESCE(sum(tro.amount), 0)::numeric(24, 8)) as amount
                                from categories c
                                         left outer join transactions tri on tri.category_id = c.id and c.category_type_id = '00000001-0000-0000-0000-000000000001'
                                         left outer join transactions tro on tro.category_id = c.id and c.category_type_id = '00000001-0000-0000-0000-000000000002'
                                where c.user_id = $1`,
    SELECT_TRANSACTIONS_BY_USER_ID: `select
                                         t.id,
                                         c.category_type_id,
                                         c.name,
                                         t."when",
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
    UPDATE_TRANSACTION: `
                                WITH updated_row AS (
                                UPDATE transactions
                                SET "when"      = $3,
                                    amount      = $4
                                WHERE id = $1 AND user_id = $2
                                    RETURNING *
                            )
                                SELECT
                                    u.*,
                                    c.name AS name,
                                    c.category_type_id
                                FROM updated_row u
                                         JOIN categories c ON u.category_id = c.id
                            `,
    DELETE_TRANSACTION: `DELETE from transactions
                         where id = $1 and user_id = $2
                         RETURNING *`,
    SELECT_TRANSACTION_BY_ID: `
                        SELECT
                            t.id,
                            t.category_id,
                            t."when",
                            t.amount,
                            c.category_type_id
                        FROM transactions t
                                 JOIN categories c ON t.category_id = c.id
                        WHERE t.id = $1 AND t.user_id = $2
                        `,
    APPEND_TRANSACTION: `
                        WITH inserted_row AS (
                        INSERT INTO transactions (user_id, category_id, "when", amount)
                        VALUES ($1, $2, $3, $4)
                            RETURNING *
                            )
                        SELECT
                            i.*,
                            c.name AS name,
                            c.category_type_id AS category_type_id
                        FROM inserted_row i
                                 JOIN categories c ON i.category_id = c.id
                    `,
    INSERT_GOAL: `
        WITH new_category AS (
            INSERT INTO categories (user_id, category_type_id, name)
            VALUES ($1, '00000001-0000-0000-0000-000000000003', $2)
            RETURNING id
        )
        INSERT INTO goals (user_id, category_id, name, goal_amount, goal_target_date)
        VALUES ($1, (SELECT id FROM new_category), $2, $3, $4)
        RETURNING id, name, goal_amount::numeric(24, 8), TO_CHAR(goal_target_date, 'YYYY-MM-DD') as goal_target_date, 0::numeric(24, 8) as amount
    `,
    SELECT_GOALS_BY_USER_ID: `
        SELECT
            g.id,
            g.name,
            g.goal_amount::numeric(24, 8),
            g.goal_amount::numeric(24, 8),
            TO_CHAR(g.goal_target_date, 'YYYY-MM-DD') as goal_target_date,
            COALESCE(SUM(t.amount), 0)::numeric(24, 8) as amount
        FROM goals g
        LEFT JOIN transactions t ON g.category_id = t.category_id
        WHERE g.user_id = $1
        GROUP BY g.id
    `,
    UPDATE_GOAL: `
        WITH updated_goal AS (
            UPDATE goals
            SET name = $3,
                goal_amount = $4,
                goal_target_date = $5
            WHERE id = $1 AND user_id = $2
            RETURNING *
        ),
        updated_category AS (
            UPDATE categories
            SET name = $3
            WHERE id = (SELECT category_id FROM updated_goal)
        )
        SELECT
            ug.id,
            ug.name,
            ug.goal_amount::numeric(24, 8),
            ug.goal_amount::numeric(24, 8),
            TO_CHAR(ug.goal_target_date, 'YYYY-MM-DD') as goal_target_date,
            COALESCE(SUM(t.amount), 0)::numeric(24, 8) as amount
        FROM updated_goal ug
        LEFT JOIN transactions t ON ug.category_id = t.category_id
        GROUP BY ug.id, ug.name, ug.goal_amount, ug.goal_target_date
    `,
    DELETE_GOAL: `
        DELETE FROM categories
        WHERE id = (SELECT category_id FROM goals WHERE id = $1 AND user_id = $2)
        RETURNING id
    `
});
