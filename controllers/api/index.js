const router = require('express').Router();
const postRoute = require('./postRoutes');
const userRoute = require('./userRoutes');
const commentRoute = require('./commentRoutes')

router.use('/post', postRoute);
router.use('/user', userRoute);
router.use('/comment', commentRoute);



module.exports = router