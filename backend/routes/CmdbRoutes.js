const router = require('express').Router()

const CmdbController = require('../controllers/CmdbController')

// middlewares
const verifyToken = require('../helpers/check-token')


router.post(
  '/create',
  verifyToken,
  CmdbController.create,
)
router.get('/', CmdbController.getAll)
//router.get('/list', CmdbController.getAll)

router.get('/mypets', CmdbController.getAllUserCmdb)
router.get('/myadoptions', verifyToken, CmdbController.getAllUserAdoptions)
router.get('/:id', CmdbController.getCmdbById)
router.delete('/:id', verifyToken, CmdbController.removeCmdbById)
router.patch(
  '/:id',
  verifyToken,
  CmdbController.updateCmdb,
)
router.patch('/schedule/:id', verifyToken, CmdbController.schedule)
router.patch('/conclude/:id', verifyToken, CmdbController.concludeAdoption)

module.exports = router
