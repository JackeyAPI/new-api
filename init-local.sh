#!/bin/sh
set -eu
cd "$(dirname "$0")"
if [ -f .env ]; then
  echo '.env already exists; preserved.'
  exit 0
fi
umask 077
{
  printf 'POSTGRES_PASSWORD=%s\n' "$(openssl rand -hex 24)"
  printf 'REDIS_PASSWORD=%s\n' "$(openssl rand -hex 24)"
  printf 'SESSION_SECRET=%s\n' "$(openssl rand -hex 32)"
} > .env
echo 'Created local .env; do not commit it.'
