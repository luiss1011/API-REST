const joyasModel = require('../models/joyasModel')

function buscarTodo(req, res) {
    joyasModel.find({})
    .then(joyas => {
        if (joyas.length) {
            return res.status(200).send({joyas}) 
        }
        return res.status(204).send({menaje: "No hay nada que mostrar"}) // Se manda pero bo hay información
    })
    .catch(e => {return res.status(404).send({mensaje: `Eror al consultar la información ${e}`})})
}

function agregarJoya(req, res) {
    
    new joyasModel(req.body).save()
    .then(info => {
        return res.status(200).send({
            mensaje: "La información se guardo de forma correcta",
            info
        })
    })
    .catch(e => {return res.status(404).send({
        mensaje:`error al guardar ${e}`
    })})
}

function buscarJoya(req, res, next) {
    if (!req.body) req.body = {}
    var consulta = {}
    consulta[req.params.key] = req.params.value
    
    joyasModel.find(consulta)
    .then(joyas => {
        if (!joyas.length) return next();
        req.body.joyas = joyas
        return next()
    })
    .catch(e => {
        req.body.e = e
        return next()
    })
}

function eliminarJoya(req, res) {
    var joyas = {}
    joyas = req.body.joyas

    joyasModel.deleteOne(joyas[0])
    .then(info =>{
        return res.status(200).send({mensaje: "La información se elimino de forma correcta", info})
    })

    .catch(e => {
        return res.status(404).send({mensaje: "error al eliminar información", e})
    })

}

function actualizarJoya(req, res) {
    var joyas = {}
    
    if (!joyas || joyas.length) {
        return res.status(200).send({
            mensaje: "No se encontró la joya modificada",
            info
        })
    }

    joyasModel.updateOne(joyas[0], req.body)
    .then(info => {
        return res.status(200).send({
            mensaje: "La información se actualizó correctamente",
            info
        })
    })
    .catch(e => {
        return res.status(404).send({
            mensaje: "Error al actualizar la información", e
        })
    })
}


function mostrarJoya(req, res) {
    if(req.body.e){return res.status(404).send({mensaje: `error al buscar la información`})}
    if(!req.body.joyas){return res.status(204).send({mensaje: "No hay nada que mostrar"})}
    let joyas = req.body.joyas
    return res.status(200).send({joyas})
}

module.exports = {
    buscarTodo,
    agregarJoya,
    buscarJoya,
    mostrarJoya,
    eliminarJoya,
    actualizarJoya
}
