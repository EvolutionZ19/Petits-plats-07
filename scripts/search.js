export function searchRecipes(recipes, query, tags) {
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
  