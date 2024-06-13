// var gNewCard = null;
// var gListId = null;

// function closeCustomAlert() {
//   var customAlert = document.querySelector(".custom-alert");
//   customAlert.style.display = "none";
// }

// function makeNewCard(listId, card, index) {
//   const count = document
//     .getElementById(`${listId}-container`)
//     .querySelectorAll(".kanban-item").length;
//   const self_note = "Hello"
//   var newCard = document.createElement("div");
//   newCard.classList.add("kanban-item");
//   newCard.setAttribute("id", `${listId}-${count}`);
//   var cards = document.getElementsByClassName("card kanban-item-card");
//   newCard.innerHTML =
//     `
// 		<div class="card kanban-item-card" index=${index} data-id="` +
//     cards.length +
//     `">
// 			<div class="card-header align-items-center pt-3 pb-2">
// 				<span class="float-left"></span>
// 				<button class="float-right" style="background-color: transparent; border: 0px; color: #edf2f9; z-index: 999;" onclick="removeCard(this)"><span class="material-icons text-700 fs-1">delete</span></button>
// 				<button class="float-right visibility" style="background-color: transparent; border: 0px; color: #edf2f9; z-index: 999;" onclick="setVisibility(this)"><span class="material-icons text-700 fs-1">visibility</span></button>
// 				<button id="edit" class="float-right" style="background-color: transparent; border: 0px; color: #edf2f9; z-index: 999;" data-toggle="modal" data-target="#kanban-modal-1" onclick="setCardStatus(this)"><span class="material-icons text-700 fs-1">edit</span></button>
// 				<button id="palette" class="float-right d-none" style="background-color: transparent; border: 0px; color: #edf2f9; z-index: 999;" data-toggle="modal" data-target="#editTextBlockColor" onclick="setCardDataId(this)"><span class="material-icons text-700 fs-1">palette</span></button>
// 			</div>
//       <p>${card}</p>
// 			<hr class="mt-0 mb-0 mx-3" />
// 			<!--                      -->
// 			<!--    Extra controls    -->
// 			<!--                      -->
// 			<!--     Goes  here       -->
// 			<!--                      -->
// 			<hr class="d-none mt-0 mb-0 mx-3" />
// 			<div class="card-body position-relative">
// 				<input type="hidden" name="type" value="">
// 				<input type="hidden" name="music_size" value="">
// 				<input type="hidden" name="link" value="">
// 				<input type="hidden" name="self_note" value="">
// 				<input type="hidden" name="text" value="">
// 				<input type="hidden" name="title" value="">
// 				<input type="hidden" name="text_block_color" value="">
// 				<input type="hidden" name="id" value="">
// 				<input type="hidden" name="totalCount" value="">
// 				<input type="hidden" name="percentage" value="">
// 				<input type="hidden" name="voteAllowance" value="">
//         <div id="poll-list-fields">

//         </div>

// 				<div class="d-none content" name="video_content">
// 					<div class="d-inline-flex align-items-center">
// 						<div class="">
// 							<h6 class="mb-0">Note to self:</h6>
// 							<p class="mb-0 text-500" name="video_content-self_note">
//               ${self_note ? self_note : "Note will show here"}</p>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="d-none content" name="music_content">
// 					<div class="d-inline-flex align-items-center">
// 						<div class="">
// 							<h6 class="mb-0">Note to self:</h6>
// 							<p class="mb-0 text-500" name="music_content-self_note">${self_note ? self_note : "Note will show here"
//     }</p>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="d-none content" name="text_content">
// 					<div class="d-inline-flex align-items-center">
// 						<div class="">
// 							<h6 class="mb-0">Note to self:</h6>
// 							<p class="mb-0 text-500" name="text_content-self_note">
//               ${self_note ? self_note : "Note will show here"}
//               </p>
// 						</div>
// 					</div>
// 				</div>
//         <div class="d-none content" name="poll_content">
// 					<div class="d-inline-flex align-items-center">
// 						<div class="">
// 							<h6 class="mb-0">Note to self:</h6>
// 							<p class="mb-0 text-500" name="poll_content-self_note">
//               ${self_note ? self_note : "Note will show here"}
//               </p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	`;

//   return newCard;
// }

// function setCardDataId(cardElement) {
//   var listId = cardElement.closest(".kanban-column").id;

//   var switchElement = document.querySelector(
//     `#${listId} .custom-control-input`
//   );
//   if (switchElement.checked) {
//     var card = cardElement.closest(".kanban-item");

//     document.getElementById("card-data-id").value = card
//       .querySelector(".kanban-item-card")
//       .getAttribute("data-id");
//   } else {
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-warning",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
// 			<h6>Please switch on the visibility to peform this functionality</h6>
// 			If the switch is grey that means you need to upgrade to the
// 			<a class="text-danger text-decoration-none" href="plans">Pro plan</a>.
// 			<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 			>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 			</button>
// 		`;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//     }, 3000);
//   }
// }

// function setCardStatus(cardElement) {
//   var listId = cardElement.closest(".kanban-column").id;

//   var switchElement = document.querySelector(
//     `#${listId} .custom-control-input`
//   );
//   if (switchElement.checked) {
//     document
//       .querySelectorAll(".blocktype")
//       .forEach((item) => item.classList.remove("bg-primary"));
//     if (gListId == null) {
//       var listId = cardElement.closest(".kanban-column").id;
//       document.getElementById("list-type").textContent = listId;
//     } else {
//       document.getElementById("list-type").textContent = gListId;
//     }
//     var card = cardElement.closest(".kanban-item");
//     document.getElementById("card-visibility").textContent =
//       card.querySelector(".visibility").textContent;
//     const type = card.querySelector("[name='type']").value;
//     const link = card.querySelector("[name='link']").value;
//     if (type !== null && type !== "") {
//       document.querySelectorAll(".blocktype").forEach((item) => {
//         if (item.textContent.includes(type)) {
//           item.classList.add("bg-primary");
//           createVideoContent(link);
//         }
//       });
//     }
//     document.getElementById("card-data-id").value = card
//       .querySelector(".kanban-item-card")
//       .getAttribute("data-id");

//     const wizards = document.querySelectorAll(".theme-wizard");
//     wizards.forEach((wizard) => {
//       let tabToggleButtonEl = wizard.querySelectorAll("[data-wizard-step]");
//       if (tabToggleButtonEl.length) {
//         if (type !== null && type !== "") {
//           const tab = new window.bootstrap.Tab(tabToggleButtonEl[1]);
//           tab.show();
//         }
//         tabToggleButtonEl.forEach((item, index) => {
//           item.classList.remove("done");
//         });
//       }
//       const tab = new window.bootstrap.Tab(tabToggleButtonEl[0]);
//       tab.show();
//     });
//   } else {
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-warning",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
// 			<h6>Please switch on the visibility to edit a card</h6>
// 			If the switch is grey that means you need to upgrade to the
// 			<a class="text-danger text-decoration-none" href="plans">Pro plan</a>.
// 			<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 			>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 			</button>
// 		`;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//     }, 3000);
//   }
// }

// function addCard(listId) {
//   gListId = listId;
//   var switchElement = document.querySelector(
//     `#${gListId} .custom-control-input`
//   );
//   let index = 0;

//   if (gListId === "first-list") {
//     index = user.first_list.data.length;
//   } else if (gListId === "second-list") {
//     index = user.second_list.data.length;
//   } else if (gListId === "third-list") {
//     index = user.third_list.data.length;
//   }

//   if (switchElement.checked) {
//     var kanbanItemsContainer = document.querySelector(`#${gListId}-container`);
//     gNewCard = makeNewCard(gListId, null, index);
//     gNewCard.classList.add("d-none");
//     // gNewCard.getElementsByClassName("card").item(0).classList.add("d-none");
//     kanbanItemsContainer.appendChild(gNewCard);

//     const edit = gNewCard.querySelector("#edit");
//     edit.click();
//   } else {
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-warning",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
// 			<h6>Please switch on the visibility to add a card</h6>
// 			If the switch is grey that means you need to upgrade to the
// 			<a class="text-danger text-decoration-none" href="plans">Pro plan</a>.
// 			<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 			>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 			</button>
// 		`;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//     }, 3000);
//   }
// }

// function removeCard(cardElement) {
//   var listId = cardElement.closest(".kanban-column").id;
//   const index = cardElement.closest(".kanban-item-card").getAttribute("index");

//   var listTitle =
//     document.querySelector(`#${listId} .text-serif`).textContent.split(" ")[0] +
//     " List";
//   var customAlert = document.createElement("div");
//   customAlert.classList.add(
//     "alert",
//     "alert-success",
//     "alert-dismissible",
//     "fade",
//     "show"
//   );
//   customAlert.style.bottom = "20px";
//   customAlert.style.right = "20px";
//   customAlert.style.maxWidth = "400px";
//   customAlert.style.fontSize = "14px";
//   customAlert.innerHTML = `
// 		<h6 class="mt-2">Card removed from ${listTitle}</h6>
// 		<button
// 			class="close"
// 			type="button"
// 			onclick="closeCustomAlert()"
// 			aria-label="Close"
// 		>
// 			<span class="font-weight-light" aria-hidden="true">×</span>
// 		</button>
// 	`;
//   document.getElementById("card-alert").appendChild(customAlert);
//   if (listId === "first-list") {
//     let votes = localStorage.getItem("vote");
//     votes = JSON.parse(votes);

//     if (votes && votes.length) {
//       const updatedVotes = votes.filter((item) => {
//         const splittedId = item.id.split("-").slice(-2).join("-");
//         return splittedId !== `first_list-${index}`;
//       });
//       localStorage.setItem("vote", JSON.stringify(updatedVotes));
//     }
//   } else if (listId === "second-list") {
//     let votes = localStorage.getItem("vote");
//     if (votes && votes.length) {
//       votes = JSON.parse(votes);

//       const updatedVotes = votes.filter((item) => {
//         const splittedId = item.id.split("-").slice(-2).join("-");
//         return splittedId !== `second_list-${index}`;
//       });
//       localStorage.setItem("vote", JSON.stringify(updatedVotes));
//     }
//   } else if (listId === "third-list") {
//     let votes = localStorage.getItem("vote");
//     if (votes && votes.length) {
//       votes = JSON.parse(votes);

//       const updatedVotes = votes.filter((item) => {
//         const splittedId = item.id.split("-").slice(-2).join("-");
//         return splittedId !== `third_list-${index}`;
//       });
//       localStorage.setItem("vote", JSON.stringify(updatedVotes));
//     }
//   }

//   var switchElement = document.querySelector(
//     `#${listId} .custom-control-input`
//   );
//   if (switchElement.checked) {
//     updateCardDataId(
//       cardElement.closest(".kanban-item-card").getAttribute("data-id")
//     );
//     cardElement.closest(".kanban-item").remove();
//     updateCardCount(listId);

//     var listTitle =
//       document
//         .querySelector(`#${listId} .text-serif`)
//         .textContent.split(" ")[0] + " List";
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-success",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
//   	<h6 class="mt-2">Card removed from ${listTitle} successfully!</h6>
//   	<button
//   		class="close"
//   		type="button"
//   		onclick="closeCustomAlert()"
//   		aria-label="Close"
//   	>
//   		<span class="font-weight-light" aria-hidden="true">×</span>
//   	</button>
//   `;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//       saveData();
//     }, 3000);
//   } else {
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-warning",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
//   		<h6>Please switch on the visibility to remove a card</h6>
//   		If the switch is grey that means you need to upgrade to the
//   		<a class="text-danger text-decoration-none" href="plans">Pro plan</a>.
//   		<button
//   			class="close"
//   			type="button"
//   			onclick="closeCustomAlert()"
//   			aria-label="Close"
//   		>
//   			<span class="font-weight-light" aria-hidden="true">×</span>
//   		</button>
//   	`;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//     }, 3000);
//   }
// }

// function updateCardCount(listId) {
//   var kanbanItemsContainer = document.querySelector(`#${listId}-container`);
//   var cardCount = kanbanItemsContainer.querySelectorAll(".kanban-item").length;
//   var listHeader = document.querySelector(`#${listId} .kanban-column-header`);
//   var listHeaderText = listHeader.querySelector(".fs-0.mb-0");
//   listHeaderText.innerHTML =
//     cardCount != 0
//       ? `${listHeaderText.textContent.split(" ")[0]} (${cardCount})`
//       : `${listHeaderText.textContent.split(" ")[0]} List`;
// }

// function updateCount(isFirstLoading) {
//   var firstList = document.getElementById("first-list-container");
//   var columns = firstList.querySelectorAll(".kanban-item");
//   var firstListHeader = document.getElementById("first-list-header");
//   var firstListTitle = firstListHeader.querySelector(".fs-0.mb-0");
//   firstListTitle.innerHTML =
//     columns.length != 0
//       ? `First List <span class="text-500">(${columns.length} Blocks)</span>`
//       : "First List";

//   var secondList = document.getElementById("second-list-container");
//   var columns = secondList.querySelectorAll(".kanban-item");
//   var secondListHeader = document.getElementById("second-list-header");
//   var secondListTitle = secondListHeader.querySelector(".fs-0.mb-0");
//   secondListTitle.innerHTML =
//     columns.length != 0
//       ? `Second List <span class="text-500">(${columns.length} Blocks)</span>`
//       : "Second List";

//   var thirdList = document.getElementById("third-list-container");
//   var columns = thirdList.querySelectorAll(".kanban-item");
//   var thirdListHeader = document.getElementById("third-list-header");
//   var thirdListTitle = thirdListHeader.querySelector(".fs-0.mb-0");
//   thirdListTitle.innerHTML =
//     columns.length != 0
//       ? `Third List <span class="text-500">(${columns.length} Blocks)</span>`
//       : "Third List";

//   if (!isFirstLoading) {
//     saveData();
//   }
// }

// function changeBackgroundColorVisible(listId) {
//   document.getElementById(`${listId}-header`).classList.remove("bg-300");
//   document.getElementById(`${listId}-header`).classList.add("bg-100");
//   document.getElementById(`${listId}-container`).classList.remove("bg-300");
//   document.getElementById(`${listId}-container`).classList.add("bg-100");
//   document.getElementById(`${listId}-footer`).classList.remove("bg-300");
//   document.getElementById(`${listId}-footer`).classList.add("bg-100");
// }

// function changeBackgroundColorInvisible(listId) {
//   document.getElementById(`${listId}-header`).classList.remove("bg-200");
//   document.getElementById(`${listId}-header`).classList.add("bg-300");
//   document.getElementById(`${listId}-container`).classList.remove("bg-200");
//   document.getElementById(`${listId}-container`).classList.add("bg-300");
//   document.getElementById(`${listId}-footer`).classList.remove("bg-200");
//   document.getElementById(`${listId}-footer`).classList.add("bg-300");
// }

// function setCardMediaIcon(card) {
//   var len = card.getElementsByClassName("content").length;
//   for (var i = 0; i < len; i++) {
//     card.getElementsByClassName("content").item(i).classList.add("d-none");
//   }
//   if (card.querySelector("[name='type']").value == "Video") {
//     card
//       .getElementsByClassName("card-header")
//       .item(0)
//       .querySelector("span").innerHTML =
//       '<div class="float-left"><span class="fas fa-video fs-1 text-danger"></span></div>';
//     card.querySelector("[name='video_content']").classList.remove("d-none");
//   } else if (card.querySelector("[name='type']").value == "Music") {
//     card
//       .getElementsByClassName("card-header")
//       .item(0)
//       .querySelector("span").innerHTML =
//       '<div class="float-left"><span class="fa fa-headphones fs-1 text-danger"></span></div>';
//     card.querySelector("[name='music_content']").classList.remove("d-none");
//   } else if (card.querySelector("[name='type']").value == "Text") {
//     card
//       .getElementsByClassName("card-header")
//       .item(0)
//       .querySelector("span").innerHTML =
//       '<div class="float-left"><span class="fas fa-sticky-note fs-1 text-danger"></span></div>';
//     card.querySelector("#palette").classList.remove("d-none");
//     card.querySelector("[name='text_content']").classList.remove("d-none");
//   } else if (card.querySelector("[name='type']").value == "Poll") {
//     card
//       .getElementsByClassName("card-header")
//       .item(0)
//       .querySelector("span").innerHTML =
//       '<div class="float-left"><span class="far fa-list-alt fs-1 text-danger"></span></div>';
//     card.querySelector("#palette").classList.remove("d-none");
//     card.querySelector("[name='poll_content']").classList.remove("d-none");
//   }
// }

// function updateCardDataId(removeCardId) {
//   var cards = document.getElementsByClassName("card kanban-item-card");
//   var cardsLen = cards.length;
//   for (var i = Number(removeCardId) + 1; i < cardsLen; i++) {
//     cards[i].setAttribute("data-id", String(i - 1));
//   }
// }

// function setVisibility(cardElement) {
//   var listId = cardElement.closest(".kanban-column").id;

//   var switchElement = document.querySelector(
//     `#${listId} .custom-control-input`
//   );
//   if (switchElement.checked) {
//     var card = cardElement.closest(".kanban-item");
//     const visibility = card.querySelector(".visibility").textContent;
//     if (visibility === "visibility") {
//       card.querySelector(
//         ".visibility"
//       ).innerHTML = `<span class="material-icons text-secondary fs-1">visibility_off</span>`;
//     } else if (visibility === "visibility_off") {
//       card.querySelector(
//         ".visibility"
//       ).innerHTML = `<span class="material-icons text-secondary fs-1">visibility</span>`;
//     }

//     saveData();
//   } else {
//     var customAlert = document.createElement("div");
//     customAlert.classList.add(
//       "alert",
//       "alert-warning",
//       "alert-dismissible",
//       "fade",
//       "show"
//     );
//     customAlert.style.bottom = "20px";
//     customAlert.style.right = "20px";
//     customAlert.style.maxWidth = "400px";
//     customAlert.style.fontSize = "14px";
//     customAlert.innerHTML = `
// 			<h6>Please switch on the visibility to set the visibility</h6>
// 			If the switch is grey that means you need to upgrade to the
// 			<a class="text-danger text-decoration-none" href="plans">Pro plan</a>.
// 			<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 			>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 			</button>
// 		`;
//     document.getElementById("card-alert").appendChild(customAlert);

//     setTimeout(function () {
//       customAlert.remove();
//     }, 3000);
//   }
// }

// const copyLink = async () => {
//   const link = "http://localhost:4000/profile/" + user.url;
//   var customAlert = document.querySelector(".custom-alert");
//   customAlert.innerHTML = `
// 		<h6 class="mt-2">Profile link copied !</h6>
// 		<button
// 			class="close"
// 			type="button"
// 			onclick="closeCustomAlert()"
// 			aria-label="Close"
// 		>
// 			<span class="font-weight-light" aria-hidden="true">×</span>
// 		</button>
// 	`;
//   customAlert.style.display = "block";

//   setTimeout(function () {
//     closeCustomAlert();
//   }, 3000);
//   try {
//     await navigator.clipboard.writeText(link);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const updateProfileLists = async (
//   firstListData,
//   secondListData,
//   thirdListData,
//   showFirstList,
//   showSecondList,
//   showThirdList
// ) => {
//   gNewCard = null;
//   gListId = null;

//   let result = null;
//   try {
//     result = await axios({
//       method: "POST",
//       url: "/api/v1/users/updateProfileLists",
//       data: {
//         first_list: {
//           show: showFirstList,
//           count: firstListData.length,
//           data: firstListData,
//         },
//         second_list: {
//           show: showSecondList,
//           count: secondListData.length,
//           data: secondListData,
//         },
//         third_list: {
//           show: showThirdList,
//           count: thirdListData.length,
//           data: thirdListData,
//         },
//       },
//     });

//     if (result.data.status === "success") {
//       var customAlert = document.querySelector(".custom-alert");
//       customAlert.innerHTML = `
// 				<h6 class="mt-2">Profile saved!</h6>
// 				<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 				>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 				</button>
// 			`;
//       customAlert.style.display = "block";

//       setTimeout(function () {
//         closeCustomAlert();
//       }, 3000);
//     }
//   } catch (err) {
//     console.error(err.response);
//   }
// };

// const handleBioVisibility = async () => {
//   let result = null;

//   const switchElement = document.getElementById("switch5");

//   // Get the current state of the switch
//   const showBio = switchElement.checked;

//   try {
//     result = await axios({
//       method: "POST",
//       url: "/api/v1/users/accounts-settings",
//       data: {
//         showBio,
//       },
//     });

//     if (result.data.status === "success") {
//       var customAlert = document.querySelector(".custom-alert");
//       customAlert.innerHTML = `
// 				<h6 class="mt-2">Profile saved!</h6>
// 				<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 				>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 				</button>
// 			`;
//       customAlert.style.display = "block";

//       setTimeout(function () {
//         closeCustomAlert();
//       }, 3000);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const handleCanvasVisibility = async () => {
//   let result = null;

//   const switchElement = document.getElementById("switch4");

//   // Get the current state of the switch
//   const showCanvas = switchElement.checked;

//   try {
//     result = await axios({
//       method: "POST",
//       url: "/api/v1/users/accounts-settings",
//       data: {
//         showCanvas,
//       },
//     });

//     if (result.data.status === "success") {
//       var customAlert = document.querySelector(".custom-alert");
//       customAlert.innerHTML = `
// 				<h6 class="mt-2">Profile saved!</h6>
// 				<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 				>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 				</button>
// 			`;
//       customAlert.style.display = "block";

//       setTimeout(function () {
//         closeCustomAlert();
//       }, 3000);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const saveData = () => {
//   var i = 0,
//     j = 0,
//     firstListData = [],
//     secondListData = [],
//     thirdListData = [];

//   const isToggledFirstList = document.getElementById("switch1").checked;
//   const isToggledSecondList = document.getElementById("switch2").checked;
//   const isToggledThirdList = document.getElementById("switch3").checked;

//   const firstList = document.getElementById("first-list-container");
//   const firstListCardCount = firstList.querySelectorAll(".kanban-item").length;
//   for (i = 0; i < firstListCardCount; i++) {
//     const type = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='type']").value;
//     const music_size = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='music_size']").value;
//     const link = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='link']").value;
//     const text = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text']").value;
//     const title = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='title']").value;
//     const self_note = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='self_note']").value;
//     const text_block_color = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text_block_color']").value;
//     let count = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='totalCount']").value;
//     let voteAllowance = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='voteAllowance']").value;
//     let percentage = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='percentage']").value;
//     const show =
//       firstList
//         .querySelectorAll(".kanban-item")
//         .item(i)
//         .querySelector(".visibility").textContent === "visibility"
//         ? true
//         : false;
//     const fieldList = firstList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("#poll-list-fields");
//     const poll_list = [];

//     if (fieldList && fieldList.children) {
//       for (j = 0; j < fieldList.children.length; j++) {
//         const child = fieldList.children[j];
//         console.log("count", child.getAttribute("count"));
//         poll_list.push({
//           value: child.value,
//           count: child.getAttribute("count") * 1,
//         });
//       }
//     }

//     console.log("poll_list firstList", poll_list);

//     if (count && count !== "") {
//       count = JSON.parse(count);
//     } else {
//       count = false;
//     }

//     if (percentage && percentage !== "") {
//       percentage = JSON.parse(percentage);
//     } else {
//       percentage = false;
//     }

//     if (voteAllowance && voteAllowance !== "") {
//       voteAllowance = JSON.parse(voteAllowance);
//     } else {
//       voteAllowance = false;
//     }

//     const listData = {
//       type,
//       music_size,
//       link,
//       text,
//       title,
//       self_note,
//       text_block_color,
//       count,
//       percentage,
//       voteAllowance,
//       show,
//       poll_list,
//     };

//     if (type !== "") {
//       firstListData.push(listData);
//     }
//   }

//   console.log("--------");
//   const secondList = document.getElementById("second-list-container");
//   const secondListCardCount =
//     secondList.querySelectorAll(".kanban-item").length;
//   for (i = 0; i < secondListCardCount; i++) {
//     const type = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='type']").value;
//     const music_size = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='music_size']").value;
//     const link = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='link']").value;
//     const text = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text']").value;
//     const title = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='title']").value;
//     const self_note = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='self_note']").value;
//     const text_block_color = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text_block_color']").value;
//     let count = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='totalCount']").value;
//     let percentage = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='percentage']").value;
//     let voteAllowance = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='voteAllowance']").value;
//     const show =
//       secondList
//         .querySelectorAll(".kanban-item")
//         .item(i)
//         .querySelector(".visibility").textContent === "visibility"
//         ? true
//         : false;
//     const fieldList = secondList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("#poll-list-fields");
//     const poll_list = [];

//     if (fieldList && fieldList.children) {
//       for (j = 0; j < fieldList.children.length; j++) {
//         const child = fieldList.children[j];
//         poll_list.push({
//           value: child.value,
//           count: child.getAttribute("count") * 1,
//         });
//       }
//     }

//     if (count && count !== "") {
//       count = JSON.parse(count);
//     } else {
//       count = false;
//     }

//     if (percentage && percentage !== "") {
//       percentage = JSON.parse(percentage);
//     } else {
//       percentage = false;
//     }

//     if (voteAllowance && voteAllowance !== "") {
//       voteAllowance = JSON.parse(voteAllowance);
//     } else {
//       voteAllowance = false;
//     }

//     console.log("secondList", poll_list);

//     const listData = {
//       type,
//       music_size,
//       link,
//       text,
//       title,
//       self_note,
//       text_block_color,
//       count,
//       percentage,
//       voteAllowance,
//       show,
//       poll_list,
//     };

//     if (type !== "") {
//       secondListData.push(listData);
//     }
//   }
//   console.log("--------");
//   const thirdList = document.getElementById("third-list-container");
//   const thirdListCardCount = thirdList.querySelectorAll(".kanban-item").length;
//   for (i = 0; i < thirdListCardCount; i++) {
//     const type = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='type']").value;
//     const music_size = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='music_size']").value;
//     const link = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='link']").value;
//     const self_note = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='self_note']").value;
//     const text = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text']").value;
//     const title = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='title']").value;
//     const text_block_color = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='text_block_color']").value;
//     let count = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='totalCount']").value;
//     let percentage = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='percentage']").value;
//     let voteAllowance = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='voteAllowance']").value;
//     const show =
//       thirdList
//         .querySelectorAll(".kanban-item")
//         .item(i)
//         .querySelector(".visibility").textContent === "visibility"
//         ? true
//         : false;
//     const fieldList = thirdList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("#poll-list-fields");
//     const poll_list = [];

//     if (fieldList && fieldList.children) {
//       for (j = 0; j < fieldList.children.length; j++) {
//         const child = fieldList.children[j];
//         poll_list.push({
//           value: child.value,
//           count: child.getAttribute("count") * 1,
//         });
//       }
//     }

//     if (count && count !== "") {
//       count = JSON.parse(count);
//     } else {
//       count = false;
//     }

//     if (percentage && percentage !== "") {
//       percentage = JSON.parse(percentage);
//     } else {
//       percentage = false;
//     }

//     if (voteAllowance && voteAllowance !== "") {
//       voteAllowance = JSON.parse(voteAllowance);
//     } else {
//       voteAllowance = false;
//     }

//     console.log("thirdList", poll_list);

//     const listData = {
//       type,
//       music_size,
//       link,
//       self_note,
//       text,
//       title,
//       text_block_color,
//       count,
//       percentage,
//       voteAllowance,
//       show,
//       poll_list,
//     };

//     if (type !== "") {
//       thirdListData.push(listData);
//     }
//   }

//   updateProfileLists(
//     firstListData,
//     secondListData,
//     thirdListData,
//     isToggledFirstList,
//     isToggledSecondList,
//     isToggledThirdList
//   );
// };

// const saveBio = async (
//   displayName,
//   title,
//   location,
//   bio,
//   use_real_name,
//   use_real_location
// ) => {
//   let result = null;
//   try {
//     result = await axios({
//       method: "POST",
//       url: "/api/v1/users/updateBio",
//       data: {
//         use_real_name: use_real_name,
//         use_real_location: use_real_location,
//         "canvas_bio.display_name": displayName,
//         "canvas_bio.title": title,
//         "canvas_bio.location": location,
//         "canvas_bio.free_text": bio,
//       },
//     });

//     if (result.data.status === "success") {
//       var customAlert = document.querySelector(".custom-alert");
//       customAlert.innerHTML = `
// 				<h6 class="mt-2">Bio updated!</h6>
// 				<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 				>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 				</button>
// 			`;
//       customAlert.style.display = "block";
//       $("#editBio").removeClass("show");
//       $(".modal-backdrop").remove();
//       $("#editBioButton").click();

//       setTimeout(function () {
//         closeCustomAlert();
//       }, 3000);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const saveSocials = async () => {
//   let socialData = [];
//   const socialList = document.getElementById("social-list-container");
//   const socialListCount = socialList.querySelectorAll(".kanban-item").length;
//   for (i = 0; i < socialListCount; i++) {
//     const social = socialList
//       .querySelectorAll(".kanban-item")
//       .item(i)
//       .querySelector("[name='social']").value;
//     socialData.push(social);
//   }

//   let result = null;
//   try {
//     result = await axios({
//       method: "POST",
//       url: "/api/v1/users/updateSocialListData",
//       data: {
//         socialData,
//       },
//     });

//     if (result.data.status === "success") {
//       var customAlert = document.querySelector(".custom-alert");
//       customAlert.innerHTML = `
// 				<h6 class="mt-2">Social list saved!</h6>
// 				<button
// 				class="close"
// 				type="button"
// 				onclick="closeCustomAlert()"
// 				aria-label="Close"
// 				>
// 				<span class="font-weight-light" aria-hidden="true">×</span>
// 				</button>
// 			`;
//       customAlert.style.display = "block";

//       setTimeout(function () {
//         closeCustomAlert();
//       }, 3000);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// document.getElementById("upload-btn").addEventListener("click", (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   saveData();
// });

// document.getElementById("switch1").addEventListener("change", (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   const firstKanbanItemsContainer = document.querySelector(
//     "#first-list-container"
//   );
//   if (e.target.checked) {
//     changeBackgroundColorVisible("first-list");
//     firstKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.remove("bg-400");
//         item.querySelector(".card-header").classList.remove("bg-400");
//       });
//   } else {
//     changeBackgroundColorInvisible("first-list");
//     firstKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.add("bg-400");
//         item.querySelector(".card-header").classList.add("bg-400");
//       });
//   }
//   saveData();
// });

// document.getElementById("switch2").addEventListener("change", (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   const secondKanbanItemsContainer = document.querySelector(
//     "#second-list-container"
//   );
//   if (e.target.checked) {
//     changeBackgroundColorVisible("second-list");
//     secondKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.remove("bg-400");
//         item.querySelector(".card-header").classList.remove("bg-400");
//       });
//   } else {
//     changeBackgroundColorInvisible("second-list");
//     secondKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.add("bg-400");
//         item.querySelector(".card-header").classList.add("bg-400");
//       });
//   }
//   saveData();
// });

// document.getElementById("switch3").addEventListener("change", (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   const thirdKanbanItemsContainer = document.querySelector(
//     "#third-list-container"
//   );
//   if (e.target.checked) {
//     changeBackgroundColorVisible("third-list");
//     thirdKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.remove("bg-400");
//         item.querySelector(".card-header").classList.remove("bg-400");
//       });
//   } else {
//     changeBackgroundColorInvisible("third-list");
//     thirdKanbanItemsContainer
//       .querySelectorAll(".kanban-item")
//       .forEach((item) => {
//         item.querySelector(".kanban-item-card").classList.add("bg-400");
//         item.querySelector(".card-header").classList.add("bg-400");
//       });
//   }
//   saveData();
// });

// document
//   .getElementById("updateTextBlockColor")
//   .addEventListener("click", (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     let text_block_color = document.getElementById("text_block_color").value;
//     const card_data_id = document.getElementById("card-data-id").value;
//     document
//       .querySelector("[data-id='" + card_data_id + "']")
//       .querySelector("[name='text_block_color']").value = text_block_color;

//     saveData();
//     setTimeout(function () {
//       document.getElementById("editTextBlockColor").style.display = "none";
//       document.getElementsByClassName("modal-backdrop").item(0).style.display =
//         "none";
//     }, 3000);
//   });

// document.getElementById("nextBtn").addEventListener("click", (e) => {
//   let link = "";
//   let block = "";
//   let music_size = "";
//   let text = "";
//   let title = "";
//   let self_note = "";
//   let pollOptions = [];
//   let count = false;
//   let percentage = false;
//   let voteAllowance = false;

//   document.querySelectorAll(".blocktype").forEach((item) => {
//     if (item.className.includes("bg-primary")) block = item.textContent;
//   });

//   if (document.getElementById("nextBtn").textContent.includes("Submit")) {
//     e.stopPropagation();
//     e.preventDefault();

//     const card_data_id = document.getElementById("card-data-id").value;
//     self_note = document.getElementById("self_note").value;

//     if (block.includes("Text")) {
//       document
//         .querySelector("[data-id='" + card_data_id + "']")
//         .querySelector("[name='text_content-self_note']").textContent =
//         self_note;
//       document.getElementById("text_content").value = tinymce
//         .get("text_content")
//         .getContent();
//       if (
//         document.getElementById("properties").querySelector("#text_content")
//           .value == ""
//       )
//         return;
//       block = "Text";
//       text = document.getElementById("text_content").value;
//     } else if (block.includes("Poll")) {
//       document
//         .querySelector("[data-id='" + card_data_id + "']")
//         .querySelector("[name='poll_content-self_note']").textContent =
//         self_note;
//       const pollListChildren = document
//         .getElementById("properties")
//         .querySelector("#poll-list-container").children;
//       if (
//         document.getElementById("properties").querySelector("#title_content")
//           .value == ""
//       ) {
//         return;
//       }

//       if (
//         pollListChildren &&
//         !pollListChildren.length &&
//         pollListChildren.length === 0
//       ) {
//         return;
//       }

//       if (
//         !document.getElementById("properties").querySelector("#totalCount")
//           .checked &&
//         !document.getElementById("properties").querySelector("#percentage")
//           .checked
//       ) {
//         return;
//       }

//       block = "Poll";
//       title = document.getElementById("title_content").value;
//       count = document.getElementById("totalCount").checked;
//       percentage = document.getElementById("percentage").checked;
//       voteAllowance = document.getElementById("voteToggle").checked;
//       const children = document.getElementById("poll-list-container").children;

//       for (var i = 0; i < children.length; i++) {
//         const child = children[i];

//         const inputElement = child.querySelector('input[name="poll"]');
//         console.log(inputElement.getAttribute("count"));

//         if (
//           inputElement &&
//           inputElement.getAttribute("count") &&
//           inputElement.getAttribute("count") !== "undefined"
//         ) {
//           pollOptions.push({
//             type: inputElement.value,
//             count: inputElement.getAttribute("count") * 1,
//           });
//         } else {
//           pollOptions.push({ type: inputElement.value, count: 0 });
//         }
//       }
//     } else {
//       if (block.includes("Video")) {
//         document
//           .querySelector("[data-id='" + card_data_id + "']")
//           .querySelector("[name='video_content-self_note']").textContent =
//           self_note;
//         if (
//           document.getElementById("properties").querySelector("input").value ==
//           ""
//         )
//           return;
//         block = "Video";
//         link = document.getElementById("video_url").value;
//       } else if (block.includes("Music")) {
//         document
//           .querySelector("[data-id='" + card_data_id + "']")
//           .querySelector("[name='music_content-self_note']").textContent =
//           self_note;
//         if (
//           document.getElementById("properties").querySelector("input").value ==
//           ""
//         )
//           return;
//         block = "Music";
//         music_size = document.getElementById("music_size").value;
//         link = document.getElementById("music_url").value;
//       }
//     }
//     self_note = document.getElementById("self_note").value;

//     if (gNewCard != null) {
//       gNewCard.classList.remove("d-none");
//       // gNewCard
//       //   .getElementsByClassName("card")
//       //   .item(0)
//       //   .classList.remove("d-none");
//       updateCardCount(gListId);

//       var listTitle = "";
//       if (gListId === "first-list") {
//         listTitle = "First List";
//       } else if (gListId === "second-list") {
//         listTitle = "Second List";
//       } else if (gListId === "third-list") {
//         listTitle = "Third List";
//       }

//       var customAlert = document.createElement("div");
//       customAlert.classList.add(
//         "alert",
//         "alert-success",
//         "alert-dismissible",
//         "fade",
//         "show"
//       );
//       customAlert.style.bottom = "20px";
//       customAlert.style.right = "20px";
//       customAlert.style.maxWidth = "400px";
//       customAlert.style.fontSize = "14px";
//       customAlert.innerHTML = `
//           <h6 class="mt-2">New Card added</h6>
//           <button
//             class="close"
//             type="button"
//             onclick="closeCustomAlert()"
//             aria-label="Close"
//           >
//             <span class="font-weight-light" aria-hidden="true">×</span>
//           </button>
//         `;
//       document.getElementById("card-alert").appendChild(customAlert);

//       setTimeout(function () {
//         customAlert.remove();
//       }, 3000);
//     }

//     const container = document.querySelector(
//       "[data-id='" + card_data_id + "']"
//     );

//     container.querySelector("[name='type']").value = block;
//     container.querySelector("[name='music_size']").value = music_size;
//     container.querySelector("[name='link']").value = link;
//     container.querySelector("[name='self_note']").value = self_note;
//     container.querySelector("[name='text']").value = text;
//     container.querySelector("[name='title']").value = title;
//     container.querySelector("[name='self_note']").value = self_note;
//     container.querySelector("[name='totalCount']").value = count;
//     container.querySelector("[name='percentage']").value = percentage;
//     container.querySelector("[name='voteAllowance']").value = voteAllowance;

//     if (pollOptions.length) {
//       const fieldList = container.querySelector("#poll-list-fields");
//       if (fieldList && fieldList.children) {
//         while (fieldList.firstChild) {
//           fieldList.removeChild(fieldList.firstChild);
//         }
//       }

//       for (let i = 0; i < pollOptions.length; i++) {
//         const element = document.createElement("input");
//         element.setAttribute("type", "hidden");
//         element.setAttribute("name", `poll-${i}`);
//         element.setAttribute("value", pollOptions[i].type);
//         element.setAttribute("count", pollOptions[i].count);

//         fieldList.append(element);
//       }
//     }
//     pollOptions = [];

//     setCardMediaIcon(
//       document.querySelector("[data-id='" + card_data_id + "']")
//     );

//     if (block !== "") {
//       setTimeout(function () {
//         document.getElementById("kanban-modal-1").style.display = "none";
//         document
//           .getElementsByClassName("modal-backdrop")
//           .item(0).style.display = "none";

//         const wizards = document.querySelectorAll(".theme-wizard");
//         wizards.forEach((wizard) => {
//           let tabToggleButtonEl = wizard.querySelectorAll("[data-wizard-step]");

//           if (tabToggleButtonEl.length) {
//             tabToggleButtonEl.forEach((item, index) => {
//               item.classList.remove("done");
//             });
//           }
//           const tab = new window.bootstrap.Tab(tabToggleButtonEl[0]);
//           tab.show();

//           saveData();
//         });
//       }, 3000);
//     }
//   }
// });

// document.getElementById("updateBioBtn").addEventListener("click", (e) => {
//   e.stopPropagation();
//   e.preventDefault();
//   let displayName = "";
//   let location = "";
//   if ($("#RealAddressToggle").is(":checked")) {
//     location = $("#bioLocationInput").data("address");
//   } else {
//     displayName = document.getElementById("displayNameInput").value;
//   }
//   if ($("#RealNameToggle").is(":checked")) {
//     displayName = $("#displayNameInput").data("display-name");
//   } else {
//     location = document.getElementById("bioLocationInput").value;
//   }
//   const title = document.getElementById("bioTitleInput").value;

//   const editor = tinymce.get("bioBioInput");

//   const editorContent = editor.getContent();

//   saveBio(displayName, title, location, editorContent, useRealName, useRealLoc);
// });

// document.getElementById("updateSocialsBtn").addEventListener("click", (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   saveSocials();
// });

// Adding the input field in the cardScreen container
function addOption() {
  const pollScreen = document.getElementById('pollScreen');

  // Define the HTML structure as a string
  const inputGroupHTML = `
    <div class="input-group mb-3">
      <span class="input-group-text arrowStyle" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">

          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <style>
            svg {
              fill: #ffffff
            }

          </style>
          <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z" />
        </svg></span>
      <input name="poll_list" type="text" class="form-control inputStyle" placeholder="Enter poll option here..." aria-label="polloption" aria-describedby="basic-addon1">



      <span class="input-group-text deleteBtnPoll" onclick="removeOption(this)"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">

          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <style>
            svg {
              fill: #ffffff
            }

          </style>
          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
        </svg></span>

    </div>
    `;

  // Insert the HTML as innerHTML of the pollScreen div
  pollScreen.innerHTML += inputGroupHTML;
}

// Removing the Specific input field
function removeOption(button) {
  // Get the parent element of the delete button (the entire input group)
  const inputGroup = button.parentElement;

  // Remove the input group from the pollScreen
  const pollScreen = document.getElementById('pollScreen');
  pollScreen.removeChild(inputGroup);
}

// Adding the code Block to the Modal everytime each button is clicked
function createModal(title, blockName) {
  if (blockName === "Block Types") {
    const modalHeader = document.querySelector('#exampleModal .modal-header');
    modalHeader.innerHTML = `
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
    deleteFooter()
    blockTypes()
  } else {
    deleteChildElements()
    const modalHeader = document.querySelector("#exampleModal .modal-header");
    modalHeader.innerHTML = `
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
  }

  if (blockName === "Poll Block") {
    deleteFooter()
    pollForm()
    footerButtons("< Prev", "Next>")
  } else if (blockName === "Text") {
    deleteFooter()
    textForm()
    footerButtons("< Prev", "Next>")
  } else if (blockName === "Video") {
    deleteFooter()
    videoBlock()
    footerButtons("< Prev", "Next>")
  } else if (blockName === "Music") {
    deleteFooter()
    musicBlock()
    footerButtons("< Prev", "Next>")
  }
}

function deleteChildElements() {
  const modal = document.getElementById("exampleModal");
  const modalBody = modal.querySelector("#exampleModal .modal-body");

  const children = modalBody.querySelectorAll("*");
  children.forEach((child) => {
    child.remove();
  });

  modal.style.display = 'block'; // Show the modal
}

function textForm() {
  const modalBody = document.querySelector("#exampleModal .modal-body");
  const modalFormBlock = `<div class="textAreaWrapper">
    <textarea class="textArea">Input your text.</textarea>
    </div>
          <div class="needs-validation p-2 mb-4 mt-4">
            <h5 class="text-center modelHeadingStyle">Note to self</h5>
            <input class="form-control mb-3 titleInputStyle" type="text" placeholder="Ex. This is a funny video" id="self_note" value="" required>
          </div>`
  modalBody.innerHTML = modalFormBlock;
}

function videoBlock() {
  const modalBody = document.querySelector("#exampleModal .modal-body");
  const modalFormBlock = `
        <div class="needs-validation p-2 mb-4 mt-4">
            <h5 class="text-center modelHeadingStyle">URL</h5>
            <input class="form-control mb-3 titleInputStyle" type="text" placeholder="Input the video url" required>
          </div>
          <div class="textAreaWrapper">
            <div class="previewScreen"></div>
          </div>
          <div class="needs-validation p-2 mb-4 mt-4">
            <h5 class="text-center modelHeadingStyle">Note to self</h5>
            <input class="form-control mb-3 titleInputStyle" type="text" placeholder="Ex. This is a funny video" id="self_note" value="" required>
          </div>
    `
  modalBody.innerHTML = modalFormBlock;
}

function musicBlock() {
  const modalBody = document.querySelector("#exampleModal .modal-body");
  const modalFormBlock = `
        <div class="needs-validation p-2 mb-4 mt-4">
            <h5 class="text-center modelHeadingStyle">URL</h5>
            <input class="form-control mb-3 titleInputStyle" type="text" placeholder="Input the video url" required>
          </div>
          <div class="textAreaWrapper">
            <h5 class="text-center modelHeadingStyle">Player Size</h5>
          </div>
          <div class="needs-validation p-2 mb-4 mt-4">
            <h5 class="text-center modelHeadingStyle">Note to self</h5>
            <input class="form-control mb-3 titleInputStyle" type="text" placeholder="Ex. This is a funny video" id="self_note" value="" required>
          </div>
    `
  modalBody.innerHTML = modalFormBlock;
}



function pollForm() {
  const modalBody = document.querySelector('#exampleModal .modal-body');
  const modalFormBlock = `<h5 class="text-center modelBodyHeading mt-5">Title</h5>
          <form id="pollForm" action="/canvas" method="POST">
            <input name="title" placeholder="Ex. This is a poll block title" type="text" class="form-control mb-3 titleInputStyle" />
            <div class="pollOptionArea">
              <div id="pollScreen" class="poolOptionContainer"></div>
              <div onclick="addOption()" class="pollOptionBtn">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                <button type="button" class="pollOptionButton">Add a poll option</button>
              </div>
              <div class="needs-validation p-2 mb-4 mt-4">
                <h5 class="text-center modelHeadingStyle">Select options:</h5>
                <div class="form-check mb-3">
                  <input name="count" class="form-check-input me-3" type="checkbox" id="flexCheckDefault">
                  <label class="form-check-label modelHeadingStyle" for="flexCheckDefault">
                    Show Count
                  </label>
                </div>
                <div class="form-check">
                  <input name="percentage" class="form-check-input me-3" type="checkbox" id="flexCheckChecked">
                  <label class="form-check-label modelHeadingStyle" for="flexCheckChecked">
                    Show Percentage
                  </label>
                </div>
                <div class="needs-validation p-2 mb-4 mt-4">
                  <h5 class="text-center modelHeadingStyle">Toggle for Vote Allowance:</h5>
                  <div class="form-check form-switch">
                    <input name="voteAllowance" class="form-check-input me-3" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <label class="form-check-label modelHeadingStyle" for="flexSwitchCheckDefault">
                      Vote unlocked/Vote locked
                    </label>
                  </div>
                </div>
                <div class="needs-validation p-2 mb-4 mt-4">
                  <h5 class="text-center modelHeadingStyle">Note to self</h5>
                  <input name="self_note" class="form-control mb-3 titleInputStyle" type="text" placeholder="Ex. This is a funny video" id="self_note" required>
                </div>
              </div>
            </div>
            <button type="sumbit">Save</button>
          </form>`
  modalBody.innerHTML = modalFormBlock;
}

function blockTypes() {
  const modalbody = document.querySelector("#exampleModal .modal-body");
  const buttonsBlock = `<div class="ButtonsWrapper mb-5 mt-5">
            <div class="leftSideColumn">
              <button onclick="createModal('Add your card', 'Text')" class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                  </svg>
                  <span class="buttonText">Text</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Custom text area</p>
                </div>
              </button>
              <button onclick="createModal('Add your card', 'Video')" class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                  </svg>
                  <span class="buttonText">Video</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Youtube, Tiktok, Twitch</p>
                </div>
              </button>
              <button onclick="createModal('Add your card', 'Music')" class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" />
                  </svg>
                  <span class="buttonText">Music | Podcast</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Spotify, SoundCloud, Prime Music, Apple Music</p>
                </div>
              </button>
              <button onclick="createModal('Add your card', 'Poll Block')"class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32z" />
                  </svg>
                  <span class="buttonText">Poll</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Create a custom Poll</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                  </svg>
                  <span class="buttonText">Link</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Create a custom Link</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                  </svg>
                  <span class="buttonText">Email</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Newsletter & Email list</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5V204.7c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7V413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3V294.7c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3V92.5c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2V152.6L392 121v89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4V354.8L256 323.2v95.9l-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1V354.8L528 323.2v90.7c0 3.2-1.9 6-4.8 7.3z" />
                  </svg>
                  <span class="buttonText">Socials</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Redirect to your social accounts</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M160 80H512c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16H490.8L388.1 178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 336H160c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16zM96 96V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                  </svg>
                  <span class="buttonText">Gallery</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Display single or multiple images</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                  <span class="buttonText">Call</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Take phone calls from your visitors</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                  </svg>
                  <span class="buttonText">Product</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Sell your products with ease</p>
                </div>
              </button>
            </div>
            <div class="rightSideColumn">
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M319.4 372c48.5-31.3 80.6-85.9 80.6-148c0-97.2-78.8-176-176-176S48 126.8 48 224c0 62.1 32.1 116.6 80.6 148c1.2 17.3 4 38 7.2 57.1l.2 1C56 395.8 0 316.5 0 224C0 100.3 100.3 0 224 0S448 100.3 448 224c0 92.5-56 171.9-136 206.1l.2-1.1c3.1-19.2 6-39.8 7.2-57zm-2.3-38.1c-1.6-5.7-3.9-11.1-7-16.2c-5.8-9.7-13.5-17-21.9-22.4c19.5-17.6 31.8-43 31.8-71.3c0-53-43-96-96-96s-96 43-96 96c0 28.3 12.3 53.8 31.8 71.3c-8.4 5.4-16.1 12.7-21.9 22.4c-3.1 5.1-5.4 10.5-7 16.2C99.8 307.5 80 268 80 224c0-79.5 64.5-144 144-144s144 64.5 144 144c0 44-19.8 83.5-50.9 109.9zM224 312c32.9 0 64 8.6 64 43.8c0 33-12.9 104.1-20.6 132.9c-5.1 19-24.5 23.4-43.4 23.4s-38.2-4.4-43.4-23.4c-7.8-28.5-20.6-99.7-20.6-132.8c0-35.1 31.1-43.8 64-43.8zm0-144a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                  </svg>
                  <span class="buttonText">Live</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Display your Live Stream preview</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                  <span class="buttonText">Exclusive</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Offer secret & Premium content</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 91.9c-11.1 0-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.7 4c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0c-2.2-.7-4.3-1.5-6.4-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V304c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.3-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V112c0-11.1-9-20.1-20.1-20.1zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z" />
                  </svg>
                  <span class="buttonText">Tipping</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Get the support you need from the fans</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
                  </svg>
                  <span class="buttonText">Map</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Share a location with Google Maps</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
                  </svg>
                  <span class="buttonText">Charts</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Show statistic and progress</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                    <path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z" />
                  </svg>
                  <span class="buttonText">Courses</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Offer a course</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                    <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z" />
                  </svg>
                  <span class="buttonText">Empty Space</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Create verticle spacing between the blocks</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                    <path d="M64 64a64 64 0 1 1 128 0A64 64 0 1 1 64 64zM25.9 233.4C29.3 191.9 64 160 105.6 160h44.8c27 0 51 13.4 65.5 34.1c-2.7 1.9-5.2 4-7.5 6.3l-64 64c-21.9 21.9-21.9 57.3 0 79.2L192 391.2V464c0 26.5-21.5 48-48 48H112c-26.5 0-48-21.5-48-48V348.3c-26.5-9.5-44.7-35.8-42.2-65.6l4.1-49.3zM448 64a64 64 0 1 1 128 0A64 64 0 1 1 448 64zM431.6 200.4c-2.3-2.3-4.9-4.4-7.5-6.3c14.5-20.7 38.6-34.1 65.5-34.1h44.8c41.6 0 76.3 31.9 79.7 73.4l4.1 49.3c2.5 29.8-15.7 56.1-42.2 65.6V464c0 26.5-21.5 48-48 48H496c-26.5 0-48-21.5-48-48V391.2l47.6-47.6c21.9-21.9 21.9-57.3 0-79.2l-64-64zM272 240v32h96V240c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l64 64c9.4 9.4 9.4 24.6 0 33.9l-64 64c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2V336H272v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2z" />
                  </svg>
                  <span class="buttonText">1:1</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Give one on one guidance</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                    <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
                  </svg>
                  <span class="buttonText">Q&A</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Answer questions asked by your visitors</p>
                </div>
              </button>
              <button disabled class="buttonTab">
                <div class="iconNText">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM229.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7L253.2 328H162.8l-5.4 10.7c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zM208 237.7L186.8 280h42.3L208 237.7zM392 256a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm24-43.9V184c0-13.3 10.7-24 24-24s24 10.7 24 24v96 48c0 13.3-10.7 24-24 24c-6.6 0-12.6-2.7-17-7c-9.4 4.5-19.9 7-31 7c-39.8 0-72-32.2-72-72s32.2-72 72-72c8.4 0 16.5 1.4 24 4.1z" />
                  </svg>
                  <span class="buttonText">ADS</span>
                </div>
                <div class="buttonSubtitle">
                  <p class="subtitleText">Earn money by displaying ADS</p>
                </div>
              </button>
            </div>
          </div>`
  modalbody.innerHTML = buttonsBlock
}

function footerButtons(previousButtonName, nextButtonName) {
  const modalContent = document.querySelector("#exampleModal .modal-content");

  // Check if a footer block already exists
  const existingFooter = modalContent.querySelector(".modal-footer");

  if (!existingFooter) {
    const footerBlock = document.createElement("div");
    footerBlock.className = "modal-footer modelFooterStyle";
    footerBlock.innerHTML = `
            <a onclick="createModal('Add your card', 'Block Types')" type="button" class="prevBtnStyle">${previousButtonName}</a>
            <button onclick="submitForm()" id="addOptionButton" type="submit" class="btn btn-primary submitBtnStyle">${nextButtonName}</button>
        `;

    modalContent.appendChild(footerBlock);
  }
}

function deleteFooter() {
  const modalContent = document.querySelector("#exampleModal .modal-content");
  const existingFooter = modalContent.querySelector(".modal-footer");

  if (existingFooter) {
    existingFooter.remove();
  }
}

