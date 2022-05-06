import DBConnection from "../db/connection.js"
import util from 'util'

export const discountSpecial = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    var pricing
    let queryRes  = await query( 
        `
        SELECT harga_kamar FROM jenis_kamar
        WHERE id = ?
        `, [jenis_kamar_id]
    )
    let queryApr = await query(
        `
        SELECT * FROM tb_diskon WHERE id = 2
        `
    )
    pricing = queryRes[0].harga_kamar - queryRes[0].harga_kamar * queryApr[0].diskon/100
    return pricing
}

export const normalPrice = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes  = await query( 
    `
    SELECT harga_kamar FROM jenis_kamar
    WHERE id = ?
    `, [jenis_kamar_id])
    return queryRes[0].harga_kamar
}

