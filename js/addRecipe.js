allRecipe = JSON.parse(localStorage.getItem("allRecipe"));
const formPage = document.getElementById("add-form");

const recipeName = document.getElementById("rname-id");
const recipeId = document.getElementById("rid-id");
const recipePhoto = document.getElementById("rimage-id");

let submitButton = document.querySelector(".submit-btn");
const recipeCategory = document.getElementsByName("meal");
const recipeSeason = document.getElementsByName("occasion");

document.addEventListener('DOMContentLoaded', function() {
  localStorage.removeItem('tempPhoto');
  localStorage.removeItem('tempPhoto1');  
});



let recipeDetail = document.getElementById("recipeDetail");

function handlePhotoSaving(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    
    localStorage.setItem("tempPhoto", base64String);
    
  };

  reader.readAsDataURL(file);
}

function handlePhotoSavingMain(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    localStorage.setItem("tempMainPhoto", base64String);
  };

  reader.readAsDataURL(file);
}

const coverImageInput = document.getElementById("rimage-id");
coverImageInput.addEventListener("change", handlePhotoSaving);

const mainImageInput = document.getElementById("rphoto-id");
mainImageInput.addEventListener("change", handlePhotoSavingMain);


submitButton.addEventListener("click", function (e) {
  if (document.getElementById("ingredients-list").children.length == 0 || document.getElementById("instructions-list").children.length == 0 || document.querySelector(".name-info-preview").children.length == 0 
  || document.querySelector(".id-info-preview").children.length == 0  
  || document.querySelector(".fromto-info-preview").children.length == 0
  || document.querySelector(".image-preview").children.length == 0
  || document.querySelector(".photo-preview").children.length == 0) {
    e.preventDefault();
    var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Please fill all fields!<button id="popBtn">OK</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
    return; 
  }
  e.preventDefault();
  const reader = recipePhoto.files[0];
  console.log(reader);

  const recipeName_value = recipeName.value;
  const recipeId_value = recipeId.value;

  for (let i = 0; i < allRecipe.length; i++) {
    if (allRecipe[i].recipeId == recipeId_value&&!id) {
      // alert("Recipe Id must be Unique!");
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Recipe Id must be Unique!<button id="popBtn">OK</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
      return;
    }
  }

  const fromValue = document.getElementById("rfrom-id").value;
  const toValue = document.getElementById("rto-id").value;
  const timeUnit = document.getElementById("to-unit").value;
  let recipeCategory_value;
  for (i = 0; i < recipeCategory.length; i++) {
    if (recipeCategory[i].checked) {
      recipeCategory_value = recipeCategory[i].value;
      break;
    }
  }
  let recipeSeason_value;
  for (i = 0; i < recipeSeason.length; i++) {
    if (recipeSeason[i].checked) {
      recipeSeason_value = recipeSeason[i].value;
      break;
    }
  }
  const recipeDurationValue = fromValue + " to " + toValue + " " + timeUnit;
  const recipePhoto_value = localStorage.getItem("tempPhoto");
  const recipeMainPhoto_value = localStorage.getItem("tempMainPhoto");
  localStorage.removeItem("tempPhoto");
  localStorage.removeItem("tempMainPhoto");
  const recipeDetail_value = `
  <div class="recipeDetail">
      <div class="detailContainer">
          <div class="recipeImg">
              <img src="${recipeMainPhoto_value}" alt="${recipeName_value}">
              <h1 id="recipe_title">${recipeName_value}</h1>
              <h4 id="recipe_time">${recipeDurationValue}</h4>
          </div>
      </div>
      <div class="recipeBody">
          <h2 id="ingredients">&#10149; Ingredients:</h2>
          <div id="ingredientsText">
              <ol id="ingredients-list">
              ${document.getElementById("ingredients-list").innerHTML}
              </ol>
          </div>
          <h2 id="instructions">&#10149; Instructions:</h2>
          <div id="instructionsText">
              <ol id="instructions-list">
              ${document.getElementById("instructions-list").innerHTML}
              </ol>
          </div>
      </div>
  </div>`;
  let myRecipe = {
    recipeName: recipeName_value,
    recipeId: recipeId_value,
    recipePhoto: recipePhoto_value,
    recipeMainPhoto: recipeMainPhoto_value,
    recipeCategory: recipeCategory_value,
    recipeSeason: recipeSeason_value,
    recipeDuration: recipeDurationValue,
    favoriteState: false,
    userMadeRecipe: true,
    recipeDetail: recipeDetail_value,
    recipeIngredients: document.getElementById("ingredients-list").innerHTML,
    recipeInstructions: document.getElementById("instructions-list").innerHTML,
    // ingredients: localStorage.getItem('ingredients'),
    // instructions: localStorage.getItem('instructions')
  };

  if(id){
    let arrIdx;
    for (let i = 0; i < allRecipe.length; i++) {
      if (allRecipe[i].recipeId == id) {
            arrIdx = i;
            console.log("found "+i);
            break;
      }
    }
    if(arrIdx>=0){
      allRecipe[arrIdx]=myRecipe;
    }
  }else{
    allRecipe.push(myRecipe);
    localStorage.setItem("allRecipe", JSON.stringify(allRecipe));
    var popUp = document.createElement("div");
    popUp.id = "popUp";
   popUp.innerHTML =
    'Your Recipe is added successfully!<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }



  

  
  // localStorage.removeItem('ingredients');
  // localStorage.removeItem('instructions');
});

// let ingredientsArr= new Array();
// if(localStorage.getItem('ingredients')){
//     ingredientsArr= localStorage.getItem('ingredients');
// }
function addIngredient() {
  var unit = document.getElementById("unit-id").value;
  var quantity = document.getElementById("quantity-id").value;
  var name = document.getElementById("ingredient-id").value;

  if (quantity && name && unit) {
    var listItem = document.createElement("li");
    listItem.textContent = quantity + " " + unit + " " + name;

    //Add Ingredients to localStorage
    // ingredientsArr.push(listItem.textContent);
    // localStorage.setItem('ingredients', JSON.stringify(ingredientsArr));

    var removeButton = document.createElement("button");
    var trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";
    removeButton.appendChild(trashIcon);
    removeButton.className = "Remove-button";
    removeButton.onclick = function () {
      listItem.remove();
      // ingredientsArr.pop();
      // localStorage.setItem('ingredients', JSON.stringify(ingredientsArr));
    };

    listItem.appendChild(removeButton);
    document.getElementById("ingredients-list").appendChild(listItem);

    /*  document.getElementById("ingredient-quantity").value = "";
        document.getElementById("ingredient-name").value = ""; */
    //supposed to clear input field but not working
  } else {
    // alert("Please enter quantity and unit and name of the ingredient.");
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter quantity, unit and name of the ingredient<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
}

// let instructionsArr= new Array();
// if(localStorage.getItem('instructions')){
//     instructionsArr= localStorage.getItem('instructions');
// }
function addInstruction() {
  var instructionText = document.getElementById("instructions-id").value;

  if (instructionText) {
    var listItem = document.createElement("li");
    listItem.textContent = instructionText;

    // instructionsArr.push(instructionText);
    // localStorage.setItem('instructions',JSON.stringify(instructionsArr));

    var removeButton = document.createElement("button");
    var trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";
    removeButton.appendChild(trashIcon);
    removeButton.className = "Remove-button";
    removeButton.onclick = function () {
      listItem.remove();
      // instructionsArr.pop();
      // localStorage.setItem('instructions',JSON.stringify(instructionsArr));
    };

    listItem.appendChild(removeButton);
    document.getElementById("instructions-list").appendChild(listItem);

    // document.getElementById("instruction-text").value = "";
  } else {
    // alert("Please enter instruction text.");
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter instruction text<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
}

function uploadphoto() {
  var name = document.getElementById("rname-id");
  var input = document.getElementById("rimage-id");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Get the image preview element
      var imagePreview = document.querySelector(".image-preview");
      var img = new Image();
      img.src = e.target.result;
      img.alt = "Preview";

      imagePreview.innerHTML = "";

      imagePreview.appendChild(img);
    };

    // Read the uploaded file as a URL
    reader.readAsDataURL(input.files[0]);
  }
}

function uploadphototwo() {
  var input = document.getElementById("rphoto-id");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Get the image preview element
      var imagePreview = document.querySelector(".photo-preview");
      var img = new Image();
      img.src = e.target.result;
      img.alt = "Preview";

      imagePreview.innerHTML = "";

      imagePreview.appendChild(img);
    };

    // Read the uploaded file as a URL
    reader.readAsDataURL(input.files[0]);
  }
}

function preview() {
  //incase the user wants to change the input
  document.querySelector(".name-info-preview").innerHTML = "";
  document.querySelector(".id-info-preview").innerHTML = "";
  document.querySelector(".fromto-info-preview").innerHTML = "";

  var name = document.getElementById("rname-id").value;
  var id = document.getElementById("rid-id").value;
  var from = document.getElementById("rfrom-id").value;
  var to = document.getElementById("rto-id").value;
  var tounit = document.getElementById("to-unit").value;
  var photo= localStorage.getItem("tempPhoto");
  var photo1= localStorage.getItem("tempMainPhoto");

  // if (name && id && from && to && tounit&&photo&&photo1) {
    var addnamestamp = document.createElement("h4");
    var addnameinfo = document.createElement("p");
    addnamestamp.innerHTML = "1- Recipe name: ";
    addnameinfo.innerHTML = name;
    var addname = document.querySelector(".name-info-preview");
    addname.appendChild(addnamestamp);
    addname.appendChild(addnameinfo);
    isnameadded = true;
    //-----------------------------------------------------------------------------
    var addidstamp = document.createElement("h4");
    var addidinfo = document.createElement("p");
    addidstamp.innerHTML = "2- Recipe ID: ";
    addidinfo.innerHTML = id;
    var addid = document.querySelector(".id-info-preview");
    addid.appendChild(addidstamp);
    addid.appendChild(addidinfo);
    //------------------------------------------------------------------------------
    
    if(from == to || from > to){
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Make sure from can not be greater than or equal to!<button id="popBtn">OK</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
    }else{
    var addfromtostamp = document.createElement("h4");
    var addfromtoinfo = document.createElement("p");
    addfromtostamp.innerHTML = "3- Recipe Duration: ";
    addfromtoinfo.innerHTML =
      "From " + from + " " + tounit + " to " + to + " " + tounit;
    var addfromto = document.querySelector(".fromto-info-preview");
    addfromto.appendChild(addfromtostamp);
    addfromto.appendChild(addfromtoinfo);
    }
    if (document.querySelector(".name-info-preview").children.length == 0 
            || document.querySelector(".id-info-preview").children.length == 0  
            || document.querySelector(".fromto-info-preview").children.length == 0
            || document.querySelector(".image-preview").children.length == 0
            || document.querySelector(".photo-preview").children.length == 0) {
      e.preventDefault();
      var popUp = document.createElement("div");
        popUp.id = "popUp";
        popUp.innerHTML =
          'Please fill all fields!<button id="popBtn">OK</button>';
        document.querySelector("main").appendChild(popUp);
        popUp.style.display = "flex";
        document.getElementById("popBtn").addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector("main").removeChild(popUp);
        });
      return; 
    }
  //   }else{
  //     var popUp = document.createElement("div");
  //     popUp.id = "popUp";
  //     popUp.innerHTML =
  //       'Make sure you entered everything!<button id="popBtn">OK</button>';
  //     document.querySelector("main").appendChild(popUp);
  //     popUp.style.display = "flex";
  //     document.getElementById("popBtn").addEventListener("click", function (e) {
  //       e.preventDefault();
  //       document.querySelector("main").removeChild(popUp);
  //     });
  // }
}

//input validations

document
  .getElementById("quantity-id")
  .addEventListener("input", function (event) {
    var quantity = parseFloat(event.target.value);

    if (isNaN(quantity) || quantity <= 0) {
      event.target.value = "";
      // alert('Please enter a valid positive quantity.');
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Please enter a valid positive quantity<button id="popBtn">Done</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
    }
  });

document.getElementById("rfrom-id").addEventListener("input", function (event) {
  var quantity = parseFloat(event.target.value);

  if (isNaN(quantity) || quantity <= 0) {
    event.target.value = "";
    // alert('Please enter a valid positive duration.');
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter a valid positive duration<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
});

document.getElementById("rto-id").addEventListener("input", function (event) {
  var quantity = parseFloat(event.target.value);

  if (isNaN(quantity) || quantity <= 0) {
    event.target.value = "";
    // alert('Please enter a valid positive duration.');
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter a valid positive duration<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
});
//---------------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
// const allRecipe=localStorage.getItem('allRecipe');
  const id = urlParams.get('recipeId');
  if (id) {
    // Fetch the recipe details based on recipeId and populate the form
    let arrIdx;
    for (let i = 0; i < allRecipe.length; i++) {
      if (allRecipe[i].recipeId == id) {
            arrIdx = i;
            console.log("found "+i);
            break;
      }
    }
    if(arrIdx>=0){
      let thisRecipe= allRecipe[arrIdx];
      document.querySelector('h1').innerHTML = "Edit Recipe: " + thisRecipe.recipeName;
      document.getElementById('rname-id').value=thisRecipe.recipeName;
      document.getElementById('rid-id').value=id;
      
      let recDetails= thisRecipe.recipeDetail;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = recDetails;
      console.log(tempDiv);
      //Ingredients:
      let ingredients= tempDiv.querySelector('#ingredients-list');
      let listItems = ingredients.querySelectorAll('li');
      listItems.forEach((li) => {
        if(!thisRecipe.userMadeRecipe){
          var removeButton = document.createElement("button");
        
        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
              li.remove();
              console.log("test li remove");
        };
        li.appendChild(removeButton);
        }else{
          var removeButton = document.querySelectorAll(".Remove-button");
          removeButton.forEach((button) => {
              button.onclick = function () {
              var listItem = button.parentElement;
              listItem.remove();
            };
          });
        }
        
        
        document.getElementById('ingredients-list').appendChild(li);
      });

      //Instructions:
      let instruction=tempDiv.querySelector('#instructions-list');
      let listItems1 = instruction.querySelectorAll('li');
      listItems1.forEach((li) => {
        if(!thisRecipe.userMadeRecipe){
          var removeButton = document.createElement("button");
        
        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
              li.remove();
        };
        li.appendChild(removeButton);
        }else{
          var rmvButton = document.querySelectorAll(".Remove-button");
          rmvButton.forEach((button) => {
              button.onclick = function () {
              var listItem = button.parentElement;
              listItem.remove();
            };
          });
        }
        
        document.getElementById('instructions-list').appendChild(li);

        //Photos:
        let recipePhoto= thisRecipe.recipePhoto;
        var imagePreview = document.querySelector(".image-preview");
        var img = new Image();
        img.src = recipePhoto;
        img.alt = "Preview";
        imagePreview.innerHTML = "";
        imagePreview.appendChild(img);

        let recipePhoto1= thisRecipe.recipeMainPhoto;
        var imagePreview = document.querySelector(".photo-preview");
        var img = new Image();
        img.src = recipePhoto1;
        img.alt = "Preview";
        imagePreview.innerHTML = "";
        imagePreview.appendChild(img);


      });




    }else{
      console.log("cry!");
    }
    

  }




