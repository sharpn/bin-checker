import * as express from 'express';
import { json } from 'body-parser';
import { loadControllers } from './lib/load-controllers';
import { join } from 'path';
import { BaseError } from './lib/errors/base-error';

require('express-async-errors');

const PORT = parseInt(process.env.PORT, 10) || 8001;

const app = express();

app.use(json());

loadControllers(app, join(__dirname, 'controllers'));

app.use(
  (
    err: BaseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      code: err.errorCode,
      message: err.message,
    });
  },
);

app.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
