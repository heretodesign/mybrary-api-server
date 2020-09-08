const express = require("express")
const router = express.Router()
const Author = require('../models/author')

// get all authors
router.get("/", async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const author = await Author.find(searchOptions)
        res.render("authors/index", { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    } 
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