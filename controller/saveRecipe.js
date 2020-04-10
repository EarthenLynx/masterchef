const Recipe = require("../models/recipe");
const path = require("path");
const fs = require("fs"); 

const galleryPath = path.resolve(__dirname, "../public/img/");

const saveRecipe = function(req, res) {
    // Create the urls for the operation
  let tempImgUrl = path.join(galleryPath, "/tmp/temp.png")
  let newImgUrl = path.join(galleryPath, "/thumbnails/", req.body.recipe_name) + '.png'; 

  // Save the recipe
  let recipe = new Recipe({
    recipe_img_url: path.join("/img/thumbnails/", req.body.recipe_name).concat(".png"),
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
}

module.exports = saveRecipe; 