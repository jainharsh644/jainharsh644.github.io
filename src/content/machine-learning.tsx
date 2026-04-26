import { C, Note, type StudyPageContent, placeholderConcepts, placeholderQs } from "./_shared";

const concepts: StudyPageContent = {
  intro: (
    <p>
      Classical ML interview answers should sound like someone who has shipped models — not someone reciting a textbook.
      Lead with intuition, follow with the math, end with the tradeoff.
    </p>
  ),
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The thing every concept ladders up to: bias-variance</h2>
        <p>Every modeling decision — model class, regularization, depth, feature count — is a bias-variance dial. <C>Total error = bias² + variance + noise</C>. Underfit ⇒ high bias. Overfit ⇒ high variance. The job is to land at the minimum of the U-curve via cross-validation.</p>
      </section>

      <section>
        <h2>Regularization — what each one is doing</h2>
        <ul>
          <li><strong>L2 (Ridge):</strong> shrinks coefficients toward zero. Equivalent to MAP with Gaussian prior. Good when many features matter a little.</li>
          <li><strong>L1 (Lasso):</strong> can shrink coefficients <em>exactly to zero</em> ⇒ feature selection. MAP with Laplace prior. Good when few features matter a lot.</li>
          <li><strong>Elastic Net:</strong> linear combination of L1+L2. Default when in doubt.</li>
          <li><strong>Tree-based:</strong> max_depth, min_samples_leaf, n_estimators are the regularizers.</li>
          <li><strong>Neural nets:</strong> dropout, weight decay, early stopping, batch norm.</li>
        </ul>
      </section>

      <section>
        <h2>Linear regression assumptions</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Linearity</strong> — y is linear in features (or transformed features)</li>
          <li><strong>Independence</strong> — residuals not autocorrelated</li>
          <li><strong>Homoscedasticity</strong> — constant variance of residuals</li>
          <li><strong>Normality</strong> — residuals approximately Normal (matters for CIs, not point estimates)</li>
          <li><strong>No multicollinearity</strong> — features not perfectly correlated</li>
        </ol>
        <p>Check: residual plots, QQ-plots, VIF for multicollinearity. Senior candidates volunteer <em>which</em> assumption is most likely violated for a given problem.</p>
      </section>

      <section>
        <h2>Logistic regression — the underrated model</h2>
        <p>It models <C>log(p/(1−p)) = w·x</C>. Coefficients are interpretable as log-odds — flip-side of the &quot;black box&quot; complaint about ML. Trained via maximum likelihood (log-loss). Senior tip: in interviews, mention you&apos;d try logistic regression as a baseline before pulling out XGBoost.</p>
      </section>

      <section>
        <h2>Tree ensembles — when to use which</h2>
        <ul>
          <li><strong>Random Forest (bagging):</strong> independent trees, parallel, hard to overfit. Good baseline. Doesn&apos;t learn from previous trees&apos; mistakes.</li>
          <li><strong>Gradient Boosting (sequential):</strong> each tree fits the residuals of the previous ensemble. More accurate but more sensitive to hyperparameters.</li>
          <li><strong>XGBoost / LightGBM / CatBoost:</strong> production GBM implementations. LightGBM is leaf-wise (faster, more accurate, more overfit-prone). CatBoost handles categoricals natively.</li>
        </ul>
      </section>

      <section>
        <h2>Imbalanced classification — the right answers</h2>
        <ul>
          <li>Don&apos;t use accuracy. Use precision/recall, F1, or AUC depending on use case.</li>
          <li><strong>Class weights</strong> beat oversampling for most cases — let the loss function handle it.</li>
          <li><strong>SMOTE</strong> can help on small data but tends to leak in cross-validation if you&apos;re not careful (apply inside the CV fold, never before).</li>
          <li><strong>Threshold tuning</strong> is often the highest-leverage move — train once, calibrate the threshold to the cost of errors.</li>
          <li>Calibration matters when downstream uses the score as a probability.</li>
        </ul>
      </section>

      <section>
        <h2>Evaluation — match the metric to the cost</h2>
        <table className="w-full text-sm border border-cream-deep">
          <thead className="bg-cream-soft"><tr><th className="border p-2 text-left border-cream-deep">When</th><th className="border p-2 text-left border-cream-deep">Use</th></tr></thead>
          <tbody>
            <tr><td className="border p-2 border-cream-deep">Balanced binary classification</td><td className="border p-2 border-cream-deep">Accuracy, ROC-AUC</td></tr>
            <tr><td className="border p-2 border-cream-deep">Imbalanced binary, care about minority</td><td className="border p-2 border-cream-deep">PR-AUC, F1, recall@k</td></tr>
            <tr><td className="border p-2 border-cream-deep">Need calibrated probabilities</td><td className="border p-2 border-cream-deep">Log-loss, Brier score, calibration plot</td></tr>
            <tr><td className="border p-2 border-cream-deep">Regression, errors equal weight</td><td className="border p-2 border-cream-deep">RMSE, MAE</td></tr>
            <tr><td className="border p-2 border-cream-deep">Regression, % errors matter</td><td className="border p-2 border-cream-deep">MAPE, sMAPE</td></tr>
            <tr><td className="border p-2 border-cream-deep">Ranking</td><td className="border p-2 border-cream-deep">NDCG, MAP@k, MRR</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Cross-validation — do it right</h2>
        <ul>
          <li>K-Fold for iid data</li>
          <li>Stratified K-Fold for classification</li>
          <li>Group K-Fold when entities repeat (users, sessions)</li>
          <li>Time-series split for temporal data — never shuffle a time-series</li>
          <li>Always do feature engineering / scaling <em>inside</em> the CV fold to avoid leakage</li>
        </ul>
        <Note tone="terracotta">
          <strong>The leakage trap:</strong> fitting a scaler or imputer on the full dataset before splitting is the #1 source of inflated CV scores. Pipelines exist to prevent this — use them.
        </Note>
      </section>
    </div>
  ),
};

const linearModels: StudyPageContent = {
  intro: <p>Linear and logistic regression — the models you should reach for first, the ones that catch out candidates who skipped the basics.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Closed-form vs gradient descent</h2>
      <p>Linear regression has a closed-form solution: <C>w = (XᵀX)⁻¹Xᵀy</C> (normal equations). For huge n or p, gradient descent is faster. Logistic regression has no closed-form — always gradient-based.</p>
      <h2>Why log-loss for logistic regression</h2>
      <p>It&apos;s the negative log-likelihood under a Bernoulli model — convex in w, gradients are clean: <C>∂L/∂w = (sigmoid(w·x) − y) · x</C>. MSE on logistic is non-convex in w; don&apos;t use it.</p>
      <h2>Multicollinearity</h2>
      <p>When features are highly correlated, coefficient estimates are unstable (huge standard errors) but predictions are fine. Detect with VIF. Fix with: drop a feature, PCA, ridge regression.</p>
      <h2>Interpreting coefficients</h2>
      <ul>
        <li><strong>Linear:</strong> coefficient = expected change in y per 1-unit change in x, holding others fixed</li>
        <li><strong>Logistic:</strong> exp(coefficient) = odds ratio per 1-unit change in x</li>
      </ul>
    </div>
  ),
};

const trees: StudyPageContent = {
  intro: <p>Tree ensembles win 90% of tabular competitions. Know them deeply.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>How a single tree splits</h2>
        <p>For each candidate feature and threshold, compute the impurity reduction (Gini, entropy, or MSE for regression). Pick the best split. Recurse. Stop at max depth, min samples per leaf, or no positive gain.</p>
      </section>
      <section>
        <h2>Random Forest</h2>
        <ul>
          <li><strong>Bagging:</strong> bootstrap samples train each tree</li>
          <li><strong>Feature randomness:</strong> at each split, only a random subset of features considered (decorrelates trees)</li>
          <li>OOB (out-of-bag) score is a free CV estimate — useful in interviews</li>
        </ul>
      </section>
      <section>
        <h2>Gradient Boosting — the math</h2>
        <p>Each tree fits the negative gradient of the loss w.r.t. the current ensemble&apos;s prediction. For squared loss, the gradient = residuals — that&apos;s the &quot;fit residuals&quot; intuition. For log-loss, it&apos;s <C>(y − sigmoid(F(x)))</C>.</p>
      </section>
      <section>
        <h2>XGBoost vs LightGBM vs CatBoost</h2>
        <ul>
          <li><strong>XGBoost:</strong> level-wise splits, mature, robust defaults, regularization built in</li>
          <li><strong>LightGBM:</strong> leaf-wise splits, faster on large data, slightly better accuracy, easier to overfit, better with high-cardinality categoricals via histogram method</li>
          <li><strong>CatBoost:</strong> ordered boosting reduces target leakage from categorical encoding, best out-of-box for messy categorical data</li>
        </ul>
      </section>
      <section>
        <h2>Key hyperparameters</h2>
        <ul>
          <li><C>n_estimators</C>, <C>learning_rate</C> — trade off (more trees + smaller LR = better, slower)</li>
          <li><C>max_depth</C> / <C>num_leaves</C> — tree complexity</li>
          <li><C>subsample</C>, <C>colsample_bytree</C> — stochastic regularization</li>
          <li><C>reg_lambda</C>, <C>reg_alpha</C> — L2/L1 on leaf weights</li>
          <li><C>min_child_weight</C> / <C>min_data_in_leaf</C> — prevent overly small leaves</li>
        </ul>
      </section>
    </div>
  ),
};

const lossFunctions: StudyPageContent = {
  intro: <p>The loss is the model&apos;s definition of &quot;wrong.&quot; Pick it deliberately.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Regression losses</h2>
      <ul>
        <li><strong>MSE</strong> — penalizes large errors quadratically. Sensitive to outliers.</li>
        <li><strong>MAE</strong> — robust to outliers, gradient is constant (L1).</li>
        <li><strong>Huber</strong> — quadratic for small errors, linear for large. Best of both.</li>
        <li><strong>Quantile loss</strong> — for prediction intervals (e.g. 90th-percentile forecast).</li>
      </ul>
      <h2>Classification losses</h2>
      <ul>
        <li><strong>Binary cross-entropy (log-loss)</strong> — convex, calibrated probabilities.</li>
        <li><strong>Categorical cross-entropy</strong> — multiclass extension.</li>
        <li><strong>Focal loss</strong> — down-weights easy examples; helpful for severe imbalance (object detection).</li>
        <li><strong>Hinge loss</strong> — SVM&apos;s loss; robust to outliers but no probability output.</li>
      </ul>
    </div>
  ),
};

const evaluation: StudyPageContent = {
  intro: <p>Pick the right metric for the right cost. ROC-AUC alone is rarely enough.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Confusion matrix derivatives</h2>
      <ul>
        <li><strong>Precision</strong> = TP / (TP + FP) — &quot;of those I called positive, how many were?&quot;</li>
        <li><strong>Recall (sensitivity, TPR)</strong> = TP / (TP + FN) — &quot;of all positives, how many did I catch?&quot;</li>
        <li><strong>Specificity (TNR)</strong> = TN / (TN + FP)</li>
        <li><strong>F1</strong> = 2·P·R / (P+R) — harmonic mean</li>
        <li><strong>Fβ</strong> — weight recall β times more than precision</li>
      </ul>
      <h2>ROC-AUC vs PR-AUC</h2>
      <p>ROC-AUC: TPR vs FPR across thresholds — invariant to class balance. PR-AUC: precision vs recall — much more informative on imbalanced datasets where TN dominates.</p>
      <h2>Calibration</h2>
      <p>A model is calibrated if predicted probabilities match empirical frequencies. Test with reliability diagram. Fix with Platt scaling (sigmoid) or isotonic regression.</p>
    </div>
  ),
};

const featureEngineering: StudyPageContent = {
  intro: <p>The unglamorous truth: feature engineering still wins more competitions than model choice.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Categorical encoding</h2>
      <ul>
        <li><strong>One-hot</strong> — low cardinality, linear models</li>
        <li><strong>Label / ordinal</strong> — for ordered categories or trees</li>
        <li><strong>Target encoding</strong> — replace category with its mean target. Powerful but leaky — fit inside CV folds.</li>
        <li><strong>Hashing</strong> — for very high cardinality (millions of categories)</li>
        <li><strong>Embeddings</strong> — learned representations, especially for NN models</li>
      </ul>
      <h2>Numerical transforms</h2>
      <ul>
        <li>Log transform for skewed distributions</li>
        <li>Standardization (z-score) for distance-based models, neural nets</li>
        <li>Min-max scaling for bounded inputs</li>
        <li>Binning when relationship is highly non-linear</li>
        <li>Polynomial features for interactions</li>
      </ul>
      <h2>Datetime features</h2>
      <p>Hour, day-of-week, month, is-weekend, is-holiday, time-since-event. Cyclic encoding (<C>sin/cos(2π·t/T)</C>) for hour/day-of-year so 23 and 0 are close.</p>
      <h2>Leakage — the killer</h2>
      <ul>
        <li>Target leakage: feature includes future information (transaction status used to predict transaction outcome)</li>
        <li>Train-test leakage: scaler fit on full data before split</li>
        <li>Group leakage: same user appears in train and test</li>
      </ul>
    </div>
  ),
};

const imbalanced: StudyPageContent = {
  intro: <p>When 99% of your labels are one class, naive models &quot;get 99% accuracy&quot; by predicting the majority. Here&apos;s how to actually win.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Hierarchy of fixes</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Use a metric that doesn&apos;t lie</strong> — PR-AUC, recall@k, F1.</li>
        <li><strong>Class weights / sample weights</strong> — let the loss function reweight minority class. Cheap and effective.</li>
        <li><strong>Threshold tuning</strong> — train once, then sweep thresholds on a validation set to optimize your metric.</li>
        <li><strong>Resampling</strong> — random oversample / undersample. Quick wins but can overfit.</li>
        <li><strong>SMOTE</strong> — synthetic minority oversampling. Apply <em>inside</em> CV folds. Often less effective than class weights for tabular data.</li>
        <li><strong>Anomaly detection framing</strong> — when imbalance is extreme (1 in 10K), reframe as one-class.</li>
      </ol>
      <h2>What senior candidates lead with</h2>
      <p>The cost matrix. &quot;I&apos;d ask the business: is a missed fraud 10x more expensive than a false alarm? Then I&apos;d set the threshold accordingly. Class imbalance is a downstream technicality, not the framing.&quot;</p>
    </div>
  ),
};

const cv: StudyPageContent = {
  intro: <p>Cross-validation done wrong is the most common cause of overconfident production models.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The CV taxonomy</h2>
      <ul>
        <li><strong>K-Fold</strong> — iid data, default choice (k=5 or 10)</li>
        <li><strong>Stratified K-Fold</strong> — preserves class balance per fold; required for classification</li>
        <li><strong>Group K-Fold</strong> — same group never in both train and test (users, sessions, hospitals)</li>
        <li><strong>Time-series split (forward chaining)</strong> — train on past, validate on future. Never shuffle.</li>
        <li><strong>Nested CV</strong> — outer for evaluation, inner for hyperparameter search. Required for honest reporting.</li>
        <li><strong>Repeated K-Fold</strong> — shuffle and re-fold multiple times for tighter variance estimate</li>
      </ul>
      <h2>Pipelines prevent leakage</h2>
      <p>Wrap every transform (scaler, imputer, encoder) in a <C>Pipeline</C> or <C>ColumnTransformer</C>. The pipeline gets cloned and refit per fold — leakage-proof by construction.</p>
    </div>
  ),
};

const hyperparam: StudyPageContent = {
  intro: <p>Hyperparameter tuning is a search problem. The choice of search algorithm matters less than people think — what matters is the search space.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Search algorithms</h2>
      <ul>
        <li><strong>Grid search</strong> — exhaustive, only viable for small spaces</li>
        <li><strong>Random search</strong> — almost always beats grid for the same budget (Bergstra-Bengio 2012)</li>
        <li><strong>Bayesian (TPE, GP)</strong> — Optuna, Hyperopt. Best when each trial is expensive.</li>
        <li><strong>Hyperband / ASHA</strong> — successive halving; great for deep learning</li>
        <li><strong>Population-based training</strong> — used in RL and large NN training</li>
      </ul>
      <h2>What to tune for XGBoost (in order)</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>n_estimators with early_stopping_rounds — set this high, let early stopping pick</li>
        <li>learning_rate — lower with more trees</li>
        <li>max_depth or num_leaves</li>
        <li>min_child_weight / min_data_in_leaf</li>
        <li>subsample, colsample_bytree</li>
        <li>reg_alpha, reg_lambda</li>
      </ol>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>Fifty most-asked classical ML questions. Each is being expanded to full answers — the question list itself is a study aid.</p>,
  qa: [
    { q: "Bias-variance tradeoff — explain like the interviewer&apos;s never heard of it.", a: <p>Total prediction error decomposes into bias² (systematic underfitting), variance (sensitivity to training set), and irreducible noise. Simple models have high bias / low variance; complex models have low bias / high variance. The optimal model minimizes the sum, found by cross-validation. Regularization, ensembling, and more data are levers.</p> },
    { q: "L1 vs L2 regularization — when to use which?", a: <p>L2 (ridge) shrinks all coefficients smoothly toward zero — better when many features matter a little. L1 (lasso) drives some coefficients to exactly zero — built-in feature selection, better when few features matter a lot. Elastic net combines both. Geometrically: L1&apos;s contour has corners on the axes ⇒ solutions land on axes ⇒ zeros.</p> },
    { q: "Why does XGBoost beat random forest on tabular data?", a: <p>RF reduces variance by averaging independent trees; it doesn&apos;t learn from previous trees&apos; mistakes. GBM sequentially fits residuals — each tree corrects the ensemble&apos;s errors. With proper regularization (learning rate, depth limit, subsampling) GBM achieves lower bias for the same variance. RF is more forgiving with defaults though.</p> },
    { q: "How do you handle missing values?", a: <p>(1) Diagnose: MCAR / MAR / MNAR. (2) For tree-based models: most libraries handle NaN natively (split direction learned). (3) For linear / NN models: impute with median (numerical) / mode (categorical), and add a missingness indicator feature. (4) Avoid mean imputation on skewed data. (5) Multiple imputation if doing inference.</p> },
    { q: "ROC-AUC vs PR-AUC — when does AUC mislead?", a: <p>ROC-AUC is invariant to class balance: with 1% positives, a useless model can have 0.85 AUC. PR-AUC focuses on the positive class — much more honest for imbalanced classification. Use PR-AUC when positives are rare and care about precision/recall.</p> },
    { q: "Walk me through training a model from data to deployment.", a: <p>(1) Define problem and metric. (2) Data audit, EDA, leakage check. (3) Train/val/test split — by time/group if relevant. (4) Baseline model. (5) Feature engineering. (6) Model iteration with cross-validation. (7) Hyperparameter tuning. (8) Final eval on held-out. (9) Calibration, threshold tuning. (10) Build serving artifact, write monitoring + alerting. (11) Shadow deploy, A/B test, ship.</p> },
    { q: "How do you detect and handle data drift in production?", a: <p>Detect: PSI (population stability index) on inputs, KS test on output distributions, monitoring of label-correlated metrics. Handle: retrain on a rolling window, automatic retrain pipelines triggered by drift threshold, feature stores with consistency checks. Senior framing: distinguish covariate drift (P(x) changes) from concept drift (P(y|x) changes) — different fixes.</p> },
    { q: "Why standardize features?", a: <p>For distance-based (KNN, SVM, K-means) and gradient-based (NN, logistic regression) models, features on different scales mean larger-scale features dominate. Standardization (z-score) or min-max puts them on comparable footing. Tree-based models are scale-invariant — don&apos;t need it.</p> },
    { q: "Explain backprop in two minutes.", a: <p>Forward pass computes loss. Backprop computes gradients of loss w.r.t. each weight by applying the chain rule from output back to input — caching intermediate activations. The gradients are then used by an optimizer (SGD, Adam) to update weights. Computational graph + automatic differentiation = modern frameworks.</p> },
    { q: "How would you evaluate a clustering algorithm with no labels?", a: <p>(1) Internal: silhouette score, Davies-Bouldin, Calinski-Harabasz. (2) Stability: re-cluster on bootstrap samples, measure ARI. (3) Downstream: do the clusters predict something useful (held-out segment behavior)? (4) Domain: have an expert review samples per cluster. Senior: lead with &quot;what decision is this clustering for?&quot; — the metric follows the use case.</p> },
    { q: "[Placeholder] Explain Naive Bayes — when does &quot;naive&quot; work?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] What&apos;s the difference between bagging and boosting?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] PCA vs autoencoder for dimensionality reduction.", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] When would you use SVM over logistic regression?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] Explain k-means — what are its failure modes?", a: <p>Answer being drafted.</p> },
  ],
};

export const mlContent: Record<string, StudyPageContent> = {
  concepts,
  "linear-models": linearModels,
  "tree-ensembles": trees,
  "loss-functions": lossFunctions,
  "model-evaluation": evaluation,
  "feature-engineering": featureEngineering,
  imbalanced,
  "cross-validation": cv,
  "hyperparam-tuning": hyperparam,
  "top-questions": topQuestions,
};
