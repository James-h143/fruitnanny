FROM node:18-bookworm-slim

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    dos2unix \
    libgpiod2 \
    python3-libgpiod \
    python3-rpi.gpio \
    && pip3 install adafruit-circuitpython-dht --break-system-packages \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ADD . /opt/fruitnanny
WORKDIR /opt/fruitnanny
RUN dos2unix /opt/fruitnanny/bin/*
RUN npm install
CMD ["node", "server/app.js"]
EXPOSE 7000