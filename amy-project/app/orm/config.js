"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialectOptions = exports.define = exports.logging = exports.use_env_variable = void 0;
{
    const DB_URL_BASE = process.env['DB_URL_BASE'] || 'mysql://root:@127.0.0.1';
    const DB_NAME = process.env['DB_NAME'] || 'testing';
    const DB_URL = process.env['DB_URL'] || `${DB_URL_BASE}/${DB_NAME}`;
    process.env['DB_URL'] = DB_URL;
}
exports.use_env_variable = 'DB_URL';
exports.logging = require('debug')('orm:sql');
exports.define = {
    timestamps: true,
};
exports.dialectOptions = {
    charset: 'utf8mb4',
};
//# sourceMappingURL=config.js.map