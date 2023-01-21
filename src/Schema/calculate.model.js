 
const { Schema, model } = require("mongoose");
const calculateSchema = new Schema({
  amount:Number,
  rate:Number,
  year: Number,
  value: String
 
 
});

const CModel = model("cdata", calculateSchema);

module.exports = CModel;