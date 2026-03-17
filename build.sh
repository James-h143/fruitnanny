#!/bin/bash
set -e

KEYRING_SRC="/usr/share/keyrings/raspberrypi-archive-keyring.pgp"
KEYRING_DEST="docker/gstreamer/raspberrypi-archive-keyring.pgp"

if [ ! -f "$KEYRING_DEST" ]; then
    if [ ! -f "$KEYRING_SRC" ]; then
        echo "Error: $KEYRING_SRC not found." >&2
        echo "This file is required to add the Raspberry Pi apt repo during the Docker build." >&2
        echo "Run this script on a Raspberry Pi with Raspberry Pi OS." >&2
        exit 1
    fi
    echo "Copying Raspberry Pi archive keyring..."
    cp "$KEYRING_SRC" "$KEYRING_DEST"
fi

docker compose build "$@"
