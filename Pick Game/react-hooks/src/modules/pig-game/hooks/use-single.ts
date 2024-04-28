import { useEffect, useState } from 'react';
import { Api } from '..';
import { useParams } from 'react-router-dom';
import { IEntity } from '../types';

export const useSingle = () => {
  const { gameId: id } = useParams();

  const [game, setGame] = useState<IEntity.Game.Main>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      const { data } = await Api.Single({ gameId: id as string });
      const games = data.data.game
      console.log(games);
      setGame(games as IEntity.Game.Main);
      setIsLoading(false);
    };

    load();
  }, []);
  return { game };
};
