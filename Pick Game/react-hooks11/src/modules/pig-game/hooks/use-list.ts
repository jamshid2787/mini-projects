import { Api } from '..';
import { useQuery } from 'hooks';

export const useList = () => {
  const { isLoading, data: games } = useQuery(async () => {
    const { data } = await Api.List();

    return data.data;
  });

  return { games, isLoading };
};
