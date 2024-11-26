const mongoose = require('mongoose')
const signUp = require('../model/modelSignUp')
const bcrypt = require('bcrypt')
const connectToDatabase = async()=>{
    const connectionstring = process.env.connectionstring
    await mongoose.connect(connectionstring)
console.log('database connect succesfully!!')
const control = await signUp.findOne({email:"admin@gmail.com"})
if(!control){
    await signUp.create({
        username:"admin123",
        password:bcrypt.hashSync('123',12),
        email:"admin@gmail.com",
        role:"admin"
    })
    console.log('admin data seeded successfully!!')
}
else{
    console.log('admin data already seeded!!')
}
}

module.exports = connectToDatabase