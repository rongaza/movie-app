// Action Types
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// Action Creator

export const addFavorite = (id) => {
	return {
		type: ADD_FAVORITE,
		payload: id,
	};
};

export const removeFavorite = (id) => ({
	type: REMOVE_FAVORITE,
	id,
});
