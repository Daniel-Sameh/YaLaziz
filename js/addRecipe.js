const formPage = document.getElementById('add-form');

const recipeName = document.getElementById('rname-id');
const recipeId = document.getElementById('rid-id');
const recipePhoto = document.getElementById('rimage-id');

let submitButton = document.querySelector('.submit-btn');

let recipeArr= new Array();
if(localStorage.getItem('recipeArr')){
    recipeArr=JSON.parse(localStorage.getItem('recipeArr'));
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
    const recipePhoto_value = localStorage.getItem('tempPhoto');
    localStorage.removeItem('tempPhoto');
    console.log(recipeName_value);
    console.log(recipeId_value);
    console.log(recipePhoto_value);
    let myRecipe = {
        recipeName: recipeName_value,
        recipeId:recipeId_value,
        recipePhoto:recipePhoto_value,
        // ingredients: localStorage.getItem('ingredients'),
        // instructions: localStorage.getItem('instructions')
    } 
    recipeArr.push(myRecipe);
    let arrIdx= recipeArr.length-1;
    localStorage.setItem('recipeArr',JSON.stringify(recipeArr));
    localStorage.setItem(recipeId_value,arrIdx);
    // window.localStorage.setItem('recipeName', recipeName_value);
    // window.localStorage.setItem('recipeId', recipeId_value);
    // window.localStorage.setItem('recipePhoto', recipePhoto_value);
    // document.getElementById('popUp').innerHTML="The Recipe Is Added Succesfully!";
    document.getElementById('popUp').style.display='flex';
    // localStorage.removeItem('ingredients');
    // localStorage.removeItem('instructions');
});

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
            document.getElementById('prevRecipeName').innerHTML="The "+name.value+" recipe"
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