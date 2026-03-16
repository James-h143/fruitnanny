"use strict";

import express = require("express");
import * as cp from "child_process";
let router = express.Router();

router.get("/current", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.log("On");
    // let temp = Math.random() * (30 - 10) + 10;
    // let hum = Math.random() * 100;
    // let result = { humidity: hum, temperature: temp };
    // res.json(result);

    cp.exec("python3 bin/dht22.py", (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ error: "sensor read failed" });
        }
        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: "invalid sensor output" });
        }
    });
});

export default router;
