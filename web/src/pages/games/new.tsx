import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NewProps {}

const New = (props: NewProps) => {
	const [player1, setPlayer1] = useState('');
	const [player2, setPlayer2] = useState('');
	// const [gameData, setGameData] = useState<any>(null);
	const [gameId, setGameId] = useState('');

	const handlePlayer1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayer1(event.target.value);
	};

	const handlePlayer2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayer2(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = { player1, player2 };

		try {
			const response = await fetch('http://localhost:4000/api/tic-tac-toe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const data = await response.json();
				setGameId(data.data.id);
				console.log('Game created successfully');
			} else {
				console.error('Failed to create game');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	return (
		<div className="new-game">
			<h1 style={{ paddingBottom: '50px' }}>Tic-Tac-Toe Create Game</h1>
			<form className="forma-new" onSubmit={handleSubmit}>
				<div>
					<label>
						Player 1:
						<input autoFocus required type="text" value={player1} onChange={handlePlayer1Change} />
					</label>
				</div>
				<div>
					<label>
						Player 2:
						<input required type="text" value={player2} onChange={handlePlayer2Change} />
					</label>
				</div>
				<button className="btn btn-primary" type="submit">
					<Link style={{ color: 'white' }} to={`/games/${gameId}`}>
						Submit
					</Link>
				</button>
			</form>
		</div>
	);
};

export default New;
