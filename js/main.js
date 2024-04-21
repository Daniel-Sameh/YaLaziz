//Navigation Bar toggle function:
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-links");

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("navToggle", "links");
//---------------------------------------------------------

//-----------------------------------------------------------
function saveData(key, value) {
  localStorage.setItem(key, value);
}

function getData(key) {
  return localStorage.getItem(key);
}
function resetData() {
  try {
    localStorage.removeItem("admin");
    localStorage.removeItem("username");
    localStorage.removeItem("sign");
    localStorage.removeItem("password");
    localStorage.setItem("accPhoto", "../Photos/acc pic.png");
    console.log("Data reset successful.");
    window.location.reload();
  } catch (error) {
    console.error("Error resetting data:", error);
  }
}

//Account Details:
var username = getData("username");
var isSignned = getData("sign");
if (username && isSignned) {
  document.querySelector(".account").firstChild.innerHTML = username;
  document.querySelector(".account").firstChild.style =
    "text-decoration:underline;";
}

if (isSignned) {
  document.querySelector(".logout").style.display = "flex";

  document.querySelector(".logout").style.alignItems = "center";
  document.querySelector(".login").style.display = "none";
  document.querySelector(".sign_up").style.display = "none";
}
//----------------------------------------------------------------

// Admin
var isAdmin = getData("admin");
if (isAdmin == "true" && isSignned) {
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

//-----------------------------------------------------------------------

//For Recipes:

//--------------------------------------------------------------------

document.querySelector(".logout").addEventListener("click", function (event) {
  // var logOut=window.confirm("Are you sure to log out from YaLaziz?");
  var popUp = document.createElement("div");
  popUp.id = "popUp";
  popUp.innerHTML =
    'Are you sure to log out from YaLaziz?<button id="popBtn">Logout</button> <button id="cancel">cancel</button>';
  document.querySelector("main").appendChild(popUp);
  popUp.style.display = "flex";
  document.getElementById("popBtn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("popUp").style.display = "none";
    document.querySelector(".logout").style.display = "none";
    document.querySelector(".addRecipe").style.display = "none";
    document.querySelector(".login").style.alignItems = "center";
    document.querySelector(".sign_up").style.alignItems = "center";
    document.querySelector(".login").style.display = "flex";
    document.querySelector(".sign_up").style.display = "flex";
    resetData();
    const Href = document.getElementById("indexHref").getAttribute("href");

    location.href = Href;
  });
  document.getElementById("cancel").addEventListener("click", function (e) {
    e.preventDefault();
    // document.getElementById('popUp').style.display='none';
    document.querySelector("main").removeChild(popUp);
  });
  // if(logOut){
  //     document.querySelector('.logout').style.display = 'none';
  //     document.querySelector('.addRecipe').style.display = 'none';
  //     document.querySelector('.login').style.alignItems= 'center';
  //     document.querySelector('.sign_up').style.alignItems= 'center';
  //     document.querySelector('.login').style.display = 'flex';
  //     document.querySelector('.sign_up').style.display = 'flex';
  //     resetData();
  // }
});
//----------------------------------------------------------------------

document.querySelector(".account").addEventListener("click", function (event) {
  event.preventDefault();
  if (!isSignned) {
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'You are not logged in yet!<button id="popBtn">Login</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
      window.location.href = document
        .querySelector(".login")
        .firstChild.firstChild.getAttribute("href");
    });
    // alert("You are not logged in yet!");
  } else {
    window.location.href = document
      .querySelector(".account")
      .firstChild.getAttribute("href");
  }
});

//------------------------------------------------------------------------
let allRecipe = new Array();
if (localStorage.getItem("allRecipe")) {
  allRecipe = JSON.parse(localStorage.getItem("allRecipe"));
} else {
  let myRecipe = {
    recipeName: "Sambosa",
    recipeId: "Sambosa",
    recipePhoto: "../Photos/sambosa.avif",
    recipeCategory: "Supper",
    recipeSeason: "ramadan",
    recipeDuration: "30 to 60 mins",
    favoriteState: false,
    userMadeRecipe: false,
    recipeDetail: `
        <div class="recipeDetail">
            <div class="detailContainer">
                <div class="recipeImg">
                    <img src="../Photos/sambosak.jpg" alt="the delcious sambosa!">
                    <h1 id="recipe_title">Sambosa</h1>
                    <h4 id="recipe_time">30 to 60 mins</h4>
                </div>
            </div>
            <div class="recipeBody">
                <h2 id="ingredients">&#10149; Ingredients:</h2>
                <div id="ingredientsText">
                    <ol id="ingredients-list">
                        <li>2 kg flour</li>
                        <li>1 chili</li>
                        <li>1.5 kg meat</li>
                        <li>2 Tbsp spices</li>
                        <li>0.5 ltrs oil</li>
                        <li>1 kgs potatoes</li>
                    </ol>
                </div>
                <h2 id="instructions">&#10149; Instructions:</h2>
                <div id="instructionsText">
                    <ol id="instructions-list">
                        <li>The filling for Samosas is typically vegetarian, made with roughly mashed potato that’s cooked up with spices, fresh green chilli and peas. Altthough you’ll see plenty of versions with meat (usually ground).</li>
                        <li>Rough-mashed potato – Boil potatoes until tender, then use a fork to roughly mash. It’s nice to have bits of chunks in the potato for interest, rather than a soft, creamy and uniform mash.</li>
                        <li>Cook spices and aromatics – A healthy dose of spices are fried up with fresh ginger and chilli which is then tossed through along the peas.</li>
                        <li>Add potato – Add the mashed potato and gently but thoroughly mix through, so the flavouring fully permeates the potato.</li>
                        <li>Fresh coriander, then cool – Lastly, mix through fresh coriander, then let the filling cool completely before using.</li>
                    </ol>
                </div>
            </div>
        </div>`,
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Shakshuka",
    recipeId: "Shakshuka",
    recipePhoto: "../Photos/Shakshuka.jpg",
    recipeCategory: "breakfast",
    recipeSeason: "general",
    recipeDuration: "50 to 60 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Stuffed grape leaves",
    recipeId: "Stuffed_grape_leaves",
    recipePhoto: "../Photos/war23nab1.jpg",
    recipeCategory: "lunch",
    recipeSeason: "general",
    recipeDuration: "2 to 3 hrs",
    favoriteState: false,
    userMadeRecipe: false,
    recipeDetail: `
        <div class="recipeDetail">
            <div class="detailContainer">
                <div class="recipeImg">
                    <img src="../Photos/war2enab2.webp" alt="the delcious sutffed Grape Leaves!">
                    <h1 id="recipe_title">Stuffed grape leaves(Warak 3enab)</h1>
                    <h4 id="recipe_time">2 to 3 hrs</h4>
                </div>
            </div>
            <div class="recipeBody">
                <h2 id="ingredients">&#10149; Ingredients:</h2>
                <div id="ingredientsText">
                    <ol id="ingredients-list">
                        <li>3 kg Grape Leaves</li>
                        <li>1 ltrs Olive Oil</li>
                        <li>2 kg meat</li>
                        <li>4 Tbsp Fresh herbs</li>
                        <li>0.5 ltrs oil</li>
                        <li>0.5 kgs Tomato Sauce</li>
                    </ol>
                </div>
                <h2 id="instructions">&#10149; Instructions:</h2>
                <div id="instructionsText">
                    <ol id="instructions-list">
                        <li>Rinse your grape leaves quickly with cold water. Bring a pot of water to a boil then blanch a handful of leaves at a time in the boiling hot water.</li>
                        <li>Take them out and let them cool in a colander until able to handle.Cut off the stems and setting them aside, do not throw away.</li>
                        <li>In large pot over medium heat, saute onions until translucent add tomato sauce, paste and stir to combine.</li>
                        <li>Add herbs, spices and rice.</li>
                        <li>Mix well and cook for just two minutes. Turn heat off and set aside.</li>
                        <li>Now lay one grape leaf smooth side down on a flat surface or a cutting board. Take about 1.5 teaspoon of the rice mixture and place at the broad end of the leaf.
                        Fold both sides over the rice and roll tucking it nicely as shown above.</li>
                        <li>Repeat until you finish the whole amount.</li>
                        <li>Lay the stems of the fresh herbs, onions rings or tomato and the stem you cut from the grape leaves at the bottom of your pot.
                        Arrange the stuffed grape leaves tightly in layer on the pot. Mix your cooking liquid as directed and pour over the grape leaves.</li>
                        <li>Cover with a small plate and bring to a boil over medium-high flame. Reduce heat to minimum and simmer until thoroughly cooked.</li>
                    </ol>
                </div>
            </div>
        </div>`,
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Cheese-Omelet",
    recipeId: "Cheese-Omelet",
    recipePhoto: "../Photos/Cheese-Omelet.jpg",
    recipeCategory: "breakfast",
    recipeSeason: "general",
    recipeDuration: "6 to 10 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Hot Chocolate",
    recipeId: "Hot_Chocolate",
    recipePhoto: "../Photos/Hot-Chocolate.jpg",
    recipeCategory: "drinks",
    recipeSeason: "general",
    recipeDuration: "10 to 15 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Lemonade",
    recipeId: "Lemonade",
    recipePhoto: "../Photos/lemonade.jpg",
    recipeCategory: "drinks",
    recipeSeason: "general",
    recipeDuration: "3 to 5 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Bechamel Pasta",
    recipeId: "Bechamel_Pasta",
    recipePhoto: "../Photos/Bechamel-Pasta.jpg",
    recipeCategory: "lunch",
    recipeSeason: "general",
    recipeDuration: "65 to 85 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Pepperoni Pizza",
    recipeId: "Pepperoni_Pizza",
    recipePhoto: "../Photos/pepperoni-pizza.jpg",
    recipeCategory: "lunch",
    recipeSeason: "general",
    recipeDuration: "25 to 30 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Egg-Salad Sandwich",
    recipeId: "Egg-Salad_Sandwich",
    recipePhoto: "../Photos/Egg-Salad-Sandwich.jpg",
    recipeCategory: "dinner",
    recipeSeason: "general",
    recipeDuration: "10 to 15 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Orzo Soup",
    recipeId: "Orzo_Soup",
    recipePhoto: "../Photos/orzo-soup.jpg",
    recipeCategory: "dinner",
    recipeSeason: "general",
    recipeDuration: "25 to 30 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Brownies",
    recipeId: "Brownies",
    recipePhoto: "../Photos/brownies.jpg",
    recipeCategory: "desserts",
    recipeSeason: "general",
    recipeDuration: "50 to 60 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Cookies",
    recipeId: "Cookies",
    recipePhoto: "../Photos/cookies.jpg",
    recipeCategory: "desserts",
    recipeSeason: "general",
    recipeDuration: "20 to 25 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Konafa",
    recipeId: "Konafa",
    recipePhoto: "../Photos/knafeh.jpg",
    recipeCategory: "desserts",
    recipeSeason: "ramadan",
    recipeDuration: "50 to 60 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Ktayef",
    recipeId: "Ktayef",
    recipePhoto: "../Photos/ktayef.jpg",
    recipeCategory: "Supper",
    recipeSeason: "ramadan",
    recipeDuration: "20 to 30 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Beef wellington",
    recipeId: "Beef_wellington",
    recipePhoto: "../Photos/beef_wellington.webp",
    recipeCategory: "lunch",
    recipeSeason: "christmas",
    recipeDuration: "2 to 3 hrs",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Christmas Cookies",
    recipeId: "Christmas_Cookies",
    recipePhoto: "../Photos/christmas_cookies.webp",
    recipeCategory: "desserts",
    recipeSeason: "christmas",
    recipeDuration: "60 to 90 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
  myRecipe = {
    recipeName: "Ice Coffee",
    recipeId: "Ice_Coffee",
    recipePhoto: "../Photos/ice_coffe.jpg",
    recipeCategory: "drinks",
    recipeSeason: "summer",
    recipeDuration: "5 to 10 mins",
    favoriteState: false,
    userMadeRecipe: false,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };
  allRecipe.push(myRecipe);
}

//-------------------------------------------------------------------------

let favoriteRecipeArr = new Array();
if (localStorage.getItem("favoriteRecipeArr")) {
  favoriteRecipeArr = JSON.parse(localStorage.getItem("favoriteRecipeArr"));
}

for (let i = 0; i < favoriteRecipeArr.length; i++) {
  const idOfRecipe = favoriteRecipeArr[i].recipeId;
  for (let j = 0; j < allRecipe.length; j++) {
    if (allRecipe[j].recipeId == idOfRecipe) {
      allRecipe[j].favoriteState = true;
      break;
    }
  }
}

//-------------------------------------------------------------------------

/* const edit= document.querySelector(".editRecipe");

edit.forEach(function(btn){
    btn.addEventListener('click',function(e){
        e.preventDefault();
        var card = button.closest('.recipe');
            if (card) {
                let cardId= card.getAttribute('id');
                let arrIdx;
                for (let i = 0; i < allRecipe.length; i++) {
                   if (allRecipe[i].recipeId == cardId) {
                       arrIdx = i;
                       break;
                   }
                }
                localStorage.setItem('editRecipe',true);
                
            }
    })
}) */
