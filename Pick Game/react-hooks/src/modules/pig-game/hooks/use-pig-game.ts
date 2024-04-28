import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { IEntity } from '../types';
import { Api, Types } from '..';
import { useParams } from 'react-router-dom';

// interface Props {
//   name1: string;
//   name2: string;
//   max: number;
// }

interface ReturnUsePigGame {
  game: IEntity.Game.Main;
  methods: {
    roll(): void;
    hold(): void;
    reset(): void;
  };
}

export function usePigGame(): ReturnUsePigGame {
  const { gameId: id } = useParams();

  const [game, setGame] = useState<Types.IEntity.Game.Main>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      const { data } = await Api.Single({ gameId: id as string });
      const games = data.data.game;
      console.log(games);
      setGame(games as Types.IEntity.Game.Main);
      setIsLoading(false);
    };

    load();
  }, []);

  const roll = async () => {
    const { data } = await Api.Dice({ gameId: id as string, game.currentPlayerId });
    const games = data.data;
    console.log(games);
    setGame({...games.game, games.dice});
    setIsLoading(false);
  };

  const hold = async () => {
    const { data } = await Api.Hold({ gameId: id as string, game.currentPlayerId });
    const games = data;
    console.log(games);
    setGame();
    setIsLoading(false);
  };

  const reset = async () => {
    // const newGame: IEntity.Game.Main = {
    //   ...game,
    //   player1: { ...game.player1, currentScore: 0, totalScore: 0 },
    //   player2: { ...game.player2, currentScore: 0, totalScore: 0 },
    //   winner: null,
    //   dice: 0,
    //   currentPlayerId: game.player1.id
    // };
    // setGame(newGame);
  };

  return { game, methods: { roll, hold, reset } };
}
