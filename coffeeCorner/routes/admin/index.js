const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = require('path')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categories', (req, res) => {
    Category.find({}).sort({$natural: -1}).lean().then(categories => {
        res.render('admin/categories', { categories: categories })
    })
})

router.post('/categories', (req, res ) => {
    Category.create(req.body)
        .then(category => {
            res.redirect('/admin/categories');
        })
        .catch(error => {
            res.redirect('/admin/categories');
        });
})

router.delete('/categories/:id', (req, res) => {
    Category.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/admin/categories');
    })
})

router.get('/coffees', (req, res) => {
    Post.find({}).populate({path:'category', model: Category}).lean().then(coffees => {
        res.render('admin/coffees', { coffees: coffees })
    })
})

router.delete('/coffees/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/admin/coffees');
    })
})  

router.get('/admin/coffees/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then(coffees => {
        Category.find({}).lean().then(categories => {
            res.render('admin/editcoffee', { coffees: coffees, categories: categories })
        })
    })
})

router.put('/coffees/:id', (req, res) => {
    let coffee_image = req.files.coffee_image
    coffee_image.mv(path.resolve(__dirname, '../../public/images/coffeeimages', coffee_image.name))

    Post.findOne({_id: req.params.id}).then(coffee => {
        coffee.title = req.body.title
        coffee.content = req.body.content
        coffee.price = req.body.price
        coffee.category = req.body.category
        coffee.coffee_image = `/images/coffeeImages/${coffee_image.name}`

        coffee.save().then(coffee => {
            res.redirect('/menu')
        })
    })
})

module.exports = router