import { http } from 'service';

export const List = () => http.get('/pig');
export const Create = () => http.post('/pig');
export const Single = () => http.get('/pig/:gameId');
export const Delete = () => http.get('/pig/:gameId');
export const Dice = () => http.post('/pig/dice/:gameId');
export const Hold = () => http.post('/pig/hold/:gameId');
export const Reset = () => http.get('/pig/reset/:gameId');
