#!/usr/bin/env bash

sed -i 's|href="/|href="./|; s|src="/|src="./|' "$@"
