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

    // Met à jour les recettes affichées
    const updateEvent = new Event("tagUpdate");
    document.dispatchEvent(updateEvent);
  });

  tag.appendChild(removeBtn);
  tagsContainer.appendChild(tag);
}
