# ─── aiops/kira.py ───────────────────────────────────────────────────
# Copy contents from kira-v2/kira.py (delivered separately).
# This file is the entry point — replace the existing kira.py with
# the full v2 version from the kira-v2/ folder provided.
#
# Quick reference — what changed vs v1:
#   - subprocess kubectl → kubernetes Python client (in-cluster safe)
#   - Auto-scan every 30s — rule-based anomaly detection
#   - Prometheus range query charts (Plotly)
#   - Incident history in sidebar
#   - Structured Gemini prompt with Gnosis service map
#   - Export incident report as .txt
#   - RBAC ServiceAccount (kira-deployment.yaml)
# ─────────────────────────────────────────────────────────────────────
# See: aiops/kira.py (full file in kira-v2 delivery)
