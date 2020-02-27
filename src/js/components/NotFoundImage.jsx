import React, { useState } from "react";
import PropTypes from "prop-types";

import SVG from "react-inlinesvg";
import unknownImage from "assets/svg/unknown.svg";

import "./NotFoundImage.scss";

let NotFoundImage = props => (
	<div styleName="not-found-image">
		<SVG src={unknownImage} />
	</div>
);

export default NotFoundImage;