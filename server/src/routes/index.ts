import { Express, json } from 'express';
import cors from 'cors';

import { default as ticTacToe } from './tic-tac-toe';

export default function (app: Express) {
	app.use(cors());
	app.use(json());
	app.use('/api/tic-tac-toe', ticTacToe);
}
