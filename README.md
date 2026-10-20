# AirGuard — Smart Air Quality Detection & Advisory System

## Run
1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` in Chrome/Edge.
3. The dashboard currently uses simulated sensor data so the UI works without hardware.

## Next step: real hardware
Replace the simulated values in `script.js` with data received from your ESP32. A practical architecture is:
Sensors → ESP32 → Wi-Fi/Bluetooth/API → Web Dashboard.

## Suggested future features
- Firebase or a simple backend database
- ESP32 API endpoint
- Login/admin panel
- Historical graphs
- Factory/location-wise monitoring
- Pollution-source detection rules
- AQI calculation based on calibrated sensor data
- Export reports
- warning system sends warning email to assigned contributer
