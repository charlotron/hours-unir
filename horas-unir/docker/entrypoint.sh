#!/bin/sh

xvfb-run --server-args="-screen 0 1920x1200x24" node src/index.js
