#!/bin/bash
gst-launch-1.0 -v alsasrc device=hw:1 ! \
  audioconvert ! audioresample ! \
  lamemp3enc ! mpegaudioparse ! \
  hlssink2 max-files=10 target-duration=1 \
    location=/home/james/Development/fruitnanny/hls/audio-segment%05d.ts \
    playlist-location=/home/james/Development/fruitnanny/hls/audio.m3u8
