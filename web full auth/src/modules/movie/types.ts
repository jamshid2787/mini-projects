export namespace IEntity {
	export interface Genre {
		_id: any;
		id: string;
		name: string;
	}

	export interface Movie {
		movieId: any;
		dailyRentalRate: any;
		numberInStock: any;
		_id: any;
		id: string;
		title: string;
		stock: number;
		rate: number;
		genre: Genre;
		owner: string;
		isLike: boolean;
	}
}
export namespace IForm {
	export namespace Genre {
		export interface Create extends Pick<IEntity.Genre, 'name'> {}
	}

	export namespace Movie {
		export interface Create extends Pick<IEntity.Movie, 'title' | 'stock' | 'rate'> {
			genreId: string;
		}

		export interface Update extends Pick<IEntity.Movie, 'title' | 'stock' | 'rate'> {
			genreId: string;
			movieId: string;
		}
	}
}

export namespace IApi {
	export namespace Genre {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Genre[];
		}

		export namespace Create {
			export interface Request extends IForm.Genre.Create {}
			export type Response = IEntity.Genre;
		}
	}
	export namespace Movie {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Movie[];
		}

		export namespace Single {
			export interface Request {
				movieId: string;
			}
			export type Response = IEntity.Movie;
		}

		export namespace Delete {
			export interface Request {
				movieId: string;
			}
			export type Response = IEntity.Movie;
		}

		export namespace Update {
			export interface Request extends IForm.Movie.Update {
				movieId: string;
			}
			export type Response = IEntity.Movie;
		}

		export namespace Create {
			export interface Request extends IForm.Movie.Create {}
			export interface Response {}
		}
	}
}
export namespace IQuery {}
