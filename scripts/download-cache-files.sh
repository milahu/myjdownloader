#!/usr/bin/env bash

mkdir -p my.jdownloader.org/myjdownloader

grep -o -E '"[0-9A-F]{32}"' my.jdownloader.org/myjdownloader/myjdownloader.nocache.js |
sort -u |
tr -d '"' |
while read hash; do

  out="my.jdownloader.org/myjdownloader/$hash.cache.js"
  [ -e "$out" ] && continue

  echo "writing $out"
  url="https://$out"
  curl -s -L -o "$out" "$url"

done
