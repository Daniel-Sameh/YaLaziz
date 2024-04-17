const rName = localStorage.getItem('recipeName');
const rId = localStorage.getItem('recipeId');
const rPhoto = localStorage.getItem('recipePhoto');

const accountCard = document.getElementById('grid');



if (rName && rId && rPhoto) {
    const card = document.createElement('div');
    card.classList.add('recipe');

    const cardDetails = `
    <div class="edit">
    <form action="" method="post" id="" class="del"><button>&#9998;</button></form>
    <form action="" method="post" id="" class="ok"><button>&#10006;</button></form>
    </div>
    <div class="favorite_buttons">
    <img src="../Photos/heartWhite.png" alt="" title="Add to Your favorites">
    </div>   
    <img src="../Photos/${rPhoto}" alt="${rName}">
    <div class="info">                    
        <h3>${rName}</h3>
        <h5>&#x23F0; 2 to 3 hrs</h5> 
        <p>From the most delicious recipes in the christmas</p>
        <button class="btn">view Recipe</button>
    </div>`;
    
    
    
    card.innerHTML = cardDetails;
    accountCard.appendChild(card);

}

