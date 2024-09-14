#!/usr/bin/env bash

set -x

cat todo-missing-images.txt | while read url; do

  path=my.jdownloader.org/$(echo "$url" | sed '
    s|http://0.0.0.0:8000/my.jdownloader.org/||;
    s|http://0.0.0.0:8000/||;
    s|https://my.jdownloader.org/||;
  ')

  mkdir -p "$(dirname "$path")"

  # create empty file
  touch "$path"

done
