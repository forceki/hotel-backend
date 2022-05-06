import jwt from 'jsonwebtoken';
import DBConnection from '../db/connection.js';

export const superAdmin=(req,res,next)=>{
    var res_locals_user
    const auth=req.headers.authorization;
    if(auth === undefined){
        res.status(401).send({
            "status":0  
        });
        return
    }
    const authSplit=auth.split(" ");
    if(authSplit.length < 2){
        res.status(401).send({
            "status":0
        });
        return
    }
    const token=authSplit[1]
    jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.status(401).send({
                "status":0,
                "message":err
            })
            return
        }
        res_locals_user=decoded
    })

    DBConnection.query(`
    SELECT roles
    FROM users 
    WHERE users.id = ?`, [[res_locals_user.id]],(err, results) => {
        if(results[0].roles_id != 1){
            res.status(401).send({
                "status":0,
                "message": "user do not have authorized role"
            })
            return
        }
        next()
    })
}