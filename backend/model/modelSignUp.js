const mongoose =require('mongoose')

 const modal = mongoose.Schema({
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
role:{
    type:String,
    enum:["user","admin"],
    default:"user"
}

})

const signUp = new  mongoose.model('signUp',modal)

module.exports = signUp