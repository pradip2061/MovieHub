const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    movienames:{
        type:String,
        unique:true,
        required:true
    },
    movielanguage:{
        type:String,
        required:true
    },
   image:{
type:String
    },
    userid:{
        type:String,
    }
},{
    timestamps:true
})

const trending =  mongoose.model('trending',schema)
module.exports = trending