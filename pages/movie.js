import { useState, useEffect, useReducer } from 'react';
import FilterResults from '../components/FilterResults';
import ListMovies from '../components/ListMovies';
import Layout from '../components/Layout';
import { makeStyles, Fab } from '@material-ui/core';

const movieReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_MOVIES':
			return [...action.payload];
		case 'FETCH_MOVIE_DETAILS':
			return state;
		default:
			return state;
	}
};

const useStyles = makeStyles(() => ({
	floatingButton: {
		position: 'fixed',
		left: 350,
		bottom: 20,
	},
}));

const Movie = ({ movie }) => {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(true);
	const [showSearchButton, setShowSearchButton] = useState(false);
	const [searchParameters, setSearchParameters] = useState(
		`https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.MOVIE_API_KEY}`
	);
	const [movies, dispatch] = useReducer(movieReducer, []);
	const [movieDetails, setMovieDetails] = useState({});

	const fetchMovies = async (dispatch, url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		dispatch({ type: 'FETCH_MOVIES', payload: data.results });
		setIsLoading(false);
	};

	const handleUpdateSearchParameters = (parameters) => {
		setSearchParameters(parameters);
		setShowSearchButton(true);
	};

	const handleSearchButton = () => {
		fetchMovies(dispatch, searchParameters);
		setShowSearchButton(false);
	};

	useEffect(() => {
		fetchMovies(dispatch, searchParameters);
	}, []);

	return (
		<Layout>
			<div className="wrapper">
				<FilterResults updateSearchParameters={handleUpdateSearchParameters} />

				<div className="display-list">
					<ListMovies movies={movies} isLoading={isLoading} />
					{showSearchButton ? (
						<Fab
							color="secondary"
							aria-label="add"
							className={classes.floatingButton}
							variant="extended"
							onClick={handleSearchButton}
						>
							Search
						</Fab>
					) : null}
				</div>
			</div>

			<style jsx>{`
				.wrapper {
					display: flex;
				}
				.pagination {
					display: flex;
					justify-content: center;
				}
				.content {
					display: flex;
					flex-wrap: nowrap;
				}
				.display-list {
					display: flex;
					flex-wrap: wrap;
					width: 1000px;
				}
			`}</style>
		</Layout>
	);
};

export default Movie;
