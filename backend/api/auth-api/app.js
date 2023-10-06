import express from 'express';
import authUser from './routes/authUser.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use('user/', authUser);

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
});