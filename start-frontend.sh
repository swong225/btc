#!/bin/sh

PORT="${PORT:=3000}"

serve -s btc-frontend/build -l $PORT