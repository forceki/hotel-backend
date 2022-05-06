import DBConnection from "../../db/connection.js"





export const getServiceHotel=(req,res)=>{
    let query = `SELECT * FROM services_hotel`
    DBConnection.query(query,(err,result)=>{
        if(err) throw err;
        res.status(200).send({
            status:1,
            data:result
        })
    })
}



export const createServiceHotel=(req,res)=>{
    DBConnection.query(`INSERT INTO services_hotel(name,keterangan,logo) VALUES ?`,[[[req.body.name,req.body.keterangan,req.body]]],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}



export const editServiceHotel=(req,res)=>{
    DBConnection.query(`UPDATE services_hotel SET name = ? ,keterangan = ?,logo= ?  WHERE id=  ?`,[[[req.body.name,req.body.keterangan,req.body.log,req.body.service_hotel_id]]],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}



export const deleteServiceHotel=(req,res)=>{
    DBConnection.query(`DELETE FROM services_hotel WHERE id = ?`,[req.query.service_hotel_id],(err,result)=>{
        if(err) throw err
        res.status(201).send({
            status:1,
            data:result
        })
    })
}