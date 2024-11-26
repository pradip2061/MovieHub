const mongoose = require('mongoose')

const movie = mongoose.Schema({
    moviename:{
        type:String
    },
    movietype:{
        type:String
    },
    movieduration:{
        type:String
    },
    moviedescription:{
        type:String
    },
    image:{
        type:String
    },
    userimage:{
        type:String
    },
    username:{
        type:String
    },
    userid:{
        type:String
    }
},{timestamps:true})
const movies = new mongoose.model('movies',movie)

module.exports = movies
