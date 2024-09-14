#!/usr/bin/env bash

set -eux

for url in "$@"; do
  # todo: also remove port
  path=$(echo "$url" | sed -E 's|^https?://||')
  mkdir -p "$(dirname "$path")"
  curl -L -o "$path" "$url"
done
