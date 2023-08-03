const mongoose = require('mongoose');


const connectDB = async()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGO_DB);
      console.log(`Connected to MongoDB:${conn.connection.host}`);
    }catch(err){
    console.log(`Error in mongodb:${err}`);
    }
}

module.exports = connectDB;