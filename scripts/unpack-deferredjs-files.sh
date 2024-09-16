#!/usr/bin/env bash

# based on unpack-cache-js-files.sh

set -eu
#set -x # debug

#tool=wakaru # broken?
tool=webcrack

#for f in my.jdownloader.org/myjdownloader/*.cache.js; do
for f in my.jdownloader.org/myjdownloader/deferredjs/*/*.cache.js; do

  echo "$f"

  #if ! head -c 1000 "$f" | grep -q -F "myjdownloader.onScriptDownloaded"; then
  if ! head -c 1000 "$f" | grep -q -F '$wnd.myjdownloader.runAsyncCallback'; then
    echo "not packed"
    continue
  fi

  yyy=${f##*/}
  yyy=${yyy%%.*}
  echo "  yyy: $yyy"

  unpacked="$f.unpacked.js"
  echo "  $unpacked"
  #if ! [ -e "$unpacked" ]; then
  if true; then
    node -e '
      const f = "./'"$f"'";
      const o = f + ".unpacked.js";
      const fs = require("fs");
      const $wnd = {};
      $wnd.myjdownloader = {};
      $wnd.myjdownloader.runAsyncCallback'$yyy' = (string) => fs.writeFileSync(o, string);
      require(f);
      console.log("done", o);
    '
  fi

  if [ "$tool" = "webcrack" ]; then
    # webcrack: pnpm dlx webcrack
    out_webcrack="$f.webcrack.js"
    echo "  $out_webcrack"
    if ! [ -e "$out_webcrack" ]; then
      webcrack "$unpacked" > "$out_webcrack"
    fi
    out_tool="$out_webcrack"
  elif [ "$tool" = "wakaru" ]; then
    # wakaru: pnpm dlx @wakaru/cli
    out_wakaru="$f.wakaru.js"
    if ! [ -e "$out_wakaru" ]; then
      wakaru -f unminify "$unpacked"
      mv out/"$(basename "$unpacked")" "$out_wakaru"
    fi
    out_tool="$out_wakaru"
  else
    echo "error: unknown tool ${tool@Q}"
    exit 1
  fi

  mv "$out_tool" "$f"

  rm "$unpacked"

done
