const mainRecipes = document.querySelector(".grid");

for (var i = 0; i < allRecipe.length; ++i) {

    if (allRecipe[i].recipeName=="Sambosa" ||allRecipe[i].recipeName=="Stuffed grape leaves"||allRecipe[i].recipeName=="Cheese-Omelet"||allRecipe[i].recipeName=="Hot Chocolate") {
        let favoriteSrc;
        let favoriteTitle; 
        if (allRecipe[i].favoriteState && isSignned) {
            favoriteSrc = "../Photos/heartRed.png";
            favoriteTitle = "Remove from Your favorites";
        }
        else {
            favoriteSrc = "../Photos/heartWhite.png";
            favoriteTitle = "Add to Your favorites";
        }
        const card = document.createElement('div');
        card.classList.add('recipe');
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
                <button class="btn" id="recipeLinkMain">View Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        mainRecipes.appendChild(card);

    }

}

const newRecipes=document.querySelector(".newRecipe").querySelector(".grid");

if(allRecipe.length>=3){
    for (var i = allRecipe.length-4; i < allRecipe.length; ++i) {

        if (allRecipe[i].recipeName && allRecipe[i].recipeId && allRecipe[i].recipePhoto) {
            let favoriteSrc;
            let favoriteTitle; 
            if (allRecipe[i].favoriteState && isSignned) {
                favoriteSrc = "../Photos/heartRed.png";
                favoriteTitle = "Remove from Your favorites";
            }
            else {
                favoriteSrc = "../Photos/heartWhite.png";
                favoriteTitle = "Add to Your favorites";
            }
            const card = document.createElement('div');
            card.classList.add('recipe');
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
                    <button class="btn" id="recipeLinkMain">View Recipe</button>
                </div>`;
    
            card.innerHTML = cardDetails;
            newRecipes.appendChild(card);
    
        }
    
    }


}