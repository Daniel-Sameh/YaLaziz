//Navigation Bar toggle function:
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-links')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
showMenu('navToggle','links');
//---------------------------------------------------------

//Delete Recipe :
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
                 let arr= JSON.parse(localStorage.getItem('recipeArr'));
                 arr.splice(arrIdx,1);
                 localStorage.setItem('recipeArr',JSON.stringify(arr));
                 localStorage.removeItem(cardId);
             }
         }
     });
});
//-----------------------------------------------------------
function saveData(key, value) {
    localStorage.setItem(key, value);
}
  
function getData(key) {
    return localStorage.getItem(key);
}
function resetData(){
    try {
        localStorage.removeItem('admin');
        localStorage.removeItem('username');
        localStorage.removeItem('sign');
        localStorage.removeItem('password');
        console.log("Data reset successful.");
        window.location.reload();
      } catch (error) {
        console.error("Error resetting data:", error);
      }
}

//Account Details:
var username= getData('username');
var isSignned= getData('sign');
if(username&&isSignned){
    document.querySelector('.account').firstChild.innerHTML= username;
    document.querySelector('.account').firstChild.style='text-decoration:underline;';
}


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


if(isSignned){
    document.querySelector('.logout').style.display = 'flex';
    document.querySelector('.addRecipe').style.display = 'flex';
    document.querySelector('.logout').style.alignItems= 'center';
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.sign_up').style.display = 'none';
}




//-----------------------------------------------------------------------

//For Recipes:

favoriteButtons = document.querySelectorAll(".favorite_button");

favoriteButtons.forEach(button => {
   button.addEventListener("click", function() {
       const hrefValue = button.getAttribute("src");
       const addTitle = "Add to Your favorites";
       const removeTitle = "Remove from Your favorites";
       if (hrefValue == "../../Photos/heartWhite.png") {
           button.src = "../../Photos/heartRed.png";
           button.title = removeTitle;
       }
       else if (hrefValue == "../../Photos/heartRed.png") {
           button.src = "../../Photos/heartWhite.png"
           button.title = addTitle;
       }
       else if (hrefValue == "../Photos/heartWhite.png") {
           button.src = "../Photos/heartRed.png";
           button.title = removeTitle;
       }
       else {
           button.src = "../Photos/heartWhite.png";
           button.title = addTitle;
       }
       button.style.opacity = 0;
       setTimeout(() => {
           button.style.opacity = 1; 
       }, 100);
   });
 }); 


//--------------------------------------------------------------------

 document.querySelector('.logout').addEventListener('click',function(event){
    var logOut=window.confirm("Are you sure to log out from YaLaziz?");
    if(logOut){
        document.querySelector('.logout').style.display = 'none';
        document.querySelector('.addRecipe').style.display = 'none';
        document.querySelector('.login').style.alignItems= 'center';
        document.querySelector('.sign_up').style.alignItems= 'center';
        document.querySelector('.login').style.display = 'flex';
        document.querySelector('.sign_up').style.display = 'flex';
        resetData();
    }
    
});
//----------------------------------------------------------------------

document.querySelector('.account').addEventListener('click', function(event){
    event.preventDefault();
    if(!isSignned){
        // const note= document.createElement('ul');
        // note.classList.add("account");
        // note.innerHTML="Your are not Logged In yet!";
        // note.style.zIndex=2000;
        // note.style.color="red";
        // note.style.backgroundColor="#FDA403";
        // note.style.width="100px";
        // const acc=document.querySelector('.account');
        // acc.appendChild(note);
        alert("You are not logged in yet!");
        window.location.href=document.querySelector(".login").firstChild.firstChild.getAttribute("href");
    }else{
        window.location.href=document.querySelector(".account").firstChild.getAttribute("href");
    }
})

//------------------------------------------------------------------------

var recipeLinkBtn = document.querySelectorAll("#recipeLink");

recipeLinkBtn.forEach(button => {
    button.addEventListener('click', function(){
        location.href = "../HTML/recipe_detail.html";
    })
})
