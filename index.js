const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./router/admin');
const user = require('./router/user');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use('/admin', admin);
app.use('/user', user)

app.listen(PORT, () => {
    console.log(`server started running ${PORT}`);
})

app.use((err, req, res, next) => {
    res.render('error', {
        message: err.message,
        error: err
    });
})


