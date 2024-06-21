import 'dotenv/config';


import { connectToDb } from './db/helpers.js';
import errorHandler from './middleware/errorHandling.js';
import express from 'express';
import shirtRouter from '../../controllers/shirt.js';
import authRouter from '../../controllers/auth.js';
import wishlistRouter from '../../controllers/wishlist.js';

import cors from 'cors'
import serverless from "serverless-http"


const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/shirts', shirtRouter);
app.use('/api/wishlist', wishlistRouter);
app.use(errorHandler);


async function startServer() {
  try {
    await connectToDb();
    console.log('Database connected.');
  } catch (err) {
    console.log('Failed to connect to database.');
    console.log(err);
  }
}

startServer();

export const handler = serverless(app)