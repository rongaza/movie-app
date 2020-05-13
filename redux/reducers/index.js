import favoritesReducer from '../reducers/favoritesReducer';
import watchListReducer from '../reducers/watchListReducer';
import movieReducer from '../reducers/movieReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	watchList: watchListReducer,
	// movieDetails: movieReducer,
});

export default rootReducer;
