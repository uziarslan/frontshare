function validateEmailResetPassword(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isNull(value) {
  return value === null || value === '';
}

const passValueResetPassword = async (
  email,
) => {
    let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/forgotPassword",
      data: {
        email: email,
      },
    });
    if (result.status === 200) {
        // var customAlert = document.createElement("div");
        // customAlert.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
        // customAlert.style.bottom = "20px";
        // customAlert.style.right = "20px";
        // customAlert.style.maxWidth = "400px";
        // customAlert.style.fontSize = "14px";
        // customAlert.innerHTML = `
        //   <h6 class="mt-2">Successfully sent email for reset password!</h6>
        // `;
        // document.getElementById("auth-alert").appendChild(customAlert);
        // var email =  document.getElementById("reset-email-link").value;
        // $('#forwardEmail').text(email)
        // $("#forget-password-link").click()
        // $('#confirmEmailModal').modal('show');
        // setTimeout(function () {
        //   customAlert.remove();
        // }, 3000);
      showAlert('Email sent for reset password!', 'success', 3000, true);
        
    }
  } catch (err) {
    if(err.response.status === 404) {
      $('#invalid-email-input').text("No account exists for this email");
    }
    else if(err.response.data.includes('duplicate key error')){
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
      showAlert('This email already exists !', 'danger', 3000, true);
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
        //   <h6 class="mt-2">Please enter correct email !</h6>
        // `;
        // document.getElementById("auth-alert").appendChild(customAlert);
  
        // setTimeout(function () {
        //   customAlert.remove();
        // }, 3000);
        showAlert('Please enter correct email !', 'danger', 3000, true);
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
        showAlert('Unable to register account ! Please enter correct details !', 'danger', 3000, true);

      }
        
    }
  }
};

document.getElementById("forgotPasswordForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("forgotPasswordForm");

  const emailInput = document.getElementById("reset-email-link");
  const invalidEmailInput = document.getElementById("invalid-email-input");
  emailInput.setCustomValidity("");
  let emailInputValidation = true;
  invalidEmailInput.textContent = "";

  if (isNull(emailInput.value)) {
    emailInput.setCustomValidity("Email is required");
    invalidEmailInput.textContent = "Email is required";
    emailInputValidation = !isNull(emailInput.value);
  }

  if (!validateEmailResetPassword(emailInput.value)) {
    emailInput.setCustomValidity("Please input valid email");
    invalidEmailInput.textContent = "Please input valid email";
    emailInputValidation = validateEmailResetPassword(emailInput.value);
  }

  if (form.checkValidity()) {

    if (
      emailInputValidation
    ) {
      form.classList.remove("was-validated");
      passValueResetPassword(
        emailInput.value,
     	);

    }
  } else {
    console.log("Form invalid");
    form.classList.add("was-validated");
  }
});
