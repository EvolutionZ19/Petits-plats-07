import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./dom.js";
import { searchRecipes } from "./search.js";
import { generateFilters } from "./filters.js";
import { createTag } from "./tags.js";

const container = document.getElementById("recipes-container");
const searchInput = document.getElementById("main-search");
const tagsContainer = document.getElementById("tags-container");
let activeTags = [];

// Met à jour le compteur de recettes affichées
function updateRecipeCount(list) {
  const countElement = document.getElementById("recipe-count");
  countElement.textContent = `${list.length} recette${list.length > 1 ? "s" : ""}`;
}

// Recherche principale + tags combinés
function handleSearchAndTags() {
  const query = searchInput.value.trim();
  const results = searchRecipes(recipes, query, activeTags);
  displayRecipes(container, results);
  updateRecipeCount(results); // compteur mis à jour ici
  generateFilters(results, activeTags, addTag);
}

// Ajout d’un tag sélectionné
function addTag(tagValue, category) {
  if (activeTags.includes(tagValue)) return;

  activeTags.push(tagValue);

  createTag(
    tagValue,
    category,
    activeTags,
    tagsContainer,
    searchInput,
    recipes,
    displayRecipes,
    generateFilters
  );

  handleSearchAndTags();
}

// Barre de recherche (saisie)
searchInput.addEventListener("input", handleSearchAndTags);

// Dropdowns cliquables
function initDropdownToggles() {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetDropdown = btn.closest(".dropdown");
      const isOpen = targetDropdown.classList.contains("open");

      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });

      if (!isOpen) {
        targetDropdown.classList.add("open");
      }
    });
  });

  document.addEventListener("click", (e) => {
    const isToggle = e.target.closest(".dropdown-toggle");
    const isInsideDropdown = e.target.closest(".dropdown");

    if (!isToggle && !isInsideDropdown) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
}

// Quand un tag est supprimé 
document.addEventListener("tagUpdate", () => {
  handleSearchAndTags();
});

// Initialisation
displayRecipes(container, recipes);
updateRecipeCount(recipes); // compteur initial
generateFilters(recipes, activeTags, addTag);
initDropdownToggles();
