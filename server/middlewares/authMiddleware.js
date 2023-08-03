const JWT = require('jsonwebtoken');
const UserModel = require('../models/userModel');

//Protected routes token based
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
    
        console.log(err)
    }
}
//checking is admin
const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 1) {
            res.status(401).send({
                sucess: false,
                message: 'Unauthorized access'
            })
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { requireSignIn, isAdmin };

