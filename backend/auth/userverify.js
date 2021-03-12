module.exports={
    verifyToken
}
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).json({error:'Unauthorized'});
    }
    else{
        let token= req.headers.authorization.split(' ')[1];

        if(token == null){
            return res.status(401).json({error:'Unauthorized'});
        }
        else{
            jwt.verify(token,process.env.JSONSECRET,(err,payload)=>{
                if(err){
               // console.log(err);
                return res.status(401).json({error:'Unauthorized'});
            }
            else{
                console.log(payload);
                req.id=payload.id;
                req.email=payload.email;
                next();
            }
            });
        }
    }
}