import bcrypt from 'bcrypt';
import DBConnection from '../../db/connection.js';

const cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
 };


 export const registerCustomer=(req,res)=>{
    const data = req.body
    
    cryptPassword(req.body.password,(err,hash)=>{
        if (err) { throw err; }
        DBConnection.query('SELECT * FROM customer WHERE email IN (?)',[data.email],(err,results)=>{
          if(err) throw err;
            
          if(results.length > 0){
            return res.status(200).send({
              status:0,
              message:"Email tersebut sudah terdaftar",
              data:[]
            })
          }
          let dataQuery = [
              data.username,
              data.email,
              hash,
              data.no_telepon,
              data.jenis_kelamin
          ]
          
          DBConnection.query('INSERT INTO customer (username,email,password,no_telpon,jenis_kelamin) VALUES ?', [[dataQuery]], function (error, results, fields) {
            if (error) throw error
            res.status(201).send({
              "status":1,
              "data":{
                  "message":results
              }
            })
          });

        })
      });  
 }