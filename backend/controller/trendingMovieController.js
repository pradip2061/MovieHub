const trending = require('../model/trending')
const jwt = require('jsonwebtoken')
//trending video
const trendings = async(req,res)=>{
    const{movienames,movielanguage}=req.body
    const tokens=req.headers.authorization
    if(!movienames|| !movielanguage){
        res.status(403).json({
            data:movienames
        })
        return
    }
    let image;
    const decoded= jwt.verify(tokens,process.env.secret_key)
    const userid=decoded.userid
    if(!req.file){
        res.status(403).json({
            messege:"image is required"
        })
    } else{
        image="http://localhost:3000/"+req.file.filename

        try{
            await trending.create({
                movienames,
                movielanguage,
                image,
                userid
            })
            res.status(200).json({
                messege:"movie create successfully"
            })
        } catch(error){
            if(error){
                res.status(403).json({
                    messege:`${error}`
                })
            }
        }
       
    }
}

const deletetrend = async(req,res)=>{
    const{id}=req.params
   // const data = await trending.findById(id)
    //const image = data.image
   // const length = "http://localhost:3000/".length
    //const imagename = image.slice(length)
    //fs.unlink(`storage/${imagename}`,(err)=>{
      //  if(err){
        //    console.log(err)
        //} else{
          //  console.log('image delete successfully')
       // }
    //})

    await trending.findByIdAndDelete(id)
    res.status(200).json({
        messege:"delete successfully"
    })
}

const gettrend = async(req,res)=>{
  const data = await trending.find()
  if(data == 0){
    res.status(404).json({
        info:"no data found"
    })
  }else{
    res.status(200).json({
        messege:"data found",
        data:data
    })
  }
}
module.exports = {trendings,deletetrend,gettrend}