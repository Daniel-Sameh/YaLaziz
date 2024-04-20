// Favorite Button :

favoriteButtons = document.querySelectorAll(".favorite_button");

favoriteButtons.forEach(button => {
    button.addEventListener("click", function () {
        console.log('clicked');

        if (!isSignned) {
            // alert("You Have to Login First!");
            var popUp= document.createElement('div');
            popUp.id = "popUp";
            popUp.innerHTML = 'Login to add this recipe to your favorites😉<button id="popBtn">OK</button>';
            document.querySelector('main').appendChild(popUp);
            popUp.style.display = "flex";
            document.getElementById('popBtn').addEventListener('click', function(e){
                e.preventDefault();
                document.querySelector('main').removeChild(popUp);
            })
            return;
        }

        const recipeID = button.closest('.recipe').getAttribute('id');

        const hrefValue = button.getAttribute("src");
        const addTitle = "Add to Your favorites";
        const removeTitle = "Remove from Your favorites";
        if (hrefValue == "../../Photos/heartWhite.png") {
            button.src = "../../Photos/heartRed.png";
            button.title = removeTitle;
            addRecipeToFavorite(recipeID);
        }
        else if (hrefValue == "../../Photos/heartRed.png") {
            button.src = "../../Photos/heartWhite.png"
            button.title = addTitle;
            deleteRecipeFromFavorite(recipeID);
        }
        else if (hrefValue == "../Photos/heartWhite.png") {
            button.src = "../Photos/heartRed.png";
            button.title = removeTitle;
            addRecipeToFavorite(recipeID);
        }
        else {
            button.src = "../Photos/heartWhite.png";
            button.title = addTitle;
            deleteRecipeFromFavorite(recipeID);
        }
        button.style.opacity = 0;
        setTimeout(() => {
            button.style.opacity = 1;
        }, 100);
    });
});

function deleteRecipeFromFavorite(recipeID) {
    for (let i = 0; i < allRecipe.length; i++) {
        if (allRecipe[i].recipeId == recipeID) {
            allRecipe[i].favoriteState = false;
            localStorage.setItem('allRecipe',JSON.stringify(allRecipe));
            break;
        }
    }
}

function addRecipeToFavorite(recipeID) {
    for (let i = 0; i < allRecipe.length; i++) {
        if (allRecipe[i].recipeId == recipeID) {
            allRecipe[i].favoriteState = true;
            localStorage.setItem('allRecipe',JSON.stringify(allRecipe));
            break;
        }
    }
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
                 let arrIdx;
                 for (let i = 0; i < allRecipe.length; i++) {
                    if (allRecipe[i].recipeId == cardId) {
                        arrIdx = i;
                        break;
                    }
                 }
                 let arr= JSON.parse(localStorage.getItem('allRecipe'));
                 arr.splice(arrIdx,1);
                 localStorage.setItem('allRecipe',JSON.stringify(arr));
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
