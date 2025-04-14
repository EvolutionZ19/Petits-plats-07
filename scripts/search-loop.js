// export function searchRecipesLoop(recipes, query, tags = []) {
//     const lowerQuery = query.trim().toLowerCase();
//     const results = [];
  
//     for (let i = 0; i < recipes.length; i++) {
//       const recipe = recipes[i];
//       let match = false;
  
//       // Nom
//       if (recipe.name.toLowerCase().includes(lowerQuery)) {
//         match = true;
//       }
//       // Description
//       else if (recipe.description.toLowerCase().includes(lowerQuery)) {
//         match = true;
//       }
//       // Ingrédients
//       else {
//         for (let j = 0; j < recipe.ingredients.length; j++) {
//           const ing = recipe.ingredients[j];
//           if (ing.ingredient.toLowerCase().includes(lowerQuery)) {
//             match = true;
//             break;
//           }
//         }
//       }
  
//       if (match) {
//         results.push(recipe);
//       }
//     }
  
//     // Si tags actifs : filtrage complémentaire
//     if (tags.length > 0) {
//       const filteredResults = [];
  
//       for (let i = 0; i < results.length; i++) {
//         const recipe = results[i];
//         let allTagsMatch = true;
  
//         for (let t = 0; t < tags.length; t++) {
//           const tag = tags[t].toLowerCase();
  
//           let tagFound = false;
  
//           // Ingrédients
//           for (let j = 0; j < recipe.ingredients.length; j++) {
//             if (recipe.ingredients[j].ingredient.toLowerCase().includes(tag)) {
//               tagFound = true;
//               break;
//             }
//           }
  
//           // Appareils
//           if (!tagFound && recipe.appliance.toLowerCase().includes(tag)) {
//             tagFound = true;
//           }
  
//           // Ustensiles
//           if (!tagFound) {
//             for (let k = 0; k < recipe.ustensils.length; k++) {
//               if (recipe.ustensils[k].toLowerCase().includes(tag)) {
//                 tagFound = true;
//                 break;
//               }
//             }
//           }
  
//           if (!tagFound) {
//             allTagsMatch = false;
//             break;
//           }
//         }
  
//         if (allTagsMatch) {
//           filteredResults.push(recipe);
//         }
//       }
  
//       return filteredResults;
//     }
  
//     return results;
//   }
  