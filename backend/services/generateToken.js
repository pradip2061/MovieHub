const jwt = require('jsonwebtoken')

 const generateToken = (id)=>{
    const token = jwt.sign({userid:id},process.env.secret_key,{
    expiresIn:'365d'
 })
return token
}

module.exports = generateToken