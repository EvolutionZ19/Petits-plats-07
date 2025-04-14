export function searchRecipes(recipes, query, tags) {
  const lowerQuery = query.trim().toLowerCase();

  const results = recipes.filter((recipe) => {
    // Partie recherche principale (champ)
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

    // Partie filtres par tags
    const matchesTags = tags.every((tag) => {
      const tagLower = tag.toLowerCase();

      const inIngredientsTag = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(tagLower)
      );

      const inApplianceTag = recipe.appliance.toLowerCase().includes(tagLower);

      const inUstensilsTag = recipe.ustensils.some((ust) =>
        ust.toLowerCase().includes(tagLower)
      );

      return inIngredientsTag || inApplianceTag || inUstensilsTag;
    });

    return matchesSearch && matchesTags;
  });

  return results;
}
