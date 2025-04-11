import { createRecipeCard, displayRecipes } from "./dom.js";
import { generateFilters } from "./filters.js";
import { recipes } from "../data/recipes.js";


const container = document.getElementById("recipes-container");
const searchInput = document.getElementById("main-search");
const tagsContainer = document.getElementById("tags-container");
let activeTags = [];





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

function initDropdownToggles() {
    const toggles = document.querySelectorAll(".dropdown-toggle");
  
    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetDropdown = btn.closest(".dropdown");
  
        // Si le dropdown est déjà ouvert, on le referme
        const isOpen = targetDropdown.classList.contains("open");
  
        // Fermer tous les autres dropdowns
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("open");
        });
  
        // Rouvrir le dropdown cliqué uniquement s’il n’était pas déjà ouvert
        if (!isOpen) {
          targetDropdown.classList.add("open");
        }
      });
    });
  }
  
  initDropdownToggles();
  
  document.addEventListener("click", (e) => {
    const isToggle = e.target.closest(".dropdown-toggle");
    const isInsideDropdown = e.target.closest(".dropdown");
  
    // Si on clique ni sur un toggle ni dans un dropdown, on ferme tout
    if (!isToggle && !isInsideDropdown) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
  