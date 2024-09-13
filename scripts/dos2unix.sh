#!/usr/bin/env bash

dirs=(
  my.jdownloader.org
)

find "${dirs[@]}" -type f -print0 | xargs -0 dos2unix
