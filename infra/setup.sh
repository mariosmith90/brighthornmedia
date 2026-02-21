#!/usr/bin/env bash
# One-time setup: applies Terraform and downloads a service account key
# used by the Next.js API route to generate signed URLs for GCS objects.
#
# Run once:  bash setup.sh
#
set -euo pipefail

PROJECT_ID="organic-spirit-488116-e2"
SA_NAME="brighthorn-media-reader"
KEY_OUT="$(dirname "$0")/../gcs-service-account.json"
export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

echo "▸ Setting active GCP project..."
gcloud config set project "$PROJECT_ID" --quiet

echo "▸ Running terraform apply..."
cd "$(dirname "$0")"
terraform apply -auto-approve

SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "▸ Downloading service account key..."
gcloud iam service-accounts keys create "$KEY_OUT" \
  --iam-account="$SA_EMAIL"

echo ""
echo "✓ Done! Key saved to gcs-service-account.json (DO NOT commit this file)"
echo "✓ Next steps:"
echo "  1. cp .env.local.example .env.local"
echo "  2. Fill in NEXT_PUBLIC_GCS_BUCKET_NAME and GCS_SA_KEY_PATH in .env.local"
echo ""
terraform output
