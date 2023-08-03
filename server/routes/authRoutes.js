const express = require('express');
const {registerController,loginController,testContoller} = require('../controllers/authController');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');
//router object
const router = express.Router();

//register
//REGISTER || METHOD  POST
router.post('/register',registerController)

//LOGIN || METHOD POST
router.post('/login',loginController)


//test route
router.get('/test',requireSignIn,isAdmin,testContoller);


//Protected routes
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

module.exports = router;