import { recipes } from "../data/recipes.js";

const container = document.getElementById("recipes-container");
const searchInput = document.getElementById("main-search");
const tagsContainer = document.getElementById("tags-container");
let activeTags = [];

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
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    li.textContent = label;
    li.addEventListener("click", () => addTag(label, id));
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

function searchRecipes(query, tags) {
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

    const matchesSearch =
      lowerQuery.length < 3 || inName || inDescription || inIngredients || inAppliance || inUstensils;

    const matchesTags = tags.every((tag) => {
      const tagLower = tag.toLowerCase();
      const inIngredientsTag = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase() === tagLower
      );
      const inApplianceTag = recipe.appliance.toLowerCase() === tagLower;
      const inUstensilsTag = recipe.ustensils.some(
        (ust) => ust.toLowerCase() === tagLower
      );
      return inIngredientsTag || inApplianceTag || inUstensilsTag;
    });

    return matchesSearch && matchesTags;
  });
}

function addTag(tagValue, category) {
  if (activeTags.includes(tagValue)) return;

  activeTags.push(tagValue);

  const tag = document.createElement("span");
  tag.classList.add("tag", category);
  tag.textContent = tagValue;

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "❌";
  removeBtn.setAttribute("aria-label", "Supprimer le tag");
  removeBtn.addEventListener("click", () => {
    activeTags = activeTags.filter((t) => t !== tagValue);
    tag.remove();
    const results = searchRecipes(searchInput.value.trim(), activeTags);
    displayRecipes(results);
    generateFilters(results);
  });

  tag.appendChild(removeBtn);
  tagsContainer.appendChild(tag);

  const results = searchRecipes(searchInput.value.trim(), activeTags);
  displayRecipes(results);
  generateFilters(results);
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const results = searchRecipes(value, activeTags);
  displayRecipes(results);
  generateFilters(results);
});

// Chargement initial
displayRecipes(recipes);
generateFilters(recipes);
