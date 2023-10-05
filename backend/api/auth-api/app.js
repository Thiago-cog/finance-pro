import express from 'express';
import authUser from './routes/authUser';

const app = express();

app.use('user/', authUser);