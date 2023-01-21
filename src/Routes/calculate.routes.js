const express = require("express");
const CModel = require("../Schema/calculate.model");
const cal = express();
 
cal.use(express.json())
 

 
cal.get("/", async(req,res)=>{

  const data=await CModel.find()

  res.send(data)
})

cal.post("/", async (req, res) => {
  
 
 
 try {
 
 
    let pi=await CModel.create({...req.body})
 
   res.send(pi)
    
 } catch (error) {
    console.log(error);
 }


})

 
 
module.exports = cal;