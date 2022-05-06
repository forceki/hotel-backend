
import DBConnection from "../db/connection.js";
import util from 'util';
let d = new Date()
const formatNomorDokumen=(penomoran)=>{
    const invoice = "INV-Kmr"
    penomoran.formatted=`${invoice}.${new Date(penomoran.created_at).getFullYear()}/${new Date(penomoran.created_at).getMonth()+1}/${d.getDate(penomoran.created_at)}-${penomoran.nomor}`
    return penomoran
}



export const getNomor=async()=>{
    const invoice = "INV-Kmr"

    const query=util.promisify(DBConnection.query).bind(DBConnection)

    let queryRes = await query(`SELECT * FROM penomoran_dokumen
    WHERE
            YEAR(created_at)=YEAR(CURDATE()) 
            AND MONTH(created_at)=MONTH(CURDATE()) 
            AND DAY(created_at)=DAY(CURDATE())
    ORDER BY id DESC
    LIMIT 1`)


    if(queryRes.length == 0){
        queryRes.nomor = 1
        queryRes.name = invoice
        queryRes.created_at=new Date();
        queryRes=formatNomorDokumen(queryRes)
        return queryRes
    }
    queryRes=queryRes[0]

    if(queryRes.nomor == null){
        queryRes.nomor=1;
        queryRes.created_at=new Date();
        queryRes=formatNomorDokumen(queryRes)
        return queryRes
    }
   
    
    queryRes.nomor+=1
    queryRes=formatNomorDokumen(queryRes)
    return queryRes
}


export const createNomor=async(nomor)=>{
   
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes = await query(`INSERT INTO penomoran_dokumen(name,nomor) VALUES ?`,[[[nomor.formatted,nomor.nomor]]])

    return queryRes[0]
}