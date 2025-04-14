export function createTag(tagValue, category, activeTags, tagsContainer, searchInput, recipes, displayRecipes, generateFilters) {
  const tag = document.createElement("span");
  tag.classList.add("tag", category);
  tag.textContent = tagValue;

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "&times;";
  removeBtn.setAttribute("aria-label", "Supprimer le tag");
  removeBtn.addEventListener("click", () => {
    const index = activeTags.indexOf(tagValue);
    if (index !== -1) activeTags.splice(index, 1);
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
