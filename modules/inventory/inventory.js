import DBConnection from "../../db/connection.js"



export const createInventory=(req,res)=>{
    const data = req.body 

    let queryData = [
        data.name,
        data.keterangan
    ]
    DBConnection.query(`INSERT INTO inventory_hotel(name,keterangan) VALUES ?`,[[queryData]],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}



export const getInventory=(req,res)=>{
    DBConnection.query(`SELECT * FROM inventory_hotel`,(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}

export const deleteInventory=(req,res)=>{
    DBConnection.query(`DELETE FROM inventory_hotel WHERE id = ?`,[req.query.inventory_id],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}

export const editInventory=(req,res)=>{

}