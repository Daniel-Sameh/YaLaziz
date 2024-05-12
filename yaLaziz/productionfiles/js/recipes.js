allRecipe = JSON.parse(localStorage.getItem("allRecipe"));
const recipes = document.getElementById("recipesGrid");

for (var i = 0; i < allRecipe.length; ++i) {
  if (
    allRecipe[i].recipeName &&
    allRecipe[i].recipeId &&
    allRecipe[i].recipePhoto
  ) {
    let favoriteSrc;
    let favoriteTitle;
    if (allRecipe[i].favoriteState && isSignned) {
      favoriteSrc = "../Photos/heartRed.png";
      favoriteTitle = "Remove from Your favorites";
    } else {
      favoriteSrc = "../Photos/heartWhite.png";
      favoriteTitle = "Add to Your favorites";
    }
    const card = document.createElement("div");
    card.classList.add("recipe");
    card.id = allRecipe[i].recipeId;

    const cardDetails = `
            <div class="edit">
                <img src="../Photos/editButton.png" alt="" class="editRecipe" title="Edit Recipe">
                <img src="../Photos/deleteButton.png" alt="" class="deleteRecipe" title="Delete Recipe">
            </div>
            <img src=${favoriteSrc} alt="" title="${favoriteTitle}" class="favorite_button">
            <img src="${allRecipe[i].recipePhoto}" alt="${allRecipe[i].recipeName}" class="coverImg">
            <div class="info">
                <h3>${allRecipe[i].recipeName}</h3>
                <h5>&#x23F0; ${allRecipe[i].recipeDuration}</h5> 
                <p>The ${allRecipe[i].recipeName} recipe</p>
                <button class="btn" id="recipeLinkMain">view Recipe</button>
            </div>`;

    card.innerHTML = cardDetails;
    recipes.appendChild(card);
  }
}
