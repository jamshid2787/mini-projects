import React, { useState } from 'react';

type Player = {
	id: number;
	name: string;
	score: number;
};

const PigGame = () => {
	const [players, setPlayers] = useState<Player[]>([
		{ id: 1, name: 'Player 1', score: 0 },
		{ id: 2, name: 'Player 2', score: 0 },
	]);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);

	const rollDice = () => {
		if (isGameOver) return;

		const diceValue = Math.floor(Math.random() * 6) + 1;

		if (diceValue === 1) {
			switchPlayer();
		} else {
			setCurrentScore(currentScore + diceValue);
		}
	};

	const hold = () => {
		if (isGameOver) return;

		const updatedPlayers = players.map((player, index) => {
			if (index === currentPlayerIndex) {
				return { ...player, score: player.score + currentScore };
			}
			return player;
		});

		setPlayers(updatedPlayers);
		setCurrentScore(0);
		switchPlayer();
	};

	const switchPlayer = () => {
		setCurrentScore(0);
		setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
	};

	const resetGame = () => {
		setPlayers([
			{ id: 1, name: 'Player 1', score: 0 },
			{ id: 2, name: 'Player 2', score: 0 },
		]);
		setCurrentPlayerIndex(0);
		setCurrentScore(0);
		setIsGameOver(false);
	};

	const currentPlayer = players[currentPlayerIndex];

	const winner = players.find((player) => player.score >= 100);

	if (winner && !isGameOver) {
		setIsGameOver(true);
	}

	return (
		<div className="pig-game-container">
			<h1>Pig Game</h1>
			<div className="players">
				{players.map((player) => (
					<div
						key={player.id}
						className={`player ${player.name === currentPlayer.name ? 'active' : ''} ${
							player.name === winner?.name ? ' win' : ''
						}`}
					>
						<p>{player.name}</p>
						<p>{player.score}</p>
					</div>
				))}
			</div>
			<div className="game-info">
				<p>Current Player: {currentPlayer.name}</p>
				<button disabled className="btn btn-primary p-3">
					Current Score: {currentScore}
				</button>
				{!isGameOver && (
					<div className="game-buttons">
						<button className="btn btn-primary" onClick={rollDice}>
							Roll Dice
						</button>
						<button className="btn btn-primary" onClick={hold}>
							Hold
						</button>
					</div>
				)}
				{isGameOver && (
					<div className="game-over">
						<button className="btn btn-primary" onClick={resetGame}>
							New Game
						</button>
					</div>
				)}
				<button className="btn btn-primary" onClick={resetGame}>
					Restart Game
				</button>
			</div>
		</div>
	);
};

export default PigGame;
