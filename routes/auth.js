const router = require("express").Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

router.post('/register', async(req,res)=>{
       
    const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
              ).toString(),
    })
    try{
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json(err)
    }
});

router.post('/login', async(req,res)=>{
    
    
    try{
    const user = await User.findOne({username:req.body.username});
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
    if(!user){
        res.status(401).send("Wrong credentials!");
    }else if(OriginalPassword !== req.body.password){
        res.status(401).send("Wrong credentials!");
    }else{
        const accessToken = jwt.sign({
        id:user.id,
        isAdmin:user.isAdmin
    },
    process.env.JWT_SEC,
      {expiresIn:"3d"}
    )
    const {password,...others}= user._doc;
    res.status(200).json({others, accessToken});
    }
    
    }catch(err){
        res.status(500).json(err);
    }
    
})

module.exports = router;