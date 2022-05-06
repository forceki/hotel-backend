import DBConnection from "../../db/connection.js"
import util from 'util'
import { discountSpecial, normalPrice } from "../../functions/discountGenerator.js"
import { createNomor, getNomor } from "../../functions/penomoran.js"


//rafli
export const getBookingRoom = (req,res)=>{
    let query = 
    `
    SELECT * FROM pemesanan_kamar
    `
    DBConnection.query(query,  (err, result)=>{
        if (err) throw err
        res.status(200).send({
            "status" : 1,
            "result": result
        })
    })
}

export const createBookingRoom = async (req,res) => {
    const data = req.body
    DBConnection.beginTransaction()
    let query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes
    let queryApr 
    let id
    let pricing
    try {
        let dataQuery = [
            data.kamar_id,
            req.user.id,
            data.nama_user,
            data.no_telp,
            data.email
        ]
       
        queryApr = await query(`SELECT * FROM kamar WHERE id = ?`, dataQuery[0])
        if(queryApr[0].status == 1){
            res.status(400).send({
                "status" : 0,
                "message": "kamar sudah terbook"
            })
            return
        }
        pricing = await normalPrice(queryApr[0].jenis_kamar)
        var today = new Date();
        if(today.getDay() == 6 || today.getDay() == 0)
        {
            pricing = await discountSpecial(queryApr[0].jenis_kamar)
        }
        // if(user || weekend lesgo diskon){
        //     pricing = await discountSpecial(queryApr[0].jenis_kamar)
        // }
        dataQuery.push(pricing)
        queryRes = await query(`INSERT INTO pemesanan_kamar (kamar_id, created_at, created_by, nama_user, no_telp, email, pricing ) 
                                VALUES ?`, [[dataQuery]])
        queryApr = await query(`SELECT * FROM pemesanan_kamar WHERE id = ${queryRes.insertId}`)
        id = queryApr[0].kamar_id

        queryRes = await query(`UPDATE kamar SET status = 1 WHERE id = ${id}`)

        queryRes = await query(`INSERT INTO log_pemesanan_kamar (kamar_id, created_at, created_by, nama_user, no_telp, email, pricing ) VALUES ?`, [[dataQuery]]) 
       
        DBConnection.commit()
        res.status(201).send({
            "status" : 1,
            "result": queryRes
        })
    } catch (err) {
        console.log(err);
        DBConnection.rollback()
        return res.status(500).send({
            status:0,
            message:err
        })
    }
}

export const updateBookingRoom = (req,res)=>{
    const data = req.body
    let query = 
    `
    UPDATE pemesanan_kamar SET (kamar_id, created_at, created_by) VALUES ?
    WHERE id = ${req.params.id}
    `
    let dataQuery = [
        data.kamar_id,
        data.created_at,
        req.user.id,
        data.nama_user,
        data.no_telp,
        data.emailmne 
    ]

    DBConnection.query(query, [[dataQuery]], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status" : 1,
            "result": result
        })
    })
}

export const deleteBookingRoom = (req,res)=>{
    const id = req.params.id

    DBConnection.beginTransaction()
    DBConnection.query(`SELECT * FROM pemesanan_kamar WHERE id = ?`, id, (err,result)=>{
        if (err) throw err
        DBConnection.query(`UPDATE kamar SET status = 0 WHERE id = ?`, result[0].kamar_id,(err, result)=>{
           if(err) throw err
           let query = 
           `
           DELETE FROM pemesanan_kamar WHERE id = ?
           `
           DBConnection.query(query, [id], (err, result)=>{
                if (err) throw err
                DBConnection.commit()
                res.status(201).send({
                    "status": 1,
                    "result": result
                })
            })
        })
    })
}




//uus   

export const createPemesananKamar = async(req,res)=>{
    const data = req.body   
    let nomor = await getNomor()
   
    let dataQuery = []   
    let updateData = []
    let querySet = ``
    console.log(req.user)
    for(let item of data.pesanan){
        dataQuery.push([
            item.kamar_id,
            data.check_in,
            data.check_out,
            req.user.id,
            nomor.formatted
        ])

        updateData.push(item.kamar_id)

        querySet+= `UPDATE kamar SET is_boking = 1 WHERE id = ?;`
    }

    let query = `
        INSERT INTO pemesanan_kamar(kamar_id,check_in,check_out,customer_id,nomor_pemesanan) VALUES ? 
    `
    DBConnection.beginTransaction()
    DBConnection.query(query,[dataQuery],(err,result)=>{
        if(err) throw err;
        DBConnection.query(querySet,updateData,(err,result)=>{
            if(err) throw err;
            let create = createNomor(nomor)
            DBConnection.commit()
            res.status(201).send({
                status:1,
                data:result
            })
        })
    })
}

export const getPemesananKamar = (req,res) =>{
    let query = `SELECT pk.*,k.* FROM pemesanan_kamar AS pk
                 LEFT JOIN kamar AS k
                 ON k.id=pk.kamar_id
                 LEFT JOIN customer AS c
                 ON c.id=pk.customer_id
                `
    DBConnection.query(query,(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}

export const editPemesananKamar=(req,res)=>{
    const data = req.body

    let dataQuery = [
        data.kamar_id,
        data.check_in,
        data.check_out,
        res.locas.user.id,
        data.nomor_pemesanan
    ]
}



export const createPemesananKamarV2 = async(req,res)=>{
    const data = req.body   
    let nomor = await getNomor()
   
    let updateData = []   
    let dataQuery = [
        data.check_in,
        data.check_out,
        req.user.id,
        nomor.formatted
    ]
    let dataKamar = []
    let query = `
    INSERT INTO pemesanan_kamar(check_in,check_out,customer_id,nomor_pemesanan) VALUES ? 
    `
    DBConnection.beginTransaction()
    DBConnection.query(query,[[dataQuery]],(err,result)=>{
        if(err) throw err;
        let querySet = ``
        console.log(req.user)
        for(let item of data.pesanan){
            dataKamar.push([
                result.insertId,
                item
            ])
            updateData.push(item)

            querySet+= `UPDATE kamar SET is_boking = 1 WHERE id = ?;`
        }
        query = `INSERT INTO pemesanan_kamar_detail (pemesanan_kamar_id,kamar_id) VALUES ?`
        DBConnection.query(query,[dataKamar],(err,result)=>{
            if(err) throw err;
            DBConnection.query(querySet,updateData,(err,result)=>{
                if(err) throw err;
                let create = createNomor(nomor)
                DBConnection.commit()
                res.status(201).send({
                    status:1,
                    data:result
                })
            })
        })



    })
}