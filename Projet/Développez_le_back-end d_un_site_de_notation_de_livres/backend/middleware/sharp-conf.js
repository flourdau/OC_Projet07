const sharp = require("sharp")
const fs = require("fs")

module.exports = async (req, res, next) => {
    if (!req.file) { return next() }
        try {
            await sharp(req.file.path)
                .webp({ quality: 90 })
                .resize({ width: 400, height: 500 })
                .toFile(`${ req.file.path.split('.')[0] }transformed.webp`)

            fs.unlink(req.file.path, (error) => {
                req.file.path = `${req.file.path.split('.')[0]}transformed.webp`
                if (error) { console.log(error, 'Image not deleted') }
                next()
            })}
    catch(error) { res.status(500).json({ error: 'Image not transformed' }) }}