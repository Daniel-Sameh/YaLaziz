document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from form inputs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    let passwordiv = document.getElementById("passdiv");
    let confirmdiv = document.getElementById("confirmdiv");
    var userType = document.querySelector('input[name="type"]:checked').value;
    
    //let password = document.getElementById("password").value;
    //let confirmpassword = document.getElementById("confirmPassword").value;
    let checkp = document.getElementById("check");

    if (password.length <= 7) {
        checkp.innerHTML = "*Password must be greater than 7 characters";
        checkp.style.display = "block";
        passwordiv.style.border = "2px solid red";
        passwordiv.style.borderRadius = "40px";
        return false;
    }
    else if (containsNumber(password) == false) {
        checkp.innerHTML = "*Password must contain numbers";
        checkp.style.display = "block";
        passwordiv.style.border = "2px solid red";
        passwordiv.style.borderRadius = "40px";
        return false;
    }
    else if (password != confirmPassword) {
        checkp.innerHTML = "*Passwords don't match try again";
        checkp.style.display = "block";
        confirmdiv.style.border = "2px solid red";
        confirmdiv.style.borderRadius = "40px";
        passwordiv.style.border = "none";
        return false;

    }else{
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
        // const jsonData={'username':username, 'admin':isAdmin};
        // const json= JSON.stringify(jsonData);
        // localStorage.setItem('user',json);
        saveData('admin',isAdmin);
        saveData('username',username);
        saveData('password',password);
        saveData('email',email);
        //  var signedIn= true;
        // saveData('sign',true);
        // document.querySelector('.logout').style.display = 'flex';
        // document.querySelector('.logout').style.alignItems= 'center';
        // document.querySelector('.login').style.display = 'none';
        // document.querySelector('.sign_up').style.display = 'none';
        // location.reload();

        // alert("Welcome "+username+" to Yalaziz!");
        var popUp= document.createElement('div');
        popUp.id = "popUp";
        popUp.innerHTML = `Welcome ${username} to YaLaziz!🥳<button id="popBtn">login</button>`;
        document.querySelector('main').appendChild(popUp);
        popUp.style.display = "flex";
        document.getElementById('popBtn').addEventListener('click', function(e){
            e.preventDefault();
            document.querySelector('main').removeChild(popUp);
            //location.href = "login.html";
        })
        
    }
    

 });

function containsNumber(str) {
    // Check if the string contains any digit between 0 and 9
    return /\d/.test(str);
}
function saveData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    return localStorage.getItem(key);
}

/////////////////////////////////////

