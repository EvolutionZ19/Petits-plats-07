import { recipes } from "../data/recipes.js";

// Ciblage du conteneur des recettes
const container = document.getElementById("recipes-container");

// Fonction de création d'une carte recette
function createRecipeCard(recipe) {
  const article = document.createElement("article");
  article.classList.add("recipe-card");

  article.innerHTML = `
    <div class="recipe-image"></div>
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

// Affichage de toutes les recettes
recipes.forEach((recipe) => {
  const card = createRecipeCard(recipe);
  container.appendChild(card);
});
