#!/bin/bash
# Dumps the Postgres database from the running container and uploads to S3.
# Keeps a timestamped copy plus a rolling "latest.sql.gz" used for restore-on-launch.
set -euo pipefail

BUCKET="${BTC_BUCKET:-btc-deploy-probe-601296380362}"
COMPOSE="${BTC_COMPOSE:-/opt/btc/docker-compose.prod.yml}"
PGUSER="${POSTGRES_USER:-user}"
PGDB="${POSTGRES_DB:-db}"

TS=$(date -u +%Y%m%dT%H%M%SZ)
TMP="/tmp/btc-db-${TS}.sql.gz"

echo "[$(date -u)] starting pg_dump"
docker compose -f "$COMPOSE" exec -T postgres \
  pg_dump --clean --if-exists -U "$PGUSER" -d "$PGDB" | gzip > "$TMP"

aws s3 cp "$TMP" "s3://${BUCKET}/backups/btc-db-${TS}.sql.gz"
aws s3 cp "$TMP" "s3://${BUCKET}/backups/latest.sql.gz"
rm -f "$TMP"

echo "[$(date -u)] backup complete: btc-db-${TS}.sql.gz"
