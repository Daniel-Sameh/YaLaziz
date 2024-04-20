let cardArr = new Array();
for (let i = 0; i < allRecipe.length; i++) {
    const recipe = allRecipe[i];
    if (recipe.recipeCategory == 'desserts') {
        cardArr.push(recipe);
    }
}

const accountCard = document.getElementById('dessertsGrid');

for (var i = 0; i < cardArr.length; ++i) {

    if (cardArr[i].recipeName && cardArr[i].recipeId && cardArr[i].recipePhoto) {
        let favoriteSrc;
        let favoriteTitle; 
        if (cardArr[i].favoriteState && isSignned) {
            favoriteSrc = "../../Photos/heartRed.png";
            favoriteTitle = "Remove from Your favorites";
        }
        else {
            favoriteSrc = "../../Photos/heartWhite.png";
            favoriteTitle = "Add to Your favorites";
        }
        let recipePhotoSrc;
        if (cardArr[i].userMadeRecipe) {
            recipePhotoSrc = cardArr[i].recipePhoto;
        }
        else {
            recipePhotoSrc = `"../${cardArr[i].recipePhoto}"`;
        }
        const card = document.createElement('div');
        card.classList.add('recipe');
        card.id = cardArr[i].recipeId;

        const cardDetails = `
            <div class="edit">
                <img src="../../Photos/editButton.png" alt="" class="editRecipe" title="Edit Recipe">
                <img src="../../Photos/deleteButton.png" alt="" class="deleteRecipe" title="Delete Recipe">
            </div>
            <img src=${favoriteSrc} alt="" title="${favoriteTitle}" class="favorite_button">
            <img src=${recipePhotoSrc} alt=${cardArr[i].recipeName} class="coverImg">
            <div class="info">
                <h3>${cardArr[i].recipeName}</h3>
                <h5>&#x23F0; ${cardArr[i].recipeDuration}</h5> 
                <p>The ${cardArr[i].recipeName} recipe from desserts recipes</p>
                <button class="btn" id="recipeLink">view Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        accountCard.appendChild(card);

    }

}

