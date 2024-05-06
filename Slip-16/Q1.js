const fs = require('fs');
const readline = require('readline');

// Define the path to the JSON file where recipes will be stored
const recipeFilePath = './recipes.json';

// Function to load recipes from the JSON file
function loadRecipes() {
    try {
        const recipesData = fs.readFileSync(recipeFilePath, 'utf8');
        return JSON.parse(recipesData);
    } catch (error) {
        return [];
    }
}

// Function to save recipes to the JSON file
function saveRecipes(recipes) {
    fs.writeFileSync(recipeFilePath, JSON.stringify(recipes, null, 2));
}

// Function to add a new recipe
function addRecipe(recipe) {
    const recipes = loadRecipes();
    recipes.push(recipe);
    saveRecipes(recipes);
    console.log('Recipe added successfully!');
}

// Function to display all recipes
function displayRecipes() {
    const recipes = loadRecipes();
    recipes.forEach((recipe, index) => {
        console.log(`Recipe ${index + 1}: ${recipe.title}`);
    });
}

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Display initial menu
console.log('Welcome to Recipe Book');

// Function to display menu and handle user input
function displayMenu() {
    console.log('\nMenu:');
    console.log('1. Add Recipe');
    console.log('2. Display Recipes');
    console.log('3. Exit');

    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                // Add Recipe
                rl.question('Enter recipe title: ', (title) => {
                    rl.question('Enter recipe ingredients: ', (ingredients) => {
                        rl.question('Enter recipe instructions: ', (instructions) => {
                            const recipe = { title, ingredients, instructions };
                            addRecipe(recipe);
                            displayMenu();
                        });
                    });
                });
                break;
            case '2':
                // Display Recipes
                displayRecipes();
                displayMenu();
                break;
            case '3':
                // Exit
                rl.close();
                break;
            default:
                console.log('Invalid choice');
                displayMenu();
                break;
        }
    });
}

// Start the application by displaying the menu
displayMenu();
