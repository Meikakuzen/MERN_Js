export const comprobarIdMongo = (req, res, next)=>{
    const {id} = req.params
    const _id = id.trim()

    if(!_id.match(/^[0-9a-fA-F]{24}$/)){
        const error = new Error("MongoId no válido")
        return res.status(401).json({msg: error.message})
    }
    next()
}