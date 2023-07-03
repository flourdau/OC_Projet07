const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const transformImg = require('../middleware/sharp-conf')
const multer = require('../middleware/multer.conf')

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBook)
router.get('/bestrating', bookCtrl.getBestBook);
router.post('/', auth, multer, transformImg, bookCtrl.createBook)
router.post('/:id/rating', auth, bookCtrl.rateBook);
router.get('/:id', bookCtrl.getOneBook)
router.put('/:id', auth, multer, transformImg, bookCtrl.modifyBook)
router.delete('/:id', auth, multer, bookCtrl.deleteBook)

module.exports = router