export const targetIDCheck=(req,res,next)=>{
    if(req.query.id == null || req.query.id == undefined){
        res.status(400).send({
            status:0,
            message:"ID not defined"
        })
        return
    }
    next()
}