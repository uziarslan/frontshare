// var pollCardsCounter = 0;

// function createPollBlock(
//   title,
//   self_note,
//   fieldList,
//   count,
//   percentage,
//   voteAllowance,
//   id
// ) {
//   const apply = voteAllowance ? "checked" : "";
//   const applyOnCount = count ? "checked" : "";
//   const applyPercentage = percentage ? "checked" : "";
//   pollCardsCounter = 0;

//   while (document.getElementById("properties").children.length) {
//     document.getElementById("properties").children.item(0).remove();
//   }

//   document.getElementById("displayStyle").parentNode.classList.add("d-none");
//   var blockTitle = document.createElement("form");
//   blockTitle.action = `/canvas/${id}`;
//   blockTitle.method = "POST"
//   blockTitle.id = "pollBlockForm"
//   blockTitle.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
//   blockTitle.innerHTML =
//     `
// 		<h5 class="text-center">Title</h5>
// 		<input name="title" class="form-control" type="text" placeholder="Ex. This is a poll block title" id="title_content" value=""` +
//     title +
//     `" required />
//     <div class="poll-block-list-container bg-100">
//     <div class="kanban-items-container scrollbar perfect-scrollbar bg-100" style="height: 400px; max-height: 400px;">
//       <div id="poll-list-container" class="py-2">
//         <!-- Start Card -->

//         <!-- End Card -->
//       </div>
//     </div>
//     <!-- Add another card button -->
//     <div class="kanban-column-footer bg-100" id="poll-list-footer">
//       <button class="btn btn-link btn-sm btn-block text-decoration-none text-600" type="button" onclick="addPollCard('')">
//         <span class="fas fa-plus mr-2"></span>Add a poll option
//       </button>
//     </div>
// </div>
// <div class="needs-validation p-2 mb-4 mt-4">
//     <h5 class="text-center">Select options:</h5>
//     <div class="align-items-end d-flex">
//       <input name="count" class="form-control w-auto mr-2" type="checkbox" id="totalCount" required />
//       <label for="totalCount">Show Count</label>
//     </div>

//     <div class="align-items-end d-flex">
//       <input name="percentage" class="form-control w-auto mr-2" type="checkbox" id="percentage" required />
//       <label for="percentage">Show Percentage</label>
//     </div>
// </div>
// <div class="needs-validation p-2 mb-4 mt-4">
//     <h5 class="text-center">Toggle for Vote Allowance:</h5>
//     <div class="custom-control custom-switch">
//       <input name="voteAllowance" class="custom-control-input" data-target="first-list-container" data-toggle="tooltip" data-placement="left" title="Visibility" type="checkbox" id="voteToggle" />
//       <label class="custom-control-label" for="voteToggle">
//         Vote unlocked/Vote locked
//         <span class="fs--2 ml-1 text-primary" data-toggle="tooltip" data-placement="top" title="If locked: Visitors can only vote 1 time and cannot change their votes.\n If unlocked: Visitors can change their vote and it will recalculate the percentage on all results.">
//           <span class="fas fa-question-circle">
//           </span>
//         </span>
//       </label>
//     </div>
// </div>
// <div class="needs-validation p-2 mb-4 mt-4">
//     <h5 class="text-center">Note to self</h5>
//     <input name="self_note" class="form-control" type="text" placeholder="Ex. This is a funny video" id="self_note" required />
// </div>

// 	`;

//   // var pollBlockContainer = document.createElement("div");
//   // pollBlockContainer.classList.add("poll-block-list-container", "bg-100");
//   // blockTitle.innerHTML = `
//   //       <div class="kanban-items-container scrollbar perfect-scrollbar bg-100"
//   //           style="height: 400px; max-height: 400px;">
//   //           <div id="poll-list-container" class="py-2">
//   //               <!-- Start Card -->

//   //               <!-- End Card -->
//   //           </div>
//   //       </div>
//   //       <!-- Add another card button -->
//   //       <div class="kanban-column-footer bg-100" id="poll-list-footer">
//   //           <button class="btn btn-link btn-sm btn-block text-decoration-none text-600" type="button" onclick="addPollCard('')">
//   //               <span class="fas fa-plus mr-2"></span>Add a poll option
//   //           </button>
//   //       </div>
//   //   `;

//   // var checkboxInput = document.createElement("div");
//   // checkboxInput.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
//   // blockTitle.innerHTML = `
//   //       <h5 class="text-center">Select options:</h5>
//   //       <div class="align-items-end d-flex">
//   //          <input class="form-control w-auto mr-2" type="checkbox"  id="totalCount" ${applyOnCount} value="count" required />
//   //         <label for="totalCount">Show Count</label>
//   //       </div>

//   //       <div class="align-items-end d-flex">
//   //         <input class="form-control w-auto mr-2" type="checkbox" id="percentage" ${applyPercentage} value="percentage" required />
//   //         <label for="percentage">Show Percentage</label>
//   //       </div>
//   //     `;

//   // var voteAllowance = document.createElement("div");
//   // voteAllowance.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
//   // blockTitle.innerHTML = `
//   //         <h5 class="text-center">Toggle for Vote Allowance:</h5>
//   //         <div class="custom-control custom-switch">
//   //           <input class="custom-control-input" data-target="first-list-container" data-toggle="tooltip" data-placement="left" title="Visibility" type="checkbox" ${apply} id="voteToggle" />
//   //           <label class="custom-control-label" for="voteToggle">
//   //             Vote unlocked/Vote locked
//   //             <span class="fs--2 ml-1 text-primary" data-toggle="tooltip" data-placement="top"
//   //               title="If locked: Visitors can only vote 1 time and cannot change their votes.\n If unlocked: Visitors can change their vote and it will recalculate the percentage on all results.">
//   //               <span class="fas fa-question-circle">
//   //               </span>
//   //             </span>
//   //           </label>
//   //         </div>
//   //       `;

//   // var selfNoteInput = document.createElement("div");
//   // selfNoteInput.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
//   // blockTitle.innerHTML =
//   //   `
//   //         <h5 class="text-center">Note to self</h5>
//   //         <input class="form-control" type="text" placeholder="Ex. This is a funny video" id="self_note" value="` +
//   //   self_note +
//   //   `" required />
//   //     `;

//   document.getElementById("displayStyle").parentNode.classList.add("d-none");
//   document.getElementById("properties").appendChild(blockTitle);
//   // document.getElementById("properties").appendChild(pollBlockContainer);
//   // document.getElementById("properties").appendChild(checkboxInput);
//   // document.getElementById("properties").appendChild(voteAllowance);
//   // document.getElementById("properties").appendChild(selfNoteInput);
//   document.getElementById("properties").parentNode.classList.remove("d-none");

//   if (fieldList && fieldList.children && fieldList.children.length) {
//     pollCardsCounter = fieldList.children.length;

//     for (i = 0; i < fieldList.children.length; i++) {
//       const child = fieldList.children[i];
//       addPollCard(child.value, child.getAttribute("count"));
//     }
//   }
// }

// function addPollCard(option, count) {
//   var element = document.createElement("div");
//   element.classList.add("kanban-item", "kanban-item-card", "my-3");
//   element.id = `card-${pollCardsCounter}`;
//   element.innerHTML = `
//       <div class="row align-items-center">
//         <div class="col-auto p-0 ml-3">
//           <button class="btn btn-sm btn-default bg-none rounded-right-0" onclick="moveCard(this)" data-card-id="${pollCardsCounter}">
//             <i class="fas fa-arrows-alt-v"></i> <!-- This is the trash bin icon -->
//           </button>
//         </div>
//         <div class="col p-0">
//           <input type="text" class="form-control rounded-left-0 rounded-right-0 border-0 bg-200 pl-2 pr-0" name="poll_list" placeholder="Enter poll option here...">
//         </div>
//         <div class="col-auto p-0 mr-3">
//           <button class="btn bg-danger text-white delete-poll-card rounded-left-0 px-2" data-card-id="${pollCardsCounter}" onclick="removePollCard(this)">
//             <i class="fas fa-trash-alt"></i> <!-- This is the trash bin icon -->
//           </button>
//         </div>
//       </div>
//   `;

//   document.getElementById("poll-list-container").append(element);
//   pollCardsCounter++;
// }

// function removePollCard(selfElement) {
//   const cardId = selfElement.getAttribute("data-card-id");
//   const cardElement = document.getElementById(`card-${cardId}`);
//   if (cardElement) {
//     cardElement.remove();
//   }
// }

// function moveCard(selfElement) {
//   const cardId = selfElement.getAttribute("data-card-id");
//   const cardElement = document.getElementById(`card-${cardId}`);

//   if (document.getElementById("poll-list-container")) {
//     const children = document.getElementById("poll-list-container").children;

//     if (children.length && children.length > 1) {
//       // Ensure there's more than one card to move
//       const childrenArray = Array.from(children);

//       const cardIndex = childrenArray.findIndex(
//         (card) => card.id === cardElement.id
//       );

//       if (cardIndex === 0) {
//         // If the card is already at the top
//         // Move the card to the end in the array
//         const lastIndex = childrenArray.length - 1;
//         const lastElement = childrenArray[lastIndex];

//         // Move all other cards up
//         childrenArray.splice(0, 1);
//         childrenArray.push(cardElement);

//         // Move the card in the DOM
//         lastElement.after(cardElement);
//       } else if (cardIndex > 0) {
//         // If the card is not already at the top
//         // Move the card up in the array
//         const newIndex = cardIndex - 1;

//         // Move the card in the DOM
//         childrenArray[newIndex].before(cardElement);

//         // Update the array to reflect the new order
//         childrenArray.splice(cardIndex, 1);
//         childrenArray.splice(newIndex, 0, cardElement);
//       }
//     }
//   }
// }

// function addOption() {
//   const pollScreen = document.getElementById('pollScreen');

//   // Define the HTML structure as a string
//   const inputGroupHTML = `
//   <div class="input-group mb-3">
//     <span class="input-group-text arrowStyle" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">

//         <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
//         <style>
//           svg {
//             fill: #ffffff
//           }

//         </style>
//         <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z" />
//       </svg></span>
//     <input name=poll_list[value] type="text" class="form-control inputStyle" placeholder="Enter poll option here..." aria-label="polloption" aria-describedby="basic-addon1">



//     <span class="input-group-text deleteBtnPoll" onclick="removeOption(this)"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">

//         <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
//         <style>
//           svg {
//             fill: #ffffff
//           }

//         </style>
//         <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
//       </svg></span>

//   </div>

//   `;

//   // Insert the HTML as innerHTML of the pollScreen div
//   pollScreen.innerHTML += inputGroupHTML;
// }

// function removeOption(button) {
//   // Get the parent element of the delete button (the entire input group)
//   const inputGroup = button.parentElement;

//   // Remove the input group from the pollScreen
//   const pollScreen = document.getElementById('pollScreen');
//   pollScreen.removeChild(inputGroup);
// }

// // document.getElementById("nextBtn").addEventListener("click", function () {
// //   const form = document.getElementById("pollBlockForm")
// //   form.submit()
// // })

// function submitForm(user_id) {
//   document.getElementById("nextBtn").addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get form data
//     const form = document.getElementById("pollBlockForm");
//     const formData = new FormData(form);

//     // Convert form data to a JSON object
//     const formDataJSON = {};
//     formData.forEach((value, key) => {
//       if (key === "poll_list") {
//         // Check if the key is "poll_list" and initialize it as an array if not already
//         if (!formDataJSON[key]) {
//           formDataJSON[key] = [value];
//         } else {
//           formDataJSON[key].push(value);
//         }
//       } else {
//         // For other keys, assign the value directly
//         formDataJSON[key] = value;
//       }
//     });
//     // Define the server URL where you want to send the POST request
//     const serverURL = `/canvas/${user_id}`;

//     // Send a POST request to the server with JSON data
//     fetch(serverURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formDataJSON)
//     })
//       .then(response => {
//         if (response.ok) {
//           // Handle a successful response
//           console.log("POST request was successful");
//           // You can perform additional actions here if needed
//         } else {
//           // Handle an error response
//           console.error("POST request failed");
//         }
//       })
//       .catch(error => {
//         // Handle network errors or other issues
//         console.error("An error occurred:", error);
//       });
//   });
// }


// /*

// //////////////////////////////////////////////////
// ///   you can use content below for the block  ///
// ///    It contains a Kanban that you can use   ///
// //////////////////////////////////////////////////

// <div class="kanban-column col-lg-12 my-1 px-1" id="social-list">
//     <div class="kanban-column-header bg-100" id="social-list-header">
//         <div class="col-12 p-0 mb-3">
//             <label for="">Title</label>
//             <input class="form-control pl-2" type="text" placeholder="Ex: What is the best programming language?">
//         </div>
//     </div>
//     <div class="kanban-items-container scrollbar perfect-scrollbar bg-100" id="social-list-container"
//         style="height: 400px; max-height: 400px;">
//         <!-- Start Card -->

//         <!-- End Card -->
//     </div>
//     <!-- Add another card button -->
//     <div class="kanban-column-footer bg-100" id="social-list-footer">
//         <button class="btn btn-link btn-sm btn-block text-decoration-none text-600" type="button" onclick="">
//             <span class="fas fa-plus mr-2"></span>Add a Social link
//         </button>
//     </div>
// </div>

// <script>
//     $(document).ready(function() {
//         // Counter to generate unique IDs for the cards
//         let cardCounter = 1;

//     // Function to add a card to the kanban column
//     function addSocialCard(social) {
//         const cardHtml = `
//     <div class="kanban-item kanban-item-card" id="card-${cardCounter}">
//         <div class="row align-items-center">
//             <div class="col-auto p-0 ml-3">
//                 <button class="btn btn-sm btn-default bg-none rounded-right-0" data-card-id="${cardCounter}">
//                     <i class="fas fa-arrows-alt-v"></i> <!-- This is the trash bin icon -->
//                 </button>
//             </div>
//             <div class="col p-0">
//                 <input type="text" class="form-control rounded-left-0 rounded-right-0 border-0 bg-200 pl-2 pr-0" name="social" value="${social}" placeholder="Enter social link...">
//             </div>
//             <div class="col-auto p-0 mr-3">
//                 <button class="btn bg-danger text-white delete-card rounded-left-0 px-2" data-card-id="${cardCounter}">
//                     <i class="fas fa-trash-alt"></i> <!-- This is the trash bin icon -->
//                 </button>
//             </div>
//         </div>
//     </div>
//     `;

//     // Append the new card to the kanban column
//     $("#social-list-container").append(cardHtml);

//     // Increment the card counter
//     cardCounter++;
//     }

//     // Event handler for the "Add a Social link" button
//     $("#social-list-footer button").click(function() {
//         addSocialCard("");
//     });

//     // Event handler to delete a card
//     $(document).on("click", ".delete-card", function() {
//         const cardId = $(this).data("card-id");
//     $(`#card-${cardId}`).remove();
//     });

//     var i = 0;
//     for (i = 0 ; i < user.social_list.length ; i ++) {
//         addSocialCard(user.social_list[i]);
//     }
//     });
// </script>

// */

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".cardScreen");

draggables.forEach((task) => {
  // Add event listeners for both mouse and touch events
  task.addEventListener("dragstart", onDragStart);
  task.addEventListener("touchstart", onTouchStart);
  task.addEventListener("dragend", onDragEnd);
  task.addEventListener("touchend", onTouchEnd);
});

droppables.forEach((zone) => {
  // Add event listeners for both mouse and touch events
  zone.addEventListener("dragover", onDragOver);
  zone.addEventListener("touchmove", onTouchMove);
});

function onDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("is-dragging");
}

function onTouchStart(e) {
  e.preventDefault(); // Prevent the default touch action
  e.target.classList.add("is-dragging");
}

function onDragEnd(e) {
  e.target.classList.remove("is-dragging");
}

function onTouchEnd(e) {
  e.target.classList.remove("is-dragging");
}

function onDragOver(e) {
  e.preventDefault();
  if (!this.classList.contains("disabled")) {
    const bottomTask = insertAboveTask(this, e.clientY);
    const curTask = document.querySelector(".is-dragging");
    if (!bottomTask) {
      this.appendChild(curTask);
    } else {
      this.insertBefore(curTask, bottomTask);
    }
  }
}

function onTouchMove(e) {
  e.preventDefault();
  if (!this.classList.contains("disabled")) {
    const touch = e.touches[0];
    const bottomTask = insertAboveTask(this, touch.clientY);
    const curTask = document.querySelector(".is-dragging");
    if (!bottomTask) {
      this.appendChild(curTask);
    } else {
      this.insertBefore(curTask, bottomTask);
    }
  }
}

function insertAboveTask(zone, mouseY) {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });
  return closestTask;
}

