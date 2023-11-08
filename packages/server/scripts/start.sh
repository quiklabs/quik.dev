#!/usr/bin/env bash

echo "#############################################"
echo "                 _  __          __           "
echo "  ____ _ __  __ (_)/ /__   ____/ /___  _   __"
echo " / __ \`// / / // // //_/  / __  // _ \| | / /"
echo "/ /_/ // /_/ // // ,<  _ / /_/ //  __/| |/ / "
echo "\__, / \__,_//_//_/|_|(_)\__,_/ \___/ |___/  "
echo "  /_/                                        "
echo "                                             "
echo "#############################################"

(
  trap 'kill 0' SIGINT;

  pnpm run build &&

  pnpm run build:watch &
  CI=true node --watch dist/index.js | pnpm pino-pretty
)
