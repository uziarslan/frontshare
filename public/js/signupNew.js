function validateSignUpPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]*$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateName(name) {
  if (name === ""){
    return true
  }
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}

function isNull(value) {
  return value === null || value === '';
}

const passValueSignup = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  referredBy
) => {
  let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        passwordConfirm,
        referredBy,
      },
    });
    if (result.data.status === "success") {
        // var customAlert = document.createElement("div");
        // customAlert.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
        // customAlert.style.bottom = "20px";
        // customAlert.style.right = "20px";
        // customAlert.style.maxWidth = "400px";
        // customAlert.style.fontSize = "14px";
        // customAlert.innerHTML = `
        //   <h6 class="mt-2">Successfully registered new account !</h6>
        // `;
        // $('#exampleModalSignup').css('display', 'none');
        // $('.modal-backdrop').remove();
        // var email =  document.getElementById("emailRegistration").value;
        // $('#forwardSignupEmail').text(email)
        // $('#confirmEmailSignupModal').modal('show');
        // document.getElementById("auth-alert").appendChild(customAlert);
        // setTimeout(function () {
        //   customAlert.remove();
        // }, 3000);
        showAlert('Successfully registered new account !', 'success', 3000);
    }
  } catch (err) {
    if(err.response.data.includes('duplicate key error')){
      // var customAlert = document.createElement("div");
      // customAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
      // customAlert.style.bottom = "20px";
      // customAlert.style.right = "20px";
      // customAlert.style.maxWidth = "400px";
      // customAlert.style.fontSize = "14px";
      // customAlert.innerHTML = `
      //   <h6 class="mt-2">This email already exists !</h6>
      // `;
      // document.getElementById("auth-alert").appendChild(customAlert);

      // setTimeout(function () {
      //   customAlert.remove();
      // }, 3000);
      showAlert('This email already exists !', 'danger', 3000);
    }
    else{
      try{
        // var customAlert = document.createElement("div");
        // customAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
        // customAlert.style.bottom = "20px";
        // customAlert.style.right = "20px";
        // customAlert.style.maxWidth = "400px";
        // customAlert.style.fontSize = "14px";
        // customAlert.innerHTML = `
        //   <h6 class="mt-2">Unable to register account ! Please enter correct details !</h6>
        // `;
        // document.getElementById("auth-alert").appendChild(customAlert);
  
        // setTimeout(function () {
        //   customAlert.remove();
        // }, 3000);
       showAlert('Unable to register account ! Please enter correct details !', 'danger', 3000);
      }
      catch(e){
        // var customAlert = document.createElement("div");
        // customAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
        // customAlert.style.bottom = "20px";
        // customAlert.style.right = "20px";
        // customAlert.style.maxWidth = "400px";
        // customAlert.style.fontSize = "14px";
        // customAlert.innerHTML = `
        //   <h6 class="mt-2">Unable to register account ! Please enter correct details !</h6>
        // `;
        // document.getElementById("auth-alert").appendChild(customAlert);
  
        // setTimeout(function () {
        //   customAlert.remove();
        // }, 3000);
        showAlert('Unable to register account ! Please enter correct details !', 'danger', 3000);

      }
        
    }
  }
};

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("signupForm");

  const passwordInput = document.getElementById("passwordRegistration");
  const confirmPasswordInput = document.getElementById("confirmPasswordRegistration");
  const firstNameInput = document.getElementById("firstNameRegistration");
  const lastNameInput = document.getElementById("lastNameRegistration");
  const emailInput = document.getElementById("emailRegistration");

  const invalidPasswordInput = document.getElementById("invalidPasswordRegistration");
  const invalidFirstNameInput = document.getElementById("invalidFirstNameRegistration");
  const invalidLastNameInput = document.getElementById("invalidLastNameRegistration");
  const invalidEmailInput = document.getElementById("invalidEmailRegistration");

  passwordInput.setCustomValidity("");
  confirmPasswordInput.setCustomValidity("");
  firstNameInput.setCustomValidity("");
  lastNameInput.setCustomValidity("");
  emailInput.setCustomValidity("");

  invalidPasswordInput.textContent = "";
  invalidFirstNameInput.textContent = "";
  invalidLastNameInput.textContent = "";
  invalidEmailInput.textContent = "";

  invalidPasswordInput.style.display = "block";
  invalidFirstNameInput.style.display = "block";
  invalidLastNameInput.style.display = "block";
  invalidEmailInput.style.display = "block";

  let passwordInputValidation = true;
  let confirmPasswordInputValidation = true;
  let firstNameInputValidation = true;
  let lastNameInputValidation = true;
  let emailInputValidation = true;

  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordInput.setCustomValidity("Passwords do not match");
    confirmPasswordInput.setCustomValidity("Passwords do not match");
    invalidPasswordInput.textContent = "Passwords do not match";
    passwordInputValidation = false;
    confirmPasswordInputValidation = false;
  }

  if (passwordInput.value.length < 8) {
    passwordInput.setCustomValidity("Password must be at least 8 characters long");
    invalidPasswordInput.textContent = "Password must be at least 8 characters long";
    passwordInputValidation = false;
  }

  if (isNull(passwordInput.value)) {
    passwordInput.setCustomValidity("Password is required");
    invalidPasswordInput.textContent = "Password is required";
    passwordInputValidation = !isNull(passwordInput.value);  
  }

  if (isNull(confirmPasswordInput.value)) {
    confirmPasswordInput.setCustomValidity("Confirm password is required");
    invalidPasswordInput.textContent = "Confirm password is required";
    confirmPasswordInputValidation = !isNull(confirmPasswordInput.value);  
  }

  if (isNull(firstNameInput.value)) {
    firstNameInput.setCustomValidity("First name is required");
    invalidFirstNameInput.textContent = "First name is required";
    firstNameInputValidation = !isNull(firstNameInput.value);
  }

  if (isNull(lastNameInput.value)) {
    lastNameInput.setCustomValidity("Last name is required");
    invalidLastNameInput.textContent = "Last name is required";
    lastNameInputValidation = !isNull(lastNameInput.value);
  }

  if (isNull(emailInput.value)) {
    emailInput.setCustomValidity("Email is required");
    invalidEmailInput.textContent = "Email is required";
    emailInputValidation = !isNull(emailInput.value);
  }

  if (!validateEmail(emailInput.value)) {
    emailInput.setCustomValidity("Please input valid email");
    invalidEmailInput.textContent = "Please input valid email";
    emailInputValidation = validateEmail(emailInput.value);
  }

  if (!validateName(lastNameInput.value)) {
    lastNameInput.setCustomValidity("Last name is invalid");
    invalidLastNameInput.textContent = "Last name is invalid";
    lastNameInputValidation = !isNull(lastNameInput.value);
  }

  if (!validateName(firstNameInput.value)) {
    firstNameInput.setCustomValidity("first name is invalid");
    invalidFirstNameInput.textContent = "first name is invalid";
    firstNameInputValidation = !isNull(firstNameInput.value);
  }

  if(!validateSignUpPassword(passwordInput.value)) {
    passwordInput.setCustomValidity("Password must be 8 characters long with at least one capital, one digit, and one symbol (! @ # $ %)");
    invalidPasswordInput.textContent = "Password must be 8 characters long with at least one capital, one digit, and one symbol (! @ # $ %)";
    passwordInputValidation = validateSignUpPassword(passwordInput.value);
  }

  if(!validateSignUpPassword(confirmPasswordInput.value)) {
    confirmPasswordInput.setCustomValidity("Password must be 8 characters long with at least one capital, one digit, and one symbol (! @ # $ %)");
    invalidconfirmPasswordInput.textContent = "Password must be 8 characters long with at least one capital, one digit, and one symbol (! @ # $ %)";
    confirmPasswordInputValidation = validateSignUpPassword(confirmPasswordInput.value);
  }

  if (form.checkValidity()) {
    const referredBy = window.location.href.split("=")[1] || null;
    firstNameInput.setCustomValidity(validateName(firstNameInput.value) ? "" : "Please input valid first name");
    invalidFirstNameInput.textContent = validateName(firstNameInput.value) ? "" : "Please input valid first name";
    firstNameInputValidqation = validateName(firstNameInput.value);

    lastNameInput.setCustomValidity(validateName(lastNameInput.value) ? "" : "Please input valid last name");
    invalidLastNameInput.textContent = validateName(lastNameInput.value) ? "" : "Please input valid last name";
    lastNameInputValidation = validateName(lastNameInput.value);

    passwordInput.setCustomValidity(passwordInput.value === confirmPasswordInput.value ? "" : "Passwords do not match");
    confirmPasswordInput.setCustomValidity(passwordInput.value === confirmPasswordInput.value ? "" : "Passwords do not match");
    invalidPasswordInput.textContent = passwordInput.value === confirmPasswordInput.value ? "" : "Passwords do not match";
    passwordInputValidation = passwordInput.value === confirmPasswordInput.value;
    confirmPasswordInputValidation = passwordInput.value === confirmPasswordInput.value;

    if (
      passwordInputValidation && 
      confirmPasswordInputValidation && 
      firstNameInputValidation && 
      lastNameInputValidation && 
      emailInputValidation
    ) {
      form.classList.remove("was-validated");
      passValueSignup(
        firstNameInput.value,
        lastNameInput.value,
        emailInput.value,
        passwordInput.value,
        confirmPasswordInput.value,
        referredBy);

      invalidPasswordInput.textContent = "";
      invalidFirstNameInput.textContent = "";
      invalidLastNameInput.textContent = "";
      invalidEmailInput.textContent = "";

      invalidPasswordInput.style.display = "none";
      invalidFirstNameInput.style.display = "none";
      invalidLastNameInput.style.display = "none";
      invalidEmailInput.style.display = "none";
    }
  } else {
    console.log("Form invalid");
    form.classList.add("was-validated");
  }
});
