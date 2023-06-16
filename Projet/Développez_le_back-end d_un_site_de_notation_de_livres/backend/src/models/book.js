const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true }, // identifiant MongoDB unique de l'utilisateur
    title: { type: String, required: true }, // titre du livre
    author: { type: String, required: true }, // auteur du livre
    imageUrl: { type: String, required: true }, // illustration/couverture du livre
    year: { type: Number, required: true }, //  année de publication du livre
    genre: { type: String, required: true }, // genre du livre
})

module.exports = mongoose.model('Book', bookSchema)
