function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isNull(value) {
  return value === null || value === '';
}

const passValueLogin = async (email, password) => {
  let result = null;
  try {
		debugger;
    result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (result.data.status === "success") {
      // var credentials = JSON.parse(localStorage.getItem("remembered_credential") || '[]');
      // if (!credentials.includes(email)) {
      //   credentials.push(email);
      //   localStorage.setItem("remembered_credential", JSON.stringify(credentials));
      // } else {
      //   console.log(email + " already exists");
      // }

      // var customAlert = document.createElement("div");
      // customAlert.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
      // customAlert.style.bottom = "20px";
      // customAlert.style.right = "20px";
      // customAlert.style.maxWidth = "400px";
      // customAlert.style.fontSize = "14px";
      // customAlert.innerHTML = `
      //   <h6 class="mt-2">Successfully logged in !</h6>
      // `;
      // document.getElementById("auth-alert").appendChild(customAlert);

      // setTimeout(function () {
      //   customAlert.remove();
      //   window.location.href = "/settings";
      // }, 3000);
      showAlert('logged in!', 'success', 3000, true);
      window.location.href = "/settings";
    }
  } catch (err) {
    try{
      // var customAlert = document.createElement("div");
      // customAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
      // customAlert.style.bottom = "20px";
      // customAlert.style.right = "20px";
      // customAlert.style.maxWidth = "400px";
      // customAlert.style.fontSize = "14px";
      // customAlert.innerHTML = `
      //   <h6 class="mt-2">Unable to login ! Invalid Credentials!</h6>
      // `;
      // document.getElementById("auth-alert").appendChild(customAlert);

      // setTimeout(function () {
      //   customAlert.remove();
      // }, 3000);
      showAlert('Invalid Credentials!', 'danger', 3000, true);
    }
    catch(e){
      // var customAlert = document.createElement("div");
      // customAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
      // customAlert.style.bottom = "20px";
      // customAlert.style.right = "20px";
      // customAlert.style.maxWidth = "400px";
      // customAlert.style.fontSize = "14px";
      // customAlert.innerHTML = `
      //   <h6 class="mt-2">Unable to login ! Invalid Credentials !</h6>
      // `;
      // document.getElementById("auth-alert").appendChild(customAlert);

      // setTimeout(function () {
      //   customAlert.remove();
      // }, 3000);
      showAlert('Invalid Credentials!', 'danger', 3000, true);

    }
  }
};

document.getElementById("loginAnotherAccount").addEventListener("click", (e) => {
	e.stopPropagation();
	e.preventDefault();

	document.getElementById("switchEmailDropdown").classList.add("d-none");
	document.getElementById("switchEmailInput").classList.remove("d-none");
});

document.getElementById("switchLoginForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("switchLoginForm");

	debugger;
	const loginWithRememberedCredential = document.getElementById("switchEmailInput").classList.contains("d-none");

	const emailDropdown = document.getElementById("dropdownMenuLink");
  const emailInput = document.getElementById("switchEmail");
  const passwordInput = document.getElementById("switchPassword");

  const invalidEmailInput = document.getElementById("invalidSwitchEmail");
  const invalidPasswordInput = document.getElementById("invalidSwitchPassword");

  emailInput.setCustomValidity("");
  passwordInput.setCustomValidity("");

  invalidEmailInput.textContent = "";
  invalidPasswordInput.textContent = "";

  invalidEmailInput.style.display = "block";
  invalidPasswordInput.style.display = "block";

  let emailInputValidation = true;
  let passwordInputValidation = true;

  if (isNull(emailInput.value) && !loginWithRememberedCredential) {
    emailInput.setCustomValidity("Email is required");
    invalidEmailInput.textContent = "Email is required";
    emailInputValidation = !isNull(emailInput.value);
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

  if (!validateEmail(emailInput.value) && !loginWithRememberedCredential) {
    emailInput.setCustomValidity("Please input valid email");
    invalidEmailInput.textContent = "Please input valid email";
    emailInputValidation = validateEmail(emailInput.value);
  }

  if (form.checkValidity()) {

    if (emailInputValidation && passwordInputValidation) {

			debugger;

      form.classList.remove("was-validated");
			const email = loginWithRememberedCredential ? emailDropdown.textContent : emailInput.value;
      passValueLogin(email, passwordInput.value);

      invalidEmailInput.textContent = "";
      invalidPasswordInput.textContent = "";

      invalidEmailInput.style.display = "none";
      invalidPasswordInput.style.display = "none";
    }

  } else {
    console.log("Form invalid");
    form.classList.add("was-validated");
  }
});
