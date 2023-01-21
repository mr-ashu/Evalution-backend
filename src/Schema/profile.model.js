const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
   
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"getProfile",
        required:true,
    
       },
    data:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cdata",
        required:true,
    
       }
   
  
},
{ versionKey: false })

const  Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;