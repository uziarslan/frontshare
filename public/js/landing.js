const getFacebookLoginUrl = async () => {
  let result = null;
  try {
    result = await axios({
      method: "GET",
      url: "/facebookLoginUrl",
    });
    if (result.data.status === "success") {
      $('#facebook-login').attr('href', result.data.data.url )
    }
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(function(){
  getFacebookLoginUrl();
});