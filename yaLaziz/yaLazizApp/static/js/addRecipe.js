allRecipe = JSON.parse(localStorage.getItem("allRecipe"));
const formPage = document.getElementById("add-form");

const recipeName = document.getElementById("rname-id");
const recipeId = document.getElementById("rid-id");
const recipePhoto = document.getElementById("rimage-id");

let submitButton = document.querySelector(".submit-btn");
const recipeCategory = document.getElementsByName("meal");
const recipeSeason = document.getElementsByName("occasion");
let ingredients = [];
let previngredients = [];
let instructions = [];
let previnstructions = [];

// document.addEventListener('DOMContentLoaded', function() {
//   localStorage.removeItem('tempPhoto');
//   localStorage.removeItem('tempPhoto1');
// });

let recipeDetail = document.getElementById("recipeDetail");

function handlePhotoSaving(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;

    localStorage.setItem("tempPhoto", base64String);
  };

  reader.readAsDataURL(file);
}

function handlePhotoSavingMain(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;
    localStorage.setItem("tempMainPhoto", base64String);
  };

  reader.readAsDataURL(file);
}

const coverImageInput = document.getElementById("rimage-id");
coverImageInput.addEventListener("change", handlePhotoSaving);

const mainImageInput = document.getElementById("rphoto-id");
mainImageInput.addEventListener("change", handlePhotoSavingMain);

function addIngredient() {
  const container = document.getElementById("ingredients-container");
  const lastIngredient = container.querySelector(
    ".add-ing-grouping:last-child"
  );

  // Hide the last ingredient div if it exists
  if (lastIngredient) {
    lastIngredient.style.display = "none";
  }

  const newIngredient = document.createElement("div");
  newIngredient.classList.add("add-ing-grouping");
  newIngredient.innerHTML = `
        <input type="number" step="0.5" name="ingredient_quantity[]" class="ingredient-input-field quntityIngredient" placeholder="Quantity">
        <select name="ingredient_unit[]" class="ingredient-input-field selectUnit">
            <option value="" disabled selected>Select unit</option>
            <option value="gm">Grams</option>
            <option value="kgm">Kilograms</option>
            <option value="lit">Liters</option>
            <option value="Mlit">Milliliters</option>
            <option value="Tsp">Teaspoon</option>
            <option value="Tbsp">Tablespoon</option>
            <option value="cup">Cup</option>
            <option value="none">No unit</option>
        </select>
        <input type="text" name="ingredient_name[]" class="ingredient-input-field nameIngredient" placeholder="Ingredient">
    `;
  container.appendChild(newIngredient);

  // var unitLen = document.getElementsByClassName("selectUnit").length;
  // var quantityLen = document.getElementsByClassName("quntityIngredient").length;
  // var nameLen = document.getElementsByClassName("nameIngredient").length;

  var unit = lastIngredient.querySelector(".selectUnit").value;
  var quantity = lastIngredient.querySelector(".quntityIngredient").value;
  var name = lastIngredient.querySelector(".nameIngredient").value;

  if (quantity && name && unit) {
    ingredients.push([quantity, unit, name]);
    var listItem = document.createElement("li");
    listItem.textContent = quantity + " " + unit + " " + name;
    previngredients.push(listItem);

    var removeButton = document.createElement("button");
    var trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash";
    removeButton.appendChild(trashIcon);
    removeButton.className = "Remove-button";
    removeButton.onclick = function () {
      var list = listItem.parentElement;
      var index = Array.from(list.children).indexOf(listItem);
      listItem.remove();
      document.querySelectorAll('.add-ing-grouping')[index].remove();
      var index = previngredients.indexOf(removeButton.closest("li"));
      previngredients.splice(index,1);
      ingredients.splice(index,1);
      // ingredientsArr.pop();
      // localStorage.setItem('ingredients', JSON.stringify(ingredientsArr));
    };

    listItem.appendChild(removeButton);
    document.getElementById("ingredients-list").appendChild(listItem);

    /*  document.getElementById("ingredient-quantity").value = "";
        document.getElementById("ingredient-name").value = ""; */
    //supposed to clear input field but not working
  } else {
    // alert("Please enter quantity and unit and name of the ingredient.");
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter quantity, unit and name of the ingredient<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
}

// let instructionsArr= new Array();
// if(localStorage.getItem('instructions')){
//     instructionsArr= localStorage.getItem('instructions');
// }


function addInstruction() {
  // Create a new textarea for instructions
  const container = document.getElementById("instructions-container");

  // Get all existing instruction textareas
  const instructionElements = container.getElementsByTagName("textarea");
  const lastInstruction = instructionElements[instructionElements.length - 1];

  // Hide the last instruction textarea if it exists
  if (lastInstruction) {
    lastInstruction.style.display = "none";
  }

  // Retrieve the text value from the last instruction textarea
  var instructionText = lastInstruction ? lastInstruction.value : "";

  // Create a new textarea element
  const newInstructionDiv = document.createElement("div");
  newInstructionDiv.classList.add("instructions-div");

  const newInstruction = document.createElement("textarea");
  newInstruction.name = "instruction_details[]";
  newInstruction.placeholder = "Instruction Details";

  newInstructionDiv.appendChild(newInstruction);
  container.appendChild(newInstructionDiv);

  // Optional: Do something with the retrieved instruction text
  if (instructionText) {
    var listItem = document.createElement("li");
    listItem.textContent = instructionText;
    previnstructions.push(listItem);

    // instructionsArr.push(instructionText);
    // localStorage.setItem('instructions',JSON.stringify(instructionsArr));

    var removeButton = document.createElement("button");
    var trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash";
    removeButton.appendChild(trashIcon);
    removeButton.className = "Remove-button";
    removeButton.onclick = function () {
      var list = listItem.parentElement;
      var index = Array.from(list.children).indexOf(listItem);
      listItem.remove();
      document.querySelectorAll('.instructions-div')[index].remove();
      // instructions.pop();
      var index = previnstructions.indexOf(removeButton.closest("li"));
      previnstructions.splice(index,1);
      instructions.splice(index,1);
      // instructionsArr.pop();
      // localStorage.setItem('instructions',JSON.stringify(instructionsArr));
    };


    listItem.appendChild(removeButton);
    document.getElementById("instructions-list").appendChild(listItem);

    // document.getElementById("instruction-text").value = "";
  } else {
    // alert("Please enter instruction text.");
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter instruction text<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
}

// send_info(info);

//   let info = [];
// document.getElementById("ADDFORM").addEventListener('submit', function(event){
//   event.preventDefault();
//   var RECIPENAME = document.getElementById("rname-id").value;
//   info.push(RECIPENAME);
//   var COVERIMAGE = document.getElementById("rimage-id").value;
//   info.push(COVERIMAGE);
//   var MAINIMAGE = document.getElementById("rphoto-id").value;
//   info.push(MAINIMAGE);
//   var FROM = document.getElementById("rfrom-id").value;
//   var TO = document.getElementById("rto-id").value;
//   var TIMEUNIT = document.getElementById("to-unit").value;
//   var DURATION = "from " + FROM + " to " + TO + " " + TIMEUNIT;
//   info.push(DURATION);
//   var CATEGORY = document.querySelector('input[name="meal"]:checked').id;
//   info.push(CATEGORY);
//   var OCCASION = document.querySelector('input[name="occasion"]:checked').id;
//   info.push(OCCASION);

//     console.log("send_info is called");
//     let xmlReq = new XMLHttpRequest();
//     xmlReq.open("POST", "addRecipe/", true);
//     xmlReq.setRequestHeader("Content-Type", "application/json");
//     xmlReq.onreadystatechange = function () {
//         if (xmlReq.readyState == 4) {
//             if (xmlReq.status == 200) {
//                 var response = JSON.parse(xmlReq.responseText);
//                 alert(response.message);
//             } else {
//                 alert("Error: " + xmlReq.statusText);
//             }
//         }
//     };
//     var data = JSON.stringify({
//        info : info
//     });
//     console.log("Sending data:", data);
//     xmlReq.send(data);

//     Ajax_Ing_Ins();

//     var popUp = document.createElement("div");
//     popUp.id = "popUp";
//     popUp.innerHTML =
//       'Your Recipe is edited successfully!<button id="popBtn">Done</button>';
//     document.querySelector("main").appendChild(popUp);
//     popUp.style.display = "flex";
//     document.getElementById("popBtn").addEventListener("click", function (e) {
//       e.preventDefault();
//       document.querySelector("main").removeChild(popUp);
//       location.href = "/recipes";
//     });

// });

// function submitForm() {
//   alert("form is submitted");
//   Ajax_Ing_Ins();
// }
function Ajax_Ing_Ins() {
  // alert("Ajax function is called");
  send_ingredients();
  send_instructions();
}
function send_ingredients() {
  console.log("send_ingredients is called");
  let xmlReq = new XMLHttpRequest();
  xmlReq.open("POST", "addIngredient/", true);
  xmlReq.setRequestHeader("Content-Type", "application/json");
  // xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // xml.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
  xmlReq.onreadystatechange = function () {
    if (xmlReq.readyState == 4) {
      if (xmlReq.status == 200) {
        var response = JSON.parse(xmlReq.responseText);
        // alert(response.message);
      } else {
        // alert("Error: " + xmlReq.statusText);
      }
    }
  };
  var data = JSON.stringify({
    ingredients: ingredients,
  });
  console.log("Sending data:", data);
  xmlReq.send(data);
}

function send_instructions() {
  console.log("send_instructions is called");
  let xmlReq1 = new XMLHttpRequest();
  xmlReq1.open("POST", "addInstructions/", true);
  xmlReq1.setRequestHeader("Content-Type", "application/json");
  xmlReq1.onreadystatechange = function () {
    if (xmlReq1.readyState == 4) {
      if (xmlReq1.status == 200) {
        var response = JSON.parse(xmlReq1.responseText);
        // alert(response.message);
      } else {
        // alert("Error: " + xmlReq1.statusText);
      }
    }
  };
  var data = JSON.stringify({
    instructions: instructions,
  });
  console.log("Sending data:", data);
  try {
    xmlReq1.send(data);
  } catch (error) {
    console.error("Error sending request:", error);
    // alert("Error sending request");
  }
}

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       var cookies = document.cookie.split(';');
//       for (var i = 0; i < cookies.length; i++) {
//           var cookie = cookies[i].trim();
//           // Does this cookie string begin with the name we want?
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }

// function send_instructions() {
//   console.log("send_instructions is called");
//   const data = {
//       instructions: instructions
//   };

//   fetch("addInstructions/", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//   })
//   .then(response => {
//       if (response.ok) {
//           return response.json();
//       } else {
//           throw new Error(`Error: ${response.statusText}`);
//       }
//   })
//   .then(data => {
//       alert(data.message);
//   })
//   .catch(error => {
//       alert(error.message);
//   });
// }

function uploadphoto() {
  var name = document.getElementById("rname-id");
  var input = document.getElementById("rimage-id");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Get the image preview element
      var imagePreview = document.querySelector(".image-preview");
      var img = new Image();
      img.src = e.target.result;
      img.alt = "Preview";

      imagePreview.innerHTML = "";

      imagePreview.appendChild(img);
    };

    // Read the uploaded file as a URL
    reader.readAsDataURL(input.files[0]);
  }
}

function uploadphototwo() {
  var input = document.getElementById("rphoto-id");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Get the image preview element
      var imagePreview = document.querySelector(".photo-preview");
      var img = new Image();
      img.src = e.target.result;
      img.alt = "Preview";

      imagePreview.innerHTML = "";

      imagePreview.appendChild(img);
    };

    // Read the uploaded file as a URL
    reader.readAsDataURL(input.files[0]);
  }
}

function previewEdit() {
  //incase the user wants to change the input
  // document.querySelector(".name-info-preview").innerHTML = "";
  // document.querySelector(".id-info-preview").innerHTML = "";
  // document.querySelector(".fromto-info-preview").innerHTML = "";

  var name = document.getElementById("rname-id").value;
  var from = document.getElementById("rfrom-id").value;
  var to = document.getElementById("rto-id").value;
  var tounit = document.getElementById("to-unit").value;
  var photo = localStorage.getItem("tempPhoto");
  var photo1 = localStorage.getItem("tempMainPhoto");

  // if (name && id && from && to && tounit&&photo&&photo1) {
  
  if (name) {
    var div = document.getElementsByClassName("name-info-preview")[0];
    var p = div.getElementsByTagName('p')[0];
    p.innerHTML = name;
  }
  if (from && to && tounit) {
    var div = document.getElementsByClassName("fromto-info-preview")[0];
    var p = div.getElementsByTagName('p')[0];
    var duration = from + " to " + to + " " + tounit;
    p.innerHTML = duration;
  }
  //-----------------------------------------------------------------------------

  //------------------------------------------------------------------------------


    if ((from == to || from > to) && from != "" && to != "") {
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Make sure from can not be greater than or equal to!<button id="popBtn">OK</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
    } 
}

function preview() {
  //incase the user wants to change the input
  document.querySelector(".name-info-preview").innerHTML = "";
  document.querySelector(".id-info-preview").innerHTML = "";
  document.querySelector(".fromto-info-preview").innerHTML = "";

  var name = document.getElementById("rname-id").value;
  var from = document.getElementById("rfrom-id").value;
  var to = document.getElementById("rto-id").value;
  var tounit = document.getElementById("to-unit").value;
  var photo = localStorage.getItem("tempPhoto");
  var photo1 = localStorage.getItem("tempMainPhoto");

  // if (name && id && from && to && tounit&&photo&&photo1) {
  var addnamestamp = document.createElement("h4");
  var addnameinfo = document.createElement("p");
  addnamestamp.innerHTML = "1- Recipe name: ";
  addnameinfo.innerHTML = name;
  var addname = document.querySelector(".name-info-preview");
  addname.appendChild(addnamestamp);
  addname.appendChild(addnameinfo);
  isnameadded = true;
  //-----------------------------------------------------------------------------

  //------------------------------------------------------------------------------

  if (from == to || from > to) {
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Make sure from can not be greater than or equal to!<button id="popBtn">OK</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  } else {
    var addfromtostamp = document.createElement("h4");
    var addfromtoinfo = document.createElement("p");
    addfromtostamp.innerHTML = "2- Recipe Duration: ";
    addfromtoinfo.innerHTML =
      "From " + from + " " + tounit + " to " + to + " " + tounit;
    var addfromto = document.querySelector(".fromto-info-preview");
    addfromto.appendChild(addfromtostamp);
    addfromto.appendChild(addfromtoinfo);
  }
  if (document.querySelector(".name-info-preview").children.length == 0
    || document.querySelector(".fromto-info-preview").children.length == 0
    || document.querySelector(".image-preview").children.length == 0
    || document.querySelector(".photo-preview").children.length == 0) {
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please fill all fields!<button id="popBtn">OK</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
    return;
  }
  //   }else{
  //     var popUp = document.createElement("div");
  //     popUp.id = "popUp";
  //     popUp.innerHTML =
  //       'Make sure you entered everything!<button id="popBtn">OK</button>';
  //     document.querySelector("main").appendChild(popUp);
  //     popUp.style.display = "flex";
  //     document.getElementById("popBtn").addEventListener("click", function (e) {
  //       e.preventDefault();
  //       document.querySelector("main").removeChild(popUp);
  //     });
  // }
}


//input validations

document
  .getElementById("quantity-id")
  .addEventListener("input", function (event) {
    var quantity = parseFloat(event.target.value);

    if (isNaN(quantity) || quantity <= 0) {
      event.target.value = "";
      // alert('Please enter a valid positive quantity.');
      var popUp = document.createElement("div");
      popUp.id = "popUp";
      popUp.innerHTML =
        'Please enter a valid positive quantity<button id="popBtn">Done</button>';
      document.querySelector("main").appendChild(popUp);
      popUp.style.display = "flex";
      document.getElementById("popBtn").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("main").removeChild(popUp);
      });
    }
  });

document.getElementById("rfrom-id").addEventListener("input", function (event) {
  var quantity = parseFloat(event.target.value);

  if (isNaN(quantity) || quantity <= 0) {
    event.target.value = "";
    // alert('Please enter a valid positive duration.');
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter a valid positive duration<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
});

document.getElementById("rto-id").addEventListener("input", function (event) {
  var quantity = parseFloat(event.target.value);

  if (isNaN(quantity) || quantity <= 0) {
    event.target.value = "";
    // alert('Please enter a valid positive duration.');
    var popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.innerHTML =
      'Please enter a valid positive duration<button id="popBtn">Done</button>';
    document.querySelector("main").appendChild(popUp);
    popUp.style.display = "flex";
    document.getElementById("popBtn").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("main").removeChild(popUp);
    });
  }
});
//---------------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
// const allRecipe=localStorage.getItem('allRecipe');
const id = urlParams.get("recipeId");
if (id) {
  // Fetch the recipe details based on recipeId and populate the form
  let arrIdx;
  for (let i = 0; i < allRecipe.length; i++) {
    if (allRecipe[i].recipeId == id) {
      arrIdx = i;
      console.log("found " + i);
      break;
    }
  }
  if (arrIdx >= 0) {
    let thisRecipe = allRecipe[arrIdx];
    document.querySelector("h1").innerHTML =
      "Edit Recipe: " + thisRecipe.recipeName;
    document.getElementById("rname-id").value = thisRecipe.recipeName;
    document.getElementById("rid-id").value = id;

    let recDetails = thisRecipe.recipeDetail;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = recDetails;
    console.log(tempDiv);
    //Ingredients:
    let ingredients = tempDiv.querySelector("#ingredients-list");
    let listItems = ingredients.querySelectorAll("li");
    listItems.forEach((li) => {
      if (!thisRecipe.userMadeRecipe) {
        var removeButton = document.createElement("button");

        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
          li.remove();
          console.log("test li remove");
        };
        li.appendChild(removeButton);
      } else {
        var removeButton = document.querySelectorAll(".Remove-button");
        removeButton.forEach((button) => {
          button.onclick = function () {
            var listItem = button.parentElement;
            listItem.remove();
          };
        });
      }

      document.getElementById("ingredients-list").appendChild(li);
    });

    //Instructions:
    let instruction = tempDiv.querySelector("#instructions-list");
    let listItems1 = instruction.querySelectorAll("li");
    listItems1.forEach((li) => {
      if (!thisRecipe.userMadeRecipe) {
        var removeButton = document.createElement("button");

        var trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        removeButton.appendChild(trashIcon);
        removeButton.className = "Remove-button";
        removeButton.onclick = function () {
          li.remove();
        };
        li.appendChild(removeButton);
      } else {
        var rmvButton = document.querySelectorAll(".Remove-button");
        rmvButton.forEach((button) => {
          button.onclick = function () {
            var listItem = button.parentElement;
            listItem.remove();
          };
        });
      }

      document.getElementById("instructions-list").appendChild(li);

      //Photos:
      let recipePhoto = thisRecipe.recipePhoto;
      var imagePreview = document.querySelector(".image-preview");
      var img = new Image();
      img.src = recipePhoto;
      img.alt = "Preview";
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      localStorage.setItem("tempPhoto", recipePhoto);

      let recipePhoto1 = thisRecipe.recipeMainPhoto;
      var imagePreview = document.querySelector(".photo-preview");
      var img = new Image();
      img.src = recipePhoto1;
      img.alt = "Preview";
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      localStorage.setItem("tempMainPhoto", recipePhoto1);

      ///////////////

      var category = thisRecipe.recipeCategory;
      for (i = 0; i < recipeCategory.length; i++) {
        if (category == recipeCategory[i].value) {
          recipeCategory[i].checked = true;
          break;
        }
      }

      ///////////////

      var season = thisRecipe.recipeSeason;
      for (i = 0; i < recipeSeason.length; i++) {
        if (season == recipeSeason[i].value) {
          recipeSeason[i].checked = true;
          break;
        }
      }

      ///////////////

      var duration = thisRecipe.recipeDuration;
      var temp = "";
      var durationArr = [];
      for (let i = 0; i < duration.length; i++) {
        if (duration[i] != " ") {
          temp += duration[i];
        } else {
          durationArr.push(temp);
          temp = "";
          console.log("HI");
        }
      }
      durationArr.push(temp);

      document.getElementById("rfrom-id").value = durationArr[0];
      document.getElementById("rto-id").value = durationArr[2];
      var dropdown = document.getElementById("to-unit");

      var options = dropdown.querySelectorAll("option");

      options.forEach(function (option) {
        if (option.value == durationArr[3]) {
          option.selected = true;
        }
      });
    });
  }
}

// submitButton.addEventListener("click", function (e) {
//   if (document.getElementById("ingredients-list").children.length == 0 || document.getElementById("instructions-list").children.length == 0 || document.querySelector(".name-info-preview").children.length == 0
//     || document.querySelector(".id-info-preview").children.length == 0
//     || document.querySelector(".fromto-info-preview").children.length == 0
//     || document.querySelector(".image-preview").children.length == 0
//     || document.querySelector(".photo-preview").children.length == 0) {
//     e.preventDefault();
//     var popUp = document.createElement("div");
//     popUp.id = "popUp";
//     popUp.innerHTML =
//       'Please fill all fields and click preview!<button id="popBtn">OK</button>';
//     document.querySelector("main").appendChild(popUp);
//     popUp.style.display = "flex";
//     document.getElementById("popBtn").addEventListener("click", function (e) {
//       e.preventDefault();
//       document.querySelector("main").removeChild(popUp);
//     });
//     return;
//   }
//   e.preventDefault();
//   const reader = recipePhoto.files[0];
//   console.log(reader);

//   const recipeName_value = recipeName.value;
//   const recipeId_value = recipeId.value;

//   for (let i = 0; i < allRecipe.length; i++) {
//     if (allRecipe[i].recipeId == recipeId_value && !id) {
//       // alert("Recipe Id must be Unique!");
//       var popUp = document.createElement("div");
//       popUp.id = "popUp";
//       popUp.innerHTML =
//         'Recipe Id must be Unique!<button id="popBtn">OK</button>';
//       document.querySelector("main").appendChild(popUp);
//       popUp.style.display = "flex";
//       document.getElementById("popBtn").addEventListener("click", function (e) {
//         e.preventDefault();
//         document.querySelector("main").removeChild(popUp);
//       });
//       return;
//     }
//   }

//   const fromValue = document.getElementById("rfrom-id").value;
//   const toValue = document.getElementById("rto-id").value;
//   const timeUnit = document.getElementById("to-unit").value;
//   let recipeCategory_value;
//   for (i = 0; i < recipeCategory.length; i++) {
//     if (recipeCategory[i].checked) {
//       recipeCategory_value = recipeCategory[i].value;
//       break;
//     }
//   }
//   let recipeSeason_value;
//   for (i = 0; i < recipeSeason.length; i++) {
//     if (recipeSeason[i].checked) {
//       recipeSeason_value = recipeSeason[i].value;
//       break;
//     }
//   }
//   const recipeDurationValue = fromValue + " to " + toValue + " " + timeUnit;
//   const recipePhoto_value = localStorage.getItem("tempPhoto");
//   const recipeMainPhoto_value = localStorage.getItem("tempMainPhoto");
//   localStorage.removeItem("tempPhoto");
//   localStorage.removeItem("tempMainPhoto");
//   const recipeDetail_value = `
//   <div class="recipeDetail">
//       <div class="detailContainer">
//           <div class="recipeImg">
//               <img src="${recipeMainPhoto_value}" alt="${recipeName_value}">
//               <h1 id="recipe_title">${recipeName_value}</h1>
//               <h4 id="recipe_time">${recipeDurationValue}</h4>
//           </div>
//       </div>
//       <div class="recipeBody">
//           <h2 id="ingredients">&#10149; Ingredients:</h2>
//           <div id="ingredientsText">
//               <ol id="ingredients-list">
//               ${document.getElementById("ingredients-list").innerHTML}
//               </ol>
//           </div>
//           <h2 id="instructions">&#10149; Instructions:</h2>
//           <div id="instructionsText">
//               <ol id="instructions-list">
//               ${document.getElementById("instructions-list").innerHTML}
//               </ol>
//           </div>
//       </div>
//   </div>`;
//   let myRecipe = {
//     recipeName: recipeName_value,
//     recipeId: recipeId_value,
//     recipePhoto: recipePhoto_value,
//     recipeMainPhoto: recipeMainPhoto_value,
//     recipeCategory: recipeCategory_value,
//     recipeSeason: recipeSeason_value,
//     recipeDuration: recipeDurationValue,
//     favoriteState: false,
//     userMadeRecipe: true,
//     recipeDetail: recipeDetail_value,
//     recipeIngredients: document.getElementById("ingredients-list").innerHTML,
//     recipeInstructions: document.getElementById("instructions-list").innerHTML,
//     // ingredients: localStorage.getItem('ingredients'),
//     // instructions: localStorage.getItem('instructions')
//   };

//   if (id) {
//     let arrIdx;
//     for (let i = 0; i < allRecipe.length; i++) {
//       if (allRecipe[i].recipeId == id) {
//         arrIdx = i;
//         console.log("found " + i);
//         break;
//       }
//     }
//     if (arrIdx >= 0) {
//       allRecipe[arrIdx] = myRecipe;
//       localStorage.setItem("allRecipe", JSON.stringify(allRecipe));

// }
//   } else {
//     allRecipe.push(myRecipe);
//     localStorage.setItem("allRecipe", JSON.stringify(allRecipe));

//   // localStorage.removeItem('ingredients');
//   // localStorage.removeItem('instructions');
// });

// let ingredientsArr= new Array();
// if(localStorage.getItem('ingredients')){
//     ingredientsArr= localStorage.getItem('ingredients');
// }
