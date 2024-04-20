document.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('UserName').value;
    var password = document.getElementById("Pass").value;

    let checkp = document.getElementById("check");

    if (username == localStorage.getItem('username') && password == localStorage.getItem('password')) {
        saveData('sign', true);
        document.querySelector('.logout').style.display = 'flex';
        document.querySelector('.logout').style.alignItems = 'center';
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.sign_up').style.display = 'none';
        document.querySelector('.account').firstChild.innerHTML = username;
        document.querySelector('.account').firstChild.style = 'text-decoration:underline;';
        location.href = "index.html";
    } else if (username != localStorage.getItem('username')) {
        checkp.innerHTML = "*Wrong Username, Try Again";
        checkp.style.display = "block";
        document.getElementById('UserName').style.border = "2px solid red";
        document.getElementById('UserName').style.borderRadius = "40px";
        return false;
    } else {
        checkp.innerHTML = "*Wrong Password, Try Again";
        checkp.style.display = "block";
        document.getElementById('Pass').style.border = "2px solid red";
        document.getElementById('Pass').style.borderRadius = "40px";
        document.getElementById('UserName').style.border = "none";
    }

})
