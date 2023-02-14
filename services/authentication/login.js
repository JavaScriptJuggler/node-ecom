const connection = require("../../db/mysql");
const { signToken } = require("../../helpers/helpers");

const login = (data, res) => {
    if (typeof (data.email) !== 'undefined' && typeof (data.password) !== 'undefined') {
        connection.query(`SELECT * FROM users where email='${data.email}' and password='${data.password}'`, (err, result, fields) => {
            if (err) throw err;
            if (result) {
                // console.log(result[0]);return false;
                signToken(result[0], (response) => {
                    return res.json({
                        token: response,
                    })
                });
            }
        });
    }
}
module.exports = {
    login,
}