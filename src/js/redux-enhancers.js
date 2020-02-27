import { applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

let reduxDevToolsExtension = typeof window !== "undefined"
	&& window.__REDUX_DEVTOOLS_EXTENSION__ 
	&& window.__REDUX_DEVTOOLS_EXTENSION__();

let middlewareEnhancer = applyMiddleware(thunkMiddleware);

let enhancers = [middlewareEnhancer, reduxDevToolsExtension];
enhancers = enhancers.filter(enhancer => enhancer);

let composedEnhancers = compose(...enhancers);

export default composedEnhancers;