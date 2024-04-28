import { Link } from 'react-router-dom';
import '../.././style.scss';
import Board from '../../components/Board';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const calculateWinner = (squares: string[]): string | null => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const [a, b, c] of lines) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
};

const calculateDraw = (squares: string[]): boolean => {
	return squares.every((square) => square !== null);
};


const App: React.FC = (props) => {
	const {id} = useParams();

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/tic-tac-toe/${id}`
				);
				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}
				const gamesData = await response.json();
				setSquares(gamesData.data.board);
				setplay1(gamesData.data.player1);
				setplay2(gamesData.data.player2);
			} catch (error) {
				console.error('Error fetching games:', error);
			}
		};

		fetchGames();
	}, []);

	const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState<boolean>(true);
	const [play1, setplay1] = useState<string>('');
	const [play2, setplay2] = useState<string>('');

	const handleClick = async (i: number) => {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		const newSquares = squares.slice();
		newSquares[i] = xIsNext ? 'X' : 'O';

		setSquares(newSquares);
		setXIsNext(!xIsNext);

		const player = xIsNext ? 'X' : 'O';

		const data = { moveIdx: i, cell: player };
		console.log(data);

		try {
			const response = await fetch(
				`http://localhost:4000/api/tic-tac-toe/move/${id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				const data1 = await response.json();
				console.log(data1);

				console.log('Game created successfully');
			} else {
				console.error('Failed to create game');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	const handleReset = async () => {
		setSquares(Array(9).fill(null));
		setXIsNext(true);

		for (let i = 0; i < 9; i++) {
			const data = { moveIdx: i, cell: null };
			console.log(data);

			try {
				const response = await fetch(
					`http://localhost:4000/api/tic-tac-toe/move/${id}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					}
				);

				if (response.ok) {
					const data1 = await response.json();
					console.log(data1);

					console.log('Game created successfully');
				} else {
					console.error('Failed to create game');
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		}
	};

	const winner = calculateWinner(squares);
	const isDraw = calculateDraw(squares);

	let status;
	if (winner) {
		status = `Winner: ${winner === 'X' ? play1 : play2}`;
	} else if (isDraw) {
		status = 'Draw!';
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}

	return (
		<div className="game">
			<h3>{play1}[X]</h3>
			<h3>{play2}[O]</h3>
			<div className="game-board">
				<Board squares={squares} onClick={handleClick} />
			</div>
			<div className="game-info">
				<div className="status-info">{status}</div>
				<button className="reset-button btn btn-primary" onClick={handleReset}>
					Reset Game
				</button>
				<button className="btn btn-danger">
					<Link style={{ color: 'white' }} to={'/games'}>
						Game List
					</Link>
				</button>
			</div>
		</div>
	);
};

export default App;
