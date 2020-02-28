import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions.js";

import { Alert, AlertTitle } from "@material-ui/lab";

import "./ErrorMessage.scss";

let ErrorMessage = props => {
	let {
		driverDataError,
		alertTitle,
		message
	} = props;

	return (
		<div styleName={"error-message" + (!driverDataError ? " error-message--hidden" : "")}>
			<Alert severity="error">
				<AlertTitle>{alertTitle}</AlertTitle>
				{message}
			</Alert>
		</div>
	);
};

let mapStateToProps = (state, ownProps) => ({
	driverDataError: state.driverDataError
});

export default connect(
	mapStateToProps
)(ErrorMessage);