
const movies = require('../model/modalmovie')
const fs = require('fs')
 const jwt = require('jsonwebtoken')
//create movie api
const createmovie = async(req,res)=>{
    const{moviename,movietype,movieduration,moviedescription,userimage,username} = req.body
    const tokens= req.headers.authorization
    console.log(tokens)
    const decoded = jwt.verify(tokens,process.env.secret_key)
    const userid = decoded.userid
    let image
    if(!req.file){
        image="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
    } else{
        image = "http://localhost:3000/"+req.file.filename
    }
    await movies.create({
        moviename,
        movietype,
        movieduration,
        moviedescription,
        image,
        userimage,
        username,
        userid
    })
    res.status(200).json({
        messege:"cart create successfully"
    })

}

//get all movie
const getmovie = async(req,res)=>{
  const movie =  await movies.find()
//   if(movie.length==0){
//     res.status(404).json({
//         message:"no videos found"
//     })
//     return
//   }
  res.status(200).json({
    messege:'api hit successfully!!',
    data:movie
  })
}

//update movie api
const update = async (req, res) => {
    const { id } = req.params;
    const { moviename, movietype, movieduration, moviedescription } = req.body;
    let image;
    const tokens=req.headers.authorization
    const decoded = jwt.verify(tokens,process.env.secret_key)
    const userid = decoded.userid
    let data;
    if (req.file) {
         data = await movies.findById(id);
        if (!data) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }
        const imagepath = data.image;
            const length = "http://localhost:3000/".length;
            const newpath = imagepath.slice(length);
    
            // Delete the existing image file
            fs.unlink(`storage/${newpath}`, (error) => {
                if (error) {
                    console.log(error);
                    return;
                }
            });
            image = "http://localhost:3000/" + req.file.filename}else{
                data = await movies.findById(id);

                if(data.userid == userid){
                    await movies.findByIdAndUpdate(id, {
                        moviename,
                        movietype,
                        movieduration,
                        moviedescription,
                        image,
                    });
                    res.status(200).json({
                        message: "Update successful",
                    })
            } else {
               res.json({
                message:"you have not permission"
               })
            }
            }
           
        }


       

//get single movie api
const singlemovie = async(req,res)=>{
const {id} = req.params
const amovie = await movies.findById(id)
res.status(200).json({
messege:'api hit successfully',
data:amovie
})
}
const deletes = async(req,res)=>{
    const{id}=req.params
    const data = await movies.findById(id)
    const imageurl=data.image
    const imagelength="http://localhost:3000/".length
    const imagepath=imageurl.slice(imagelength)
    fs.unlink(`storage/${imagepath}`,(err)=>{
    if(err){
    console.log(err)
    return
    }
    })
    
    await movies.findByIdAndDelete(id)
    res.status(200).json({
    messege:" delete successfully"
    })
    
    }
module.exports = {createmovie,update,singlemovie,getmovie,deletes}
