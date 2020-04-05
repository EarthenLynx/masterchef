const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const RecipeSchema = new Schema({
    recipe_img_url: {type: String, required: true},
    recipe_name: {type: String, required: true, max: 40},
    recipe_tags: {type: Array, required: false}, 
    recipe_desc: {type: String, required: false, max: 800},
    recipe_instructions: {type: Array, required: true}, 
    recipe_dishes_qty: {type: Number, required: true}, // For how many dishes are the ingredients?
    recipe_ingredients: [{
        ingredient_name: {type: String, required: true}, 
        ingredient_qty: {type: Number, required: true}, 
        ingredient_qty_unit: {type: String, required: true, max: 10}
    }], 
    recipe_time_minutes: {type: Number, required: false}, // Prep. time
    recipe_notes: {type: String, required: false, max: 5000}
}); 

// Export the model 
module.exports = mongoose.model("Recipe", RecipeSchema); 