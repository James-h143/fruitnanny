#!/bin/bash
rpicam-vid \
  --nopreview \
  --inline \
  -t 0 \
  --width 640 \
  --height 360 \
  --framerate 8 \
  --intra 8 \
  --hflip \
  --vflip \
  -o - | \
gst-launch-1.0 -v fdsrc ! \
  h264parse config-interval=-1 ! \
  hlssink2 max-files=10 target-duration=1 \
    location=/home/james/Development/fruitnanny/hls/segment%05d.ts \
    playlist-location=/home/james/Development/fruitnanny/hls/stream.m3u8
