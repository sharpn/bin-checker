"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config = require("./config");
exports.sequelize = new sequelize_1.Sequelize(process.env[config.use_env_variable], config);
exports.default = exports.sequelize;
//# sourceMappingURL=connection.js.map