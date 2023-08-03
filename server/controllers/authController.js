const {hashPassword,comparePassword} = require('../helpers/authHelper');
const UserModel = require('../models/userModel');
const JWT = require('jsonwebtoken');
const registerController = async(req,res)=>{
try{
    console.log(req.body);
const {name,email,password,phone,address} = req.body;
//validation
if(!name){
    return res.send({message:'name is required'})
}
if(!email){
    return res.send({message:'email is required'})
}
if(!password){
    return res.send({message:'password is required'})
}
if(!phone){
    return res.send({message:'phone is required'})
}
if(!address){
    return res.send({message:'address is required'})
}
//check user
const existingUser = await UserModel.findOne({email})
//existing user
if(existingUser){
    return res.status(200).send({
        sucess:false,
        message:'Already registerd please login'
    })
}

//register user
const hashedPassword = await hashPassword(password);
console.log(hashedPassword);
//save
const user = new  UserModel({name,email,phone,address,password:hashedPassword});
await user.save();
res.status(201).send({
    sucess:true,
    message:'User registerd sucessfully',
    user,
})


}catch(err){
console.log(err);
res.status(500).send({
    sucess:false,
    message:'Error in Registration'
})
}
}

//Post Login
const loginController = async (req,res)=>{
try{
    const{email,password} = req.body;
    if(!email || !password){
        res.status(404).send({
            sucess:false,
            message:"invalid username or password"
        })
    }
    const user = await UserModel.findOne({email});
    if(!user){
      return  res.status(404).send({
            sucess:false,
            message:'Email is not registerd '
        })
    } 
    const match = await comparePassword(password,user.password)
    if(!match){
       return res.status(200).send({
            sucess:false,
            message:"invalid password"
        })
    }

    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(200).send({
        sucess:true,
        message:"login successfully ",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address
        },
        token,
    })

}catch(err){
    console.log(err);
    res.status(500).send({
        sucess:false,
        message:'error in login',
        err
    })
}
}


//test
const testContoller= (req,res)=>{
res.send('protected route');
}

module.exports = {registerController,loginController,testContoller};