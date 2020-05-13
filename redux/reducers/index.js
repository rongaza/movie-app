import favoritesReducer from './favoritesReducer';
import watchListReducer from './watchListReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	watchList: watchListReducer,
});

export default rootReducer;
