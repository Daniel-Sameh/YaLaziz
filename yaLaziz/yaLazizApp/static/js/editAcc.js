
// var storedName=localStorage.getItem('username');
// var storedMail=localStorage.getItem('email');
// var nameIn=document.getElementById("inName");
// nameIn.value=storedName;
// var emilIn=document.getElementById("inEmil");
// emilIn.value=storedMail;

// const accImage = localStorage.getItem('accPhoto');
// document.getElementById('ph1').src = accImage;

const fileInput=document.getElementById('myfile');
function handlePhotoSaving(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const base64String = event.target.result;
      document.getElementById('ph1').src = base64String;
      localStorage.setItem("tempAccPhoto", base64String);
    };
  
    reader.readAsDataURL(file);
}

fileInput.addEventListener("change", handlePhotoSaving);

// document.getElementById("editAcc").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission
//     var name = document.getElementById("inName").value;
//     var mail = document.getElementById("inEmil").value;
//     var oldPass = document.getElementById("inOldPass").value;
//     var pass = document.getElementById("inEdPass").value;
//     var confirmPass = document.getElementById("inConfPass").value;
//     let checkOldPass=document.getElementById("checksOldPass");
//     let checkPass=document.getElementById("checksPass");
//     let check = document.getElementById("checks");
//     if(oldPass!= localStorage.getItem('password')){
//         checkOldPass.innerHTML = "*This don't match the old password.";
//         checkOldPass.style.display = "block";
//         return false;
//     }
//     if(pass.length <= 7&&pass.length>0){
//         checkOldPass.style.display ="none";
//         checkPass.innerHTML="*Password must be at least 8 characters long."
//         checkPass.style.display = "block";
//         return false;
//     }
//     else if (containsNumber(pass) == false&&pass.length>0) {
//         checkOldPass.style.display ="none";
//         checkPass.style.display = "none";

//         checkPass.innerHTML = "*Password must contain numbers";
//         checkPass.style.display = "block";
//         return false;
//     }
//     else if(pass==localStorage.getItem('password')){
//         checkOldPass.style.display ="none";
//         checkPass.style.display = "none";

//         checkPass.innerHTML = "*New password must be different from the old password.";
//         checkPass.style.display = "block";
//         return false;
//     }
//     else if(confirmPass!=pass){
//         checkOldPass.style.display ="none";
//         checkPass.style.display = "none";
//         checkPass.style.display = "none";

//         check.innerHTML="*Passwords do not match."
//         check.style.display = "block";
//         return false;
//     }
//     else{
//         checkOldPass.style.display ="none";
//         checkPass.style.display = "none";
//         checkPass.style.display = "none";
//         check.style.display = "none";
        
//         if(name!= localStorage.getItem('username')){
//            saveData('username',name);
//         }
//         if(mail!= localStorage.getItem('email')){
//             saveData('email',mail);
//         }
//         if(pass!=localStorage.getItem('password') && pass.length>0){
//             saveData('password',pass);
//         }
//         const AccImage = localStorage.getItem('tempAccPhoto');
//         if (AccImage) {
//             localStorage.setItem('accPhoto', AccImage);
//         }
//         else {
//             localStorage.setItem('accPhoto', "../Photos/acc pic.png");
//         }
//         // alert("Your changes have been successfully saved!");
//         var popUp= document.createElement('div');
//         popUp.id = "popUp";
//         popUp.innerHTML = ' Your changes have been successfully saved!<button id="popBtn">Done</button>';
//         document.querySelector('main').appendChild(popUp);
//         popUp.style.display = "flex";
//         document.getElementById('popBtn').addEventListener('click', function(e){
//             e.preventDefault();
//             document.querySelector('main').removeChild(popUp);
//             location.href = "my account.html";
//         })
        

//     }


//     function containsNumber(str) {
//         // Check if the string contains any digit between 0 and 9
//         return /\d/.test(str);
//     }
//     function saveData(key, value) {
//         localStorage.setItem(key, value);
//     }
    
//     function getData(key) {
//         return localStorage.getItem(key);
//     }

// });
