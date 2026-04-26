import { C, Note, type StudyPageContent, placeholderConcepts, placeholderQs } from "./_shared";

const concepts: StudyPageContent = {
  intro: (
    <p>
      Statistics is the single most-tested area in DS interviews after SQL. The bar is not memorizing formulas —
      it&apos;s being able to <em>derive</em> the right answer to a problem you haven&apos;t seen before.
    </p>
  ),
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The four families of questions</h2>
        <ul>
          <li><strong>Probability puzzles</strong> — combinatorics, conditional probability, expectation</li>
          <li><strong>Inference</strong> — given a sample, what can we say about the population?</li>
          <li><strong>Experimental design</strong> — A/B testing, power, sample size, MDE</li>
          <li><strong>Causal</strong> — going beyond correlation: DAGs, IV, diff-in-diff, propensity scores</li>
        </ul>
      </section>

      <section>
        <h2>Core probability you must know cold</h2>
        <ul>
          <li><strong>Conditional probability:</strong> <C>P(A|B) = P(A∩B) / P(B)</C></li>
          <li><strong>Bayes&apos; rule:</strong> <C>P(A|B) = P(B|A) · P(A) / P(B)</C></li>
          <li><strong>Independence:</strong> <C>P(A∩B) = P(A) · P(B)</C></li>
          <li><strong>Expectation linearity:</strong> <C>E[X+Y] = E[X] + E[Y]</C> — even when X and Y are dependent</li>
          <li><strong>Variance:</strong> <C>Var(X) = E[X²] − E[X]²</C>; <C>Var(aX+b) = a²·Var(X)</C></li>
          <li><strong>Covariance:</strong> <C>Cov(X,Y) = E[XY] − E[X]E[Y]</C></li>
          <li><strong>Var of sum:</strong> <C>Var(X+Y) = Var(X) + Var(Y) + 2·Cov(X,Y)</C></li>
        </ul>
      </section>

      <section>
        <h2>Estimators: bias, variance, MSE</h2>
        <p><strong>MSE = bias² + variance.</strong> A good estimator is unbiased <em>and</em> low variance — but in practice we trade bias for variance (regularization is exactly this).</p>
        <ul>
          <li><strong>MLE</strong> maximizes the likelihood: <C>argmax_θ P(data | θ)</C></li>
          <li><strong>MAP</strong> adds a prior: <C>argmax_θ P(data | θ) · P(θ)</C></li>
          <li>MAP = MLE when the prior is uniform; MAP is regularized MLE</li>
        </ul>
      </section>

      <section>
        <h2>The Big Theorems</h2>
        <ul>
          <li><strong>Law of Large Numbers:</strong> sample mean → population mean as n → ∞</li>
          <li><strong>Central Limit Theorem:</strong> the distribution of <em>sample means</em> is approximately Normal for large n, regardless of the underlying distribution. n ≥ 30 is the rule of thumb.</li>
          <li><strong>Slutsky&apos;s theorem</strong> — used to derive distributions of test statistics</li>
        </ul>
        <Note>
          <strong>Why CLT shows up everywhere:</strong> it&apos;s why we can use a Normal approximation for confidence intervals,
          z-tests, and A/B testing — even when the metric (clicks, conversions) is decidedly non-Normal.
        </Note>
      </section>

      <section>
        <h2>Hypothesis testing — the framework</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>State <strong>H₀</strong> (the boring null) and <strong>H₁</strong> (the thing you want to prove)</li>
          <li>Pick <strong>α</strong> (typically 0.05) — the false positive rate you tolerate</li>
          <li>Pick the right test (z, t, chi², ANOVA, etc.)</li>
          <li>Compute the <strong>test statistic</strong> and its <strong>p-value</strong></li>
          <li>Reject H₀ if p &lt; α; otherwise fail to reject (never &quot;accept&quot;)</li>
        </ol>
        <p><strong>Type I error</strong> = false positive (reject true null) — controlled by α. <strong>Type II error</strong> = false negative (fail to reject false null) — controlled by sample size and effect size. <strong>Power</strong> = 1 − Type II error rate.</p>
      </section>

      <section>
        <h2>Confidence intervals</h2>
        <p>A 95% CI does NOT mean &quot;there&apos;s a 95% chance the true parameter is in here.&quot; That&apos;s a <em>credible interval</em> (Bayesian). The frequentist CI says: if we repeated the experiment many times, 95% of constructed intervals would contain the true parameter. Interviewers love catching candidates on this.</p>
      </section>
    </div>
  ),
};

const distributions: StudyPageContent = {
  intro: <p>Know these cold — when each shows up, parameters, mean/variance, and the pitfalls.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The starter pack</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-cream-deep">
          <thead className="bg-cream-soft">
            <tr>
              <th className="border border-cream-deep p-2 text-left">Distribution</th>
              <th className="border border-cream-deep p-2 text-left">Models</th>
              <th className="border border-cream-deep p-2 text-left">Mean</th>
              <th className="border border-cream-deep p-2 text-left">Variance</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-cream-deep p-2">Bernoulli(p)</td><td className="border border-cream-deep p-2">Single coin flip</td><td className="border border-cream-deep p-2">p</td><td className="border border-cream-deep p-2">p(1−p)</td></tr>
            <tr><td className="border border-cream-deep p-2">Binomial(n,p)</td><td className="border border-cream-deep p-2"># successes in n trials</td><td className="border border-cream-deep p-2">np</td><td className="border border-cream-deep p-2">np(1−p)</td></tr>
            <tr><td className="border border-cream-deep p-2">Poisson(λ)</td><td className="border border-cream-deep p-2">Rare events / unit time</td><td className="border border-cream-deep p-2">λ</td><td className="border border-cream-deep p-2">λ</td></tr>
            <tr><td className="border border-cream-deep p-2">Geometric(p)</td><td className="border border-cream-deep p-2"># trials to first success</td><td className="border border-cream-deep p-2">1/p</td><td className="border border-cream-deep p-2">(1−p)/p²</td></tr>
            <tr><td className="border border-cream-deep p-2">Normal(μ,σ²)</td><td className="border border-cream-deep p-2">Symmetric, bell-shaped</td><td className="border border-cream-deep p-2">μ</td><td className="border border-cream-deep p-2">σ²</td></tr>
            <tr><td className="border border-cream-deep p-2">Exponential(λ)</td><td className="border border-cream-deep p-2">Time between Poisson events</td><td className="border border-cream-deep p-2">1/λ</td><td className="border border-cream-deep p-2">1/λ²</td></tr>
            <tr><td className="border border-cream-deep p-2">Uniform(a,b)</td><td className="border border-cream-deep p-2">All values equally likely</td><td className="border border-cream-deep p-2">(a+b)/2</td><td className="border border-cream-deep p-2">(b−a)²/12</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Famous relationships</h2>
      <ul>
        <li>Sum of n Bernoulli(p) ⇒ Binomial(n, p)</li>
        <li>Limit of Binomial(n, p) as n→∞, np→λ ⇒ Poisson(λ)</li>
        <li>Time between Poisson events ⇒ Exponential — memoryless property</li>
        <li>Sum of independent Normals ⇒ Normal — variances add</li>
      </ul>
    </div>
  ),
};

const cltLln: StudyPageContent = {
  intro: <p>Why the Normal distribution dominates inference, and the conditions you must check.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Central Limit Theorem — properly stated</h2>
      <p>If <C>X₁, X₂, ...</C> are i.i.d. with mean μ and variance σ², then for large n:</p>
      <pre><code>{`X̄ ≈ Normal(μ, σ²/n)`}</code></pre>
      <p>Or equivalently, <C>(X̄ − μ) / (σ/√n) ≈ Normal(0, 1)</C>.</p>
      <h2>What it lets you do</h2>
      <ul>
        <li>Build z-tests and t-tests on means of any distribution</li>
        <li>Compute confidence intervals for proportions and means</li>
        <li>Trust A/B test math even when conversion rates are 0/1</li>
      </ul>
      <h2>When CLT breaks</h2>
      <ul>
        <li><strong>Heavy-tailed distributions</strong> (e.g. Cauchy) — finite variance violated</li>
        <li><strong>Non-iid samples</strong> — clustered users, repeated measurements</li>
        <li><strong>Small n</strong> — switch to t-distribution if you know the population is roughly Normal</li>
      </ul>
      <Note tone="terracotta">
        <strong>Common interview trap:</strong> &quot;n &gt; 30 makes CLT work&quot; is folklore. Heavy-tailed
        distributions need way more. The right framing: CLT applies when sample mean&apos;s distribution is
        approximately Normal — judge that with a histogram, not a rule of thumb.
      </Note>
    </div>
  ),
};

const hypothesis: StudyPageContent = {
  intro: <p>The mechanics of every test you&apos;ll be asked about, and the questions interviewers actually ask.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>Picking the right test</h2>
        <table className="w-full text-sm border border-cream-deep">
          <thead className="bg-cream-soft"><tr><th className="border p-2 text-left border-cream-deep">Question</th><th className="border p-2 text-left border-cream-deep">Test</th></tr></thead>
          <tbody>
            <tr><td className="border p-2 border-cream-deep">Is mean of one sample = μ₀? (σ known)</td><td className="border p-2 border-cream-deep">One-sample z-test</td></tr>
            <tr><td className="border p-2 border-cream-deep">Same, σ unknown / small n</td><td className="border p-2 border-cream-deep">One-sample t-test</td></tr>
            <tr><td className="border p-2 border-cream-deep">Are two means equal?</td><td className="border p-2 border-cream-deep">Two-sample t-test</td></tr>
            <tr><td className="border p-2 border-cream-deep">Are paired samples different?</td><td className="border p-2 border-cream-deep">Paired t-test</td></tr>
            <tr><td className="border p-2 border-cream-deep">Are 3+ group means equal?</td><td className="border p-2 border-cream-deep">ANOVA (F-test)</td></tr>
            <tr><td className="border p-2 border-cream-deep">Is categorical distribution as expected?</td><td className="border p-2 border-cream-deep">Chi-square goodness-of-fit</td></tr>
            <tr><td className="border p-2 border-cream-deep">Are two categorical variables independent?</td><td className="border p-2 border-cream-deep">Chi-square test of independence</td></tr>
            <tr><td className="border p-2 border-cream-deep">Are two proportions equal?</td><td className="border p-2 border-cream-deep">Two-proportion z-test</td></tr>
            <tr><td className="border p-2 border-cream-deep">Distributions equal? (non-parametric)</td><td className="border p-2 border-cream-deep">Mann-Whitney U / KS test</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>p-values: what they mean (and don&apos;t)</h2>
        <p><strong>p-value = P(observing data this extreme or more | H₀ true)</strong>. It is NOT the probability that H₀ is true. It is NOT the probability of a fluke. Interviewers will ask this — be careful.</p>
        <ul>
          <li>p &lt; α ⇒ reject H₀ (statistically significant at level α)</li>
          <li>p ≥ α ⇒ fail to reject (not the same as &quot;H₀ is true&quot;)</li>
          <li>p-values shrink with sample size — &quot;significant&quot; at n=10M is often not <em>practically</em> significant</li>
        </ul>
      </section>

      <section>
        <h2>Power and sample size</h2>
        <p>Power = P(reject H₀ | H₁ true). Driven by:</p>
        <ul>
          <li>Effect size (bigger ⇒ easier to detect)</li>
          <li>Sample size (bigger ⇒ more power)</li>
          <li>Variance (bigger ⇒ less power)</li>
          <li>Significance level α (more lenient ⇒ more power, but more Type I errors)</li>
        </ul>
        <p>For a two-sample z-test: <C>n ≈ 16·σ² / δ²</C> per arm for 80% power at α=0.05. Memorize this — it&apos;s asked constantly.</p>
      </section>
    </div>
  ),
};

const abTesting: StudyPageContent = {
  intro: (
    <p>
      A/B testing is the second-most asked area after SQL — and the one where senior candidates separate themselves.
      The framework matters more than the math.
    </p>
  ),
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The standard frame interviewers want</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Goal & metric.</strong> What success metric? Why this and not others? Watch for: <em>guardrail metrics</em> (revenue, latency, fraud — things you don&apos;t want to break).</li>
          <li><strong>Hypothesis.</strong> Concrete H₀ and H₁ with effect size.</li>
          <li><strong>Unit of randomization.</strong> User? Session? Request? Critical to get right — wrong unit ⇒ false positives.</li>
          <li><strong>Sample size.</strong> Power analysis: given baseline, MDE, σ, α and power, compute n.</li>
          <li><strong>Duration.</strong> Long enough to capture novelty effects, weekly cycles, but not so long the world changes.</li>
          <li><strong>Run the test.</strong> 50/50 split, monitor for SRM (sample ratio mismatch — a <em>huge</em> red flag).</li>
          <li><strong>Analyze.</strong> Two-sample t/z test on the metric. Check guardrail metrics.</li>
          <li><strong>Decide.</strong> Statistical significance + practical significance + ship/no-ship recommendation.</li>
        </ol>
      </section>

      <section>
        <h2>Common gotchas senior candidates catch</h2>
        <ul>
          <li><strong>Peeking</strong> — checking p-value daily and stopping when significant inflates Type I error massively. Solution: pre-register sample size, or use sequential tests (always-valid p-values, mSPRT).</li>
          <li><strong>Multiple comparisons</strong> — testing 10 metrics at α=0.05 ⇒ ≈40% chance of false positive. Use Bonferroni or FDR (Benjamini-Hochberg).</li>
          <li><strong>SUTVA violations</strong> — when your treatment leaks (network effects in social products, marketplace tests). Use cluster randomization or switchback designs.</li>
          <li><strong>Novelty / primacy effects</strong> — users react to <em>change</em>, not the change&apos;s value. Wait it out, or use long-term holdouts.</li>
          <li><strong>Simpson&apos;s paradox</strong> — overall positive, segment-level negative (or vice versa). Check segments before shipping.</li>
          <li><strong>SRM (sample ratio mismatch)</strong> — if you randomized 50/50 but observed 49/51 with high n, something is broken (logging, bot filtering, eligibility). Don&apos;t analyze the test.</li>
        </ul>
      </section>

      <section>
        <h2>Practical / business significance</h2>
        <p>p &lt; 0.05 with effect = +0.01% lift on a 50M-user product is &quot;statistically significant&quot; but probably not worth shipping. Always present effect size with CI alongside the p-value. Senior candidates lead with effect size.</p>
      </section>

      <section>
        <h2>When you can&apos;t A/B test</h2>
        <ul>
          <li><strong>Switchback tests</strong> — turn treatment on/off in time slices (rideshare pricing)</li>
          <li><strong>Quasi-experiments</strong> — diff-in-diff when you have natural variation</li>
          <li><strong>Synthetic controls</strong> — geo experiments where one geo gets treatment</li>
          <li><strong>Bayesian A/B</strong> — useful when you want decision under uncertainty rather than reject/fail-to-reject</li>
        </ul>
      </section>
    </div>
  ),
};

const causal: StudyPageContent = {
  intro: <p>Correlation ≠ causation. Senior DS interviews probe whether you know the right tool for the right confounding pattern.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>The hierarchy of evidence</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Randomized experiment (RCT / A/B test) — gold standard</li>
          <li>Quasi-experiments — natural randomization</li>
          <li>Observational with strong identification strategy</li>
          <li>Pure correlation studies — the bottom of the barrel</li>
        </ol>
      </section>
      <section>
        <h2>Identification strategies — when no RCT is possible</h2>
        <ul>
          <li><strong>Difference-in-Differences (DiD):</strong> compare change-over-time between treated and control. Assumes parallel trends.</li>
          <li><strong>Instrumental Variables (IV):</strong> use a variable that affects treatment but not outcome directly. e.g. distance to college as IV for years of education.</li>
          <li><strong>Regression Discontinuity (RDD):</strong> exploit a sharp threshold (test score, age cutoff).</li>
          <li><strong>Propensity Score Matching (PSM):</strong> match treated and control on probability of treatment, then compare outcomes. Only adjusts for observed confounders.</li>
          <li><strong>Synthetic Control:</strong> construct a weighted combo of untreated units to mimic what the treated unit would have looked like.</li>
        </ul>
      </section>
      <section>
        <h2>The DAG mindset</h2>
        <p>Draw a directed acyclic graph of variables. Identify confounders (variables that affect both treatment and outcome). Decide what to control for. <strong>Don&apos;t</strong> condition on colliders — it introduces bias rather than removing it.</p>
      </section>
    </div>
  ),
};

const bayesian: StudyPageContent = {
  intro: <p>The Bayesian frame is increasingly expected in senior interviews — especially in companies with experimentation platforms.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Bayes&apos; rule, the way you should think about it</h2>
      <pre><code>{`posterior  ∝  likelihood × prior

P(θ | data)  ∝  P(data | θ) × P(θ)`}</code></pre>
      <h2>When to go Bayesian</h2>
      <ul>
        <li>You have meaningful prior information (e.g. base rates from past experiments)</li>
        <li>You want a probabilistic statement about parameters (&quot;P(B is better than A) = 92%&quot;)</li>
        <li>You want to combine evidence from multiple weak signals</li>
        <li>Sample size is small and frequentist tests are underpowered</li>
      </ul>
      <h2>Conjugate priors — the cheat codes</h2>
      <ul>
        <li>Beta prior + Binomial likelihood ⇒ Beta posterior</li>
        <li>Normal prior + Normal likelihood ⇒ Normal posterior</li>
        <li>Gamma prior + Poisson likelihood ⇒ Gamma posterior</li>
      </ul>
      <h2>MAP vs MLE — the punchline</h2>
      <p>MAP = MLE + a regularizer. Ridge regression = MAP estimate of linear regression with a Gaussian prior. L1 (Lasso) = MAP with a Laplace prior. This is the link interviewers look for.</p>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>The fifty stats / probability questions that come up in DS interviews. Each one expanded over time.</p>,
  qa: [
    { q: "Explain p-value to a non-technical PM.", a: <p>p-value is the probability that we&apos;d see results as extreme as the ones we observed, <em>if the new feature actually had no effect</em>. A small p-value means our results would be surprising under that &quot;no effect&quot; assumption — strong evidence that there <em>is</em> an effect. It does NOT tell you the probability the new feature works.</p> },
    { q: "Type I vs Type II errors. Which is worse?", a: <p>Type I = false positive (you reject a true null — &quot;ship something that doesn&apos;t work&quot;). Type II = false negative (you fail to reject a false null — &quot;miss a real win&quot;). Which is worse depends on cost: Type I expensive when ship cost is high (infra changes); Type II expensive when miss cost is high (a competitor catches up). Senior answer: discuss the asymmetry, propose adjusting α or test design accordingly.</p> },
    { q: "Why does CLT matter for A/B testing?", a: <p>Even if conversion is 0/1, the <em>sample mean</em> conversion rate is approximately Normal for large n by CLT. This lets us use z-tests / Normal CIs even for binary outcomes.</p> },
    { q: "Power, MDE, sample size — relate them.", a: <p>For two-sample z-test: <C>n ≈ 16·σ² / MDE²</C> per arm for 80% power at α=0.05. Smaller MDE ⇒ much bigger n (quadratic). Higher variance ⇒ bigger n. Higher power requirement (90% vs 80%) ⇒ bigger n. Senior candidates also mention: when MDE is too small to be practically useful, don&apos;t bother running the test.</p> },
    { q: "Sample ratio mismatch — what is it and what do you do?", a: <p>You randomized 50/50 but observed e.g. 48.5/51.5 with χ² test p &lt; 0.001. Indicates a bias in assignment, logging, or eligibility — possibly invalidates the test. Senior: don&apos;t trust the result, find the bug (often: cookie expiry, bot filtering applied to one arm, A/A test issues).</p> },
    { q: "Simpson&apos;s paradox — example and what to do.", a: <p>Classic Berkeley admissions: men appeared to be admitted at higher rates overall, but within each department women had equal-or-higher rates. The confound was that women applied disproportionately to harder departments. Always check segment-level results before declaring a winner.</p> },
    { q: "Bias-variance tradeoff in one minute.", a: <p>Total error = bias² + variance + irreducible noise. High-bias models (linear regression on non-linear data) underfit. High-variance models (deep tree without regularization) overfit. The sweet spot minimizes the sum, found via cross-validation.</p> },
    { q: "Why is sample mean unbiased but sample variance with /n biased?", a: <p>Because we use the <em>sample</em> mean as an estimator of the true mean, we lose one degree of freedom — using n in the denominator under-counts variance. Dividing by (n−1) fixes the bias (Bessel&apos;s correction).</p> },
    { q: "Frequentist vs Bayesian CI.", a: <p>Frequentist 95% CI: if I repeated the experiment many times, 95% of constructed intervals would contain the true parameter. The interval is random; the parameter is fixed. Bayesian 95% credible interval: given my prior + data, there&apos;s a 95% probability the parameter is in this interval. Different statements about what&apos;s random.</p> },
    { q: "Birthday problem — why is the answer so small for matching?", a: <p>P(at least 2 people share a birthday in 23) ≈ 0.50. Counterintuitive because we instinctively count pairs (which is C(23,2)=253) not people. The growth in pairs is quadratic.</p> },
    { q: "[Placeholder] Monty Hall — explain why switching doubles your odds.", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] You flip a fair coin until you get HH. Expected number of flips?", a: <p>Answer 6. Setup with states + system of expectation equations.</p> },
    { q: "[Placeholder] Bayes box: 1% of patients have disease, test is 99% sensitive and 99% specific. Patient tests positive — probability they have it?", a: <p>≈ 50%. The base rate dominates.</p> },
    { q: "[Placeholder] How would you set up a multi-armed bandit instead of A/B test?", a: <p>Trade-off: A/B = clean inference; bandit = lower regret while learning.</p> },
    { q: "[Placeholder] You see 10 heads in 10 flips. Is the coin biased?", a: <p>Bayesian framing — depends on your prior; classical hypothesis test gives a clear p-value.</p> },
  ],
};

export const statisticsContent: Record<string, StudyPageContent> = {
  concepts,
  distributions,
  "clt-lln": cltLln,
  "hypothesis-testing": hypothesis,
  "ab-testing": abTesting,
  "causal-inference": causal,
  bayesian,
  "top-questions": topQuestions,
};
