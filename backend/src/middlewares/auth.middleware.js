const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const auth = async(req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.AccessKey, (err, decoded)=>{
        if(err){
            res.send({"msg": "Token Expires"})
        } else {
            req.userId = decoded.userId
            next()
        }})
    } else{
        res.send({"msg":"Token not Found"})
    }
}

module.exports = {auth}