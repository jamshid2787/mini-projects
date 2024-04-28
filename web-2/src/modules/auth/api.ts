import { http } from 'services';
import { IApi } from './types';

export const Login = async (data1: IApi.Login.Request) => {
	const res = await http.post<IApi.Login.Response>('/auth', data1);
	const { data } = res.data;
	localStorage.setItem('token', data);
};

export const Register = (data: IApi.Register.Request) =>
	http.post<IApi.Register.Response>('/users', data);

export const Me = (data: IApi.Me.Request) => http.post<IApi.Me.Response>('/me', data);