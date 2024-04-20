let cardArr = new Array();
if (localStorage.getItem('summerArr')) {
    cardArr = JSON.parse(localStorage.getItem('summerArr'));
}

const accountCard = document.getElementById('grid');

for (var i = 0; i < cardArr.length; ++i) {

    if (cardArr[i].recipeName && cardArr[i].recipeId && cardArr[i].recipePhoto) {
        const card = document.createElement('div');
        card.classList.add('recipe');
        card.id = cardArr[i].recipeId;

        const cardDetails = `
            <div class="edit">
                <img src="../../Photos/editButton.png" alt="" class="editRecipe" title="Edit Recipe">
                <img src="../../Photos/deleteButton.png" alt="" class="deleteRecipe" title="Delete Recipe">
            </div>
            <img src="../../Photos/heartWhite.png" alt="" title="Add to Your favorites" class="favorite_button">
            <img src="${cardArr[i].recipePhoto}" alt="${cardArr[i].recipeName}" class="mainImg">
            <div class="info">
                <h3>${cardArr[i].recipeName}</h3>
                <h5>&#x23F0; 2 to 3 hrs</h5> 
                <p>The ${cardArr[i].recipeName} recipe by ${localStorage.getItem('username')}</p>
                <button class="btn" id="recipeLink">view Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        accountCard.appendChild(card);

    }

}

