#!/bin/bash

find . -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.tsx"' {} \;