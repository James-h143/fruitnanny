![main](public/project/img/fn2.jpg)

# Overview

## From james-h143

This fork is not intended to be a complete replacement of the original repo. I have an incomplete fruitnanny i built several years ago for my niece and nephew which never made it to deployment.

With the birth of my son last month i decided to get it out of the drawer only to find that the original fruitnanny repo seems to be abandoned. I guess ivadim's kid(s) grew out of the need of a baby monitor.

while that software would probably have worked if i hadn't flashed the memory card with a newer version of raspberry pi os, it seems to have been completely broken on trixie. i decided to update fruitnanny rather than settle on rolling a very old version of debian.

I am a Test Engineer by trade and don't have a huge amount of UI or streaming experience so i have been and will continue to make heavy use of claude code.

As of writing it isn't perfect but all of the basic functionality has been restored (with the exception of the IR light switch, i hardwired mine on so don't know if this is working or not). Video, audio, temp and humidity are all making it to the frontend. I went a completely different direction with hls as this uses TCP by default. ivadims implementation used WebRTC for video and Opus for audio; where this uses UDP, ssh tunnelling (which is something i planned on doing) would have been very tricky.

I will be keeping track of any issues here on github, feel free to pick one up and create a PR if you want to contribute

## Setup (this fork)

Tested on Raspberry Pi 3B, aarch64, Debian Trixie, kernel 6.12. Video and audio stream via HLS rather than WebRTC — all pipelines run in Docker.

### Requirements

- Raspberry Pi 3B or later (64-bit OS)
- Raspberry Pi camera module
- USB audio device (microphone)
- DHT22 sensor on GPIO pin 24 (optional — temperature/humidity)

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clone the repository

```bash
git clone https://github.com/james-h143/fruitnanny ~/fruitnanny
cd ~/fruitnanny
```

### 3. Create the HLS output directory

```bash
mkdir hls
```

### 4. Generate SSL certificates

```bash
openssl req -x509 -sha256 -nodes -days 2650 -newkey rsa:2048 \
  -keyout configuration/ssl/fruitnanny.key \
  -out configuration/ssl/fruitnanny.pem
```

Set the Common Name to your Pi's hostname or IP address.

### 5. Set up basic auth

```bash
echo -n 'fruitnanny:' >> configuration/nginx/.htpasswd
openssl passwd -apr1 >> configuration/nginx/.htpasswd
```

### 6. Configure the monitor

Edit `fruitnanny_config.js`:

```js
baby_name: "Your baby's name",
baby_birthday: "YYYY-MM-DD",
temp_unit: "C"  // or "F"
```

### 7. Build the Docker images

The gstreamer image requires the Raspberry Pi apt repository, which uses a signing key that must be present on the host. `build.sh` handles this automatically:

```bash
chmod +x build.sh
./build.sh
```

This copies the keyring from `/usr/share/keyrings/raspberrypi-archive-keyring.pgp` (present on all Raspberry Pi OS installs) and runs `docker compose build`. It will exit with an error if the keyring is not found.

### 8. Start the application

```bash
docker compose up -d
```

### 9. Access the monitor

Navigate to `http://<pi-ip>/` in a browser. Use the credentials set in step 5.

### Troubleshooting

**Video not playing** — check the gstreamer-video container:
```bash
docker compose logs gstreamer-video
```

**Audio not playing** — check the gstreamer-audio container:
```bash
docker compose logs gstreamer-audio
```

**Containers not starting** — check all container states:
```bash
docker compose ps
```

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
