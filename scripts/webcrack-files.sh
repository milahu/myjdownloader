#!/usr/bin/env bash

if [ $# = 0 ]; then
  echo "error: no files"
  echo "example use:"
  echo "  ./scripts/webcrack-files.sh my.jdownloader.org/src/login.min.js\?v6 my.jdownloader.org/myjdownloader/*.cache.js"
  exit 1
fi

for f in "$@"; do
  echo "> webcrack ${f@Q}"
  o="$(webcrack "$f")" && {
    echo "$o" > "$f"
  }
done
