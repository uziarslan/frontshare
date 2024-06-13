document.getElementById("logoImage").addEventListener("change", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const form = document.getElementById("companyLogoForm");
  form.querySelector("button[type='submit']").click();
});

document.getElementById("companyLogoForm").addEventListener("submit", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const file = document.getElementById("logoImage").files[0];
	passValueCompanyLogo(file);
});

document.getElementById("updateCompanyInfoForm").addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const appName = $("#companyAppName").val();
  updateAppInfo(appName);
});

document.getElementById("symbolImage").addEventListener("change", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const form = document.getElementById("companySymbolForm");
  form.querySelector("button[type='submit']").click();
});

document.getElementById("companySymbolForm").addEventListener("submit", (e) => {
	e.stopPropagation();
	e.preventDefault();

  const file = document.getElementById("symbolImage").files[0];
	passValueCompanyLogoSymbol(file);
});

const passValueCompanyLogoSymbol = async (file) => {
	let result = null;
	try {
		const formData = new FormData();
		formData.append("image", file);

		result = await axios({
			method: "POST",
			url: "/api/v1/appInfo/uploadSymbol",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data: formData,
		});

		if (result.data.status === "success") {
			document.getElementById("alertContext").innerHTML = `
				<h6>App symbol updated successfully!</h6>
				<button
					class="close"
					type="button"
					onclick="closeCustomAlert()"
					aria-label="Close"
				>
					<span class="font-weight-light" aria-hidden="true">×</span>
				</button>
			`;
			document.querySelector(".custom-alert").style.display = "block";

			setTimeout(function () {
				window.location.reload();
			}, 3000);
		}
	} catch (err) {
		console.log(err);
	}
};

const passValueCompanyLogo = async (file) => {
	let result = null;
	try {
		const formData = new FormData();
		formData.append("image", file);

		result = await axios({
			method: "POST",
			url: "/api/v1/appInfo/uploadLogo",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data: formData,
		});

		if (result.data.status === "success") {
			document.getElementById("alertContext").innerHTML = `
				<h6>App Logo updated successfully!</h6>
				<button
					class="close"
					type="button"
					onclick="closeCustomAlert()"
					aria-label="Close"
				>
					<span class="font-weight-light" aria-hidden="true">×</span>
				</button>
			`;
			document.querySelector(".custom-alert").style.display = "block";

			setTimeout(function () {
				window.location.reload();
			}, 3000);
		}
	} catch (err) {
		console.log(err);
	}
};

const updateAppInfo = async (appName) => {
  let result = null;
  try {
    result = await axios({
      method: "POST",
      url: "/api/v1/appInfo",
      data: {
        app_name: appName
      }
    });

    if (result.data.status === "success") {
      window.location.href = "/webapp-settings";
    }
  } catch (err) {
    console.log(err);
		window.location.href = "/webapp-settings";
  }
};