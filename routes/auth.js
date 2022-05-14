
/*
Rutas de usuarios  /auth
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router= Router();
const {validarJWT} = require('../middlewares/validar-jwt')


const {crearUsuario,loginUsuario, revalidarToken} =require('../controllers/auth') ;
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/new',
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
        
    ]
     ,
     crearUsuario);

router.post(
    '/',
    [

        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos

    ],
    loginUsuario);

router.get('/renew',
    [
        validarJWT
    ],
    revalidarToken);





module.exports = router;