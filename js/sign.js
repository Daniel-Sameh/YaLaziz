
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from form inputs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var userType = document.querySelector('input[name="type"]:checked').value;

    if(userType=="Admin"){
        var cards = document.querySelectorAll('.card');
        cards.forEach(function(card) {
            var adminContainer = card.querySelector('.adminContainer');
            adminContainer.style.display = 'block';
        });
     }
     var isAdmin;
     if(userType=="Admin"){
        isAdmin=true;
     }else{
        isAdmin=false;
     }
     saveData('admin',isAdmin);
     saveData('username',username);
    //  var signedIn= true;
     saveData('sign',true);
     document.querySelector('.logout').style.display = 'flex';
     document.querySelector('.logout').style.alignItems= 'center';
     document.querySelector('.login').style.display = 'none';
     document.querySelector('.sign_up').style.display = 'none';
     

 });

function saveData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    return localStorage.getItem(key);
}

