import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// const store = createStore(rootReducer);
// const store = createStore(
// 	rootReducer /* preloadedState, */,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware()
		// other store enhancers if any
	)
);

export default store;
