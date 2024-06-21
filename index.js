import 'dotenv/config';

import path, { dirname } from 'path';

import { connectToDb } from './db/helpers.js';
import errorHandler from './middleware/errorHandling.js';
import express from 'express';
import { fileURLToPath } from 'url';
import { port } from './config/environment.js';
import shirtRouter from './controllers/shirt.js';
import authRouter from './controllers/auth.js';
import wishlistRouter from './controllers/wishlist.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/shirts', shirtRouter);
app.use('/api/wishlist', wishlistRouter);
app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', function (_req, res) {
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
