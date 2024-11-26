const Comment = require('../model/comment')
const jwt = require('jsonwebtoken')
//create comments api
const comments = async(req,res)=>{
    try {
        const { text} = req.body;
        const token=req.headers.authorization
        const { reqid } = req.params;
        const decoded = jwt.verify(token,process.env.secret_key)
        const userid = decoded.userid
        const newComment = new Comment({ text,reqid,userid});
        await newComment.save();
        res.status(201).json(newComment);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//get comment api
const getcomment =async(req,res)=>{
    const{reqid}=req.params
    const comments = await Comment.find({reqid:reqid})
    res.status(200).json({
        data:comments
    })
}

//delete comment api
const deletecomment=async(req,res)=>{
    try{
        const{id}=req.params
     await Comment.findByIdAndDelete(id)
     res.status(200).json({
        messege:"delete successfully"
     })
    } catch(err){
        console.log(err)
    }
}

module.exports = {comments,getcomment,deletecomment}
