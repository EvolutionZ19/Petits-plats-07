import { recipes } from "../data/recipes.js";

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

function generateFilters(recipes) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => ingredientsSet.add(item.ingredient.toLowerCase()));
    appliancesSet.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((u) => ustensilsSet.add(u.toLowerCase()));
  });

  populateDropdown("dropdown-ingredients", ingredientsSet);
  populateDropdown("dropdown-appareils", appliancesSet);
  populateDropdown("dropdown-ustensiles", ustensilsSet);
}

// Injection des recettes
const container = document.getElementById("recipes-container");
recipes.forEach((recipe) => {
  const card = createRecipeCard(recipe);
  container.appendChild(card);
});

// Génération des filtres
generateFilters(recipes);
