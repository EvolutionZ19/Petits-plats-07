export function populateDropdown(id, values, activeTags, addTag) {
  const container = document.getElementById(id);
  const ul = document.createElement("ul");

  values.forEach((val) => {
    const li = document.createElement("li");
    const label = val.charAt(0).toUpperCase() + val.slice(1);
    li.textContent = label;

    if (activeTags.includes(label)) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => addTag(val, id));
    ul.appendChild(li);
  });

  // Ajout de la barre de recherche
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Rechercher...";
  searchInput.classList.add("dropdown-search");

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const items = ul.querySelectorAll("li");

    items.forEach((item) => {
      const txt = item.textContent.toLowerCase();
      item.style.display = txt.includes(filter) ? "block" : "none";
    });
  });

  container.innerHTML = "";
  container.appendChild(searchInput);
  container.appendChild(ul);
}

export function generateFilters(recipeList, activeTags, addTag) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipeList.forEach((recipe) => {
    recipe.ingredients.forEach((item) =>
      ingredientsSet.add(item.ingredient.toLowerCase())
    );
    appliancesSet.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((u) => ustensilsSet.add(u.toLowerCase()));
  });

  populateDropdown("dropdown-ingredients", ingredientsSet, activeTags, addTag);
  populateDropdown("dropdown-appareils", appliancesSet, activeTags, addTag);
  populateDropdown("dropdown-ustensiles", ustensilsSet, activeTags, addTag);
}
