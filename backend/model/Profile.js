const mongoose = require('mongoose')
const schema =  new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userid:{
        type:String,
    }

},{
    timestamps:true
})

const profile = mongoose.model('profile',schema)

module.exports = profile