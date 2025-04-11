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

const container = document.getElementById("recipes-container");

recipes.forEach((recipe) => {
  const card = createRecipeCard(recipe);
  container.appendChild(card);
});
