#!/usr/bin/env bash

dirs=(
  my.jdownloader.org
)

for d in "${dirs[@]}"; do
  find "$d" -name '*\?*' | while IFS= read -r path; do
    path2=$(echo "$path" | sed 's/\?.*//')
    if ! [ -e "$path2" ]; then
      echo "> mv ${path@Q} ${path2@Q}"
      git mv "$path" "$path2"
      git commit -m "mv $(basename "$path") $(basename "$path2")"
    else
      echo "> rm ${path@Q}"
      git rm "$path"
      git commit -m "rm $(basename "$path")"
    fi
  done
done
