const logoutFunc = async ()=> {
	try{
		const result = await axios({
			method: "POST",
			url: "/api/v1/users/logout",
		});

		if (result.data.status === "success") {
			localStorage.setItem("showLogoutModal", true);
			window.location.href = "/";
		}
	}
	catch(err){
		console.log("Error : " + err)
	}  
};

document.getElementById("logoutButton").addEventListener("click", (e) => {
	logoutFunc();
});
