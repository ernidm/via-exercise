import { createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	isFetchingDriveData: false,
	driverDataArray: null,
	driverDataError: null
};

let reducer = createReducer(INITIAL_STATE, {
	"REQUEST_DRIVER_DATA": (state, action) => {
		state.isFetchingDriveData = action.payload === false ? false : true;
	},

	"RECEIVE_DRIVER_DATA": (state, action) => {
		state.driverDataArray = action.payload;
	},

	"ERROR_DRIVER_DATA": (state, action) => {
		state.driverDataError = action.payload;
	},

	"UPDATE_DRIVER_DATA": (state, action) => {
		state.driverDataArray = [...action.payload];
	}
});

export default reducer;