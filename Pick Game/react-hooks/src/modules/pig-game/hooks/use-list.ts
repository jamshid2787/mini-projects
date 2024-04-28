import { useEffect, useState } from "react";
import { Api, Types } from "..";

export const useList = () => {
 const [games, setGames] = useState<Types.IEntity.Game.Mini[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      const { data } = await Api.List();
      const games = data.data;
      setGames(games);
      setIsLoading(false);
    };

    load();
  }, []);
  return {games, isLoading}
};
