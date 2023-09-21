// General Elements
const home = document.querySelector(".home");
const logout = document.querySelector("#logout");
const container = document.querySelector(".container");
const sweetAlert = document.querySelector(".sweetAlert");
const showHiddenSignInPassword = document.querySelector(
  ".show-hidden-password.signInForm"
);
const showHiddenSignUpPassword = document.querySelector(
  ".show-hidden-password.signUpForm"
);

// SignIn Elements
const signInForm = document.querySelector(".sign_in");
const signInUsername = document.querySelector("#username");
const signInPassword = document.querySelector("#password");
const signInLink = document.querySelector("#signIn");

// SignUp Elements
const signUpForm = document.querySelector(".sign_up");
const signUpUsername = document.querySelector("#signUpUsername");
const signUpEmail = document.querySelector("#email");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpLink = document.querySelector("#signUp");

// Global Functions and Events
signInLink.addEventListener("click", removeActive);
signUpLink.addEventListener("click", addActive);
showHiddenSignInPassword.addEventListener("click", showHiddenPasswordHandler);
showHiddenSignUpPassword.addEventListener("click", showHiddenPasswordHandler);
logout.addEventListener("click", logoutHandler);

function addActive() {
  signUpForm.classList.add("active");
  signInForm.classList.add("active");
  container.classList.add("active");
  clearSignInForm();
  clearSignUpForm();
}

function removeActive() {
  signUpForm.classList.remove("active");
  signInForm.classList.remove("active");
  container.classList.remove("active");
  clearSignInForm();
  clearSignUpForm();
}

function showHiddenPasswordHandler(e) {
  let order = e.target.innerHTML;
  let currentForm = e.target.dataset.form;
  if (order === "show" && currentForm === "signIn") {
    e.target.innerHTML = "hidden";
    signInPassword.type = "text";
  }
  if (order === "hidden" && currentForm === "signIn") {
    e.target.innerHTML = "show";
    signInPassword.type = "password";
  }
  if (order === "show" && currentForm === "signUp") {
    e.target.innerHTML = "hidden";
    signUpPassword.type = "text";
  }
  if (order === "hidden" && currentForm === "signUp") {
    e.target.innerHTML = "show";
    signUpPassword.type = "password";
  }
}

function clearSignInForm() {
  signInUsername.value = "";
  signInPassword.value = "";
}

function clearSignUpForm() {
  signUpUsername.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}

function logoutHandler() {
  home.classList.remove("welcome");
  setTimeout(() => {
    sweetAlertHandler("success", "Logout successful");
    clearSignInForm();
    clearSignUpForm();
  }, 100);
}

function sweetAlertHandler(type, message) {
  sweetAlert.innerHTML = message;
  sweetAlert.classList.add("active");
  sweetAlert.classList.add(`${type}`);

  setTimeout(() => {
    sweetAlert.classList.remove("active");
    sweetAlert.classList.remove("active");
    sweetAlert.classList.remove(`${type}`);
  }, 2000);
}

// General Variables
let signUpObj = null;

// SignIn Functionality
signInForm.addEventListener("submit", signInSubmitHandler);

function signInSubmitHandler(e) {
  e.preventDefault();

  // Validation SignIn From
  validationSignInForm();
}

function validationSignInForm() {
  if (signInUsername.value === "") {
    sweetAlertHandler("error", "Please enter your name!");
  } else if (signInPassword.value === "") {
    sweetAlertHandler("error", "Please enter the password!");
  } else if (signInPassword.value.length < 6) {
    sweetAlertHandler("error", "password must be more than 6 characters!");
  } else {
    if (!signUpObj) {
      sweetAlertHandler("error", "User Not Found, Please Sign Up First!");
    } else {
      if (
        signInUsername.value !== signUpObj.username ||
        signInPassword.value !== signUpObj.password
      ) {
        sweetAlertHandler("error", "Invalid email or password!");
      } else {
        sweetAlertHandler("success", "Login successful");

        setTimeout(() => {
          home.classList.add("welcome");
        }, 2300);
      }
    }
  }
}

// SignUp Functionality
signUpForm.addEventListener("submit", signUpSubmitHandler);

function signUpSubmitHandler(e) {
  e.preventDefault();

  // Validation SignIn From
  validationSignUpForm();
}

function validationSignUpForm() {
  if (signUpUsername.value === "") {
    sweetAlertHandler("error", "Please enter your name!");
  } else if (signUpEmail.value === "") {
    sweetAlertHandler("error", "Please enter your email!");
  } else if (signUpPassword.value === "") {
    sweetAlertHandler("error", "Please enter the password!");
  } else if (signUpPassword.value.length < 6) {
    sweetAlertHandler("error", "password must be more than 6 characters!");
  } else {
    signUpObj = {
      username: signUpUsername.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    };

    sweetAlertHandler("success", "Account created successfully, Please Login");

    setTimeout(() => {
      removeActive();
    }, 2300);
  }
}
