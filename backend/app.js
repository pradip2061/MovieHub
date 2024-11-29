const express = require('express')
const app = express()
const connectToDatabase = require('./database/index')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const userRouter = require('./router/userRouter')
require('dotenv').config();

app.use(express.static('./storage'))
app.use(cors({
    origin:['http://localhost:5173/','https://imaginative-crepe-0b9174.netlify.app']
}))
app.use(cookieparser())
app.use(express.json())
//app.use(express.static('./storage'))

connectToDatabase()

app.use('/movie', userRouter)






const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`the project is running at port ${PORT}`)
})