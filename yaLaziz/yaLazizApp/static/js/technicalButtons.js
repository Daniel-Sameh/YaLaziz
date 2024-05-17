async function addToFav(recipeId, userId) {
  try {
      console.log('recipeId= ',recipeId,' and userId= ',userId);
      const response = await fetch('/api/favorites/add/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: recipeId, userId: userId }),
      });
      const result = await response.json();
      console.log(result.message);
  } catch (error) {
      console.error('Fetch error:', error);
  }
}
async function delFromFav(recipeId, userId) {
  try {
      const response = await fetch(`/api/favorites/delete/?id=${recipeId}&userId=${userId}`, {
          method: 'DELETE',
      });
      const result = await response.json();
      console.log(result.message);
  } catch (error) {
      console.error('Fetch error:', error);
  }
}
async function fetchRecipes() {
  try {
      const response = await fetch('/api/recipes/');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const recipes = await response.json();
      
      // Iterate through the recipes and check their IDs
      recipes.forEach(recipe => {
          console.log(`Recipe ID: ${recipe.id}, Recipe Name: ${recipe.name}`);
          // You can add any additional checks or operations here
      });
      return recipes;
  } catch (error) {
      console.error('Fetch error:', error);
  }
}

allRecipe = fetchRecipes();


// Favorite Button :

favoriteButtons = document.querySelectorAll(".favorite_button");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("clicked");

    if (!isSigned) {
      // alert("You Have to Login First!");
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Login to add this recipe to your favorites😉<button id="popBtn">OK</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
      return;
    }

    const recipeID = button.closest(".recipe").getAttribute("id");

    const hrefValue = button.getAttribute("src");
    const addTitle = "Add to Your favorites";
    const removeTitle = "Remove from Your favorites";
    if (hrefValue == "/static/Photos/heartWhite.png") {
      button.src = "/static/Photos/heartRed.png";
      button.title = removeTitle;
      addToFav(recipeID,userId);
    } else if (hrefValue == "/static/Photos/heartRed.png") {
      button.src = "/static/Photos/heartWhite.png";
      button.title = addTitle;
      delFromFav(recipeID,userId);
    } else if (hrefValue == "/static/Photos/heartWhite.png") {
      button.src = "/static/Photos/heartRed.png";
      button.title = removeTitle;
      addToFav(recipeID,userId);
    } else {
      button.src = "/static/Photos/heartWhite.png";
      button.title = addTitle;
      delFromFav(recipeID,userId);
    }
    button.style.opacity = 0;
    setTimeout(() => {
      button.style.opacity = 1;
    }, 100);
  });
});

// function deleteRecipeFromFavorite(recipeID) {
//   for (let i = 0; i < allRecipe.length; i++) {
//     if (allRecipe[i].recipeId == recipeID) {
//       allRecipe[i].favoriteState = false;
//       localStorage.setItem("allRecipe", JSON.stringify(allRecipe));
//       break;
//     }
//   }
// }

// function addRecipeToFavorite(recipeID) {
//   for (let i = 0; i < allRecipe.length; i++) {
//     if (allRecipe[i].recipeId == recipeID) {
//       allRecipe[i].favoriteState = true;
//       localStorage.setItem("allRecipe", JSON.stringify(allRecipe));
//       break;
//     }
//   }
// }

//-----------------------------------------------------------------------------------

// View Recipe Button
const viewButton = document.querySelectorAll("#recipeLink");

viewButton.forEach((button) => {
  button.addEventListener("click", function () {
    const clickedCard = button.closest(".recipe").getAttribute("id");
    for (i = 0; i < allRecipe.length; i++) {
      if (allRecipe[i].recipeId == clickedCard) {
        const clickedRecipeDetail = allRecipe[i].recipeDetail;
        localStorage.setItem("tmpRecipeDetail", clickedRecipeDetail);
        location.href = "/recipe_detail/";
        break;
      }
    }
  });
});

var recipeLinkBtnMain = document.querySelectorAll("#recipeLinkMain");

recipeLinkBtnMain.forEach((button) => {
  button.addEventListener("click", function () {
    const clickedCard = button.closest(".recipe").getAttribute("id");
    for (i = 0; i < allRecipe.length; i++) {
      if (allRecipe[i].recipeId == clickedCard) {
        const clickedRecipeDetail = allRecipe[i].recipeDetail;
        localStorage.setItem("tmpRecipeDetail", clickedRecipeDetail);
        location.href = "/recipe_detail/";
        break;
      }
    }
  });
});

//-------------------------------------------------------------------------------------

//Delete Recipe Button :
var deleteButtons = document.querySelectorAll(".deleteRecipe");

deleteButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    // Ask for confirmation before deleting
    // var result = confirm("Are you sure you want to delete this recipe?");
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Are you sure you want to delete this recipe?<button id="popBtn">delete</button> <button id="cancel">cancel</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";

    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      // Find the parent card element and remove it
      var card = button.closest(".recipe");
      if (card) {
        card.remove();
        let cardId = card.getAttribute("id");
        let arrIdx;
        for (let i = 0; i < allRecipe.length; i++) {
          if (allRecipe[i].recipeId == cardId) {
            arrIdx = i;
            break;
          }
        }
        // let arr = JSON.parse(localStorage.getItem("allRecipe"));
        allRecipe.splice(arrIdx, 1);
        localStorage.setItem("allRecipe", JSON.stringify(allRecipe));
      }
      document.querySelector("main").removeChild(popUp);
    });

    document.getElementById("cancel").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  });
});

//---------------------------------------------------------------------

// Admin :

var isAdmin = getData("admin");
if (isAdmin == "true" && isSigned) {
  document.querySelector(".addRecipe").style.display = "flex";
  var cards = document.querySelectorAll(".recipe");
  cards.forEach(function (card) {
    // Get the adminContainer within each card
    var adminContainer = card.querySelector(".edit");
    adminContainer.style.display = "flex";
  });
  console.log("admin is true!");
} else {
  // let adminControl= document.querySelector('.adminContainer');
  // adminControl.style.display='none';
  console.log("admin is null!");
}

//---------------------------------------------------------

// Search Function

function getSearchValue() {
  const searchInput = document.getElementById("searchForm");
  return searchInput.value;
}

const searchButtons = document.querySelectorAll("#searchBtn");

searchButtons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    const searchValue = getSearchValue().toLowerCase();
    const Recipes = document.querySelectorAll(".recipe");
    console.log(location.href);
    for (let i = 0; i < Recipes.length; i++) {
      const recipeName = Recipes[i].querySelector("h3").innerHTML.toLowerCase();
      if (recipeName.indexOf(searchValue)) {
        Recipes[i].style.display = "none";
      } else {
        Recipes[i].style.display = "block";
      }
    }
  });
});

//------------------------------------------------------------------

//------------------------------------------------------------------

// Edit Recipe

const editButtons = document.querySelectorAll('.editRecipe');

editButtons.forEach(function(button) {
  button.addEventListener('click', function(){
    var recipe = this.closest('.recipe');
    const recipeID = recipe.getAttribute('id');
    
    const addRecipeHref = document.getElementById('addRecipeHref').href;
    // Pass the recipeID as a query parameter to the URL
    window.location.href = `${addRecipeHref}?recipeId=${recipeID}`;
    
  })
});
