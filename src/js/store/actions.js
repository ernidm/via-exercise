import { createAction } from "@reduxjs/toolkit";

import APP_CONFIG from "js/app-config.js";

const { URL_ENDPOINT_DRIVER_DATA_API } = APP_CONFIG;
const REQUEST_DRIVER_DATA = "REQUEST_DRIVER_DATA";
const RECEIVE_DRIVER_DATA = "RECEIVE_DRIVER_DATA";
const ERROR_DRIVER_DATA = "ERROR_DRIVER_DATA";
const UPDATE_DRIVER_DATA = "UPDATE_DRIVER_DATA";

export let updateDriverData = createAction("UPDATE_DRIVER_DATA");;

export function fetchDriverData() {
    return async dispatch => {
    	try {
	        dispatch({ type: REQUEST_DRIVER_DATA });

	        let response = await fetch(URL_ENDPOINT_DRIVER_DATA_API);
	    	if (response.status !== 200) {
	    		throw new Error("actions.fetchDriverData: server error; response code: " + response.status);
	    	}

	    	let data = await response.json();

			dispatch({
	            type: RECEIVE_DRIVER_DATA,
	            payload: data
	        });
    	} catch(ex) {
			dispatch({
	            type: ERROR_DRIVER_DATA,
	            payload: ex.message
	        });
    	} finally {
	        dispatch({
	        	type: REQUEST_DRIVER_DATA, payload: false
	        });
    	}
    }
}