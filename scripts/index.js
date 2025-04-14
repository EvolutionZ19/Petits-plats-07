import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./dom.js";
import { searchRecipes } from "./search.js";
import { generateFilters } from "./filters.js";
import { createTag } from "./tags.js";

const container = document.getElementById("recipes-container");
const searchInput = document.getElementById("main-search");
const tagsContainer = document.getElementById("tags-container");
let activeTags = [];

function handleSearchAndTags() {
  const query = searchInput.value.trim();
  const results = searchRecipes(recipes, query, activeTags);
  displayRecipes(container, results);
  generateFilters(results, activeTags, addTag);
}

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

searchInput.addEventListener("input", handleSearchAndTags);

function initDropdownToggles() {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetDropdown = btn.closest(".dropdown");
      const isOpen = targetDropdown.classList.contains("open");

      // Ferme tous les autres
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });

      // Rouvre uniquement si ce n’était pas déjà ouvert
      if (!isOpen) {
        targetDropdown.classList.add("open");
      }
    });
  });

  // Fermer au clic en dehors
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

// Initialisation
displayRecipes(container, recipes);
generateFilters(recipes, activeTags, addTag);
initDropdownToggles();
handleSearchAndTags(); 

// Écouteur d'événement pour la mise à jour des tags
document.addEventListener("tagUpdate",() => {
  handleSearchAndTags();
}
);