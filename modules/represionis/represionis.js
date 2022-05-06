import DBConnection from "../../db/connection.js"



export const getRepresionis=(req,res)=>{
    
    let query = `
    SELECT pm.*, k.name AS nama_kamar, k.max_kapasitas, jk.name, c.username, c.no_telpon, c.email, c.jenis_kelamin FROM pemesanan_kamar AS pm
    LEFT JOIN kamar AS k
    ON k.id=pm.kamar_id
    LEFT JOIN jenis_kamar AS jk
    ON jk.id=k.jenis_kamar
    LEFT JOIN customer AS c
    ON c.id=pm.customer_id
    WHERE pm.check_in >= ? AND pm.check_in <= ?
    `

    DBConnection.query(query,[req.query.startDate,req.query.endDate],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}




export const pemesananKamarByRep=(req,res)=>{
    let query = `
    SELECT pm.*, c.username, c.no_telpon, c.email, c.jenis_kelamin, pkd.* FROM pemesanan_kamar AS pm
    LEFT JOIN(
        SELECT GROUP_CONCAT(
           pkd.id,'||', k.name, '||', jk.max_kapasitas ,'||', jk.name , '||', jk.harga_kamar
           SEPARATOR '|||' 
        ) AS detail, pkd.pemesanan_kamar_id FROM pemesanan_kamar_detail AS pkd
        LEFT JOIN kamar AS k
        ON k.id=pkd.kamar_id
        LEFT JOIN jenis_kamar AS jk
        ON jk.id=k.jenis_kamar
        GROUP BY pkd.pemesanan_kamar_id
    ) AS pkd
    ON pkd.pemesanan_kamar_id=pm.id
    LEFT JOIN customer AS c
    ON c.id=pm.customer_id
    WHERE pm.check_in >= ? AND pm.check_in <= ? 
    `

    DBConnection.query(query,[req.query.startDate,req.query.endDate],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}



export const pemesananKamarByCustomer=(req,res)=>{
    let query = `
    SELECT pm.*, c.username, c.no_telpon, c.email, c.jenis_kelamin, pkd.* FROM pemesanan_kamar AS pm
    LEFT JOIN(
        SELECT GROUP_CONCAT(
           pkd.id,'||', k.name, '||', jk.max_kapasitas ,'||', jk.name , '||', jk.harga_kamar
           SEPARATOR '|||' 
        ) AS detail, pkd.pemesanan_kamar_id FROM pemesanan_kamar_detail AS pkd
        LEFT JOIN kamar AS k
        ON k.id=pkd.kamar_id
        LEFT JOIN jenis_kamar AS jk
        ON jk.id=k.jenis_kamar
        GROUP BY pkd.pemesanan_kamar_id
    ) AS pkd
    ON pkd.pemesanan_kamar_id=pm.id
    LEFT JOIN customer AS c
    ON c.id=pm.customer_id
    WHERE pm.customer_id = ?
    `

    DBConnection.query(query,[req.user.id],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}