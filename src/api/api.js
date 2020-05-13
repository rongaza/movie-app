import axios from 'axios';
// import useFetchData from '../useFetchData';

export const fetchData = async (url, urlParams) => {
	try {
		const res = await axios.get(url, {
			params: { ...urlParams },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchMovieDetails = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}`;
	const urlParams = { api_key: process.env.movieAPIKey };
	const movieDetails = await fetchData(url, urlParams);
	return movieDetails;
};

export const fetchMovieCast = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
	const urlParams = { api_key: process.env.movieAPIKey };
	const movieCast = await fetchData(url, urlParams);
	return movieCast.cast;
};

export const fetchMovieReviews = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
	const urlParams = { api_key: process.env.movieAPIKey };
	const movieReviews = await fetchData(url, urlParams);
	return movieReviews;
};

export const fetchSimilarMovies = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/similar`;
	const urlParams = { api_key: process.env.movieAPIKey };
	const similarMovies = await fetchData(url, urlParams);
	return similarMovies;
};

const id = '';
const movieDetails = `https://api.themoviedb.org/3/movie/${id}`;
const movieCast = `https://api.themoviedb.org/3/movie/${id}/credits`;
const movieReviews = `https://api.themoviedb.org/3/movie/${id}/reviews`;
const similarMovies = `https://api.themoviedb.org/3/movie/${id}/similar`;
