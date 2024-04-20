const fileInput=document.getElementById('myfile');
var file;
image=document.querySelector('.ph1');
fileInput.addEventListener('change', function(event) {
    file = event.target.files[0]; // Get the selected file
    if (file) {
        image.src = URL.createObjectURL(file); // Set the image source to a URL created from the file
        
    } else {
        image.src = '#'; // Reset the image source if no file is selected
    }
});
document.getElementById("editAcc").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    var name = document.getElementById("inName").value;
    var mail = document.getElementById("inEmil").value;
    var oldPass = document.getElementById("inOldPass").value;
    var pass = document.getElementById("inEdPass").value;
    var confirmPass = document.getElementById("inConfPass").value;

    let checkOldPass=document.getElementById("checksOldPass");
    let checkPass=document.getElementById("checksPass");
    let check = document.getElementById("checks");
    if(oldPass!= localStorage.getItem('password')){
        checkOldPass.innerHTML = "*This don't match the old password.";
        checkOldPass.style.display = "block";
        return false;
    }
    if(pass.length <= 7){
        checkOldPass.style.display ="none";
        checkPass.innerHTML="*Password must be at least 8 characters long."
        checkPass.style.display = "block";
        return false;
    }
    else if (containsNumber(pass) == false) {
        checkOldPass.style.display ="none";
        checkPass.style.display = "none";

        checkPass.innerHTML = "*Password must contain numbers";
        checkPass.style.display = "block";
        return false;
    }
    else if(confirmPass!=pass){
        checkOldPass.style.display ="none";
        checkPass.style.display = "none";
        checkPass.style.display = "none";

        check.innerHTML="*Passwords do not match."
        check.style.display = "block";
        return false;
    }
    else{
        checkOldPass.style.display ="none";
        checkPass.style.display = "none";
        checkPass.style.display = "none";
        check.style.display = "none";
        
        if(name!= localStorage.getItem('username')){
           saveData('username',name);
        }
        if(mail!= localStorage.getItem('username')){
            saveData('email',mail);
        }
        if(pass!=localStorage.getItem('password')){
            saveData('password',pass);
        }
        if(file){saveData('img',file);}

        alert("Your changes have been successfully saved!");
        location.href = "my account.html";


    }


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

});
