#!/usr/bin/env bash

set -x

git remote add github.com https://github.com/milahu/myjdownloader
git remote add darktea.onion http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/myjdownloader
git remote add righttoprivacy.onion http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/myjdownloader

for r in $(git remote show | grep '\.onion$'); do
  git config --add remote.$r.proxy socks5h://127.0.0.1:9050
done
