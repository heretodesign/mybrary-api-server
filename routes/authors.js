const express = require("express")
const router = express.Router()
const Author = require('../models/author')

// get all authors
router.get("/", (req, res) => {
    res.render("authors/index")
})

// get new authors
router.get("/new", (req, res) => {
    res.render("authors/new", {
        author: new Author()
    })
})

// create new authors route
router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('author')
    } catch (error) {
        res.render('author/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

module.exports = router