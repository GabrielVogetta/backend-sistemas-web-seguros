#!/bin/sh

node index.js &
INDEX_PID=$!

sleep 3

node test.js
TEST_EXIT_CODE=$?

wait $INDEX_PID