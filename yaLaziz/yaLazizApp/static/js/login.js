document.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('UserName').value;
    var password = document.getElementById("Pass").value;

    let checkp = document.getElementById("check");

    var form = document.getElementById('login-form');
    var formData = new FormData(form);

    // Get the CSRF token from the CSRF input field in the form
    var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/loginUser/', true);
    xhr.setRequestHeader('X-CSRFToken', csrfToken);  // Set the CSRF token header
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.message === 'success') {
                    saveData('sign', true);
                    document.querySelector('.logout').style.display = 'flex';
                    document.querySelector('.logout').style.alignItems = 'center';
                    document.querySelector('.login').style.display = 'none';
                    document.querySelector('.sign_up').style.display = 'none';
                    document.querySelector('.account').firstChild.innerHTML = `<a href="/myaccount/${response.id}" class="navLink">${response.username}</a>`;
                    document.querySelector('.account').firstChild.style = 'text-decoration:underline;';
                    location.href = "/";
                } else if (response.message === 'wrongUsername') {
                    checkp.innerHTML = "*Wrong Username, Try Again";
                    checkp.style.display = "block";
                    document.getElementById('UserName').style.border = "2px solid red";
                    document.getElementById('UserName').style.borderRadius = "40px";
                } else if (response.message === 'wrongPassword') {
                    checkp.innerHTML = "*Wrong Password, Try Again";
                    checkp.style.display = "block";
                    document.getElementById('Pass').style.border = "2px solid red";
                    document.getElementById('Pass').style.borderRadius = "40px";
                    document.getElementById('UserName').style.border = "none";
                }
            } else {
                console.log('Error occurred while logging in.');
            }
        }
    };
    var encodedData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    xhr.send(encodedData);
});
