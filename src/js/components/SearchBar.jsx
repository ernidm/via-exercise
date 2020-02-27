import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions.js";

import MaterialSearchBar from "material-ui-search-bar";

import "./SearchBar.scss";

let SearchBar = props => {
	let [ searchBarValue, setSearchBarValue ] = useState("");

	let { 
		value,
		searchString,
		onSetSearchBarValue,
		driverDataArray,
		updateDriverData
	} = props;

	function search(value) {
		setSearchBarValue(value);

		let re = new RegExp(`(${value}[\\w+\\s]*)@(\\d+)`, "ig");
		let result = null;
		let indexResultArray = [];

		while ((result = re.exec(searchString)) !== null) {
		    indexResultArray.push(parseInt(result[2]));
		}

		let driverDataArrayCopy = [];

		for (let i = 0; i < driverDataArray.length; i++) {
			let dataItem = {...driverDataArray[i]};
			if (indexResultArray.includes(i)) {
				dataItem.isVisible = true;
			} else {
				dataItem.isVisible = false;
			}

			driverDataArrayCopy.push(dataItem);
		}

		updateDriverData(driverDataArrayCopy);
	}

	return (
		<div styleName="search-bar">
		    <MaterialSearchBar
		    	value={searchBarValue}
				onChange={newValue => { search(newValue); }}
				style={{
					width: "100%",
					height: "100%",
					borderRadius: "2rem"
				}}
				placeholder="search..."
		    />
		</div>
	);
};

let mapStateToProps = (state, ownProps) => ({
	driverDataArray: state.driverDataArray,
});

let mapDispatchToProps = { 
	updateDriverData: actions.updateDriverData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar);