import { C, Note, type StudyPageContent, placeholderConcepts } from "./_shared";

const framework: StudyPageContent = {
  intro: <p>ML system design rounds reward structure, not depth. Use the same skeleton every time and you&apos;ll never freeze.</p>,
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The 7-step skeleton</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>Clarify the problem.</strong> What user behavior changes? What does success look like? What are the hard constraints (latency, cost, regulatory)? Spend a full 5 minutes here — interviewers value this.</li>
          <li><strong>Pick the metrics.</strong> Online metric (the business one), offline proxy (what you optimize during training), guardrails (what you don&apos;t want to break).</li>
          <li><strong>Frame as ML.</strong> Classification? Regression? Ranking? Generation? Reinforcement? Specify input, output, and the training signal.</li>
          <li><strong>Data.</strong> What data do you have? What do you need? Labels — explicit or implicit? Sampling strategy? Volume estimate. Privacy / compliance.</li>
          <li><strong>Model.</strong> Baseline → iteration. Architecture choice with reasoning. Training pipeline. Serving constraints (latency, throughput).</li>
          <li><strong>Evaluation.</strong> Offline (test set, slices, fairness). Online (A/B test plan). Monitoring (drift, calibration, business metric).</li>
          <li><strong>Productionization.</strong> Architecture diagram. Feature store. Batch vs streaming. Model serving. Versioning. Rollback plan.</li>
        </ol>
      </section>

      <section>
        <h2>Common interviewer probes</h2>
        <ul>
          <li>&quot;Why this metric and not that one?&quot;</li>
          <li>&quot;What if the labels are noisy / delayed / biased?&quot;</li>
          <li>&quot;How do you handle the cold start?&quot;</li>
          <li>&quot;How does this scale to 100M users?&quot;</li>
          <li>&quot;What happens if the model goes down?&quot;</li>
          <li>&quot;How do you detect and respond to drift?&quot;</li>
        </ul>
        <Note tone="terracotta">
          Drive the room. Sketch a diagram early — keep updating it. Volunteer tradeoffs before being asked. That&apos;s what separates senior signal from mid-level.
        </Note>
      </section>
    </div>
  ),
};

const recommender: StudyPageContent = {
  intro: <p>Worked design: a recommender for a streaming product (movies / shorts / songs). Adapt the structure to fraud / search / feed-ranking — the bones are the same.</p>,
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>1. Clarify</h2>
        <ul>
          <li>What slot are we ranking? Home feed? Continue-watching? Search? Each is a different problem.</li>
          <li>How many items per page? What&apos;s the latency budget per request? (Usually &lt;100ms p99.)</li>
          <li>Cold-start: new users? New items? Both?</li>
          <li>Business goal: watch time? subscription retention? revenue? Decide the proxy you optimize.</li>
        </ul>
      </section>

      <section>
        <h2>2. Metrics</h2>
        <ul>
          <li><strong>Online (business):</strong> watch-time, retention, click-through rate, completion rate</li>
          <li><strong>Offline (proxy):</strong> NDCG@K, MAP@K, recall@K — pick based on whether order matters</li>
          <li><strong>Guardrails:</strong> diversity (intra-list similarity), latency, fairness (creator distribution)</li>
        </ul>
      </section>

      <section>
        <h2>3. ML framing</h2>
        <p>Two-stage funnel: <strong>retrieval</strong> (millions → ~1000 candidates, must be cheap) → <strong>ranking</strong> (1000 → 10, expensive but precise) → <strong>re-ranking</strong> (diversity, freshness, business rules).</p>
      </section>

      <section>
        <h2>4. Data</h2>
        <ul>
          <li>User events: views, clicks, completes, skips, ratings, dwell time</li>
          <li>Item metadata: genre, length, creator, release date, embeddings</li>
          <li>User metadata: subscription, demographics, prior session features</li>
          <li>Implicit labels: completion = positive, skip = negative. Watch-time as a continuous label is common.</li>
          <li>Negative sampling — random negatives for retrieval, hard negatives (top-of-list non-clicks) for ranking</li>
        </ul>
      </section>

      <section>
        <h2>5. Model</h2>
        <ul>
          <li><strong>Retrieval:</strong> two-tower neural net. User tower + item tower → dot product. Trained with sampled softmax / in-batch negatives. Approximate nearest neighbor index for serving.</li>
          <li><strong>Ranking:</strong> gradient-boosted trees (XGBoost / LightGBM) on hundreds of features, OR a deep cross network / DLRM for richer interactions. Multi-task head if you predict multiple objectives (click, complete, share).</li>
          <li><strong>Re-ranking:</strong> rules + a diversity layer (MMR / DPP) + business overrides.</li>
        </ul>
      </section>

      <section>
        <h2>6. Evaluation</h2>
        <ul>
          <li>Offline: temporal split (train on past, eval on future), slice metrics (cold-start users, niche genres, new items), counterfactual eval if logging policy was different</li>
          <li>Online: interleaving for early signal, A/B test for the real decision. Track guardrails alongside the primary metric.</li>
        </ul>
      </section>

      <section>
        <h2>7. Productionization</h2>
        <ul>
          <li><strong>Feature store</strong> with online (low-latency lookup) + offline (training) parity</li>
          <li><strong>Embeddings</strong> precomputed daily for items, real-time for users via a lightweight tower at request time</li>
          <li><strong>ANN index</strong> (HNSW / ScaNN) for retrieval — refreshed with new items every X hours</li>
          <li><strong>Ranker</strong> deployed behind a request handler; features pulled from the feature store + computed on-the-fly</li>
          <li><strong>Logging</strong> of impressions, ranks, scores, and clicks — these become next week&apos;s training data</li>
          <li><strong>Monitoring</strong>: feature distribution drift, prediction drift, click-through rate per segment, latency p50/p95/p99</li>
          <li><strong>Retraining</strong>: ranker weekly, retrieval embedding tower nightly, ANN index every few hours</li>
        </ul>
      </section>

      <section>
        <h2>Hard problems senior candidates volunteer</h2>
        <ul>
          <li>Position bias — clicks at top get clicked more regardless of quality. Use position-aware models or randomized exploration.</li>
          <li>Feedback loops — model recommends a niche, niche gets reinforced. Periodic exploration / diversity injection.</li>
          <li>Cold-start — content-based features for new items, embedding-based for new users via signup signals.</li>
          <li>Multi-stakeholder objectives — viewer happy, creator paid fairly, platform retention. Multi-task with weighted losses, or a constrained optimizer.</li>
        </ul>
      </section>
    </div>
  ),
};

const fraud: StudyPageContent = {
  intro: <p>Fraud detection — extreme imbalance, adversarial drift, hard latency budget. Worth knowing cold for fintech interviews.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>What makes it hard</h2>
      <ul>
        <li>1 fraud per 1000–100,000 transactions — extreme class imbalance</li>
        <li>Adversaries adapt — concept drift is constant</li>
        <li>Labels are delayed (chargebacks come weeks later) and noisy (some fraud never reported)</li>
        <li>Latency budget often &lt;100ms — payment must be approved/declined in real time</li>
        <li>False positive cost (declined real customer) is also high — not just a precision-recall tradeoff</li>
      </ul>
      <h2>Approach</h2>
      <ul>
        <li>Two-tower system: real-time scoring (cheap features) + batch deeper review (expensive features, queued for analyst)</li>
        <li>GBM (XGBoost / LightGBM) on engineered features — beats deep nets on tabular fraud</li>
        <li>Graph features: device, IP, card fingerprints linked across accounts catch fraud rings</li>
        <li>Anomaly detection for the unseen-pattern long tail (Isolation Forest, autoencoder reconstruction error)</li>
        <li>Optimize for precision at the threshold equivalent to the analyst review capacity, not raw F1</li>
      </ul>
      <h2>Online learning loop</h2>
      <p>Batch model retrained nightly. A small online layer (incremental gradient updates) handles intra-day drift. Champion-challenger setup so a new model can shadow the production one for days before promotion.</p>
    </div>
  ),
};

const abPlatform: StudyPageContent = {
  intro: <p>Designing the platform itself, not running an experiment. Common at companies with mature experimentation programs.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Key components</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Experiment configuration service</strong> — define experiments, variants, traffic allocation, eligibility rules</li>
        <li><strong>Assignment service</strong> — given user + experiment, return variant. Must be deterministic, low-latency, sticky.</li>
        <li><strong>Logging</strong> — every assignment + every metric event tied to user + experiment</li>
        <li><strong>Metrics pipeline</strong> — daily / hourly aggregation of metrics by variant, with CIs and p-values</li>
        <li><strong>Analysis dashboard</strong> — significance, lift, segment slices, guardrails, SRM check</li>
        <li><strong>Experiment review tool</strong> — pre-launch sanity check, post-launch decisions log</li>
      </ol>
      <h2>Hashing for assignment</h2>
      <p><C>variant = hash(user_id || experiment_id) % 100</C>. Including the experiment_id in the hash prevents user-experiment correlation across concurrent tests. Sticky assignment by storing the bucket in user state for very long-running experiments.</p>
      <h2>Layered experiments</h2>
      <p>For platforms running 100s of experiments concurrently, isolate experiments into &quot;layers&quot; so users get one variant per layer. Within a layer, assignments are mutually exclusive; across layers, they&apos;re independent.</p>
      <h2>Statistical engine</h2>
      <ul>
        <li>Welch&apos;s t-test for continuous metrics (no equal-variance assumption)</li>
        <li>Two-proportion z-test for binary metrics</li>
        <li>Variance reduction via CUPED (using pre-experiment data as covariate)</li>
        <li>Sequential testing (mSPRT, always-valid CI) so PMs can monitor without inflating Type I</li>
      </ul>
    </div>
  ),
};

const featureStore: StudyPageContent = {
  intro: <p>The unsexy infrastructure that prevents training-serving skew.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The core problem</h2>
      <p>Features used at training (batch SQL on warehouse) and serving (real-time APIs) drift apart. Bug-prone, hard to detect, model performance degrades silently. A feature store is the disciplined solution.</p>
      <h2>What it provides</h2>
      <ul>
        <li><strong>Definition layer</strong> — features defined once, reused everywhere</li>
        <li><strong>Online store</strong> — low-latency lookup at serving time (Redis, DynamoDB)</li>
        <li><strong>Offline store</strong> — historical values for training (parquet on S3, BigQuery)</li>
        <li><strong>Point-in-time correctness</strong> — at training, retrieve what the feature value <em>was</em> at the prediction time, not its latest value (prevents leakage)</li>
        <li><strong>Discovery</strong> — catalog of features, lineage, ownership</li>
      </ul>
      <h2>OSS / managed options</h2>
      <ul>
        <li><strong>Feast</strong> — OSS, lean, BYO online store</li>
        <li><strong>Tecton</strong> — managed, full-featured, expensive</li>
        <li><strong>SageMaker Feature Store</strong> — AWS-native</li>
        <li><strong>Build-your-own</strong> — common at very large companies</li>
      </ul>
    </div>
  ),
};

const serving: StudyPageContent = {
  intro: <p>Getting a model from notebook to a prod endpoint that handles the load.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Decision tree</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Batch inference</strong> if predictions can be computed ahead of time and looked up. Cheapest, easiest. Use whenever possible.</li>
        <li><strong>Streaming</strong> if events arrive continuously and predictions must be near-real-time but not interactive (fraud scoring on transaction stream).</li>
        <li><strong>Online (REST/gRPC)</strong> when prediction is needed in response to a user request (recommendation, search ranking). Hardest — latency budget binds all other choices.</li>
      </ol>
      <h2>Latency techniques</h2>
      <ul>
        <li>Smaller models / distillation / quantization (INT8, FP16)</li>
        <li>Caching predictions for repeated inputs</li>
        <li>Batching requests at the server (latency vs throughput tradeoff)</li>
        <li>GPU inference with optimized runtimes (TensorRT, ONNX Runtime, vLLM for LLMs)</li>
        <li>Feature store with co-located online cache</li>
      </ul>
      <h2>Reliability</h2>
      <ul>
        <li>Versioned models with shadow deploys before promotion</li>
        <li>Fallback to last-known-good model on errors</li>
        <li>Default / heuristic fallback when model is unavailable</li>
        <li>SLO on latency p95, error rate, freshness</li>
      </ul>
    </div>
  ),
};

export const systemDesignContent: Record<string, StudyPageContent> = {
  framework,
  recommender,
  fraud,
  "ab-platform": abPlatform,
  "feature-store": featureStore,
  serving,
};
