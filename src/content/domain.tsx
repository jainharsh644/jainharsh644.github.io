import { type StudyPageContent, placeholderConcepts } from "./_shared";

export const domainContent: Record<string, StudyPageContent> = {
  fintech: placeholderConcepts("Fintech & H2O.ai Work", [
    "Synthetic data — why it matters for fintech (privacy, training data, model testing)",
    "Privacy-utility tradeoff and how to measure it",
    "Fraud detection patterns and feature engineering",
    "Credit risk modeling: PD, LGD, EAD",
    "AML / KYC ML applications",
    "Regulatory considerations (SR 11-7, GDPR, fair lending)",
    "[Placeholder] Specifics from your H2O.ai projects — to be filled when you share details",
  ]),
  manufacturing: placeholderConcepts("Manufacturing (Arch)", [
    "Demand forecasting at SKU / product family / region level",
    "Predictive maintenance: anomaly detection on sensor streams",
    "Supply chain optimization",
    "Quality prediction: identifying defective batches",
    "OEE (Overall Equipment Effectiveness) as a target",
    "Common data sources: ERP, MES, SCADA, IoT sensors",
    "[Placeholder] Specifics from your Arch projects",
  ]),
  agribusiness: placeholderConcepts("Agribusiness (Mosaic)", [
    "Yield forecasting under weather/climate uncertainty",
    "Demand modeling for fertilizer / seed / crop inputs",
    "Geospatial data: soil, satellite imagery, climate",
    "Supply-side seasonality and procurement timing",
    "[Placeholder] Specifics from your Mosaic internship",
  ]),
  "h2o-stack": placeholderConcepts("H2O Stack", [
    "H2O AutoML — leaderboard, stacked ensembles, when it wins",
    "Driverless AI — feature engineering automation, MLI explanations",
    "TabH2O — H2O&apos;s tabular foundation model: zero-shot tabular prediction",
    "h2oGPTe — enterprise GenAI platform: RAG, agents, fine-tuning",
    "H2O Wave — Python-native UI for ML apps",
    "When to reach for each, and the integration patterns",
  ]),
};
