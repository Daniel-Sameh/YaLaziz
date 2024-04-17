const form = document.getElementById('form');

const recipeName = document.getElementById('name');
const recipeId = document.getElementById('Rid');
const recipePhoto = document.getElementById('image');

const submitButton = document.querySelectorAll(".btn");

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


