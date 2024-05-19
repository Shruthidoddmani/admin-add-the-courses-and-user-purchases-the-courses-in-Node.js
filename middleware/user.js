const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const userExists = await User.findOne({
        username, 
        password
    })
    if(userExists) next();
    else res.json({
        msg: 'sorry user does not exists, please create a user!!!'
    })
}

module.exports = userMiddleware;