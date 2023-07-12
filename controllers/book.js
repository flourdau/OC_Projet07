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
    const bookObject =  JSON.parse(req.body.book)

    // Check if picture
    if (!req.file) {
        console.log('No Picture')
        return res
            .status(500)
            .json({ message: 'No Picture' })
    }

    // Creation Object
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename.split('.')[0] }transformed.webp`,
        averageRating: bookObject.ratings[0].grade
    })

    // & save in database
    book.save()
        .then(() => res.status(201).json({ message: 'Object saving !' }))
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
        imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename.split('.')[0] }transformed.webp`,
    } : { ...req.body.book }

    // deletion of the _userId field sent by the client (no customer confidence)
    // in order to avoid changing its owner 
    // and we have verified that the requester is indeed the owner of the object.
    delete bookObject.userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) { res.status(400).json({ message : 'Not authorized'}) }
            else {
                // Delete old images & update
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Book.updateOne({_id: req.params.id }, { ...bookObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message : 'Object update!' }))
                        .catch(error => res.status(401).json({ error }))})
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
                        .then(() => { res.status(200).json({message: 'Object deleted !'})})
                        .catch(error => res.status(401).json({ error }))})}})
        .catch( error => { res.status(500).json({ error }) })}


// Function for calculating average book ratings
function newAverageRating(newArrayRating) {
    // Total of rating
    const newTotal = newArrayRating.reduce((total, note) => total + note.grade, 0)
    // Average of array
    const average = newTotal / newArrayRating.length
    // Return float with 2 number after comma
    return parseFloat(average.toFixed(2))
}


// Add or update rating book
exports.rateBook = (req, res, next) => {
    const user = req.body.userId;

    if (user != req.auth.userId) { res.status(401).json({message: 'Not authorized'}) } 

    else {
        // Search a book with ID
        Book.findOne({ _id: req.params.id })
        .then(book => {
            // Check if not a book is already rated
            if (book.ratings.find(rating => rating.userId === user)) {
                res.status(401).json({ message: 'Livre déjà noté' })
            }
            else {
                    // Else created a new rating
                    const newRating = {
                        userId: user,
                        grade: req.body.rating,
                        _id: req.body._id
                    }

                    // Add new rating in average array
                    const newArrayRating = [
                        ...book.ratings,
                        newRating
                    ]
                    
                    // Calculation of the new average
                    const updateAverageRating = newAverageRating(newArrayRating);

                    Book.findOneAndUpdate(
                        // Select all documents in the book collection where user is not equal to 20:
                        { _id: req.params.id, 'ratings.userId': { $ne: user } },
                        // $Push add a value in array 
                        { $push: { ratings: newRating }, averageRating: updateAverageRating },
                        // Creating a new document if not exist
                        { new: true })
                        .then(updatedBook => res.status(201).json(updatedBook))
                        .catch(error => res.status(401).json({ error }))}})
            .catch(error => res.status(401).json({ error }))}}


// Sort book by best rating
exports.getBestBook = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 }) // -1 for sort by ascending 
        .limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(401).json({ error }))}