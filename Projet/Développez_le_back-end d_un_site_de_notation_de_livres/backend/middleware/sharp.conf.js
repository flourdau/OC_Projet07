const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
// const sharp = require('sharp-multer')
const fs = require("fs");

// const app = express();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

module.exports = async (req, res, next) => {
    // if (!req.file) { 
    //     return next() }
        try {
            // await sharp(req.file.path)
            // .webp({ quality: 90 })
            // .resize({ width: 400, height: 500 })
            // .toFile(`${ req.file.path.split('.')[0] }transformed.webp`)
            
            console.log('Youpi')
            fs.unlink(req.file.path, (error) => {
                req.file.path = `${req.file.path.split('.')[0]}transformed.webp`
                if (error) { console.log(error, 'Image not deleted') }
                next()
            })}
    catch(error) { res.status(500).json({ error: 'Image not transformed' }) }}