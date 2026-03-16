"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cp = require("child_process");
let router = express.Router();
router.get("/current", (req, res, next) => {
    cp.exec("python3 bin/dht22.py", (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ error: "sensor read failed" });
        }
        try {
            const result = JSON.parse(stdout);
            res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "invalid sensor output" });
        }
    });
});
exports.default = router;
