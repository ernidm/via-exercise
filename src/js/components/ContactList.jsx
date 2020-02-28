let { log } = console;

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions.js";

import MaterialSearchBar from "material-ui-search-bar";
import ContactCard from "components/ContactCard.jsx";
import SearchBar from "components/SearchBar.jsx";
import ErrorMessage from "components/ErrorMessage.jsx";
import GridLoader from "components/GridLoader.jsx";

import shortid from "shortid";
import { wrapGrid } from "animate-css-grid";

import DriverDataParser from "modules/driver-data-parser.js";

import "./ContactList.scss";

// if used as a state, will create unnecessary rerenders
// if used as a local variable inside the component, will become stale once "updateDriverData" runs due to the nature of closure
let isDataAdjusted = false;

let ContactList = props => {
	let [ searchString, setSearchString ] = useState("");

	let contactCards = useRef(null);
	let {
		title,					// prop
		isFetchingDriveData,	// mapped prop - redux state
		driverDataArray,		// mapped prop - redux state
		driverDataError,		// mapped prop - redux state
		fetchDriverData,		// mapped prop - redux async action
		updateDriverData		// mapped prop - redux sync action
	} = props;

	// log("isFetchingDriveData ", isFetchingDriveData);
	// log("driverDataArray ", driverDataArray);
	// log(fetchDriverData);
	// log(driverDataError);

	useEffect(() => {
		fetchDriverData();
	}, []);

	// driverDataArray updates
	if (driverDataArray !== null && !isDataAdjusted) {
		let parsedDriverDataArray = parseDriverDataArray(driverDataArray);
		isDataAdjusted = true;

		parsedDriverDataArray = normalizeDriverDataArray(parsedDriverDataArray);
		let searchString = createSearchStringFromDriverDataArray(parsedDriverDataArray);

		setSearchString(searchString);
		updateDriverData(parsedDriverDataArray);
		wrapGrid(contactCards.current, {duration : 600});	// creates the rearrange grid effect
	}

	return (
		<div styleName="contact-list">
			<div styleName="contact-list__header-wrapper">
				<header styleName="contact-list__header">
					<h1 styleName="contact-list__header-title">{title}</h1>
				</header>

				<section styleName="contact-list__search-bar">
				    <SearchBar searchString={searchString || ""} />
				</section>
			</div>

			<section styleName="contact-list__content-grid">
				<ErrorMessage 
					alertTitle="Error"
					message="Unable to retrieve drivers' information"
				/>

				<GridLoader />

				<div styleName={"contact-list__contact-cards" + (!driverDataArray ? " contact-list__contact-cards--hidden" : "")} ref={contactCards} >
					{ 
						driverDataArray !== null 
							&& driverDataArray[0].id 
							&& driverDataArray.map(driverData => {
							return <ContactCard 
								key={driverData.id}
								name={driverData.name}
								type={driverData.driverType}
								rank={driverData.driverRank}
								phone={driverData.phone}
								email={driverData.email}
								profileImage={driverData["profile_image"]}
								isVisible={driverData.isVisible === undefined ? false : driverData.isVisible}
							/>
						})
					}
				</div>
			</section>
		</div>
	);
};

function parseDriverDataArray(dataArray) {
	let adjustedDataArray = 
		dataArray.map(dataItem => parseDriverDataItem(dataItem));
	// log(adjustedDataArray);

	return adjustedDataArray;
}

function parseDriverDataItem(dataItem) {
	let driverDataParser = new DriverDataParser(dataItem);
	let parsedDataItem = driverDataParser.parse(dataItem);

	return parsedDataItem;
}

// adds a search string to improve search lookups
function normalizeDriverDataArray(dataArray) {
	let index = 0;

	return dataArray.map(dataItem => {
		dataItem.searchString = `${dataItem.name}@${index++}`;
		dataItem.isVisible = true;
		dataItem.id = shortid.generate();

		return dataItem;
	});
}

function createSearchStringFromDriverDataArray(dataArray) {
	let searchStringArray = [];

	for (let value of dataArray) {
		searchStringArray.push(value.searchString);
	}

	return searchStringArray.join("::");
}

ContactList.propTypes = {
	title: PropTypes.string
};

ContactList.defaultProps = {
	title: "Contact List"
};

let mapStateToProps = (state, ownProps) => ({
	isFetchingDriveData: state.isFetchingDriveData,
	driverDataArray: state.driverDataArray,
	driverDataError: state.driverDataError
});

let mapDispatchToProps = { 
	fetchDriverData: actions.fetchDriverData,
	updateDriverData: actions.updateDriverData
};

ContactList = React.memo(ContactList, (prevProps, nextProps) => {
	return prevProps.isFetchingDriveData !== nextProps.isFetchingDriveData;
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactList);