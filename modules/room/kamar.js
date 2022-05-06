import DBConnection from "../../db/connection.js"


//kamar
export const getKamar = (req, res)=>{
    let query  = 
    `
    SELECT jk.name AS nama_jenis_kamar, jk.harga_kamar, jk.max_kapasitas, k.* FROM kamar AS k 
    LEFT JOIN jenis_kamar AS jk 
    ON jk.id = k.jenis_kamar 
    `
    DBConnection.query(query,  (err, result )=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}


export const getKamarByJenis = (req, res)=>{        
    let query  = 
    `
    SELECT jk.name AS nama_jenis_kamar, jk.harga_kamar, jk.max_kapasitas, k.* FROM kamar AS k 
    LEFT JOIN jenis_kamar AS jk 
    ON jk.id = k.jenis_kamar 
    WHERE k.jenis_kamar = ? AND k.is_boking = 0
    `
    DBConnection.query(query, [req.query.jenis_kamar_id], (err, result )=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}

export const getKamarId = (req,res) =>{
    let query  = 
    `
    SELECT jk.name AS nama_jenis_kamar, jk.harga_kamar, jk.max_kapasitas, k.* FROM kamar AS k 
    LEFT JOIN jenis_kamar AS jk 
    ON jk.id = k.jenis_kamar 
    WHERE id = ?
    `
    DBConnection.query(query,[req.query.id],(err, result )=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })   
}

export const editKamar =(req,res)=>{
    const data =req.body

    let dataQuery = [
        data.name,
        data.jenis_kamar,
        data.kamar_id
    ]

    let query = `UPDATE kamar SET name = ? , jenis_kamar = ?  WHERE id = ?`


    DBConnection.query(query,dataQuery,(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}

export const createKamar = (req,res)=>{
    const data = req.body
    let file;
    if (req.file) {
        file = req.file.filename
        let query =
        `
        INSERT INTO kamar (name, jenis_kamar,foto,keterangan) VALUES ?
        `
        let dataQuery = [
            data.name,
            data.jenis_kamar,
            file,
            data.keterangan
        ]
    
        DBConnection.query(query, [[dataQuery]], (err, result )=>{
            if(err) throw err
            return res.status(201).send({
                "status": 1,
                "result": result
            })
        })
    }else{
        let query =
        `
        INSERT INTO kamar (name, jenis_kamar,keterangan) VALUES ?
        `
        let dataQuery = [
            data.name,
            data.jenis_kamar,
            data.keterangan
        ]
    
        DBConnection.query(query, [[dataQuery]], (err, result )=>{
            if(err) throw err
            return res.status(201).send({
                "status": 1,
                "result": result
            })
        })
    }
}

export const deletekamar = (req, res)=>{
    let query = 
    `
    DELETE FROM kamar WHERE id = ?
    `
    DBConnection.query(query,[req.query.id], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}



//inventory_kamar

export const getInventory=(req,res)=>{
    DBConnection.query(`SELECT * FROM inventory_kamar WHERE jenis_kamar_id = ?`,[req.query.id],(err,result)=>{
	  if(err) throw err;
	  res.status(201).send({
		status:1,
		data:result
	  })
	})
}

export const editInventory=(req,res)=>{
    const data =req.body
    let queryData = []
    let query  = ``
    for(let i of data.inventory){
        queryData.push(i.nama,i.id);
        query += 'UPDATE inventory_kamar SET nama = ? WHERE id = ?;'
    }
    
    DBConnection.query(query,queryData,(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}

export const deleteInventory=(req,res)=>{
    DBConnection.query(`DELETE FROM inventory_kamar WHERE id = ? AND jenis_kamar_id = ?`,[req.query.id,req.query.kamar_id],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            message:"data berhasil di hapus"
        })
    })
}

export const createInventory=(req,res)=>{
    const data = req.body
    DBConnection.query(`INSERT INTO inventory_kamar(jenis_kamar_id,nama) VALUES ?`,[[[data.jenis_kamar,data.nama]]],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })
}


//jenis kamar

export const getJenisKamar = (req,res)=>{
    let query = 
    `
    SELECT jk.*, ka.* FROM jenis_kamar AS jk
    LEFT JOIN (
        SELECT COUNT(k.jenis_kamar) AS jumlah, k.jenis_kamar AS jenis_kamar_id FROM kamar AS k
        GROUP BY k.jenis_kamar 
    ) AS ka
    ON ka.jenis_kamar_id=jk.id
    `

    DBConnection.query(query, (err, result)=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}


export const getJenisKamarById = (req,res)=>{
    let query = 
    `
    SELECT jk.*, ka.* FROM jenis_kamar AS jk
    LEFT JOIN (
        SELECT COUNT(k.jenis_kamar) AS jumlah, k.jenis_kamar AS jenis_kamar_id FROM kamar AS k
        GROUP BY k.jenis_kamar 
    ) AS ka
    ON ka.jenis_kamar_id=jk.id
    WHERE jk.id = ?
    `

    DBConnection.query(query,[req.query.jenis_kamar_id],(err, result)=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}

export const createJenisKamar = (req, res)=>{
    const data = req.body

    DBConnection.query('SELECT * FROM jenis_kamar WHERE name IN (?)',[data.name],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            return res.status(200).send({
                status:0,
                message : "Name telah terdaftar"
            })
        }
    })

    let query = 
    `
    INSERT INTO jenis_kamar (name, harga_kamar, max_kapasitas, foto) VALUES ?
    `
    let dataQuery = [
        data.name,
        data.harga_kamar,
        data.max_kapasitas,
        data.foto
    ]

    DBConnection.beginTransaction()
    DBConnection.query(query, [[dataQuery]], (err, result)=>{
        if (err) throw err
        let inv = []
        query = `INSERT INTO inventory_kamar (jenis_kamar_id, nama) VALUES ?`
        for(let key of data.inventory){
            inv.push([result.insertId, key])
        }
        DBConnection.query(query, [inv], (err, result)=>{
            if (err) throw err
            DBConnection.commit()
            res.status(201).send({
                "status" : 1,
                "result": result
            })
        })
    })  
}


export const editJenisKamar =(req,res)=>{
    const data =  req.body

    DBConnection.query(`SELECT * FROM jenis_kamar WHERE name IN (?)`,[data.name],(err,result)=>{
        if(err) throw err;
        if(result.length  > 0){
            return res.status(200).send({
                status:0,
                message : "Name telah terdaftar"
            })
        }
    })


    DBConnection.query(`UPDATE jenis_kamar SET name = ? ,harga_kamar = ?, max_kapasitas = ? WHERE id = ? `,[data.name,data.harga_kamar,data.max_kapasitas, data.jenis_kamar_id],(err,result)=>{
        if(err) throw err;
        res.status(201).send({
            status:1,
            data:result
        })
    })

}

export const deleteJenisKamar = (req,res)=>{    
    let query = 
    `
    DELETE FROM jenis_kamar WHERE id = ?
    `

    DBConnection.query(query, [req.query.id], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}
