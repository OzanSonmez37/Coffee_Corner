const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('site/home')
})

router.get('/about', (req, res) => {
    res.render('site/about')
})

router.get('/contact', (req, res) => {
    res.render('site/contact')
})

router.get('/menu', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.render('site/menu', { posts: posts })
    })
})

module.exports = router