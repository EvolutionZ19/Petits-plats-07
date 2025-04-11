import { recipes } from "../data/recipes.js";

const container = document.getElementById("recipes-container");
const searchInput = document.getElementById("main-search");

function createRecipeCard(recipe) {
  const article = document.createElement("article");
  article.classList.add("recipe-card");

  article.innerHTML = `
    <img src="assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-image" />
    <div class="recipe-info">
      <div class="recipe-header">
        <h2>${recipe.name}</h2>
        <span class="time">${recipe.time} min</span>
      </div>
      <div class="recipe-ingredients">
        ${recipe.ingredients
          .map((ing) => {
            const unit = ing.unit ? ` ${ing.unit}` : "";
            const qty = ing.quantity ? `: ${ing.quantity}${unit}` : "";
            return `<p><strong>${ing.ingredient}</strong>${qty}</p>`;
          })
          .join("")}
      </div>
      <p class="recipe-description">${recipe.description}</p>
    </div>
  `;

  return article;
}

function displayRecipes(recipeList) {
  container.innerHTML = "";
  if (recipeList.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>Aucune recette ne correspond à votre recherche.<br>
        Essayez avec un autre mot-clé ou affinez vos filtres.</p>
      </div>
    `;
    return;
  }  

  recipeList.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
}

function populateDropdown(id, values) {
  const container = document.getElementById(id);
  const ul = document.createElement("ul");

  values.forEach((val) => {
    const li = document.createElement("li");
    li.textContent = val.charAt(0).toUpperCase() + val.slice(1);
    ul.appendChild(li);
  });

  container.innerHTML = "";
  container.appendChild(ul);
}

function generateFilters(recipeList) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipeList.forEach((recipe) => {
    recipe.ingredients.forEach((item) => ingredientsSet.add(item.ingredient.toLowerCase()));
    appliancesSet.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((u) => ustensilsSet.add(u.toLowerCase()));
  });

  populateDropdown("dropdown-ingredients", ingredientsSet);
  populateDropdown("dropdown-appareils", appliancesSet);
  populateDropdown("dropdown-ustensiles", ustensilsSet);
}

function searchRecipes(query) {
  const lowerQuery = query.toLowerCase();

  return recipes.filter((recipe) => {
    const inName = recipe.name.toLowerCase().includes(lowerQuery);
    const inDescription = recipe.description.toLowerCase().includes(lowerQuery);
    const inIngredients = recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(lowerQuery)
    );
    const inAppliance = recipe.appliance.toLowerCase().includes(lowerQuery);
    const inUstensils = recipe.ustensils.some((ust) =>
      ust.toLowerCase().includes(lowerQuery)
    );

    return inName || inDescription || inIngredients || inAppliance || inUstensils;
  });
}

// Événement sur le champ de recherche
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.length < 3) {
    displayRecipes(recipes);
    generateFilters(recipes);
    return;
  }

  const results = searchRecipes(value);
  displayRecipes(results);
  generateFilters(results);
});

// Chargement initial
displayRecipes(recipes);
generateFilters(recipes);
