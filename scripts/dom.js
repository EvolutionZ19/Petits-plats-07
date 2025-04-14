export function createRecipeCard(recipe) {
  const article = document.createElement("article");
  article.classList.add("recipe-card");

  article.innerHTML = `
    <div class="recipe-image-container">
      <img src="assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-image" />
      <span class="time recipe-time">${recipe.time} min</span>
    </div>
    <div class="recipe-info">
      <h2 class="recipe-title">${recipe.name}</h2>
      <h3 class="recipe-section-title">Recette</h3>
      <p class="recipe-description">${recipe.description}</p>
      <h3 class="recipe-section-title">Ingrédients</h3>
      <div class="recipe-ingredients">
        ${recipe.ingredients
          .map((ing) => {
            const qty = ing.quantity ? ing.quantity : "";
            const unit = ing.unit ? ` ${ing.unit}` : "";
            const details = qty || unit ? `<span>${qty}${unit}</span>` : "";
            return `<p><strong>${ing.ingredient}</strong>${details}</p>`;
          })
          .join("")}
      </div>
    </div>
  `;
  return article;
}
  
  export function displayRecipes(container, recipeList) {
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
  