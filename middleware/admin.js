const { Admin } = require('../db/index');

async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const userExists = await Admin.findOne({
        username,
        password
    })
    if (userExists) next();
    else res.json({ msg: 'sorry admin does not exists, please create a admin!!!' })
}

module.exports = adminMiddleware;