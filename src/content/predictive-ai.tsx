import { type StudyPageContent, placeholderConcepts, placeholderQs } from "./_shared";

export const predictiveAiContent: Record<string, StudyPageContent> = {
  concepts: placeholderConcepts("Time Series", [
    "Components: trend, seasonality, cyclical, residual",
    "Stationarity — why it matters for ARIMA-family models",
    "Autocorrelation (ACF) and partial autocorrelation (PACF)",
    "Train/val/test splits for time series — never shuffle",
    "Backtesting and walk-forward validation",
    "Hierarchical and grouped time series",
  ]),
  stationarity: placeholderConcepts("Stationarity & Differencing", [
    "Strict vs weak stationarity",
    "ADF and KPSS tests — opposite null hypotheses",
    "Differencing to remove trend; seasonal differencing",
    "Log transforms for variance stabilization",
    "Box-Cox for general variance stabilization",
    "What &apos;making stationary&apos; gives you and why ARIMA needs it",
  ]),
  "arima-family": placeholderConcepts("ARIMA, SARIMA, ETS", [
    "AR, MA, ARMA, ARIMA — what each part does",
    "Seasonal ARIMA (SARIMA) for seasonal patterns",
    "Choosing (p, d, q) using ACF/PACF and AIC/BIC",
    "Exponential Smoothing (ETS) family",
    "When ETS beats ARIMA (smooth, single-series forecasts)",
    "Forecast intervals and their assumptions",
  ]),
  "prophet-modern": placeholderConcepts("Prophet & ML Forecasting", [
    "Prophet: trend + seasonality + holidays + changepoints",
    "When Prophet wins (interpretable, robust, business holidays)",
    "ML forecasting: lag features, rolling stats, target-encoded categoricals",
    "Global models (one model, many series) vs local (one per series)",
    "Modern DL forecasting: N-BEATS, DeepAR, Temporal Fusion Transformer",
    "Probabilistic forecasts vs point forecasts",
  ]),
  evaluation: placeholderConcepts("Time Series Evaluation", [
    "MAE, RMSE, MAPE, sMAPE — when each lies",
    "Bias vs variance in forecast error",
    "Walk-forward / expanding-window CV",
    "Backtest properly: simulate the production timing",
    "Comparing to baselines: naive, seasonal naive, drift",
  ]),
  "top-questions": placeholderQs("Time Series", [
    "Why can&apos;t you shuffle data for time-series cross-validation?",
    "How would you handle missing timestamps in a time series?",
    "When do you choose Prophet over ARIMA over an ML model?",
    "How do you incorporate external regressors (price, promotions, weather)?",
    "Forecast accuracy degrades over time — how do you diagnose and fix?",
    "How would you forecast for a brand new product with no history?",
    "Hierarchical forecasts: bottom-up vs top-down vs middle-out",
  ]),
};
