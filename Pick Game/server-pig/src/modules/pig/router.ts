import { Router } from 'express';
import { faker } from '@faker-js/faker';

import { generatePlayer, games, generateDice } from './db';
import { IEntity } from './types';
import * as Mappers from './mappers';

const router = Router();

// List
router.get('/', (req, res) => {
	const minGames = Object.values(games).map(Mappers.Mini);
	res.send({ data: minGames, message: null });
});

// Single
router.get('/:gameId', (req, res) => {
	const { gameId } = req.params;

	const game = games[gameId];
	if (!game)
		return res.status(404).send({ data: null, message: `Game not found with id: ${gameId} 🥺` });

	res.send({ data: { game }, message: null });
});

// Create
router.post('/', (req, res) => {
	const body = req.body as { player1: string; player2: string; max: number };
	const player1 = generatePlayer(body.player1);
	const player2 = generatePlayer(body.player2);

	const game: IEntity.Game.Main = {
		id: faker.string.uuid(),
		max: body.max,
		player1,
		player2,
		winner: null,
		currentPlayerId: player1.id,
	};

	games[game.id] = game;

	res.send({ data: { game }, message: 'Game successfully created 🥳' });
});

// Delete
router.delete('/:gameId', (req, res) => {
	const { gameId } = req.params;

	const game = games[gameId];
	if (!game)
		return res.status(404).send({ data: null, message: `Game not found with id: ${gameId} 🥺` });

	delete games[gameId];

	res.send({ data: { game }, message: 'Game successfully deleted' });
});

// Generate Dice
router.post('/dice/:gameId', (req, res) => {
	const { gameId } = req.params;
	const game = games[gameId];

	if (!game)
		return res.status(404).send({ data: null, message: `Game not found with id: ${gameId} 🥺` });

	if (game.winner)
		return res
			.status(400)
			.send({ data: { game }, message: `🥇Already winner(${game.winner}) exist of game` });
	const { playerId } = req.body as { playerId: string };

	if (game.currentPlayerId !== playerId)
		return res.status(400).send({ data: null, message: "It's not your turn now ❌" });

	const player = game.player1.id === playerId ? game.player1 : game.player2;

	const dice = generateDice();

	if (dice === 1) {
		game.player1.currentScore = 0;
		game.currentPlayerId = game.player2.id;

		return res.send({ data: { dice, game }, message: 'Bad luck 🤪' });
	}

	player.currentScore += dice;
	res.send({ data: { dice, game }, message: null });
});

// Hold current point
router.post('/hold/:gameId', (req, res) => {
	const { gameId } = req.params;
	const game = games[gameId];

	if (!game)
		return res.status(404).send({ data: null, message: `Game not found with id: ${gameId} 🥺` });

	if (game.winner)
		return res
			.status(400)
			.send({ data: { game }, message: `🥇Already winner(${game.winner}) exist of game` });

	const { playerId } = req.body as { playerId: string };

	if (game.currentPlayerId !== playerId)
		return res.status(400).send({ data: null, message: "It's not your turn now ❌" });

	const player = game.player1.id === playerId ? game.player1 : game.player2;

	player.totalScore += player.currentScore;
	player.currentScore = 0;

	if (player.totalScore >= game.max) {
		game.winner = player.name;
	} else {
		game.currentPlayerId = player.id === game.player1.id ? game.player2.id : game.player1.id;
	}

	res.send({ data: game, message: null });
});

// Reset game
router.get('/reset/:gameId', (req, res) => {
	const { gameId } = req.params;
	const game = games[gameId];
	if (!game)
		return res.status(404).send({ data: null, message: `Game not found with id: ${gameId} 🥺` });

	games[gameId] = {
		...game,
		player1: {
			...game.player1,
			currentScore: 0,
			totalScore: 0,
		},
		player2: {
			...game.player2,
			currentScore: 0,
			totalScore: 0,
		},
		winner: null,
		currentPlayerId: game.player1.id,
	};

	res.send({ data: { game: games[gameId] }, message: 'Game successfully restarted 🔁' });
});

export default router;
