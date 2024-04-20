// Favorite Button :

favoriteButtons = document.querySelectorAll(".favorite_button");

favoriteButtons.forEach(button => {
    button.addEventListener("click", function () {
        console.log('clicked');

        if (!isSignned) {
            alert("You Have to Login First!");
            return;
        }

        const recipeId = button.closest('.recipe').getAttribute('id');

        const hrefValue = button.getAttribute("src");
        const addTitle = "Add to Your favorites";
        const removeTitle = "Remove from Your favorites";
        if (hrefValue == "../../Photos/heartWhite.png") {
            button.src = "../../Photos/heartRed.png";
            button.title = removeTitle;
            addRecipeToFavorite(recipeId);
        }
        else if (hrefValue == "../../Photos/heartRed.png") {
            button.src = "../../Photos/heartWhite.png"
            button.title = addTitle;
            deleteRecipeFromFavorite(recipeId);
        }
        else if (hrefValue == "../Photos/heartWhite.png") {
            button.src = "../Photos/heartRed.png";
            button.title = removeTitle;
            addRecipeToFavorite(recipeId);
        }
        else {
            button.src = "../Photos/heartWhite.png";
            button.title = addTitle;
            deleteRecipeFromFavorite(recipeId);
        }
        button.style.opacity = 0;
        setTimeout(() => {
            button.style.opacity = 1;
        }, 100);
    });
});

function deleteRecipeFromFavorite(recipeId) {
    let arrIdx = localStorage.getItem(recipeId);
    let arr = JSON.parse(localStorage.getItem('favoriteRecipeArr'));
    arr.splice(arrIdx, 1);
    localStorage.setItem('favoriteRecipeArr', JSON.stringify(arr));
    localStorage.removeItem(recipeId);
}

function addRecipeToFavorite(recipeId) {
    const recipe = document.getElementById(recipeId);
    const recipeName = recipe.getElementsByTagName('h3')[0].innerHTML;
    const recipePhoto = recipe.querySelector('.coverImg').src;
    console.log(recipeName);
    console.log(recipeId);
    console.log(recipePhoto);
    let myRecipe = {
        recipeName: recipeName,
        recipeId: recipeId,
        recipePhoto: recipePhoto,
        // ingredients: localStorage.getItem('ingredients'),
        // instructions: localStorage.getItem('instructions')
    }
    favoriteRecipeArr.push(myRecipe);
    let arrIdx = favoriteRecipeArr.length - 1;
    localStorage.setItem('favoriteRecipeArr', JSON.stringify(favoriteRecipeArr));
    localStorage.setItem(recipeId, arrIdx);
}

//-----------------------------------------------------------------------------------

// View Recipe Button

var recipeLinkBtn = document.querySelectorAll("#recipeLink");

recipeLinkBtn.forEach(button => {
    button.addEventListener('click', function () {
        location.href = "../recipe_detail.html";
    })
})

var recipeLinkBtnMain = document.querySelectorAll("#recipeLinkMain");

recipeLinkBtnMain.forEach(button => {
    button.addEventListener('click', function () {
        location.href = "recipe_detail.html";
    })
})
//-------------------------------------------------------------------------------------

//Delete Recipe Button :
var deleteButtons = document.querySelectorAll('.deleteRecipe');

 // Add event listener to each delete button
deleteButtons.forEach(function(button) {
     button.addEventListener('click', function(event) {
         // Prevent the default action of the button
         event.preventDefault();
 
         // Ask for confirmation before deleting
         var result = confirm("Are you sure you want to delete this recipe?");
 
         // If user confirms, delete the card
         if (result) {
             // Find the parent card element and remove it
             var card = button.closest('.recipe');
             if (card) {
                 card.remove();
                 let cardId= card.getAttribute('id');
                 let arrIdx= localStorage.getItem(cardId);
                 let arr= JSON.parse(localStorage.getItem('userRecipeArr'));
                 arr.splice(arrIdx,1);
                 localStorage.setItem('userRecipeArr',JSON.stringify(arr));
                 localStorage.removeItem(cardId);
             }
         }
     });
});

var isAdmin= getData('admin');
if(isAdmin=='true'&&isSignned){
    var cards = document.querySelectorAll('.recipe');
    cards.forEach(function(card) {
             // Get the adminContainer within each card 
             var adminContainer = card.querySelector('.edit');
             adminContainer.style.display = 'flex';
         });
    console.log('admin is true!');
}else{
    // let adminControl= document.querySelector('.adminContainer');
    // adminControl.style.display='none';
    console.log('admin is null!');
}