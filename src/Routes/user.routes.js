const express = require("express");
const UserModel = require("../Schema/user.model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const app = express();
 
app.use(express.json())
 

 
app.get("/", async(req,res)=>{
  const user=await UserModel.find()
  res.send(user)
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email })
  const p = await argon2.verify(user.password, password)
  try {
    if (p) {
      const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role },
        "SECRET12345",
        {
          expiresIn: "5 mins"
        }
      )
      const refreshToken = jwt.sign({}, "REFRESH", {
        expiresIn: "7 days"
      })
      res.send({ msg: "login sucess", token, refreshToken })
    }
    res.status(401).send("invalid user")
  } catch (e) {
    return res.send(e.message)
  }


})

// -----------------------------------------------------------------

app.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;

  const hash = await argon2.hash(password)
  
  const token = req.headers["authorization"]

  try {

    if (token) {

      const decoded = jwt.decode(token);
    
      if (decoded) {
        if (decoded.role === "HR") {
          const user = new UserModel({ name, email, password: hash, age, role: "Employee" })
          await user.save()
          return res.status(201).send("Employee created successfully")
        }
        else {
          return res.status(403).send("not allowed")
        }
      }

    }

  }
  catch (e) {
    return res.send(e.message)
  }


 
  const user = new UserModel({ name, email, password: hash, age })
  await user.save()
  return res.status(201).send("Guests created successfully")
 

})
module.exports = app;