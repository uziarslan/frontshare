const passValueAddUser = async (
  firstName,
  lastName,
  email,
  password,
) => {
  let result = null;
  $('#addUserModal').modal('hide');
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/users/",
      data: {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      },
    });

    if (result.data.message === 'User added successfully') {
      window.location.reload();
    }
  } catch (err) {
    
  }
};

document.getElementById("addUserForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const form = document.getElementById("addUserForm");

  const passwordInput = document.getElementById("passwordRegistration");
  const confirmPasswordInput = document.getElementById("confirmPasswordRegistration");
  const firstNameInput = document.getElementById("firstNameRegistration");
  const lastNameInput = document.getElementById("lastNameRegistration");
  const emailInput = document.getElementById("emailRegistration");

  passValueAddUser(
      firstNameInput.value,
      lastNameInput.value,
      emailInput.value,
      passwordInput.value,
    );

});


document.getElementById('exportButton').addEventListener('click', async (e) => {
  try {
    const response = await axios('api/v1/users/export', {
      method: 'POST',
      responseType: 'text'
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to export users:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});






