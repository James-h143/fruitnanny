FROM vascoguita/raspios:arm64
RUN echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly gstreamer1.0-libcamera libcamera-ipa \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
COPY docker/gstreamer/audio_entry.sh /
COPY docker/gstreamer/audio_stream.sh /
