const Comment = require("../model/comment")
const jwt = require('jsonwebtoken')
const checkuser=async(req,res,next)=>{
    const{id}=req.params
    const token = req.headers.authorization
    const decoded = jwt.verify(token,'key')
    console.log(decoded)
    const data = await Comment.find({
    userid:decoded.userid})
    console.log(data)
    if(data){
        next();
    }else{
        res.status(403).json({
            messege:"you don't have any comment"
        })
    }
}
module.exports = checkuser

