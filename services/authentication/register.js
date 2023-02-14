const connection = require("../../db/mysql");
const { signToken } = require("../../helpers/helpers");

const registerMethod = (requests, password, res) => {
    let data = {
        name: requests.name,
        email: requests.email,
        password: requests.password,
    }
    connection.query('insert into users set ?', data, (err, result, fields) => {
        if (err) throw err;
        else {
            connection.query(`select * from users where id=${result.insertId}`, (err, result1, fields) => {
                if (err) throw err;
                signToken(result1[0], (response) => {
                    return res.json({
                        token: response,
                        message: 'User Created Successfully',
                    })
                })
            })
        }
        /* return res.status(200).send({
            'data':result,
            message: 'Inserted Successfully',
        }) */
    })
}

module.exports = {
    registerMethod,
};