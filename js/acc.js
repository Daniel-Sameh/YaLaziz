var username=localStorage.getItem('username');
if(username){
    document.querySelector('.user').innerHTML=username;
}
const img=localStorage.getItem('img');
if(img){
    document.querySelector('.photo').href=img;
}