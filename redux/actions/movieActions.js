// Action Types
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS';

// Action Creator

export const getMovieDetails = (id) => ({
	type: GET_MOVIE_DETAILS,
	payload: id,
});
