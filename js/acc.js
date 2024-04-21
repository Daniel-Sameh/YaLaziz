var username = localStorage.getItem('username');
if (username) {
    document.querySelector('.user').innerHTML = username;
}

var existingImg = document.getElementById('ph');
existingImg.src = localStorage.getItem("accPhoto");


//------------------------------------------------------------------------

// Display Favorite Recipes :

const favoriteRecipes = document.getElementById('favoriteGrid');

for (var i = 0; i < allRecipe.length; ++i) {

    if (allRecipe[i].favoriteState) {

        const card = document.createElement('div');
        card.classList.add('recipe');
        card.id = allRecipe[i].recipeId;

        const cardDetails = `
            <div class="edit"></div>
            <img src="../Photos/heartRed.png" alt="" title="Remove From Your favorites" class="favorite_button">
            <img src=${allRecipe[i].recipePhoto} alt=${allRecipe[i].recipeName} class="coverImg">
            <div class="info">
                <h3>${allRecipe[i].recipeName}</h3>
                <h5>&#x23F0; ${allRecipe[i].recipeDuration}</h5> 
                <p>The ${allRecipe[i].recipeName} recipe</p>
                <button class="btn" id="recipeLinkMain">view Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        favoriteRecipes.appendChild(card);
    }

}

//-----------------------------------------------------------------

// Display User Recipes


const accountCard = document.getElementById('userGrid');

for (var i = 0; i < allRecipe.length; ++i) {

    if (allRecipe[i].userMadeRecipe) {
        let favoriteSrc;
        let favoriteTitle;
        if (allRecipe[i].favoriteState) {
            favoriteSrc = "../../Photos/heartRed.png";
            favoriteTitle = "Remove from Your favorites";
        }
        else {
            favoriteSrc = "../../Photos/heartWhite.png";
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
            <img src=${allRecipe[i].recipePhoto} alt="${allRecipe[i].recipeName}" class="coverImg">
            <div class="info">
                <h3>${allRecipe[i].recipeName}</h3>
                <h5>&#x23F0; ${allRecipe[i].recipeDuration}</h5> 
                <p>The ${allRecipe[i].recipeName} recipe by ${localStorage.getItem('username')}</p>
                <button class="btn" id="recipeLinkMain">view Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        accountCard.appendChild(card);

    }

}

//----------------------------------------------------------------------------