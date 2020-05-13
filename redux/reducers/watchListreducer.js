import { ADD_TO_LIST, REMOVE_FROM_LIST } from '../actions/watchListActions';

const watchListReducer = (state = [419704, 545609, 481848, 281957, 11121], action) => {
	switch (action.type) {
		case ADD_TO_LIST:
			return [...state, action.id];
		case REMOVE_FROM_LIST:
			return state.filter((item) => item !== action.id);
		// return updatedList;
		default:
			return state;
	}
};

export default watchListReducer;
