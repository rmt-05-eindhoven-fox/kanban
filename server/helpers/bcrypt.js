const bcrypt = require("bcryptjs");

let comparePassword = (inputPass, password) => {
	let validUser = bcrypt.compareSync(inputPass, password);
	return validUser;
};

module.exports = { comparePassword };
