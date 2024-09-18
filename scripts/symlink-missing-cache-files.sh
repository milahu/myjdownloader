#!/usr/bin/env bash

hash_safari_en=03C7784751705025CE36734D3ED3154C
hash_safari_de=00A266A30C07964133E184F334EB9319
#hash_safari_default=1528997EB67ACD7FB817F56514B7B6BC

function expand_var() {
  local name="$1"
  cat my.jdownloader.org/myjdownloader/myjdownloader.nocache.js |
  grep -m1 -E " var $name = \".*\";" |
  sed -E "s/^ * var $name = \"(.*)\";$/\1/"
}

cat my.jdownloader.org/myjdownloader/myjdownloader.nocache.js |
grep -E '^      m\(\[([a-zA-Z0-9$_]+), ([a-zA-Z0-9$_]+)\], ([a-zA-Z0-9$_]+)\);$' |
sed -E "s/^      m\(\[([a-zA-Z0-9$_]+), ([a-zA-Z0-9\$_]+)\], ([a-zA-Z0-9$_]+)\);\$/locale='\1' browser='\2' hash='\3'/" |
while read mapping_vars; do

  eval "$mapping_vars"

  locale="$(expand_var "$locale")"
  browser="$(expand_var "$browser")"
  hash="$(expand_var "$hash")"

  if [ "$browser" = "safari" ] && [ "$locale" != "default" ]; then
    continue
  fi

  echo

  echo "locale: $locale"
  echo "browser: $browser"
  echo "hash: $hash"

  if [ "$locale" = "de" ]; then
    hash2="$hash_safari_de"
  else
    hash2="$hash_safari_en"
  fi

  main="my.jdownloader.org/myjdownloader/$hash.cache.js"
  deferred="my.jdownloader.org/myjdownloader/deferredjs/$hash"

  main2="my.jdownloader.org/myjdownloader/$hash2.cache.js"
  deferred2="my.jdownloader.org/myjdownloader/deferredjs/$hash2"

  if ! [ -e "$main" ]; then
    ln -srv "$main2" "$main"
  fi

  if ! [ -e "$deferred" ]; then
    ln -srv "$deferred2" "$deferred"
  fi

done
