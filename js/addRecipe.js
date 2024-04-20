const formPage = document.getElementById('add-form');

const recipeName = document.getElementById('rname-id');
const recipeId = document.getElementById('rid-id');
const recipePhoto = document.getElementById('rimage-id');

let submitButton = document.querySelector('.submit-btn');
const recipeCategory = document.getElementsByName('meal');
const recipeSeason = document.getElementsByName('occasion');

let breakfastArr = new Array();
let lunchArr = new Array();
let dinnerArr = new Array();
let dessertsArr = new Array();
let drinksArr = new Array();
let summerArr = new Array();
let ramadanArr = new Array();
let christmasArr = new Array();


let userRecipeArr= new Array();
if(localStorage.getItem('userRecipeArr')){
    userRecipeArr=JSON.parse(localStorage.getItem('userRecipeArr'));
}
// if(localStorage.getItem('lunchArr')){
//     recipeArr=JSON.parse(localStorage.getItem('lunchArr'));
// }
// if(localStorage.getItem('dinnerArr')){
//     recipeArr=JSON.parse(localStorage.getItem('dinnerArr'));
// }
// if(localStorage.getItem('summerArr')){
//     recipeArr=JSON.parse(localStorage.getItem('summerArr'));
// }
// if(localStorage.getItem('ramadanArr')){
//     recipeArr=JSON.parse(localStorage.getItem('ramadanArr'));
// }
// if(localStorage.getItem('christmasArr')){
//     recipeArr=JSON.parse(localStorage.getItem('christmasArr'));
// }
// if(localStorage.getItem('breakfastArr')){
//     recipeArr=JSON.parse(localStorage.getItem('breakfastArr'));
// }
// if(localStorage.getItem('dessertsArr')){
//     recipeArr=JSON.parse(localStorage.getItem('dessertsArr'));
// }
// if(localStorage.getItem('drinksArr')){
//     recipeArr=JSON.parse(localStorage.getItem('drinksArr'));
// }

let recipeCategory_value;
for (i = 0; i < recipeCategory.length; i++){
    if (recipeCategory[i].checked) {
        recipeCategory_value = recipeCategory[i].value;
    }
}
let recipeSeason_value;
for (i = 0; i < recipeSeason.length; i++){
    if (recipeSeason[i].checked) {
        recipeSeason_value = recipeSeason[i].value;
    }
}


function handlePhotoSaving(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const base64String = event.target.result;
      localStorage.setItem('tempPhoto', base64String);
    };
  
    reader.readAsDataURL(file);
}

const coverImageInput = document.getElementById('rimage-id');
coverImageInput.addEventListener('change', handlePhotoSaving);

submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    const reader = recipePhoto.files[0];
    console.log(reader);

    const recipeName_value = recipeName.value;
    const recipeId_value = recipeId.value;
    let recipeCategory_value;
    for (i = 0; i < recipeCategory.length; i++){
        if (recipeCategory[i].checked) {
            recipeCategory_value = recipeCategory[i].value;
        }
    }
    let recipeSeason_value;
    for (i = 0; i < recipeSeason.length; i++){
        if (recipeSeason[i].checked) {
            recipeSeason_value = recipeSeason[i].value;
        }
    }
    const recipePhoto_value = localStorage.getItem('tempPhoto');
    localStorage.removeItem('tempPhoto');
    console.log(recipeName_value);
    console.log(recipeId_value);
    console.log(recipePhoto_value);
    let myRecipe = {
        recipeName: recipeName_value,
        recipeId: recipeId_value,
        recipePhoto: recipePhoto_value,
        recipeCategory: recipeCategory_value,
        recipeSeason: recipeSeason_value,
        favoriteState: false,
        userMadeRecipe: true
        // ingredients: localStorage.getItem('ingredients'),
        // instructions: localStorage.getItem('instructions')
    } 
    allRecipe.push(myRecipe);
    userRecipeArr.push(myRecipe);
    let arrIdx= userRecipeArr.length-1;
    localStorage.setItem('userRecipeArr',JSON.stringify(userRecipeArr));
    localStorage.setItem(recipeId_value,arrIdx);
    
    localStorage.setItem('allRecipe', JSON.stringify(allRecipe));
    // window.localStorage.setItem('recipeName', recipeName_value);
    // window.localStorage.setItem('recipeId', recipeId_value);
    // window.localStorage.setItem('recipePhoto', recipePhoto_value);
    // document.getElementById('popUp').innerHTML="The Recipe Is Added Succesfully!";
    document.getElementById('popUp').style.display='flex';
    // localStorage.removeItem('ingredients');
    // localStorage.removeItem('instructions');
});

// localStorage.setItem(recipeId_value, arrIdx);
//     switch (recipeCategory_value) {
//         case "lunch":
//             lunchArr.push(myRecipe);
//             localStorage.setItem('breakfastArr', JSON.stringify(lunchArr));
//             break;
//         case "dinner":
//             dinnerArr.push(myRecipe);
//             localStorage.setItem('breakfastArr', JSON.stringify(dinnerArr));
//             break;
//         case "breakfast":
//             breakfastArr.push(myRecipe);
//             localStorage.setItem('breakfastArr', JSON.stringify(breakfastArr));
//             break;
//         case "drink":
//             drinksArr.push(myRecipe);
//             localStorage.setItem('breakfastArr', JSON.stringify(drinksArr));
//             break;
//         case "dessert":
//             dessertsArr.push(myRecipe);
//             localStorage.setItem('breakfastArr', JSON.stringify(dessertsArr));
//             break;
//     }
//     switch (recipeSeason_value) {
//         case "summer":
//             summerArr.push(myRecipe);
//             localStorage.setItem('summerArr', JSON.stringify(summerArr));
//             break;
//         case "christmas":
//             christmasArr.push(myRecipe);
//             localStorage.setItem('christmasArr', JSON.stringify(christmasArr));
//             break;
//         case "ramadan":
//             ramadanArr.push(myRecipe);
//             localStorage.setItem('ramadanArr', JSON.stringify(ramadanArr));
//             break;
//     }

document.getElementById('popBtn').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('popUp').style.display='none';
})

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
        alert("Please enter quantity and unit and name of the ingredient.");
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
        alert("Please enter instruction text.");
    }
}

function uploadphoto() {
    var name = document.getElementById('rname-id');
    var input = document.getElementById('rimage-id');

    if (input.files&&input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Get the image preview element
            var imagePreview = document.querySelector('.image-preview');
            var img = new Image();
            img.src = e.target.result;
            img.alt = 'Preview';

            imagePreview.innerHTML = '';

            imagePreview.appendChild(img);
            
            //Preview the recipe name
           // document.getElementById('prevRecipeName').innerHTML="The "+name.value+" recipe"
        };

        // Read the uploaded file as a URL
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadphototwo() {
    var input = document.getElementById('rphoto-id');

    if (input.files&&input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Get the image preview element
            var imagePreview = document.querySelector('.photo-preview');
            var img = new Image();
            img.src = e.target.result;
            img.alt = 'Preview';

            imagePreview.innerHTML = '';

            imagePreview.appendChild(img);
        };

        // Read the uploaded file as a URL
        reader.readAsDataURL(input.files[0]);
    }
}
// function preview(){
//     var name = document.getElementById('rname-id').value;
//     // var id = document.getElementById('rid-id').value;
//     // var from = document.getElementById('rfrom-id').value;
//     // var to = document.getElementById('rto-id').value;

//     if(name && id && from && to ){
//         var addnamestamp = document.createElement('h5');
//         var addnameinfo = document.createElement('p');
//         addnamestamp.innerHTML= "Recipe name: ";
//         addnameinfo.innerHTML = name;
//         var addin = document.querySelector('.name-info-preview');
//         addin.appendChild(addnamestamp);
//         addin.appendChild(addnameinfo);
//     }
// }

var isnameadded = false;
function preview(){
    var name = document.getElementById('rname-id').value;
    var id = document.getElementById('rid-id').value;
    var from = document.getElementById('rfrom-id').value;
    var fromunit = document.getElementById('from-unit').value;
    var to = document.getElementById('rto-id').value;
    var tounit = document.getElementById('to-unit').value;
    
    if(name && id && from && to && fromunit && tounit && !isnameadded){
        var addnamestamp = document.createElement('h4');
        var addnameinfo = document.createElement('p');
        addnamestamp.innerHTML= "1- Recipe name: ";
        addnameinfo.innerHTML = name;
        var addname = document.querySelector('.name-info-preview');
        addname.appendChild(addnamestamp);
        addname.appendChild(addnameinfo);
        isnameadded = true;
//-----------------------------------------------------------------------------       
        var addidstamp = document.createElement('h4');
        var addidinfo = document.createElement('p');
        addidstamp.innerHTML= "2- Recipe ID: ";
        addidinfo.innerHTML = id;
        var addid = document.querySelector('.id-info-preview');
        addid.appendChild(addidstamp);
        addid.appendChild(addidinfo);
//------------------------------------------------------------------------------
        var addfromtostamp = document.createElement('h4');
        var addfromtoinfo = document.createElement('p');
        addfromtostamp.innerHTML= "3- Recipe Duration: ";
        addfromtoinfo.innerHTML = "From " + from + " " + fromunit + " to " + to + " " + tounit;
        var addfromto = document.querySelector('.fromto-info-preview');
        addfromto.appendChild(addfromtostamp);
        addfromto.appendChild(addfromtoinfo);
    }
}
