export function populateDropdown(id, values) {
    const container = document.getElementById(id);
    const ul = document.createElement("ul");
  
    values.forEach((val) => {
      const li = document.createElement("li");
      const label = val.charAt(0).toUpperCase() + val.slice(1);
      li.textContent = label;
  
      if (activeTags.includes(label)) {
        li.classList.add("selected");
      }
  
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