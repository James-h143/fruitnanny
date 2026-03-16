![main](public/project/img/fn2.jpg)

# Overview

## From james-h143

This fork is not intended to be a complete replacement of the original repo. I have an incomplete fruitnanny i built several years ago for my niece and nephew which never made it to deployment.

With the birth of my son last month i decided to get it out of the drawer only to find that the original fruitnanny repo seems to be abandoned. I guess ivadim's kid(s) grew out of the need of a baby monitor.

while that software would probably have worked if i hadn't flashed the memory card with a newer version of raspberry pi os, it seems to have been completely broken on trixie. i decided to update fruitnanny rather than settle on rolling a very old version of debian.

I am a Test Engineer by trade and don't have a huge amount of UI or streaming experience so i have been and will continue to make heavy use of claude code.

As of writing it isn't perfect but all of the basic functionality has been restored (with the exception of the IR light switch, i hardwired mine on so don't know if this is working or not). Video, audio, temp and humidity are all making it to the frontend. I went a completely different direction with hls as this uses TCP by default. ivadims implementation used WebRTC for video and Opus for audio; where this uses UDP, ssh tunnelling (which is something i planned on doing) would have been very tricky.

I will be keeping track of any issues here on github, feel free to pick one up and create a PR if you want to contribute

##

**Fruitnanny** is a code name for a DIY _geek_ baby monitor.
It uses RaspberryPi, a NoIR camera module, infrared lights, temperature and humidity sensors, and a custom Web UI.
Chrome and Firefox with native WebRTC are used as clients.
Right now it means support of all major platforms like Windows, Linux, Android, MacOS and iOS.

This repository contains NodeJS application and configurations files.

For more information: https://ivadim.github.io/2017-08-21-fruitnanny/

![video](public/project/img/video-mobile.gif)

# How to setup

Follow [installation instruction](INSTALLATION.md)

# Tested platforms (docker-based installation)

- Windows 10 (64 bit)
  - Chrome 77.0.3865.120 👍
  - Firefox 70.0 👍
- macOS 10.14.6
  - Safari 13.0.2 👍
  - Chrome 78.0.3904.70 👍
  - Firefox 70.0 👍
- Linux (64 bit, Debian testing)
  - Chrome 78.0.3904.70 👍
  - Chromium 76.0.3809.100 (latest in Debian repo) 👎 (Reports a failure to negotiate STP, I think it doesn't have the correct codecs)
  - Firefox 60.8.0esr (latest in Debian repo) 👎
  - Firefox 70.0 (downloaded from Mozilla) 👍
- Android
  - Chrome 78.0.3904.62 👍
  - Firefox (latest stable) 👎
- iOS (13.1, Xcode emulator)
  - Safari 👍

# Configuration

Modify [fruitnanny_config](./fruitnanny_config.js) to configure the baby monitor.

Params:

- `baby_name` - baby's name to display in UI
- `baby_birthday` - baby's birthday
- `temp_unit` - temperature to display in Celsius (`C`) or Fahrenheit(`F`)

> Restart the system after change

To update baby's picture you need to replace file `public\project\img\baby.png`.

# How to build and run locally

- Install nodejs
- Run `npm install`
- Run `npm run grunt`
