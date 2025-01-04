const signUp = require('../model/modelSignUp')
const bcrypt = require('bcrypt')
const generateToken = require('../services/generateToken')
const jwt = require('jsonwebtoken')
//signup 
 const signup = async(req,res)=>{
    const { username,password,email}= req.body
    if (!username && !password && !email){
        res.status(400).json({
            messege:'field is empty'
        })
    } else{
    await signUp.create({
        username,
        password:bcrypt.hashSync(password,10),
        email
    
    }) 
    res.status(200).json({
        messege:'signUp successfully!!'
    }) }
    }

    //login 
     const login =  async(req,res)=>{
        const {email,password}=req.body
        if(!email || !password){
        res.status(400).json({
            messege:'please provide email,password'
        })
        return
        }
        
        const data = await signUp.find({email:email})
        
        if(data.length == 0){
            res.status(400).json({
                messege:'user not found'
            })
            
        } else{ 
            const verify = bcrypt.compareSync(password,data[0].password)
            if(!verify){
                res.status(400).json({
                    messege:'password is wrong'
                })
            } else{
               const token = generateToken(data[0].id)
        
                res.status(200).json({
                    messege:'log in succesfully',
                    token,
                    data
                })
            }
        }
        }


    const redirect =async(req,res)=>{
        const token=req.body.tokens
      
        if(token){
        const decoded = jwt.verify(token,process.env.secret_key)
       
        const data = await signUp.findById(decoded.userid)
        res.status(200).json({
            data:data
        })
    }
        else{
            res.status(400).json({
                messege:'user need to login/register'
            })
        }
    }

    module.exports = {signup,login,redirect}
    