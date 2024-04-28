import express from 'express';
import routes from './routes';
import config from './config';

const app = express();

routes(app);
config(app); 
