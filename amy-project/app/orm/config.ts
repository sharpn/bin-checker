{
  const DB_URL_BASE = process.env['DB_URL_BASE'] || 'mysql://root:@127.0.0.1';
  const DB_NAME = process.env['DB_NAME'] || 'testing';
  const DB_URL = process.env['DB_URL'] || `${DB_URL_BASE}/${DB_NAME}`;
  process.env['DB_URL'] = DB_URL;
}

export const use_env_variable = 'DB_URL';
export const logging = require('debug')('orm:sql');

export const define = {
  timestamps: true,
};

export const dialectOptions = {
  charset: 'utf8mb4',
};
