import DBConnection from '../../db/connection.js';

export const RoleController=(req,res)=>{
    DBConnection.query('SELECT * FROM roles',  (err, result )=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}
