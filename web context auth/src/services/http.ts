import axios, { AxiosError } from 'axios';
import { config } from 'config';
import toast from 'react-hot-toast';

export const http = axios.create({ baseURL: 'http://localhost:4000/api' });

http.interceptors.request.use((request) => {
	const token = window.localStorage.getItem(config.tokenKEY);

	request.headers = { ...request.headers, 'x-auth-token': token } as any;

	return request;
});

http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError) toast.error(error.response?.data);
		return Promise.reject(error);
	}
);
