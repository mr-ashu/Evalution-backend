require("dotenv").config();

const express = require("express");
const cors = require("cors");
 
const userRouter=require("./Routes/user.routes") 
const cRouter=require("./Routes/calculate.routes") 
const connect = require("./Config/db")
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(cors());

app.use("/getProfile", userRouter);
app.use("/calculate", cRouter);


app.listen(PORT, async () => {
    await connect();
    console.log(`listning to http://localhost:${PORT}`)
})