var username=localStorage.getItem('username');
if(username){
    document.querySelector('.user').innerHTML=username;
}
const img=localStorage.getItem('img');
if(img){
    document.querySelector('.photo').href=img;
}

document.querySelector('.logout').addEventListener('click',function(event){
    location.href="index.html";
});

const favoriteRecipes = document.getElementById('favoriteGrid');

for (var i = 0; i < favoriteRecipeArr.length; ++i) {

    if (favoriteRecipeArr[i].recipeName && favoriteRecipeArr[i].recipeId && favoriteRecipeArr[i].recipePhoto) {
        const card = document.createElement('div');
        card.classList.add('recipe');
        card.id = favoriteRecipeArr[i].recipeId;

        const cardDetails = `
            <div class="edit">
                <img src="../Photos/editButton.png" alt="" class="editRecipe" title="Edit Recipe">
                <img src="../Photos/deleteButton.png" alt="" class="deleteRecipe" title="Delete Recipe">
            </div>
            <img src="../Photos/heartRed.png" alt="" title="Remove From Your favorites" class="favorite_button">
            <img src=${favoriteRecipeArr[i].recipePhoto} alt="${favoriteRecipeArr[i].recipeName}" class="coverImg">
            <div class="info">
                <h3>${favoriteRecipeArr[i].recipeName}</h3>
                <h5>&#x23F0; 2 to 3 hrs</h5> 
                <p>The ${favoriteRecipeArr[i].recipeName} recipe</p>
                <button class="btn" id="recipeLink">view Recipe</button>
            </div>`;

        card.innerHTML = cardDetails;
        favoriteRecipes.appendChild(card);

    }

}

