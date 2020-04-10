const Recipe = require("../models/recipe");
const path = require("path");
const fs = require("fs");

const galleryPath = require("../config/paths").galleryPath;


const deleteRecipe = function (req, res) {
  console.log(req.body);
  
  Recipe.findByIdAndDelete(req.body.recipe_id, (err, data) => {
    console.log(data);
    if (err) {
      res.send({
        status: 500,
        statusText: "error",
        msg: "Could not delete recipe in database",
      });
    }
    if (data) {
      res.send({
        status: 200,
        statusText: "success",
        msg: `Recipe '${data.recipe_name}' successfully removed!`,
      });
      // TODO: Add a way to check if an image is saved and only then delete it.
      // Then delete the old image from the thumbnail gallery
      let imgUrl = path.join(galleryPath, "/thumbnails/", data.recipe_name) + '.png'; 
      fs.unlinkSync(imgUrl);
    }

    if(!data) {
        res.send({
            status: 404, 
            statusText: "not found", 
            msg: `Recipe was not found in db. What the heck did you do?`
        })
    }
  });
};

module.exports = deleteRecipe;
