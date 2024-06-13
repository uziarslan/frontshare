const passValueSignup = async (
  username,
  email,
  password,
  passwordConfirm,
  referredBy
) => {
  try {

    console.log("In try block");
    const result = await axios({
      method: "POST",

      url: "/api/v1/users/signup",
      data: {
        email,
        name: username,
        password,
        passwordConfirm,
        referredBy,
      },
    });
    if (result.data.status === "success") {
      window.alert("YES");
    }
  } catch (err) {
    window.alert("NO");
    console.log(err);
  }
};

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("cpassword").value;
  const referredBy = window.location.href.split("=")[1] || null;

  passValueSignup(username, email, password, passwordConfirm, referredBy);
});
