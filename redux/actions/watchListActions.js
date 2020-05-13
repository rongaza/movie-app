// Action Types
export const ADD_TO_LIST = 'ADD_TO_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

// Action Creator

export const addToList = (id) => {
	return {
		type: ADD_TO_LIST,
		id,
	};
};

export const removeFromList = (id) => ({
	type: REMOVE_FROM_LIST,
	id,
});
