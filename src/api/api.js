import axios from 'axios';
// import useFetchData from '../useFetchData';

const urlParams = { api_key: process.env.MOVIE_API_KEY };

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
	const movieDetails = await fetchData(url, urlParams);
	return movieDetails;
};

export const fetchMovieCast = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
	const movieCast = await fetchData(url, urlParams);
	return movieCast.cast;
};

export const fetchMovieReviews = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
	const movieReviews = await fetchData(url, urlParams);
	return movieReviews;
};

export const fetchSimilarMovies = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/similar`;
	const similarMovies = await fetchData(url, urlParams);
	return similarMovies;
};
