const Recipe = require("../models/recipe");

const getRecipes = function (res) {
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
};

module.exports = getRecipes; 
