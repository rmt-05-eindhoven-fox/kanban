const bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword, comparePassword
}