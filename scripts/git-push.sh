#!/usr/bin/env bash

set -x

# clearnet remotes
for r in $(git remote show | grep -v '\.onion$'); do
  git push $r "$@"
done

# darknet remotes
for r in $(git remote show | grep '\.onion$'); do
  git push $r "$@"
done
