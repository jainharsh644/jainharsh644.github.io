import { C, Note, type StudyPageContent, placeholderConcepts } from "./_shared";

const concepts: StudyPageContent = {
  intro: (
    <p>
      The SQL bar in DS interviews is higher than it used to be. Expect window functions, complex joins, and tricky NULL handling.
      This page covers the concepts; the next page is the question bank.
    </p>
  ),
  body: (
    <div className="space-y-12 prose-study">
      <section>
        <h2>1. Joins</h2>
        <p>SQL has four practical joins: <C>INNER</C>, <C>LEFT</C>, <C>RIGHT</C>, <C>FULL OUTER</C>. The two you must master cold are <C>INNER</C> and <C>LEFT</C>.</p>
        <ul>
          <li><strong>INNER JOIN</strong> — only rows where the key matches in both tables.</li>
          <li><strong>LEFT JOIN</strong> — every row from left, NULL from right when no match.</li>
          <li><strong>SELF JOIN</strong> — table joined to itself, common for hierarchies.</li>
          <li><strong>CROSS JOIN</strong> — Cartesian product. Use sparingly.</li>
        </ul>
        <p><strong>Interview trap:</strong> filtering a LEFT JOIN&apos;s right-side column in the <C>WHERE</C> clause silently turns it into an INNER JOIN. Filter in the <C>ON</C> clause instead.</p>
      </section>

      <section>
        <h2>2. Window Functions</h2>
        <p>Window functions compute over a &quot;window&quot; of rows without collapsing them like <C>GROUP BY</C> does.</p>
        <pre><code>{`SELECT
  user_id,
  order_date,
  amount,
  ROW_NUMBER()  OVER (PARTITION BY user_id ORDER BY order_date) AS rn,
  RANK()        OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk,
  SUM(amount)   OVER (PARTITION BY user_id ORDER BY order_date
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
  LAG(amount, 1) OVER (PARTITION BY user_id ORDER BY order_date) AS prev_amount
FROM orders;`}</code></pre>
        <p><strong>Know cold:</strong> <C>ROW_NUMBER</C> vs <C>RANK</C> vs <C>DENSE_RANK</C>, <C>LAG</C>/<C>LEAD</C>, framing (<C>ROWS BETWEEN ...</C>), running totals.</p>
      </section>

      <section>
        <h2>3. CTEs and Subqueries</h2>
        <p>CTEs (<C>WITH ... AS</C>) are subqueries with names. Use them for readability and for recursive queries (org charts, paths).</p>
        <pre><code>{`WITH monthly_users AS (
  SELECT DATE_TRUNC('month', signup_date) AS month, COUNT(*) AS new_users
  FROM users GROUP BY 1
)
SELECT month, new_users,
       SUM(new_users) OVER (ORDER BY month) AS cumulative_users
FROM monthly_users;`}</code></pre>
      </section>

      <section>
        <h2>4. NULL handling</h2>
        <ul>
          <li><C>NULL = NULL</C> is <em>NULL</em>, not <em>TRUE</em>. Use <C>IS NULL</C>.</li>
          <li><C>COUNT(*)</C> counts rows. <C>COUNT(col)</C> ignores NULLs.</li>
          <li><C>SUM</C>, <C>AVG</C> ignore NULLs. <C>AVG</C> over a column with NULLs ≠ <C>SUM/COUNT(*)</C>.</li>
        </ul>
      </section>

      <section>
        <h2>5. Aggregations & GROUP BY</h2>
        <p>Every column in <C>SELECT</C> must be in <C>GROUP BY</C> or wrapped in an aggregate. <C>HAVING</C> filters groups, <C>WHERE</C> filters rows.</p>
      </section>

      <section>
        <h2>6. Performance instincts</h2>
        <ul>
          <li>Filter early (<C>WHERE</C> before joins where possible).</li>
          <li>Avoid <C>SELECT *</C>.</li>
          <li>Indexes on join keys and filter columns matter.</li>
          <li><C>EXPLAIN</C> is your friend.</li>
        </ul>
      </section>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>The SQL questions that come up most often in DS interviews at top tech and finance companies. Each one shows the question, the solution, and why it works.</p>,
  qa: [
    {
      q: "Find the second highest salary from an Employee table",
      a: <p>Classic warm-up. Don&apos;t reach for <C>LIMIT 1 OFFSET 1</C> unless asked — handle ties cleanly.</p>,
      code: { lang: "sql", src: `-- Robust: handles ties and missing values
SELECT MAX(salary) AS second_highest
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);

-- With window function (preferred at scale)
SELECT DISTINCT salary AS second_highest
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
  FROM employee
) t
WHERE rk = 2;` },
    },
    {
      q: "Top N per group (e.g. top 3 highest-paid employees per department)",
      a: <p>The single most asked SQL question. Window function + filter on rank.</p>,
      code: { lang: "sql", src: `WITH ranked AS (
  SELECT
    e.*,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk
  FROM employee e
)
SELECT * FROM ranked WHERE rk <= 3;` },
    },
    {
      q: "Find users active on consecutive days (streaks)",
      a: <p>Trick: subtract a row number from the date — equal results = same streak.</p>,
      code: { lang: "sql", src: `WITH t AS (
  SELECT user_id, activity_date,
         activity_date - INTERVAL '1 day' * ROW_NUMBER()
           OVER (PARTITION BY user_id ORDER BY activity_date) AS grp
  FROM activity
)
SELECT user_id, MIN(activity_date) AS streak_start,
       MAX(activity_date) AS streak_end,
       COUNT(*) AS streak_length
FROM t
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;` },
    },
    {
      q: "Month-over-month growth rate",
      a: <p>Self-join on month, or use <C>LAG</C>.</p>,
      code: { lang: "sql", src: `WITH monthly AS (
  SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS revenue
  FROM orders GROUP BY 1
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 2) AS mom_pct
FROM monthly;` },
    },
    {
      q: "Find duplicates",
      a: <p><C>GROUP BY</C> + <C>HAVING COUNT(*) &gt; 1</C> is the bread-and-butter answer.</p>,
      code: { lang: "sql", src: `SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;` },
    },
    {
      q: "Median salary per department",
      a: <p>Most DBs have <C>PERCENTILE_CONT(0.5)</C> as a window or aggregate function.</p>,
      code: { lang: "sql", src: `SELECT department_id,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM employee
GROUP BY department_id;` },
    },
    {
      q: "Cumulative count of distinct users by date",
      a: <p>Cumulative distinct count is a known hard one. Trick: only count a user on the first day they appear.</p>,
      code: { lang: "sql", src: `WITH first_seen AS (
  SELECT user_id, MIN(activity_date) AS first_date FROM activity GROUP BY user_id
)
SELECT first_date AS date,
       COUNT(*) OVER (ORDER BY first_date) AS cumulative_distinct_users
FROM first_seen;` },
    },
    {
      q: "Pivot rows into columns (sales by month)",
      a: <p>Use <C>CASE WHEN</C> inside <C>SUM</C>. (DBs with PIVOT keyword: BigQuery, Snowflake, SQL Server.)</p>,
      code: { lang: "sql", src: `SELECT
  product_id,
  SUM(CASE WHEN MONTH(order_date) = 1 THEN amount END) AS jan,
  SUM(CASE WHEN MONTH(order_date) = 2 THEN amount END) AS feb,
  SUM(CASE WHEN MONTH(order_date) = 3 THEN amount END) AS mar
FROM orders
GROUP BY product_id;` },
    },
    {
      q: "First and last action of each user",
      a: <p>Use <C>FIRST_VALUE</C> / <C>LAST_VALUE</C> with proper framing, or <C>ARRAY_AGG</C>.</p>,
      code: { lang: "sql", src: `SELECT DISTINCT
  user_id,
  FIRST_VALUE(action) OVER (PARTITION BY user_id ORDER BY ts
                            ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS first_action,
  LAST_VALUE(action)  OVER (PARTITION BY user_id ORDER BY ts
                            ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_action
FROM events;` },
    },
    {
      q: "Sessionize events (gap-and-island problem)",
      a: <p>Use <C>LAG</C> to compute time-since-prev-event and a running sum to assign session IDs.</p>,
      code: { lang: "sql", src: `WITH gaps AS (
  SELECT user_id, ts,
         CASE WHEN ts - LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) > INTERVAL '30 minutes'
              OR LAG(ts) OVER (PARTITION BY user_id ORDER BY ts) IS NULL
         THEN 1 ELSE 0 END AS new_session
  FROM events
)
SELECT user_id, ts,
       SUM(new_session) OVER (PARTITION BY user_id ORDER BY ts) AS session_id
FROM gaps;` },
    },
    { q: "[Placeholder] Find the friends of friends in a graph table.", a: <p>Self-join twice, exclude direct friends.</p> },
    { q: "[Placeholder] Compute retention curves (D1, D7, D30).", a: <p>Self-join on user_id with date offsets.</p> },
    { q: "[Placeholder] Funnel analysis — % completing each step.", a: <p>Conditional aggregation per step.</p> },
    { q: "[Placeholder] Compute exponential moving average.", a: <p>Recursive CTE.</p> },
    { q: "[Placeholder] Find the longest gap in user activity.", a: <p>LAG to compute gaps, take MAX.</p> },
  ],
};

export const sqlContent: Record<string, StudyPageContent> = {
  concepts,
  "top-questions": topQuestions,
  "window-functions": placeholderConcepts("Window Functions", [
    "ROW_NUMBER vs RANK vs DENSE_RANK — when ties matter",
    "LAG / LEAD with default and offset arguments",
    "Window framing — ROWS vs RANGE, UNBOUNDED vs CURRENT ROW",
    "Running aggregates: cumulative sum, moving average",
    "FIRST_VALUE / LAST_VALUE — common gotcha with default frame",
    "NTILE for percentile bucketing",
    "Performance: window functions don't reduce row count, choose wisely",
  ]),
  joins: placeholderConcepts("Joins", [
    "INNER vs LEFT vs RIGHT vs FULL OUTER — pick correctly",
    "Anti-joins: NOT EXISTS / LEFT JOIN ... WHERE NULL",
    "Semi-joins: EXISTS / IN — when each is faster",
    "Self-joins for hierarchies, pairs, and gap finding",
    "CROSS JOIN for cartesian products and date spines",
    "Filtering inside ON vs WHERE — the LEFT JOIN trap",
    "Multi-key joins, performance with composite keys",
  ]),
  "null-handling": placeholderConcepts("NULL Handling", [
    "Three-valued logic: TRUE / FALSE / NULL",
    "IS NULL vs = NULL — only IS NULL is correct",
    "COUNT(*) vs COUNT(col) — column COUNT skips NULLs",
    "AVG, SUM ignore NULLs — easy to get wrong totals",
    "COALESCE vs IFNULL vs NVL — vendor differences",
    "NULLs in GROUP BY — collapsed into one group",
    "NULL behavior in joins, ORDER BY, DISTINCT",
  ]),
  performance: placeholderConcepts("Performance & Optimization", [
    "Read execution plans (EXPLAIN ANALYZE)",
    "Index types: B-tree, hash, bitmap, GIN, partial",
    "When indexes help vs hurt (small tables, low cardinality)",
    "Predicate pushdown",
    "Partitioning vs clustering",
    "Cardinality estimation, statistics",
    "Common antipatterns: SELECT *, OR vs UNION ALL, leading wildcards",
  ]),
};
