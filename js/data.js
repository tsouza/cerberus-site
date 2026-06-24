/* ============================================================
   cerberus — content data
   Edit copy here; main.js renders these into the page.
   Keeping repeated cards as data (not hand-written markup)
   means a content change is a one-line edit, not six.
   ============================================================ */

// "Inside the engine" feature cards. `icon` is the inner markup of a
// 24x24 stroke SVG (stroke + caps are applied by the renderer).
window.CERBERUS_FEATURES = [
  {
    tag: 'OPTIMIZER',
    title: 'One optimiser, three heads',
    mono: 'internal/optimizer',
    icon: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
    body: 'A rule-based pass runs to fixpoint over the shared plan IR: predicate & projection pushdown, filter fusion, constant folding, and sort-key-aware emission that promotes cheap predicates into ClickHouse PREWHERE. A new optimisation is one rule — every head inherits it.',
  },
  {
    tag: 'SQL SAFETY',
    title: 'Typed SQL builder, zero string concat',
    mono: 'internal/chsql',
    icon: '<path d="M8 4L3 12l5 8"/><path d="M16 4l5 8-5 8"/>',
    body: 'Every query is assembled through a typed builder into parameterised, escape-free ClickHouse SQL. A lint gate forbids fmt.Sprintf and raw clause keywords outright — injection-safe by construction, not by review.',
  },
  {
    tag: 'RESILIENCE',
    title: 'Per-head circuit breakers',
    mono: 'internal/chclient · per-head registry',
    icon: '<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M12 8v4M12 15h.01"/>',
    body: 'Each head owns its own breaker — a failing or overloaded backend fast-fails 503 on that head alone and never cascades to the other two. A separate probe breaker drives /readyz, so a single-head query storm leaves readiness green, while a true ClickHouse outage still trips it and Kubernetes evicts the replica.',
  },
  {
    tag: 'DEADLINES',
    title: 'Per-query wall-clock budget',
    mono: 'CERBERUS_QUERY_TIMEOUT',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    body: 'A hard per-query deadline bounds slow-but-healthy queries, distinct from the breaker — a runaway dashboard panel can\u2019t hold a ClickHouse connection open indefinitely.',
  },
  {
    tag: 'SCALE GUARDS',
    title: 'Compute fan-out guards',
    mono: 'perf-guards · scaling harness',
    icon: '<circle cx="5" cy="12" r="2.4"/><circle cx="19" cy="6" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M7.3 11l9.4-4M7.3 13l9.4 4"/>',
    body: 'A static fan-out lint, a per-construct scaling harness and cardinality / scale-wall ratchets keep a single PromQL, LogQL or TraceQL expression from fanning out into unbounded ClickHouse compute.',
  },
  {
    tag: 'PERFORMANCE',
    title: 'Native-rate fast path',
    mono: 'rate(…) · ClickHouse 25.6+',
    icon: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    body: 'rate() is exact by default. An optional ClickHouse-native path trades a bounded ≤1-ULP rounding difference (at most two cells) for flat memory and an order-of-magnitude speed-up at scale.',
  },
];

// Test-strategy layer chips (Correctness section).
window.CERBERUS_LAYERS = [
  'AST-shape pinning', 'Plan-IR invariants', 'Optimiser properties', 'Emitted-SQL goldens',
  'CH integration', 'Function-surface parity', 'HTTP wire conformance', 'Differential harnesses',
  'Playwright UX flows', 'Mutation testing', 'Fan-out guards', 'Live-stack E2E (k3d)',
];
