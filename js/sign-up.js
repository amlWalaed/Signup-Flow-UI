let form = document.querySelector("form");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confirmPassword = document.querySelector(".confirm-password");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    fetchData();
  }
});
function displayErrorMessage(element, message) {
  let validationMessage = document.createElement("div");
  validationMessage.classList.add("validation-message");
  validationMessage.innerHTML = message;
  element.parentElement.after(validationMessage);
  setTimeout(() => {
    validationMessage.remove();
  }, 5000);
}
function validateUsername() {
  let re = /^[A-Za-z][A-Za-z0-9]{3,13}[a-zA-Z]$/;
  if (re.test(username.value)) {
    return true;
  } else {
    if (/(\b\d|\d\b)/.test(username.value)) {
      displayErrorMessage(
        username,
        "<div>username must start with a letter and end with a letter"
      );
    }
    if (username.value.match(/[^a-zA-Z0-9]/g)) {
      displayErrorMessage(username, "username must letter and number only");
    }
    if (username.value.length > 16 || username.value.length < 5) {
      displayErrorMessage(
        username,
        "username must 5 character at least and 15 character at most "
      );
    }
  }
}
function validateEmail() {
  re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(email.value)) {
    return true;
  } else {
    displayErrorMessage(email, "email is not in valid format");
  }
}
function validatePassword() {
  if (password.value.length >= 8) {
    return true;
  } else {
    displayErrorMessage(password, "password is very small");
  }
}
function validateConfirmPassword() {
  if (confirmPassword.value === password.value) {
    return true;
  } else {
    displayErrorMessage(
      confirmPassword,
      "password and confirm password do not match"
    );
  }
}
async function fetchData() {
  let data = {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  };
  let response = fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>{ 
    console.log(res);
    return res.json()
  }).then( update => {
    console.log(update);
    if(update.errors){
      if(update.errors.username){
        displayErrorMessage(username, update.errors.username );
      }
      if(update.errors.password){
        displayErrorMessage(password, update.errors.password );
      }
      if(update.errors.email){
        displayErrorMessage(email, update.errors.email );
      }
      if(update.errors.password_confirmation){
        displayErrorMessage(confirmPassword, update.errors.password_confirmation );
      }
    }else{
      sessionStorage.setItem("email", email.value);
    window.location.href="../succeed/";
    }
    
  });
}
