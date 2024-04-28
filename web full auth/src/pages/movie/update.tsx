import React from 'react';
import { Form } from 'components';
import { IOption } from 'components/select';
import { Api, Mappers } from 'modules/movie';
import { IEntity, IForm } from 'modules/movie/types';
import toast from 'react-hot-toast';

import * as yup from 'yup';

export default class Update extends Form<IForm.Movie.Update> {
	state = {
		values: {
			title: '',
			stock: '' as unknown as number,
			rate: '' as unknown as number,
			genreId: '',
			movieId: '',
		},
		errors: {},
		isLoading: false,
		options: [],
	};

	schema = yup.object({
		title: yup.string().min(5).required().label('Title'),
		stock: yup.number().min(0).max(1000).typeError('Please enter a number').label('Stock'),
		rate: yup.number().min(0).max(1000).typeError('Please enter a number').label('Rate'),
		genreId: yup.string().required().label('Genre'),
		movieId: yup.string().required().label('Movie'),
	});

	movieSingle(movie: IEntity.Movie) {
		return {
			title: movie.title,
			genreId: movie.genre._id,
			stock: movie.numberInStock,
			rate: movie.dailyRentalRate,
			movieId: movie._id,
		};
	}

	doSubmit = async (values: IForm.Movie.Update) => {
		this.setState({ isLoading: true });

		try {
			await Api.Movie.Update(values);
			toast.success('Movie successfully updated 🎁');
		} catch (error: any) {
		} finally {
			this.setState({ isLoading: false });
		}
	};

	async componentDidMount() {
		this.setState({ isLoading: true });
		try {
			const Id = this.props.match.params.movieID;

			if (Id) {
				const { data: movie } = await Api.Movie.Single(Id);
				this.setState({ values: this.movieSingle(movie) });
			}

			const { data } = await Api.Genre.List();
			const genres = (data || []).map(Mappers.Genre);

			const options: IOption[] = genres.map(({ id, name }) => ({ value: id, label: name }));
			this.setState({ options, isLoading: false } as any);
		} catch (err: any) {
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Update Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', this.state.options)}
					{this.renderInput('stock', 'Number in stock', 'number')}
					{this.renderInput('rate', 'Daily rental rate', 'number')}
					{this.renderButton('Edit')}
				</form>
			</div>
		);
	}
}


// import React from 'react'

// function Update() {
// 		return (
// 				<div>U</div>
// 		)
// }

// export default Update