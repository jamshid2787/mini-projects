import { http } from 'service';
import { IApi } from './types';
import { delay } from 'utils';

export const List = async () => {
  await delay();
  return http.get<IApi.List.Response>('/pig');
};

export const Single = ({ gameId }: IApi.Single.Request) => http.get<IApi.Single.Response>(`/pig/${gameId}`);

export const Create = (data: IApi.Create.Request) => http.post<IApi.Create.Response>('/pig');

export const Dice = ({ gameId, playerId }: IApi.Dice.Request) =>
  http.post<IApi.Dice.Response>(`/pig/${gameId}`, { playerId });

export const Reset = ({ gameId }: IApi.Reset.Request) => http.get<IApi.Reset.Response>(`/pig/${gameId}`);

export const Hold = ({ gameId, playerId }: IApi.Hold.Request) => http.post(`/pig/${gameId}`, { playerId });
