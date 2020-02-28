import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions.js";

import ReactSpinnersGridLoader from "react-spinners/GridLoader";

import "./GridLoader.scss";

let GridLoader = props => {
	let {
		driverDataError,
		driverDataArray
	} = props;

	return (
		<div styleName={"grid-loader" + (driverDataArray || driverDataError ? " grid-loader--hidden" : "")}>
			<ReactSpinnersGridLoader
				css={{width: "6.5rem"}}
				size={"1.5rem"}
				color={"#00a8f3"}
				loading={true}
	        />
		</div>
	);
};

let mapStateToProps = (state, ownProps) => ({
	driverDataError: state.driverDataError,
	driverDataArray: state.driverDataArray

});

export default connect(
	mapStateToProps
)(GridLoader);