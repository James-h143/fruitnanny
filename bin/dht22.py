import adafruit_dht
import board
import sys
import json
import time

pin = board.D24
MAX_RETRIES = 5

dht = adafruit_dht.DHT22(pin)
last_error = None

for attempt in range(MAX_RETRIES):
    try:
        temperature = dht.temperature
        humidity = dht.humidity
        dht.exit()
        print(json.dumps({"temperature": temperature, "humidity": humidity}))
        sys.exit(0)
    except RuntimeError as e:
        last_error = str(e)
        time.sleep(2)

dht.exit()
print(json.dumps({"error": last_error}), file=sys.stderr)
sys.exit(1)
