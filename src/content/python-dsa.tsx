import { type StudyPageContent, placeholderConcepts } from "./_shared";

export const pythonDsaContent: Record<string, StudyPageContent> = {
  "pandas-patterns": placeholderConcepts("Pandas Patterns", [
    "Indexing: loc / iloc / boolean / query — when to use each",
    "groupby + agg + transform — the patterns DS interviews probe",
    "merge / join / concat — multi-key, indicator, suffixes",
    "Window operations: rolling, expanding, ewm, shift",
    "pivot / pivot_table / melt / wide_to_long / stack / unstack",
    "Time-series: resample, asof merge, time-zone handling",
    "Vectorization vs apply — when apply is the wrong tool",
    "Memory: dtype downcasting, categorical, parquet",
  ]),
  numpy: placeholderConcepts("NumPy Essentials", [
    "Broadcasting rules and the trap of axis confusion",
    "Vectorized operations vs Python loops",
    "Reshaping: reshape, ravel, transpose, swapaxes",
    "Boolean indexing and where / select",
    "Linear algebra basics: dot, matmul, einsum",
    "Random sampling: seeded, generators, bootstrap",
  ]),
  "ds-python-qs": {
    intro: <p>Coding questions specific to data scientists — Pandas-flavored, not pure DSA.</p>,
    qa: [
      { q: "Find the top-N customers by revenue from a transactions DataFrame.", a: <p>groupby + sum + sort_values + head(N). Common follow-up: do it without sort, using nlargest.</p> },
      { q: "Compute a rolling 7-day moving average grouped by user.", a: <p>df.groupby(&quot;user_id&quot;).rolling(7, on=&quot;date&quot;)[&quot;value&quot;].mean(). Watch for unsorted dates.</p> },
      { q: "Pivot long-format to wide-format and back.", a: <p>pivot_table for long-to-wide; melt for wide-to-long.</p> },
      { q: "Detect outliers in a column.", a: <p>IQR-based or z-score; ask the interviewer how outliers are defined for the use case before coding.</p> },
      { q: "Merge two DataFrames where the join key has duplicates and you want a Cartesian product per match.", a: <p>Default merge already does this. Verify with how=&quot;inner&quot; and indicator=True.</p> },
      { q: "[Placeholder] Compute customer lifetime value from transactions.", a: <p>Group + window logic.</p> },
      { q: "[Placeholder] Resample irregular timestamps to a regular interval.", a: <p>resample + ffill/bfill or interpolate.</p> },
    ],
  },
  "dsa-essentials": placeholderConcepts("DSA Essentials", [
    "Arrays + hashmaps — covers 50%+ of interview problems",
    "Two-pointer / sliding window patterns",
    "Strings: parsing, frequency, anagrams, longest substring problems",
    "Stacks: monotonic stack pattern (next greater element)",
    "Heaps for top-k problems",
    "BFS / DFS on grids and graphs",
    "Binary search and its sneaky variants",
    "Recursion + memoization → DP basics",
  ]),
  "oop-design": placeholderConcepts("OOP & Design", [
    "When to use classes vs functions in DS code",
    "Dataclasses, frozen dataclasses, Pydantic models",
    "Composition over inheritance — building feature pipelines",
    "Strategy pattern for swap-able models",
    "Decorator pattern for caching, logging, timing",
    "Context managers for resource cleanup",
  ]),
};
