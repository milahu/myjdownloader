#!/usr/bin/env bash

dirs=(
  my.jdownloader.org
)

# https://askubuntu.com/questions/35922
find "${dirs[@]}" -depth -name "*%20*" -exec sh -c '
  set -eu
  # TODO more?
  b="${1//%20/ }"
  n1="$(basename "$1")"
  n2="$(basename "$b")"
  git mv "$1" "$b"
  git commit -m "mv ${n1@Q} ${n2@Q}"
' _ {} \;
