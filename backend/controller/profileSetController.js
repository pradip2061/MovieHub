const movies = require('../model/modalmovie')
const profile = require('../model/Profile')
const jwt = require('jsonwebtoken')
 //profile image
 const profiles = async(req,res)=>{
    const username=req.body.name
    const token=req.headers.authorization
    let image;
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const decoded = jwt.verify(token,process.env.secret_key)
    const userid = decoded.userid
    image = "https://moviefind-1.onrender.com/"+ req.file.filename
    await profile.create({
        image,
        username,
        userid
    })
    res.status(200).json({
        messege:'profile update successfully'
    })
}

const getprofile = async (req,res)=>{
    const token=req.headers.authorization
    const decoded = jwt.verify(token,process.env.secret_key) 
   const data = await profile.find({userid:decoded.userid})
    res.status(200).json({
        messege:"data sent successfully",
        data:data
    })
}
module.exports={profiles,getprofile}