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


 var deleteButtons = document.querySelectorAll('.delete');

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
             var card = button.closest('.card');
             if (card) {
                 card.remove();
             }
         }
     });
 });


var username= getData('username');
if(username){
    document.querySelector('.account').firstChild.innerHTML= username;
    document.querySelector('.account').firstChild.style='text-decoration:underline;';
}


var isAdmin= getData('admin');

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
        console.log("Data reset successful.");
        location.reload();
      } catch (error) {
        console.error("Error resetting data:", error);
      }
}

if(isAdmin=='true'){
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
             // Get the adminContainer within each card
             var adminContainer = card.querySelector('.adminContainer');
             adminContainer.style.display = 'block';
         });
    console.log('admin is true!');
}else{
    // let adminControl= document.querySelector('.adminContainer');
    // adminControl.style.display='none';
    console.log('admin is null!');
}

var signedIn= getData('sign');
if(signedIn){
    document.querySelector('.logout').style.display = 'flex';
    document.querySelector('.logout').style.alignItems= 'center';
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.sign_up').style.display = 'none';

}

favoriteButtons = document.querySelectorAll(".favorite_buttons");

favoriteButtons.forEach(button => {
   button.addEventListener("click", function() {
       const addTitle = "Add to Your favorites";
       const removeTitle = "Remove from Your favorites";
       img = button.querySelector("img");
       if (img.title == addTitle) {
           img.src = "../../Photos/heartRed.svg";
           img.title = removeTitle;
       }
       else {
           img.src = "../../Photos/heartWhite.svg"
           img.title = addTitle;
       }
       img.style.opacity = 0;
       setTimeout(() => {
           img.style.opacity = 1; 
       }, 100);
   });
 });


 favoriteButtonsMain = document.querySelectorAll(".favorite_buttons_main");

favoriteButtonsMain.forEach(button => {
   button.addEventListener("click", function() {
       const addTitle = "Add to Your favorites";
       const removeTitle = "Remove from Your favorites";
       img = button.querySelector("img");
       if (img.title == addTitle) {
           img.src = "../Photos/heartRed.svg";
           img.title = removeTitle;
       }
       else {
           img.src = "../Photos/heartWhite.svg"
           img.title = addTitle;
       }
       img.style.opacity = 0;
       setTimeout(() => {
           img.style.opacity = 1; 
       }, 100);
   });
 });



 document.querySelector('.logout').addEventListener("click",function(event){
     var logOut=window.confirm("Are you sure to log out from YaLaziz?");
     if(logOut){
         document.querySelector('.logout').style.display = 'none';
         document.querySelector('.login').style.alignItems= 'center';
         document.querySelector('.sign_up').style.alignItems= 'center';
         document.querySelector('.login').style.display = 'flex';
         document.querySelector('.sign_up').style.display = 'flex';
         resetData();
     }
    
 });
