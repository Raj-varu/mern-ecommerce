const bcrypt = require('bcrypt');
const hashPassword = async(password)=>{
    try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword;
    }catch(err){
        console.log(err);
    }
}

const comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}


module.exports = {hashPassword,comparePassword};







// const bcrypt = require('bcrypt');

// const hashPassword = async (password) => {
//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword; // Return the hashed password
//   } catch (err) {
//     // Handle any errors (optional)
//     console.error(err);
//     throw err; // Rethrow the error or handle it appropriately
//   }
// };

// const comparePassword = async (password, hashedPassword) => {
//   try {
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (err) {
//     // Handle any errors (optional)
//     console.error(err);
//     throw err; // Rethrow the error or handle it appropriately
//   }
// };

// module.exports = { hashPassword, comparePassword };
