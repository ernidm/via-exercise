import React from "react";

import ContactList from "components/ContactList.jsx";

import "./App.scss";

let App = props => {
	return (
		<div styleName="app">
			<main styleName="app__main">
				<div styleName="app__main-top-stripe"></div>
				<ContactList title="Contact List" />
			</main>
		</div>
	);
};

export default App;