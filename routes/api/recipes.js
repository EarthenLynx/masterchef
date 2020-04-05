// Import needed modules
const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../../models/recipe");
const path = require("path");

// Setup the router
var router = express.Router();

// Setup the database connection
const mongoDB = "mongodb://127.0.0.1/cooking_recipes";
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Get the list of recipes when calling the api with a get request.
router.get("/", function (req, res, next) {
  Recipe.find({}, (err, recipes) => res.send(recipes));
});

// Post a new recipe when receiving a post - request
router.post("/", function (req, res, next) {
  console.log("Now saving" + req.body.recipe_name);

  let recipe = new Recipe({
    recipe_img_url: req.body.recipe_name,
    recipe_name: req.body.recipe_name,
    recipe_tags: req.body.recipe_tags,
    recipe_desc: req.body.recipe_desc,
    recipe_instructions: req.body.recipe_instructions,
    recipe_dishes_qty: req.body.recipe_dishes_qty,
    recipe_ingredients: req.body.recipe_ingredients,
    recipe_time_minutes: req.body.recipe_time_minutes,
    recipe_notes: req.body.recipe_notes,
  });
  recipe.save((err) => {
    if (err) throw err;
    if (!err) {
      res.send({ msg: `Recipe '${req.body.recipe_name}' successfully saved!`});
    }
  });
});

module.exports = router;
