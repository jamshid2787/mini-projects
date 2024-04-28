import { http } from 'services';
import { IApi } from './types';

export const Genre = {
  List: () => http.get<IApi.Genre.List.Response>('/genres'),
  Create: (data: IApi.Genre.Create.Request) => http.post<IApi.Genre.Create.Response>('/genres', data)
};

export const Movie = {
  List: () => http.get<IApi.Movie.List.Response>('/movies'),
  Single: ({ movieId }: IApi.Movie.Single.Request) => http.get<IApi.Movie.Single.Response>(`/movies/${movieId}`),
  Delete: ({ movieId }: IApi.Movie.Delete.Request) => http.delete<IApi.Movie.Delete.Response>(`/movies/${movieId}`),
  Create: ({ genreId, stock, rate, title }: IApi.Movie.Create.Request) => http.post(`/movies`, { title, genreId, numberInStock: stock, dailyRentalRate: rate }),
  Update: ({ movieId, genreId, stock, rate, title }: IApi.Movie.Update.Request) =>
    http.put<IApi.Movie.Update.Response>(`/movies/${movieId}`, {
      title,
      genreId,
      numberInStock: stock,
      dailyRentalRate: rate
    })
};
