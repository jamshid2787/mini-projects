import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Main extends Component {
	state = {
		moviesData: [],
		genresData: [],
		activeGenre: 'All Genres',
		searchQuery: '',
	};
	handlePageChange: any;

	async componentDidMount() {
		try {
			// const moviesResponse = await fetch('http://localhost:4000/api/movies');
			const moviesResponse = await fetch('http://localhost:4000/api/movies');
			if (!moviesResponse.ok) {
				throw new Error('Failed to fetch movies');
			}
			const movies = await moviesResponse.json();
			this.setState({ moviesData: movies });
			console.log('Fetched movies:', movies);

			const genresResponse = await fetch('http://localhost:4000/api/genres');
			if (!genresResponse.ok) {
				throw new Error('Failed to fetch genres');
			}
			const genres = await genresResponse.json();
			this.setState({ genresData: genres });
			console.log('Fetched genres:', genres);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	handleGenreClick = (genreId: string) => {
		this.setState({ activeGenre: genreId });
	};

	handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ searchQuery: event.target.value });
	};

	render() {
		const { moviesData, genresData, activeGenre, searchQuery } = this.state;

		const filteredMovies = moviesData.filter((movie: any) => {
			const genreCondition = activeGenre === 'All Genres' || movie.genre._id === activeGenre;

			const searchCondition = movie.title.toLowerCase().includes(searchQuery.toLowerCase());

			return genreCondition && searchCondition;
		});
		console.log(filteredMovies);

		return (
			<>
				<main className="container">
					<div className="row">
						<div className="col-3">
							<ul className="list-group">
								<li
									className={`list-group-item ${activeGenre === 'All Genres' ? 'active' : ''}`}
									onClick={() => this.handleGenreClick('All Genres')}
								>
									All Genres
								</li>
								{genresData.map((genre: any) => (
									<li
										key={genre._id}
										className={`list-group-item ${activeGenre === genre._id ? 'active' : ''}`}
										onClick={() => this.handleGenreClick(genre._id)}
									>
										{genre.name}
									</li>
								))}
							</ul>
						</div>
						<div className="col">
							{localStorage.getItem('token') ? (
								<Link to={'/movies/new'}>
									<button className="btn btn-primary">Add Movie</button>
								</Link>
							) : (
								''
							)}

							<p>Showing {filteredMovies.length} movies in the database.</p>
							<input
								type="text"
								name="query"
								value={searchQuery}
								onChange={this.handleSearchChange}
								className="form-control my-3"
								placeholder="Search..."
							/>
							<table className="table">
								<tbody>
									{filteredMovies.map((movie: any) => (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>{movie.genre.name}</td>
											<td>{movie.numberInStock}</td>
											<td>{movie.dailyRentalRate}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</>
		);
	}
}
