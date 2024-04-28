import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { IEntity } from '../types';
import { useParams } from 'react-router-dom';

interface Props {
  name1: string;
  name2: string;
  max: number;
}

interface ReturnUsePigGame {
  game: IEntity.Game.Main;
  methods: {
    roll(): void;
    hold(): void;
    reset(): void;
  };
}

export function usePigGame(): ReturnUsePigGame {
  const { gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/games/pig/${gameId}`);
        const result = await response.json();
        console.log(result.data.game);
        setGame(result.data.game as IEntity.Game.Main);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [game, setGame] = useState<IEntity.Game.Main>();

  const roll = () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    game.dice = dice;

    const players: Record<string, keyof Pick<IEntity.Game.Main, 'player1' | 'player2'>> = {
      [game.player1.id]: 'player1',
      [game.player2.id]: 'player2'
    };

    const currentKEY = players[game.currentPlayerId];
    const currentPlayer = game[currentKEY];

    if (dice === 1) {
      game.currentPlayerId = currentKEY === 'player1' ? game.player2.id : game.player1.id;
      currentPlayer.currentScore = 0;
    } else currentPlayer.currentScore += dice;

    setGame({ ...game });
  };

  const hold = () => {
    const players: Record<string, keyof Pick<IEntity.Game.Main, 'player1' | 'player2'>> = {
      [game.player1.id]: 'player1',
      [game.player2.id]: 'player2'
    };

    const currentKEY = players[game.currentPlayerId];
    const currentPlayer = game[currentKEY];

    currentPlayer.totalScore += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;

    if (currentPlayer.totalScore >= game.max) {
      game.winner = currentPlayer.name;
    } else {
      game.currentPlayerId = currentKEY === 'player1' ? game.player2.id : game.player1.id;
    }

    setGame({ ...game });
  };

  const reset = () => {
    const newGame: IEntity.Game.Main = {
      ...game,
      player1: { ...game.player1, currentScore: 0, totalScore: 0 },
      player2: { ...game.player2, currentScore: 0, totalScore: 0 },
      winner: null,
      dice: 0,
      currentPlayerId: game.player1.id
    };

    setGame(newGame);
  };

  return { game, methods: { roll, hold, reset } };
}
