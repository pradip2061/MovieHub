const multer = require('multer')

 const storage =multer.diskStorage({
    destination:function(req,file,cb){
        const format = ['image/jpg','image/jpeg','image/png']
        if(!format.includes(file.mimetype)){
            cb(new error('file is not supported'))
    }else{
cb(null,'./storage')
    }
    },
    filename:function(req,file,cb){
cb(null,file.originalname)
    }
})

module.exports = {multer,storage}