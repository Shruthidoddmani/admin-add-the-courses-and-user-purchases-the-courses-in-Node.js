const Router = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db/index');

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username !== '' && password !== '') {
        const userExists = await User.findOne({ username, password });
        if (userExists) res.json({ msg: 'user already exists, try login' })
        else {
            await User.create({
                username,
                password
            })
            res.json({
                msg: 'User created successfully'
            })
        }
    }
})

router.post('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses })
})

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    try{
        const userUpdated = await User.updateOne(
            { username: username },
            {
                "$push": {
                    purchasedCourses: courseId
                }
            }
        );
        console.log(userUpdated);
        res.json( { msg: 'purchased completed'})
    }catch(error) {
        console.log(error);
    }
    
})

router.get('/purchased', userMiddleware, async(req, res) => {
    const user = await User.findOne({ username: req.headers.username});
    const purchasedCourseList = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({ coursesPurchased: purchasedCourseList });
})
module.exports = router;