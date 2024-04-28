import { Api } from '..';
import { useQuery } from 'hooks';
import { IApi } from '../types';

export const useSingle = (values: IApi.Single.Request) => {
  const { data: game, ...args } = useQuery(async () => {
    const { data } = await Api.Single(values);

    return data.data.game;
  });

  return { ...args, game: game! };
};
