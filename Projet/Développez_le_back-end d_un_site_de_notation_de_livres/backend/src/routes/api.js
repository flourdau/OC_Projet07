const express = require('express')
const router = express.Router()
const apiCtrl = require('../controllers/api')

router.post('/books', apiCtrl.createBook)
router.get('/books', apiCtrl.getAllBook)
router.get('/books/:id', apiCtrl.getOneBook)
router.put('/books/:id', apiCtrl.modifyBook)
router.delete('/books/:id', apiCtrl.deleteBook)

module.exports = router
