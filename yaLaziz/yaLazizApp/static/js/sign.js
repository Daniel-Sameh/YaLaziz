document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values from form inputs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    let passwordiv = document.getElementById("passdiv");
    let confirmdiv = document.getElementById("confirmdiv");
    var userType = document.querySelector('input[name="type"]:checked').value;
    
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
    } else {
        if (userType == "Admin") {
            var cards = document.querySelectorAll('.card');
            cards.forEach(function(card) {
                var adminContainer = card.querySelector('.adminContainer');
                adminContainer.style.display = 'block';
            });
        }
        var isAdmin = userType === "Admin";
        
        var xml = new XMLHttpRequest();
        xml.open("POST", "signupUser/", true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        xml.onreadystatechange = function() {
            if (xml.readyState == 4 && xml.status == 200) {
                // Request was successful
                var response = JSON.parse(xml.responseText);
                if (response.message === 'User created successfully') {
                    // User was created successfully, perform necessary actions
                    var popUp = document.createElement('div');
                    popUp.id = "popUp";
                    popUp.innerHTML = `Welcome ${username} to YaLaziz!🥳<button id="popBtn">login</button>`;
                    document.querySelector('main').appendChild(popUp);
                    popUp.style.display = "flex";
                    document.getElementById('popBtn').addEventListener('click', function(e){
                        e.preventDefault();
                        document.querySelector('main').removeChild(popUp);
                        window.location.href = "/login";
                    });
                } else {
                    alert("Failed to create user: " + response.message);
                }
            }
        };

        var data = "username=" + encodeURIComponent(username) +
                "&email=" + encodeURIComponent(email) +
                "&password=" + encodeURIComponent(password) +
                "&confirmPassword=" + encodeURIComponent(confirmPassword) +
                "&type=" + encodeURIComponent(userType);

        console.log('Sending signup request with data:', data);
        xml.send(data);
    }
    return false;
});

function containsNumber(str) {
    // Check if the string contains any digit between 0 and 9
    return /\d/.test(str);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
