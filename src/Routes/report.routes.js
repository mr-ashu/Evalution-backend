const express = require("express");
const Report = require("../Schema/report.model.js")

const app = express.Router();
 

app.get("/", async (req, res) => {
    
    try {
        let u = await Report.find() 
        res.send(u)
    } catch (er) {
        res.status(404).send(er.message)
    }
})
 
 
app.post("/", async (req, res) => {
 
   try {
    
    let pdt=await Report.create({
        ...req.body
    })
    res.send(pdt)
   
   } catch (e) {
      res.status(404).send(e.message)
   }
})
 

module.exports = app;