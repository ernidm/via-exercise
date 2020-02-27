var { log } = console;

import React from "react";
import ReactDOM from "react-dom";

import reducer from "store/reducer.js";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import reduxEnhancers from "js/redux-enhancers.js";
import App from "components/App.jsx";

let store = createStore(
	reducer,
	reduxEnhancers
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app-root")
);