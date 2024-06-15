import 'dotenv/config';

import path, { dirname } from 'path';

import { connectToDb } from './db/helpers.js';
import errorHandler from './middleware/errorHandling.js';
import express from 'express';
import { fileURLToPath } from 'url';
// import logger from './middleware/logger.js';
import { port } from './config/environment.js';
import shirtRouter from './controllers/shirt.js';
import authRouter from './controllers/auth.js';

const app = express();

app.use(express.json());
// app.use('/', logger);
app.use('/auth', authRouter)
app.use('/shirts', shirtRouter);
// app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));

});

async function startServer() {
  try {
    await connectToDb();
    console.log('Database connected.');
    app.listen(port, () => console.log(`Listening on Port: ${port}`));
  } catch (err) {
    console.log('Failed to connect to database.');
    console.log(err);
  }
}

startServer();
