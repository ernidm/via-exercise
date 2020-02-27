const PHONE_NUMBER_FORMAT_PATTERN = /(\d{3})(\d{3})(\d{4})/;
const EMAIL_VERIFICATION_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NA = "N/A";	// not available

class DriverDataParser {
	constructor(dataItem = null) {
		this.dataItem = dataItem;

		if (!this.dataItem) {
			throw new Error("DriverDataParser.constructor: 'dataItem' is null");
		}
	}

	parse() {
		let parsedDataItem = Object.assign({}, this.dataItem);

		this.removeWhiteSpaces(parsedDataItem);

		parsedDataItem["driverType"] = this.parseDriverType(this.dataItem["driverType"]);
		parsedDataItem["phone"] = this.parsePhoneNumber(this.dataItem["phone"]);
		parsedDataItem["driverRank"] = this.parseDriverRank(this.dataItem["driverRank"])
		parsedDataItem["email"] = this.parseEmail(this.dataItem["email"]);

		return parsedDataItem;
	}

	removeWhiteSpaces(dataItem) {
		for (let key in dataItem) {
			let value =  dataItem[key];
			dataItem[key] = value.trim();
		}
	}

	parsePhoneNumber(phoneNumber) {
		if (!phoneNumber) { return NA; };

		let digitsPattern = /\d+/g;
		let insertDotsBetweenDigitsPattern = PHONE_NUMBER_FORMAT_PATTERN;
		let digits = phoneNumber.match(digitsPattern).join("");

		if (digits.length !== 10) {
			return NA;
		}

		digits = digits.replace(insertDotsBetweenDigitsPattern, "$1.$2.$3");

		return digits;
	}

	parseDriverRank(rank) {
		rank = parseInt(rank);

		return rank >= 1 && rank <= 5 ? rank : NA;
	}

	parseEmail(email = "") {
		let emailPattern = EMAIL_VERIFICATION_PATTERN;

		return email.match(emailPattern) ? email : NA;
	}

	parseDriverType(driverType) {
		return driverType.toLowerCase();
	}
}

export default DriverDataParser;