#!/usr/bin/env bash

# myjdownloader.onScriptDownloaded is
# "function m(c)" in my.jdownloader.org/myjdownloader/myjdownloader.nocache.js
# which joins the strings in the c array
# and adds them to a new <script> tag in the html document

set -eux

# wakaru gives better result than webcrack
# but error: Uncaught TypeError: fIb[a] is not a constructor
# function jIb(a) {
#   return new fIb[a]();
# }
#tool=wakaru # broken?
tool=webcrack

do_repack=false

for f in my.jdownloader.org/myjdownloader/*.cache.js; do

  echo "$f"

  if ! head -c 1000 "$f" | grep -q -F "myjdownloader.onScriptDownloaded"; then
    echo "not packed"
    continue
  fi

  unpacked="$f.unpacked.js"
  echo "  $unpacked"
  #if ! [ -e "$unpacked" ]; then
  if true; then
    node -e '
      const f = "./'"$f"'";
      const o = f + ".unpacked.js";
      const fs = require("fs");
      const myjdownloader = {
        //onScriptDownloaded: (strings) => fs.writeFileSync(o, strings.join("")),
        onScriptDownloaded: (strings) => fs.writeFileSync(o, strings.map((s, i) => `\n// code block ${i}\n` + s + "\n\n\n").join("")),
        // wrap each string into a code block "{ ... }"
        // to emulate loading each string into a separate <script> element
        // the xxx.cache.js files are loaded by my.jdownloader.org/myjdownloader/myjdownloader.nocache.js
        //onScriptDownloaded: (strings) => fs.writeFileSync(o, strings.map((s, i) => `\n// code block ${i}\n{\n` + s + "\n}\n\n\n").join("")),
      };
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

  if ! $do_repack; then

    # dont repack code
    mv "$out_tool" "$f"

  else

  # repack code to myjdownloader.onScriptDownloaded(["CODE"])
  node -e '
    const f = "./'"$out_tool"'";
    const o = "./'"$f"'";
    const fs = require("fs");

    function escapeTemplateString(str) {
      return (
        str
        // Escape backslashes first so we dont double escape other characters
        .replace(/\\/g, "\\\\")
        // Escape unescaped backticks by checking for optional leading backslash
        .replace(/\\?`/g, function(match) {
            return match === "`" ? "\\`" : match;
        })
        // Escape unescaped ${} expressions similarly
        .replace(/\\?\$\{/g, function(match) {
            return match === "${" ? "\\${" : match;
        })
      );
    }

    const code = (
      "myjdownloader.onScriptDownloaded([" +
      "\n" +
      //JSON.stringify(fs.readFileSync(f, "utf8")) +
      //fs.readFileSync(f, "utf8").split("\n").map(L => JSON.stringify(L + "\n")).join(",\n") +
      "`" + escapeTemplateString(fs.readFileSync(f, "utf8")) + "`" +
      "\n" +
      "])"
    );
    fs.writeFileSync(o, code);
    console.log("done", o);
  '

  fi

done
