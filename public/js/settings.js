function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateAddress(address) {
  const addressRegex = /^[0-9a-zA-Z\s]+,\s[0-9a-zA-Z\s]+,\s[a-zA-Z]+$/;
  return addressRegex.test(address);
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(phone);
}

function validateName(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}

function isNull(value) {
  return value === null || value === '';
}

function showCustomAlert() {
  var customAlert = document.querySelector(".custom-alert");
  customAlert.style.display = "block";

  setTimeout(function () {
    closeCustomAlert();
  }, 3000);
}

function closeCustomAlert() {
  var customAlert = document.querySelector(".custom-alert");
  customAlert.style.display = "none";
}

const passValueProfileSettings = async (
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  state,
  zip_code,
  gender,
  date_of_birth
) => {
  let result = null;
  const date = new Date(date_of_birth);
  const dateUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/updateProfileSettings",
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        gender,
        date_of_birth: dateUTC,
      },
    });
    if (result.data.status === "success") {
      // window.location.href = "/settings";
      showAlert('Profile setting updated!', 'success', 3000, true);

    }
  } catch (err) {
    console.log(err);
  }
};

const passValueProfileImage = async (file) => {
  let result = null;
  try {
    const formData = new FormData();
    formData.append("image", file);

    result = await axios({
      method: "POST",
      url: "/api/v1/users/uploadProfileImage",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData,
    });

    if (result.data.status === "success") {
      // document.getElementById("alertContext").innerHTML = `
      //   <h6>Profile Avatar updated!</h6>
      //   <button
      //     class="close"
      //     type="button"
      //     onclick="closeCustomAlert()"
      //     aria-label="Close"
      //   >
      //     <span class="font-weight-light" aria-hidden="true">×</span>
      //   </button>
      // `;
      // document.querySelector(".custom-alert").style.display = "block";

      // setTimeout(function () {
      //   window.location.reload();
      // }, 3000);
      showAlert('Profile Avatar updated!', 'success', 3000, true);
      window.location.reload();

    }
  } catch (err) {
    console.log(err);
  }
};

const passValueProfileCoverImage = async (file) => {
  let result = null;
  try {
    const formData = new FormData();
    formData.append("image", file);

    result = await axios({
      method: "POST",
      url: "/api/v1/users/uploadProfileCoverImage",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData,
    });

    if (result.data.status === "success") {
      // document.getElementById("alertContext").innerHTML = `
      //   <h6>Profile cover image updated!</h6>
      //   <button
      //     class="close"
      //     type="button"
      //     onclick="closeCustomAlert()"
      //     aria-label="Close"
      //   >
      //     <span class="font-weight-light" aria-hidden="true">×</span>
      //   </button>
      // `;
      // document.querySelector(".custom-alert").style.display = "block";

      // setTimeout(function () {
      //   window.location.reload();
      // }, 3000);
      showAlert('Profile cover image updated!', 'success', 3000, true);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = async (id) => {
  let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/deleteAccount",
      data: {
        id
      }
    });

    if (result.data.status === "success") {
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err);
  }
};

const passValueChangePassword = async (
  oldPassword,
  newPassword
) => {
  let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/changePassword",
      data: {
        oldPassword,
        newPassword
      }
    });

    if (result.data.status === "success") {
      // document.querySelector(".custom-alert").innerHTML = `
      //   <h6>Password changed!</h6>
      //   <button
      //     class="close"
      //     type="button"
      //     onclick="closeCustomAlert()"
      //     aria-label="Close"
      //   >
      //     <span class="font-weight-light" aria-hidden="true">×</span>
      //   </button>
      // `;
      // showCustomAlert();
      showAlert('Password changed!', 'success', 3000, true);
    } else if (result.data.status === "fail") {
      document.getElementById("oldPassword").setCustomValidity("Old password is incorrect");
      document.getElementById("invalidOldPassword").textContent = "Old password is incorrect";
      document.getElementById("invalidOldPassword").style.display = "block";
    }
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("profileSettingsForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("profileSettingsForm");

  const firstNameInput = document.getElementById("firstNameProfileSettings");
  const lastNameInput = document.getElementById("lastNameProfileSettings");
  const emailInput = document.getElementById("emailProfileSettings");
  const phoneInput = document.getElementById("phoneProfileSettings");
  const addressInput = document.getElementById("addressProfileSettings");
  const inputCity = document.getElementById("inputCity");
  const inputState = document.getElementById("inputState");
  const inputZip = document.getElementById("inputZip");
  const inputGender = document.getElementById("inputGender");
  const inputDatepicker = document.getElementById("datepicker");
	// const titleInput = document.getElementById("titleProfileSettings");
	// const bioInput = document.getElementById("bioProfileSettings");

  const invalidFirstNameInput = document.getElementById("invalidFirstNameProfileSettings");
  const invalidLastNameInput = document.getElementById("invalidLastNameProfileSettings");
  const invalidEmailInput = document.getElementById("invalidEmailProfileSettings");
  const invalidPhoneInput = document.getElementById("invalidPhoneProfileSettings");
  const invalidAddressInput = document.getElementById("invalidAddressProfileSettings");

  firstNameInput.setCustomValidity("");
  lastNameInput.setCustomValidity("");
  emailInput.setCustomValidity("");
  phoneInput.setCustomValidity("");
  addressInput.setCustomValidity("");
  // titleInput.setCustomValidity("");
  // bioInput.setCustomValidity("");

  invalidFirstNameInput.textContent = "";
  invalidLastNameInput.textContent = "";
  invalidEmailInput.textContent = "";
  invalidPhoneInput.textContent = "";
  invalidAddressInput.textContent = "";

  invalidFirstNameInput.style.display = "block";
  invalidLastNameInput.style.display = "block";
  invalidEmailInput.style.display = "block";
  invalidPhoneInput.style.display = "block";
  invalidAddressInput.style.display = "block";

  let firstNameInputValidation = true;
  let lastNameInputValidation = true;
  let emailInputValidation = true;
  let phoneInputValidation = true;
  let addressInputValidation = true;

  if (!validateEmail(emailInput.value)) {
    emailInput.setCustomValidity("Please input valid email");
    invalidEmailInput.textContent = "Please input valid email";
    emailInputValidation = validateEmail(emailInput.value);
  }

	if (form.checkVisibility()) {

    if (!isNull(firstNameInput.value)) {
      firstNameInput.setCustomValidity(validateName(firstNameInput.value) ? "" : "Please input valid first name");
      invalidFirstNameInput.textContent = validateName(firstNameInput.value) ? "" : "Please input valid first name";
      firstNameInputValidation = validateName(firstNameInput.value);
    }

    if (!isNull(lastNameInput.value)) {
      lastNameInput.setCustomValidity(validateName(lastNameInput.value) ? "" : "Please input valid last name");
      invalidLastNameInput.textContent = validateName(lastNameInput.value) ? "" : "Please input valid last name";
      lastNameInputValidation = validateName(lastNameInput.value);
    }

    if (!isNull(phoneInput.value)) {
      phoneInput.setCustomValidity(validatePhone(phoneInput.value) ? "" : "Please input valid phone number");
      invalidPhoneInput.textContent = validatePhone(phoneInput.value) ? "" : "Please input valid phone number";
      phoneInputValidation = validatePhone(phoneInput.value);
    }

    // if (!isNull(addressInput.value)) {
    //   addressInput.setCustomValidity(validateAddress(addressInput.value) ? "" : "Please input valid address");
    //   invalidAddressInput.textContent = validateAddress(addressInput.value) ? "" : "Please input valid address";
    //   addressInputValidation = validateAddress(addressInput.value);
    // }

    if (
      firstNameInputValidation &&
      lastNameInputValidation &&
      emailInputValidation &&
      phoneInputValidation &&
      addressInputValidation
    ) {
      form.classList.remove("was-validated");
      passValueProfileSettings(
        firstNameInput.value,
        lastNameInput.value,
        emailInput.value,
        phoneInput.value,
        addressInput.value,
        inputCity.value,
        inputState.value,
        inputZip.value,
        inputGender.value, 
        inputDatepicker.value,
      );

      invalidFirstNameInput.textContent = "";
      invalidLastNameInput.textContent = "";
      invalidEmailInput.textContent = "";
      invalidPhoneInput.textContent = ""
      invalidAddressInput.textContent = "";

      invalidFirstNameInput.style.display = "none";
      invalidLastNameInput.style.display = "none";
      invalidEmailInput.style.display = "none";
      invalidPhoneInput.style.display = "none";
      invalidAddressInput.style.display = "none";
    }

	} else {
    console.log("Form invalid");
    form.classList.add("was-validated");
  }
});

document.getElementById("avatarForm").addEventListener("submit", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const file = document.getElementById("image").files[0];
	passValueProfileImage(file);
});

document.getElementById("image").addEventListener("change", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const form = document.getElementById("avatarForm");
  form.querySelector("button[type='submit']").click();
});

document.getElementById("coverImageForm").addEventListener("submit", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const file = document.getElementById("cover").files[0];
	passValueProfileCoverImage(file);
});

document.getElementById("cover").addEventListener("change", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const form = document.getElementById("coverImageForm");
  form.querySelector("button[type='submit']").click();
});

document.getElementById("deleteAccountForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const userId = document.getElementById("userId").textContent;
  deleteAccount(userId);
});

document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("changePasswordForm");

  const oldPasswordInput = document.getElementById("oldPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const newConfirmPasswordInput = document.getElementById("newConfirmPassword");

  const invalidOldPasswordInput = document.getElementById("invalidOldPassword");
  const invalidNewPasswordInput = document.getElementById("invalidNewPassword");
  const invalidNewConfirmPasswordInput = document.getElementById("invalidNewConfirmPassword");

  oldPasswordInput.setCustomValidity("");
  newPasswordInput.setCustomValidity("");
  newConfirmPasswordInput.setCustomValidity("");

  invalidOldPasswordInput.textContent = "";
  invalidNewPasswordInput.textContent = "";
  invalidNewConfirmPasswordInput.textContent = "";

  invalidOldPasswordInput.style.display = "block";
  invalidNewPasswordInput.style.display = "block";
  invalidNewConfirmPasswordInput.style.display = "block";

  let oldPasswordInputValidation = true;
  let newPasswordInputValidation = true;
  let newConfirmPasswordInputValidation = true;

  if (isNull(oldPasswordInput.value)) {
    oldPasswordInput.setCustomValidity("Old password is required");
    invalidOldPasswordInput.textContent = "Old password is required";
    oldPasswordInputValidation = !isNull(oldPasswordInput.value);
  }

  if (isNull(newPasswordInput.value)) {
    newPasswordInput.setCustomValidity("Old password is required");
    invalidNewPasswordInput.textContent = "Old password is required";
    newPasswordInputValidation = !isNull(invalidNewPasswordInput.value);
  }

  if (isNull(newConfirmPasswordInput.value)) {
    newConfirmPasswordInput.setCustomValidity("Old password is required");
    invalidNewConfirmPasswordInput.textContent = "Old password is required";
    newConfirmPasswordInputValidation = !isNull(newConfirmPasswordInput.value);
  }

  if (form.checkVisibility()) {
    
    newPasswordInput.setCustomValidity(newPasswordInput.value === newConfirmPasswordInput.value ? "" : "New passwords do not match");
    newConfirmPasswordInput.setCustomValidity(newPasswordInput.value === newConfirmPasswordInput.value ? "" : "New passwords do not match");
    invalidNewPasswordInput.textContent = newPasswordInput.value === newConfirmPasswordInput.value ? "" : "New passwords do not match";
    newPasswordInputValidation = newPasswordInput.value === newConfirmPasswordInput.value;
    newConfirmPasswordInputValidation = newPasswordInput.value === newConfirmPasswordInput.value;

    if (
      oldPasswordInputValidation && 
      newPasswordInputValidation && 
      newConfirmPasswordInputValidation
    ) {
      form.classList.remove("was-validated");
      passValueChangePassword(
        oldPasswordInput.value,
        newPasswordInput.value
      );

      invalidOldPasswordInput.textContent = "";
      invalidNewPasswordInput.textContent = "";
      invalidNewConfirmPasswordInput.textContent = "";

      invalidOldPasswordInput.style.display = "none";
      invalidNewPasswordInput.style.display = "none";
      invalidNewConfirmPasswordInput.style.display = "none";
    }
  } else {
    console.log("Form invalid");
    form.classList.add("was-validated");
  }
});
