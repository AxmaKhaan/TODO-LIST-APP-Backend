import express from "express";
import loginDB from "../models/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing_user = await loginDB.findOne({ email: email, password: password });
    if (existing_user) {
      res.json({
        success: true,
        message: "login successful"
      });
    }
    else {
      res.json({
        success: false,
        message: "Invalid email or password"
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "server error" });
  }
});



// routes/auth.js

router.post("/add", async (req,res)=>{

  const {name,email,password} = req.body;

  try{

    const existingUser = await loginDB.findOne({
      $or:[
        {email:email},
        {name:name},
        {password:password}
      ]
    });

    if(existingUser){

      if(existingUser.email === email){
        return res.json({message:"Email has already been used"})
      }

      if(existingUser.name === name){
        return res.json({message:"Name has already been used"})
      }

      if(existingUser.password === password){
        return res.json({message:"Password has already been used"})
      }

    }

    const user = new loginDB({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      success: true,
      message:"Registration successful"})

  }
  catch(error){
    res.status(500).json({error:error.message})
  }

})

export default router;