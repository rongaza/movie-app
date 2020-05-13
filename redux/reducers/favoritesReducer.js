import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/favoritesActions';

const favoritesReducer = (state = [419704, 545609, 481848, 281957, 11121], action) => {
	switch (action.type) {
		case ADD_FAVORITE:
			return [...state, action.payload];
		case REMOVE_FAVORITE:
			return state.filter((item) => item !== action.id);
		default:
			return state;
	}
};

export default favoritesReducer;
