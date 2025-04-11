export function createTag(tagValue, category, activeTags, tagsContainer, searchInput, recipes, displayRecipes, generateFilters) {
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
      const results = searchRecipes(recipes, searchInput.value.trim(), activeTags);
      displayRecipes(document.getElementById("recipes-container"), results);
      generateFilters(results, activeTags, (tag, cat) =>
        createTag(tag, cat, activeTags, tagsContainer, searchInput, recipes, displayRecipes, generateFilters)
      );
    });
  
    tag.appendChild(removeBtn);
    tagsContainer.appendChild(tag);
  
    const results = searchRecipes(recipes, searchInput.value.trim(), activeTags);
    displayRecipes(document.getElementById("recipes-container"), results);
    generateFilters(results, activeTags, (tag, cat) =>
      createTag(tag, cat, activeTags, tagsContainer, searchInput, recipes, displayRecipes, generateFilters)
    );
  }
  