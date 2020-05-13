import { useState, useEffect } from 'react';
import FilterResults from '../components/FilterResults';
import ListMovies from '../components/ListMovies';
import Layout from '../components/Layout';
import { makeStyles, Grid, Fab, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';

const movieReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_MOVIES':
			return [...action.payload];
		default:
			return state;
	}
};

const useStyles = makeStyles(() => ({
	floatingButton: {
		position: 'fixed',
		right: '35%',
	},
}));

const Movie = () => {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(true);
	const [showSearchButton, setShowSearchButton] = useState(false);
	const [searchParameters, setSearchParameters] = useState({});
	const [movies, setMovies] = useState([]);
	const [pages, setPages] = useState(0);
	const [currPage, setCurrPage] = useState(1);
	const [error, setError] = useState(null);

	const url = 'https://api.themoviedb.org/3/discover/movie';
	const urlParams = {
		api_key: process.env.movieAPIKey,
		with_original_language: 'en',
		language: 'en-US',
		include_adult: 'false',
		certification_country: 'US',
		page: '1',
	};

	const fetchData = async (url, urlParams) => {
		try {
			const res = await axios.get(url, {
				params: { ...urlParams },
			});
			setMovies(res.data.results);
			setCurrPage(res.data.page);
			setPages(res.data.total_pages);
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		} catch (err) {
			setError(err.response.data);
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleUpdateSearchParameters = (parameters) => {
		setSearchParameters(parameters);
		setShowSearchButton(true);
	};

	const handleSearchButton = () => {
		fetchData(url, { ...urlParams, ...searchParameters });
		setShowSearchButton(false);
	};

	const handleShowSearchButton = () => {
		setShowSearchButton(true);
	};

	const handlePageChange = (e, value) => {
		fetchData(url, { ...urlParams, ...searchParameters, page: value });
	};

	const renderData = () => {
		if (!error) {
			return (
				<React.Fragment>
					<Grid container justify="center">
						<ListMovies movies={movies} />
					</Grid>
					<Grid container justify="center">
						<Pagination
							count={pages}
							page={currPage}
							siblingCount={0}
							onChange={handlePageChange}
						/>
					</Grid>
				</React.Fragment>
			);
		} else {
			return (
				<Grid container justify="center" direction="column">
					<Grid item>
						<Typography variant="h6">{error.status_message}</Typography>
					</Grid>
					<Grid item>
						<Typography>Status Code: {error.status_code}</Typography>
					</Grid>
				</Grid>
			);
		}
	};

	useEffect(() => {
		fetchData(url, urlParams);
	}, []);

	return (
		<Layout>
			<Grid container spacing={3}>
				<Grid item sm={3} style={{ paddingLeft: '30px' }}>
					<FilterResults
						updateSearchParameters={handleUpdateSearchParameters}
						search={handleSearchButton}
						toggleSearchButton={handleShowSearchButton}
					/>
				</Grid>
				<Grid item sm={9}>
					{!isLoading && renderData()}
				</Grid>
				{showSearchButton ? (
					<Fab
						color="primary"
						aria-label="add"
						className={classes.floatingButton}
						variant="extended"
						onClick={handleSearchButton}
					>
						Search
					</Fab>
				) : null}
			</Grid>
		</Layout>
	);
};

export default Movie;
