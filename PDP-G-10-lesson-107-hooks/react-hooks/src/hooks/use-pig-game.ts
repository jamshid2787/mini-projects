import { useState } from 'react';
import { faker } from '@faker-js/faker';

interface Props {
  name1: string;
  name2: string;
  max: number;
}

interface Player {
  id: string;
  name: string;
  currentScore: number;
  totalScore: number;
}

interface Game {
  id: string;
  player1: Player;
  player2: Player;
  max: number;
  currentPlayer: string;
  winner: string | null;
}

interface ReturnUsePigGame {
  game: Game;
  methods: {
    roll(): void;
    hold(): void;
    reset(): void;
  };
}

export function usePigGame({ name1, name2, max }: Props): ReturnUsePigGame {
  const player1: Player = { id: faker.string.uuid(), name: name1, currentScore: 0, totalScore: 0 };
  const player2: Player = { id: faker.string.uuid(), name: name2, currentScore: 0, totalScore: 0 };

  const [game, setGame] = useState<Game>({
    id: faker.string.uuid(),
    max,
    player1,
    player2,
    winner: null,
    currentPlayer: player1.id
  });

  const roll = (): void => {
    if (game.winner) return;

    const diceValue = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = game.currentPlayer === game.player1.id ? game.player1 : game.player2;

    if (diceValue === 1) {
      currentPlayer.currentScore = 0;
      switchPlayer();
    } else {
      currentPlayer.currentScore += diceValue;
    }
  };

  const hold = (): void => {
    if (game.winner) return;

    const currentPlayer = game.currentPlayer === game.player1.id ? game.player1 : game.player2;
    currentPlayer.totalScore += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;

    if (currentPlayer.totalScore >= game.max) {
      setGame({ ...game, winner: currentPlayer.name });
    } else {
      switchPlayer();
    }
  };

  const reset = (): void => {
    setGame({
      id: faker.string.uuid(),
      max,
      player1: { ...player1, currentScore: 0, totalScore: 0 },
      player2: { ...player2, currentScore: 0, totalScore: 0 },
      winner: null,
      currentPlayer: player1.id
    });
  };

  const switchPlayer = (): void => {
    setGame({
      ...game,
      currentPlayer: game.currentPlayer === game.player1.id ? game.player2.id : game.player1.id
    });
  };

  return { game, methods: { roll, hold, reset } };
}
