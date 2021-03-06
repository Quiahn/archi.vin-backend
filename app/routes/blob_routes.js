// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// Azure Blob Storage
const azure = require('@azure/storage-blob')

// pull in Mongoose model for blobs
const Blob = require('../models/blob')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { blob: { title: '', text: 'foo' } } -> { blob: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// POST /blobs
router.post('/list-blobs/', requireToken, (req, res, next) => {
    Blob.find({ owner: req.body._id })
        .then(blobs => {
            // `blobs` will be an array of Mongoose documents
            // we want to convert each one to a POJO, so we use `.map` to
            // apply `.toObject` to each one
            return blobs.map(blob => blob.toObject())
        })
        // respond with status 200 and JSON of the blobs
        .then(blobs => res.status(200).json({ blobs: blobs }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// SHOW
// GET /blobs/5a7db6c74d55bc51bdf39793
router.get('/blobs/:id', (req, res, next) => {
    // req.params.id will be set based on the `:id` in the route
    Blob.findById(req.params.id)
        .then(handle404)
        // if `findById` is succesful, respond with 200 and "blob" JSON
        .then(blob => res.status(200).json({ blob: blob.toObject() }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// CREATE
// POST /blobs
router.post('/blobs', requireToken, async (req, res, next) => {
    // set owner of new blob to be current user
    const data = req.files.file
    const {title, artist, userId} = req.body

    console.log(data.size)
    if(data.size > 100000000) {
        res.sendStatus(413)
        return
    }

    // get time to stop duplicates
    const d = new Date()
    const t = d.getTime()
    const titleWithDate = title + t
    titleWithDate.replace(' ', '%')
    console.log(titleWithDate)
    // Create new client to connect to storage
    const blobServiceClient = azure.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
    
    // Get the container that we are uploading to, if it doesn't exist create one
    const containerClient = blobServiceClient.getContainerClient('archivin-container')
    
    // Create new blockBlobClient to manipulate a block blob | a block blob is the most common type, it can be any file
    const blockBlobClient = containerClient.getBlockBlobClient(titleWithDate)
    

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: data.mimetype } };

    // Upload data to the blob
    console.log('made it to upload')
    await blockBlobClient.upload(data.data, data.data.length, options)
        .catch(console.error)
    console.log(`Upload block blob ${titleWithDate} successfully`)

    const blob = {title: title, artist: artist, url: 'https://archivinstorage.blob.core.windows.net/archivin-container/' + titleWithDate, owner: userId}
    
    console.log('made it to mongo create')
    await Blob.create(blob)
        // respond to succesful `create` with status 201 and JSON of new "blob"
        .then(blob => {
            res.status(201).json({ blob: blob.toObject() })
        })
        // if an error occurs, pass it off to our error handler
        // the error handler needs the error message and the `res` object so that it
        // can send an error message back to the client
        .catch(next)
})

// UPDATE
// PATCH /blobs/5a7db6c74d55bc51bdf39793
router.patch('/blobs/:id', requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.owner

    Blob.findById(req.params.id)
        .then(handle404)

        .then(blob => {
            // pass the `req` object and the Mongoose record to `requireOwnership`
            // it will throw an error if the current user isn't the owner
            requireOwnership(req, blob)

            // pass the result of Mongoose's `.update` to the next `.then`
            return blob.updateOne(req.body)
        })

        // if that succeeded, return 204 and no JSON
        .then(() => res.sendStatus(204))

        // if an error occurs, pass it to the handler
        .catch(next)
})

// DESTROY
// DELETE /blobs/5a7db6c74d55bc51bdf39793
router.delete('/blobs/:id', requireToken, (req, res, next) => {
    Blob.findById(req.params.id)
        .then(handle404)

        .then(async blob => {
            // Create new client to connect to storage
            const blobServiceClient = azure.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)

            // Get the container that we are uploading to, if it doesn't exist create one
            const containerClient = blobServiceClient.getContainerClient('archivin-container')
            containerClient.createIfNotExists({ access: 'container' })

            // splitting url to get name of blob
            const url = blob.url.split('archivin-container/')

            // Create new blockBlobClient to manipulate a block blob | a block blob is the most common type, it can be any file
            const blockBlobClient = containerClient.getBlockBlobClient(url[url.length-1])

            // Upload data to the blob
            await blockBlobClient.delete()
            console.log(`Deleted block blob ${url[url.length-1]} successfully`)

            return blob
        })

        .then(blob => {
            // throw an error if current user doesn't own `blob`
            requireOwnership(req, blob)
            // delete the blob ONLY IF the above didn't throw
            blob.deleteOne()
        })
        // send back 204 and no content if the deletion succeeded
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

module.exports = router
