
/*
Rutas de eventos  /events
host + /api/events
*/

const {Router} = require('express');
const router= Router();
const {validarJWT} = require('../middlewares/validar-jwt')
const {check}=require('express-validator');


const {getEventos,crearEvento,actualizarEvento,eliminarEvento} =require('../controllers/events') ;
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');



//posar el middleWare de validació de token a un nivell superior per totes les rutes ennlloc de en cada una
// TOTES LES RUTES PER SOTA D'AQUESTA LINIA PASSEN PRIMER PER AQUI
router.use(validarJWT);



router.get('/', getEventos);

router.post('/', 
 [
    check('title','el titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de fin es obligatoria').custom( isDate ),
    validarCampos
 ]
,crearEvento);

router.put('/:id',
[
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
]
,actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;