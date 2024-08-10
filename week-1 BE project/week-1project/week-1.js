const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
let recipes = [];
app.get('/recipes', (req, res) => {
    res.json(recipes);
});
app.get('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
});
app.post('/recipes', (req, res) => {
    const { name, ingredients, instructions } = req.body;
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Please provide name, ingredients, and instructions' });
    }
    const newRecipe = {
        id: recipes.length + 1,
        name,
        ingredients,
        instructions
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});
app.put('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    const { name, ingredients, instructions } = req.body;
    recipe.name = name || recipe.name;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    res.json(recipe);
});
app.delete('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    recipes.splice(recipeIndex, 1);
    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
