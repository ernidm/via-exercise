import React, { useState } from "react";
import PropTypes from "prop-types";

import Img from "react-image";

import NotFoundImage from "components/NotFoundImage.jsx";

import "./Image.scss";

let Image = props => {
	let [ isLoaded, setIsLoaded ] = useState(false);

	let {
		src
	} = props;

	return (
		<div styleName={"image" + (!isLoaded && src ? " image--hidden" : "")}>
			<Img 
				src={src} 
				unloader={<NotFoundImage />} 
				crossOrigin="anonymous"
				onLoad={() => setIsLoaded(true)}
			/>
		</div>
	);
};

export default Image;