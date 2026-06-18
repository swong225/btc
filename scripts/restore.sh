#!/bin/bash
# Restores the latest Postgres dump from S3 into the running container, if one exists.
# Safe to run on a fresh instance: if no backup exists, it does nothing and the
# backend's Sequelize sync() will create empty tables on first boot.
set -uo pipefail

BUCKET="${BTC_BUCKET:-btc-deploy-probe-601296380362}"
COMPOSE="${BTC_COMPOSE:-/opt/btc/docker-compose.prod.yml}"
PGUSER="${POSTGRES_USER:-user}"
PGDB="${POSTGRES_DB:-db}"

if aws s3 ls "s3://${BUCKET}/backups/latest.sql.gz" >/dev/null 2>&1; then
  echo "[$(date -u)] found backup, restoring..."
  aws s3 cp "s3://${BUCKET}/backups/latest.sql.gz" /tmp/latest.sql.gz
  gunzip -c /tmp/latest.sql.gz | docker compose -f "$COMPOSE" exec -T postgres \
    psql -v ON_ERROR_STOP=0 -U "$PGUSER" -d "$PGDB"
  rm -f /tmp/latest.sql.gz
  echo "[$(date -u)] restore complete"
else
  echo "[$(date -u)] no backup found in s3://${BUCKET}/backups/ - starting with a fresh database"
fi
