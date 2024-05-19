const Router = require('express');
const { Admin, Course } = require('../db/index');
const router = Router();
const adminMiddleware = require('../middleware/admin');

// create admin
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username !== '' && password !== '') {
        const adminExists = await Admin.findOne({ username, password})
        if(adminExists) res.json({ msg : 'user already exists, try login'})
        else {
            const adminCreate = await Admin.create({
                username,
                password
            })
            console.log('adminCreate',adminCreate);
            res.json({
                msg: 'Admin created successfully'
            })
        }
    }
})


// create new course
router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    // const imageLink = req.body.imagLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        // imageLink
    })

    res.json({
        msg: `Course created successfully ${newCourse._id}`
    })
})

router.get('/courses', adminMiddleware, async (req, res) => {
    const allCourses = await Course.find({});
    console.log(allCourses);
    res.status(200).json({
        courses: allCourses
    })
})

module.exports = router;