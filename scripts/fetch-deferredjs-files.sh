#!/usr/bin/env bash

# myjdownloader/deferredjs/xxx/yyy.cache.js
# files are loaded from myjdownloader/xxx.cache.js

for cache_js_file in my.jdownloader.org/myjdownloader/*.cache.js; do

  xxx=${cache_js_file##*/}
  xxx=${xxx%%.*}

  echo "xxx $xxx"

  mkdir -p my.jdownloader.org/myjdownloader/deferredjs/$xxx

  pushd my.jdownloader.org/myjdownloader/deferredjs/$xxx

  # real-world files have yyy values from 1 to 12
  # brute-force yyy values from 0 to 100
  # TODO dont save not-found pages with status 404
  curl -L -O "my.jdownloader.org/myjdownloader/deferredjs/$xxx/[0-100].cache.js"

  popd

done

# workaround: remove not-found pages with status 404
find my.jdownloader.org/myjdownloader/deferredjs/ -size 153c |
xargs md5sum | grep ^359200ef8ee49c2db0375022a904e43c | cut -c35- | xargs rm
