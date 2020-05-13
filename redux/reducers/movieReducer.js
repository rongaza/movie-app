import { GET_MOVIE_DETAILS } from '../actions/movieActions';

const movieReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_MOVIE_DETAILS:
			return { ...action.payload };
		default:
			return state;
	}
};

export default movieReducer;
