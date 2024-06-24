document.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('UserName').value;
    var password = document.getElementById("Pass").value;

    let checkp = document.getElementById("check");

    var form = document.getElementById('login-form');
    var formData = new FormData(form);

    //var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    var xml = new XMLHttpRequest();
    xml.open("POST", "loginUser/", true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.setRequestHeader("X-CSRFToken", getCookie('csrftoken')); 
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                var response = JSON.parse(xml.responseText);
                if (response.message === 'success') {
                    saveData('sign', true);
                    document.querySelector('.logout').style.display = 'flex';
                    document.querySelector('.logout').style.alignItems = 'center';
                    document.querySelector('.login').style.display = 'none';
                    document.querySelector('.sign_up').style.display = 'none';
                    document.querySelector('.account').firstChild.innerHTML = `<a href="/myaccount/${response.id}" class="navLink">${response.username}</a>`;
                    document.querySelector('.account').firstChild.style = 'text-decoration:underline;';
                    location.href = "/";
                } else if (response.message == 'wrongUsername') {
                    checkp.innerHTML = "*Wrong Username, Try Again";
                    checkp.style.display = "block";
                    document.getElementById('UserName').style.border = "2px solid red";
                    document.getElementById('UserName').style.borderRadius = "40px";
                } else if (response.message == 'Invalid credentials') {
                    checkp.innerHTML = "*Invalid credentials, Try Again";
                    checkp.style.display = "block";
                    document.getElementById('Pass').style.border = "2px solid red";
                    document.getElementById('Pass').style.borderRadius = "40px";
                    document.getElementById('UserName').style.border = "none";
                    document.getElementById('UserName').style.border = "2px solid red";
                    document.getElementById('UserName').style.borderRadius = "40px";
                }
            } else {
                console.log('Error occurred while logging in.');
            }
        }
    };
    var encodedData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    console.log('Sending POST request with data:', encodedData);
    // xml.send(encodedData);
    try {
        xml.send(encodedData);  
    } catch (e) {
        alert('Error sending XMLHttpRequest:'+ e.toString());
    }
    return false;
});


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}