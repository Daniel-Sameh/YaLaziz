const form = document.getElementById('add-form');

const recipeName = document.getElementById('rname-id');
const recipeId = document.getElementById('rid-id');
const recipePhoto = document.getElementById('rimage-id');

const submitButton = document.querySelectorAll(".submit-btn");

submitButton.forEach(button => {
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const reader = recipePhoto.files[0];
        console.log(reader);
        
        const recipeName_value = recipeName.value;
        const recipeId_value = recipeId.value;
        const recipePhoto_value = reader.name;
        
        window.localStorage.setItem('recipeName', recipeName_value);
        window.localStorage.setItem('recipeId', recipeId_value);
        window.localStorage.setItem('recipePhoto', recipePhoto_value);
    })
});


function addIngredient() {
    var unit = document.getElementById("unit-id").value;
    var quantity = document.getElementById("quantity-id").value;
    var name = document.getElementById("ingredient-id").value;

    if (quantity && name && unit) {
        var listItem = document.createElement("li");
        listItem.textContent = quantity + " " + unit + " " + name;

        var removeButton = document.createElement("button");
        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
            listItem.remove();
        };

        listItem.appendChild(removeButton);
        document.getElementById("ingredients-list").appendChild(listItem);

        document.getElementById("ingredient-quantity").value = "";
        document.getElementById("ingredient-name").value = "";
        //supposed to clear input field but not working
       
    } else {
        alert("Please enter quantity and unit and name of the ingredient.");
    }
}

function addInstruction() {
    var instructionText = document.getElementById("instructions-id").value;

    if (instructionText) {
        var listItem = document.createElement("li");
        listItem.textContent = instructionText;

        var removeButton = document.createElement("button");
        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
            listItem.remove();
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
    var id = document.getElementById('rid-id');
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
        };

        // Read the uploaded file as a URL
        reader.readAsDataURL(input.files[0]);
    }
}
