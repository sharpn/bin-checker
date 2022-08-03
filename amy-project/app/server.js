"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = require("body-parser");
const load_controllers_1 = require("./lib/load-controllers");
const path_1 = require("path");
require('express-async-errors');
const PORT = parseInt(process.env.PORT, 10) || 8001;
const app = express();
app.use(body_parser_1.json());
load_controllers_1.loadControllers(app, path_1.join(__dirname, 'controllers'));
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        code: err.errorCode,
        message: err.message,
    });
});
app.listen(PORT, () => {
    console.log(`API is running on ${PORT}`);
});
//# sourceMappingURL=server.js.map