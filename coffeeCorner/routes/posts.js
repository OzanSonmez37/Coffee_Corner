const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require("../models/Category");
const path = require('path')

router.get("/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/users/login");
  }
  Category.find({})
    .lean()
    .then((categories) => {
      res.render("site/addcoffee", { categories: categories })
    })
})

router.post('/test', (req, res) => {
  let coffee_image = req.files.coffee_image;

  coffee_image.mv(path.resolve(__dirname,"../public/images/coffeeImages",coffee_image.name));

  Post.create({
    ...req.body,
    coffee_image: `/images/coffeeImages/${coffee_image.name}`
  })

  req.session.sessionFlash = {
    type: "alert alert-success",
    message: "Coffee has been added successfully.",
  };

  res.redirect('/menu')
})

module.exports = router