#!/usr/bin/env bash
# Verifies NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID before deploying, with a clear error for each failure.
set -euo pipefail

if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
  echo "::error::Secret NETLIFY_AUTH_TOKEN is not set (Settings → Secrets and variables → Actions → Secrets)."
  exit 1
fi
if [ -z "${NETLIFY_SITE_ID:-}" ]; then
  echo "::error::Secret NETLIFY_SITE_ID is not set (Settings → Secrets and variables → Actions → Secrets)."
  exit 1
fi

status=$(curl -s -o /tmp/netlify-site.json -w "%{http_code}" \
  -H "Authorization: Bearer ${NETLIFY_AUTH_TOKEN}" \
  "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}")

case "$status" in
  200)
    echo "Netlify site found: $(node -p "const s = require('/tmp/netlify-site.json'); s.name + ' (' + (s.ssl_url || s.url) + ')'")"
    ;;
  401)
    echo "::error::NETLIFY_AUTH_TOKEN was rejected (invalid or expired). Create a new personal access token in Netlify."
    exit 1
    ;;
  404)
    echo "::error::No site with ID '${NETLIFY_SITE_ID:0:8}…' is visible to this token. Use the Project ID from Netlify (Project configuration → General → Project details), and make sure the token belongs to the account/team that owns the site."
    exit 1
    ;;
  *)
    echo "::error::Unexpected response ${status} from the Netlify API."
    exit 1
    ;;
esac
