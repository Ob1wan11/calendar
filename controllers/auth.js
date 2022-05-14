const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');





const crearUsuario = async (req,res=response)=>{
   
    const {email,password} = req.body;
    
    try {

        let usuario = await Usuario.findOne({email});
        // console.log(usuario)
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'un usuario existe con ese correo'
            })
        }
       
  
        usuario = new Usuario(req.body);
        
        //encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

      
        return res.status(201).json({
            ok:true,
            uid: usuario.id,
            name : usuario.name,
            token
              
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })        
    }

}

const loginUsuario = async (req,res=response)=>{

    const {email,password} = req.body;

   
    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return  res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            })       
        } 

        // confirmar passwords encryptados
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }

        // password correcto  (generar JSON WEB TOKEN)
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token

        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })        
    }

}

const revalidarToken = async (req,res=response)=>{

    const uid= req.uid;
    const name= req.name;

    //generar nuevo Token
    const token= await generarJWT(uid, name);
       
    res.json({
        ok:true,
       token
     })

}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}