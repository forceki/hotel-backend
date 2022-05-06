import bcrypt from 'bcrypt';
import DBConnection from '../../db/connection.js';
import jwt from 'jsonwebtoken';




export const loginCostumer=(req,res)=>{
    DBConnection.query(`SELECT * FROM customer WHERE email = ?`, [req.body.email], (err, results) => {
        if(results.length == 0){
            res.status(400).send({
                "status":0,
                "reason": "password or email do not mach our record"
            })
            return
        }
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            const user = results[0]
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                console.log(results);
                delete user.password
                if (err){
                    throw err
                }
                if(res){
                    console.log(user.id);
                    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '2h' })
                    res.status(200).send({
                        "status":1,
                        "data":{
                            "token":token,
                            "user" : user
                        }
                    })
                }else{
                    res.status(400).send({
                        "status":0,
                        "reason": "password or email do not mach our record"
                    })
                }
            })
        }
    })
}