// Import needed modules
const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../../models/recipe");
const path = require("path");
const fs = require("fs");

// Setup the router
var router = express.Router();

// Setup the database connection
const mongoDB = "mongodb://127.0.0.1/cooking_recipes";
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Create a var for the gallery path
const gpath = path.resolve(__dirname, "../../img/"); 

// Get the list of recipes when calling the api with a get request.
router.get("/", function (req, res, next) {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      res.send({
        status: 500,
        statusText: "error",
        msg: "An error occured while fetching the recipes",
      });
    }
    if (!err) {
      res.send({
        status: 200,
        statusText: "success",
        msg: `Found ${recipes.length} delicious recipes in database`,
        data: recipes,
      });
    }
  });
});

// When receiving the post request, save the file in the temp folder
router.post("/upload", (req, res, next) => {
  let base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(path.join(gpath, "/tmp/temp.png"), base64Data, "base64", function (err) {
    console.log(err);
  });
});

// Post a new recipe when receiving a post - request
router.post("/", function (req, res, next) {

  // Create the urls for the operation
  let tempImgUrl = path.join(gpath, "/tmp/temp.png")
  let newImgUrl = path.join(gpath, "/thumbnails/", req.body.recipe_name) + '.png'; 

  // Save the recipe
  let recipe = new Recipe({
    recipe_img_url: newImgUrl,
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
    if (err) {
      res.send({
        status: 500,
        statusText: "error",
        msg: "Could not save recipe in database"
      });
      throw err;
    };
    if (!err) {
      res.send({
        status: 200,
        statusText: "success",
        msg: `Recipe '${req.body.recipe_name}' successfully saved!`
      });
    }
  });

  
  // Create a new file
  fs.readFile(tempImgUrl, (err, data) => {
    fs.writeFile(newImgUrl, data, (err) => console.log(err));
  });
});

module.exports = router;
