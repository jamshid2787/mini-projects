import { Router } from 'express';
import { faker } from '@faker-js/faker';

import { IEntity } from 'modules/tic-tac-toe/types';
import { games } from 'modules/tic-tac-toe/constants';
import { checkWinner } from 'modules/tic-tac-toe/utils';

const router = Router();

router.post('/', (req, res) => {
	const data = req.body as Pick<IEntity.Game, 'player1' | 'player2'>; // { player1: string, player: string }
	const gameId = faker.string.uuid();

	const game: IEntity.Game = {
		id: gameId,
		nextPlayer: 'X',
		board: new Array(9).fill(null),
		winner: '',
		...data,
	};

	games[gameId] = game;

	res.send({ data: game, message: 'Game successfully created! Are you ready ?', success: false });
});

router.get('/', (req, res) => {
	const list = Object.values(games);

	res.send({ data: list, message: null, success: true });
});

router.get(`/:gameId`, (req, res) => {
	const { gameId } = req.params;
	const game = games[gameId];

	if (!game)
		return res
			.status(404)
			.send({ data: null, message: `Game not found with id = ${gameId}`, success: false });

	res.send({ data: game, message: null, success: true });
});

router.post('/move/:gameId', (req, res) => {
	const { gameId } = req.params;
	const game = games[gameId];

	if (!game)
		return res
			.status(404)
			.send({ data: null, message: `Game not found with id = ${gameId}`, success: false });

	const { moveIdx, cell } = req.body as { moveIdx: number; cell: IEntity.Player };
	game.board[moveIdx] = cell;
	game.nextPlayer = cell === 'X' ? 'O' : 'X';
	game.winner = checkWinner(game.board);

	res.send({ data: game, message: null, success: true });
});

export default router;
