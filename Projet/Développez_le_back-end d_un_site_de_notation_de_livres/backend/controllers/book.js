const Book = require('../models/book')
const fs = require('fs');
const path = require('path');
const express = require('express')

const app = express()


// Creation book
exports.createBook = (req, res, next) => {
    // Delete params for use database params
    delete req.body._id
    delete req.body._userId

    // Get body request
    const bookObject =  JSON.parse(req.body.book);

    // Creation Object
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename.split('.')[0] }transformed.webp`,
        averageRating: bookObject.ratings[0].grade
    })

    // & save in database
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch((error) => res.status(400).json({ error }))}


// Get All books
exports.getAllBook = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }))}


// Get one book with id
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }))}


// Modification book
exports.modifyBook = (req, res, next) => {
    // Check if the image exists
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body.book }

    // deletion of the _userId field sent by the client (no customer confidence)
    // in order to avoid changing its owner 
    // and we have verified that the requester is indeed the owner of the object.
    delete bookObject.userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) { res.status(400).json({ message : 'Not authorized'}) }
            else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message : 'Objet update!' }))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => res.status(400).json({ error }))}


exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) { res.status(401).json({message: 'Not authorized'}) } 
            else {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }))})}})
        .catch( error => { res.status(500).json({ error }) })}
