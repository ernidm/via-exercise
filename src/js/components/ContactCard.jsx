import React, { useState } from "react";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";

import Img from "react-image";
import NotFoundImage from "components/NotFoundImage.jsx";

import "./ContactCard.scss";

const DRIVER_TYPE = {
	CITIZEN: "citizen",
	PROFESSIONAL: "professional"
};

let BigToolTip = withStyles(theme => ({
  tooltip: { fontSize: "1.1rem" }
}))(Tooltip);

let ContactCard = props => {
	let {
		name,			// driver name
		type,			// driver type - "citizen" / "professional"
		rank,			// driver rank - 1 to 5
		phone,			// driver phone number - 10 digits
		email,			// driver email address
		profileImage,	// driver profile image - url or image data (base64)
		isVisible
	} = props;

	return (
		<div styleName={"contact-card" + (!isVisible ? " contact-card--hidden" : "")}>
			<div styleName="contact-card__content">
				<div styleName="contact-card__image">
					<Img src={profileImage} unloader={<NotFoundImage />} crossOrigin="anonymous" />
				</div>
				<div styleName="contact-card__details">
					<div styleName={"contact-card__driver-type" + ` ${getDriverTypeStyleNameWithModifier(type)}`}></div>	{/* "--citizen"/"--professional" */}
					<div styleName="contact-card__details-inner">
						<div styleName="contact-card__details-name">{name}</div>
						<div styleName="contact-card__details-rank">Driver rank: {rank}</div>
						<div styleName="contact-card__details-phone">Phone Number: {phone}</div>
						
						<BigToolTip title={email || ""}>
							<div styleName="contact-card__details-email">Email: {email}</div>
						</BigToolTip>
					</div>
				</div>
			</div>
		</div>
	);
};

function getDriverTypeStyleNameWithModifier(type) {
	let styleName = "contact-card__driver-type";
	let modifier = type === DRIVER_TYPE.PROFESSIONAL ? "--professional" : "--citizen";

	return styleName + modifier;
}

export default ContactCard;