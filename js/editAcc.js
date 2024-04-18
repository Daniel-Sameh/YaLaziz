const fileInput=document.getElementById('myfile');
image=document.querySelector('.ph1');
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        image.src = URL.createObjectURL(file); // Set the image source to a URL created from the file
        localStorage.setItem('img',file);
    } else {
        image.src = '#'; // Reset the image source if no file is selected
    }
});