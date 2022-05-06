import DBConnection from "../../db/connection.js"



export const getDataKamar=(req,res)=>{
    let query = `SELECT jk.name AS nama_jenis_kamar, jk.harga_kamar, k.* , ik.* FROM kamar AS k 
    LEFT JOIN jenis_kamar AS jk 
    ON jk.id = k.jenis_kamar
    LEFT JOIN (
        SELECT GROUP_CONCAT(ik.nama SEPARATOR '|||') AS detail, ik.kamar_id FROM inventory_kamar AS ik 
        GROUP BY ik.kamar_id
    ) AS ik
    ON ik.kamar_id=k.id
 WHERE k.jenis_kamar = ?`

 DBConnection.query(query,[req.query.jenis_kamar],(err,result)=>{
     if(err) throw err;
     res.status(201).send({
         status:1,
         data:result
     })
 })
}