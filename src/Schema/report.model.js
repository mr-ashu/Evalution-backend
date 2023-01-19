const mongoose = require("mongoose");

const  reportSchema = new mongoose.Schema({
 
 
},
{ versionKey: false })

const Report = mongoose.model("report", reportSchema);

module.exports = Report;