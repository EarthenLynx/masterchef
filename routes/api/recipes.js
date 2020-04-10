// Import needed modules
const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../../models/recipe");
const path = require("path");
const fs = require("fs");

// Import needed controllers
const getRecipes = require("../../controller/getRecipes");
const uploadFile = require("../../controller/uploadFile");
const saveRecipe = require("../../controller/saveRecipe");

// Setup the router
var router = express.Router();

// Setup the database connection
const mongoDB = "mongodb://127.0.0.1/cooking_recipes";
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Create a var for the gallery path
const gpath = path.resolve(__dirname, "../../public/img/"); 

// Get the list of recipes when calling the api with a get request.
router.get("/", function (req, res, next) {
  getRecipes(res); 
});

// When receiving the post request, save the file in the temp folder
router.post("/upload", (req, res, next) => {
  uploadFile(req); 
});

// Post a new recipe when receiving a post - request
router.post("/", function (req, res, next) {
  saveRecipe(req, res);
});

module.exports = router;
