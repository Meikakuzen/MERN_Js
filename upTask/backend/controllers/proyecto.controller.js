import Proyecto from '../models/Proyecto.model.js'


const obtenerProyectos = async (req,res)=>{
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)
    res.json(proyectos)
}

const obtenerProyecto = async (req,res)=>{
    const {id} = req.params

    const {usuario} = req

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(403).json({msg: error.message})
    }

    res.json(proyecto)
}

const crearProyecto = async (req,res)=>{
     const proyecto = new Proyecto(req.body)
     proyecto.creador = req.usuario._id

     try {
       const proyectoAlmacenado= await proyecto.save()
       res.json(proyectoAlmacenado)
     } catch (error) {
        console.log(error)
     }
}

const editarProyecto = async (req,res)=>{
    const {id} = req.params

    const {usuario} = req

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(403).json({msg: error.message})
    }

    try {
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(proyectoActualizado)
        
    } catch (error) {
        console.log(error)
    }

}

const eliminarProyecto = async(req,res)=>{
    const {id} = req.params

    const {usuario} = req

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(403).json({msg: error.message})
    }

    try {
        await proyecto.deleteOne()
        return res.status(200).json({msg: "Proyecto eliminado correctamente!"})
    } catch (error) {
        console.log(error)
    }
}

const agregarColaborador = (req,res)=>{
    console.log('Agregar colaborador')
}

const eliminarColaborador = (req,res)=>{
    console.log('Eliminar colaborador')
}


export default{
    obtenerProyectos,
    obtenerProyecto,
    crearProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}