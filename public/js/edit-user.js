const passValueEditUser = async (
  first_name,
  last_name,
  email,
  phone,
  address,
  plan,
  title,
  identity_verified,
  email_verified,
  role,
  url,
  balance,
  password,
) => {
  let result = null;
  const userId = document.getElementById("userId").value;
  let data = {
  		email,
      first_name,
      last_name,
      phone,
      address,
      plan,
      title,
      email_verified,
      identity_verified,
		  role,
		  url,
		  balance
  }

  if(password != '') {
  	data['password'] = password
  }

  try {
    result = await axios({
      method: "PATCH",
      url: `/api/v1/users/${userId}`,
      data: data
    });
    if (result.status === 200) {
      window.location.reload();
    }
  } catch (err) {
  	console.log(err);

    if (err.response && err.response.status === 400) {
      // var customAlert = document.createElement("div");
      // customAlert.classList.add(
      //   "alert",
      //   "alert-danger",
      //   "alert-dismissible",
      //   "fade",
      //   "show"
      // );
      // customAlert.style.bottom = "20px";
      // customAlert.style.right = "20px";
      // customAlert.style.maxWidth = "400px";
      // customAlert.style.fontSize = "14px";
      // customAlert.innerHTML = `
      //   <h6 class="mt-2">${err.response.data.error}</h6>
      // `;
      // document.getElementById("auth-alert").appendChild(customAlert);

      // setTimeout(function () {
      //   customAlert.remove();
      // }, 3000);
      showAlert(${err.response.data.error}, 'danger', 3000, true);
    }
  }
};

document.getElementById("editUserForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const form = document.getElementById("editUserForm");

  const firstNameInput = document.getElementById("firstName").value;
  const lastNameInput = document.getElementById("lastName").value;
  const emailInput = document.getElementById("emailEdit").value;
  const planInput = document.getElementById("planRegistration").value;
  const phoneInput = document.getElementById("phoneRegistration").value;
  const addressInput = document.getElementById("addressRegistration").value;
  const titleInput = document.getElementById("titleRegistration").value;
  const passwordInput = document.getElementById("passwordEdit").value;

  const roleInput = document.getElementById("roleRegistration").value;
  const balanceInput = document.getElementById("balanceRegistration").value;
  const urlInput = document.getElementById("urlRegistration").value;
  const identityVerifiedInput = document.querySelector('input[name="identity_verified"]:checked').value;
  const emailVerifiedInput = document.querySelector('input[name="email_verified"]:checked').value;

  passValueEditUser(
      firstNameInput,
      lastNameInput,
      emailInput,	
      phoneInput,
      addressInput,
      planInput,
      titleInput,
      identityVerifiedInput,
      emailVerifiedInput,
      roleInput,
      urlInput,
      balanceInput,
      passwordInput
    );

});
