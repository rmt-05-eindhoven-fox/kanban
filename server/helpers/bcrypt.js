const bcrypt = require("bcryptjs");

//password hashing
function hashPassword(password) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	return hash
}

//password checking by comparison
function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash)
}

module.exports = {
	hashPassword,
	comparePassword
}