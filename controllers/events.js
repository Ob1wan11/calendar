const {response, request } = require('express');
const Evento = require('../models/Evento')




const getEventos = async (req=request,res=response)=>{

    const eventos = await Evento.find().populate('user', 'name');
    
   
    return res.status(200).json({
        ok:true,
        eventos: eventos
          
    })

}

const crearEvento = async (req=request,res=response)=>{
   
    const evento = new Evento(req.body);
        console.log(req)    
    try {

        evento.user=req.uid;

       const eventoGuardado= await evento.save();

       return res.status(200).json({
           ok:true,
           evento: eventoGuardado
       })
       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
        
    }

}

const actualizarEvento = async (req=request,res=response)=>{
   
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento= await Evento.findById(eventoId);

        if (!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'Error de permisos sobre este evento'                
            })
        };

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento , {new:true})

        return res.json({
            ok:true,
            evento:eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }

    return res.status(200).json({
        ok:true,
        eventoId
          
    })

}

const eliminarEvento = async (req=request,res=response)=>{
   
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento= await Evento.findById(eventoId);

        if (!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'Error de permisos sobre este evento'                
            })
        };

        // const nuevoEvento = {
        //     ...req.body,
        //     user: uid
        // }

        // const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento , {new:true})
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId)
        return res.json({
            ok:true,
            // evento:eventoEliminado
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }

  

}





module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}