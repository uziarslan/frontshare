function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isNull(value) {
  return value === null || value === "";
}

const passValueLogin = async (email, password) => {
  let isChecked = $('#modal-checkbox').is(':checked')
  let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (result.data.status === "success") {
      if(isChecked){
        var credentials = JSON.parse(
        localStorage.getItem("remembered_credential") || "{}"
        );

        if (!credentials[email]) {
          credentials[email] = result.data.data.user
          credentials[email]['password'] = password
          localStorage.setItem(
            "remembered_credential",
            JSON.stringify(credentials)
          );
        } else {
          console.log(email + " already exists");
        }
      }
      showAlert('logged in !', 'success', 3000);
      window.location.href = "/feed";
    }
    // else{
    //   var customAlert = document.createElement("div");
    //   customAlert.classList.add(
    //     "alert",
    //     "alert-danger",
    //     "alert-dismissible",
    //     "fade",
    //     "show"
    //   );
    //   customAlert.style.bottom = "20px";
    //   customAlert.style.right = "20px";
    //   customAlert.style.maxWidth = "400px";
    //   customAlert.style.fontSize = "14px";
    //   customAlert.innerHTML = `
    //     <h6 class="mt-2">${result.data.message}</h6>
    //   `;
    //   document.getElementById("auth-alert").appendChild(customAlert);

    //   setTimeout(function () {
    //     customAlert.remove();
    //   }, 5000);
    // }
  } catch (err) {
    try {
      showAlert('Invalid Credentials!', 'danger', 3000);
      
    } catch (e) {
      showAlert('Invalid Credentials!', 'danger', 3000);
    }
  }
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("loginForm");

  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("passwordLogin");

  const invalidEmailInput = document.getElementById("invalidEmailLogin");
  const invalidPasswordInput = document.getElementById("invalidPasswordLogin");

  emailInput.setCustomValidity("");
  passwordInput.setCustomValidity("");

  invalidEmailInput.textContent = "";
  invalidPasswordInput.textContent = "";

  invalidEmailInput.style.display = "block";
  invalidPasswordInput.style.display = "block";

  let emailInputValidation = true;
  let passwordInputValidation = true;

  if (isNull(emailInput.value)) {
    emailInput.setCustomValidity("Email is required");
    invalidEmailInput.textContent = "Email is required";
    emailInputValidation = !isNull(emailInput.value);
  }

  if (passwordInput.value.length < 8) {
    passwordInput.setCustomValidity(
      "Password must be at least 8 characters long"
    );
    invalidPasswordInput.textContent =
      "Password must be at least 8 characters long";
    passwordInputValidation = false;
  }

  if (isNull(passwordInput.value)) {
    passwordInput.setCustomValidity("Password is required");
    invalidPasswordInput.textContent = "Password is required";
    passwordInputValidation = !isNull(passwordInput.value);
  }

  if (!validateEmail(emailInput.value)) {
    emailInput.setCustomValidity("Please input valid email");
    invalidEmailInput.textContent = "Please input valid email";
    emailInputValidation = validateEmail(emailInput.value);
  }

  if (form.checkValidity()) {
    if (emailInputValidation && passwordInputValidation) {
      form.classList.remove("was-validated");
      passValueLogin(emailInput.value, passwordInput.value);

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
