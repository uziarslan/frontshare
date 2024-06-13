function createTextContent(content, self_note) {
  while (document.getElementById("properties").children.length) {
    document.getElementById("properties").children.item(0).remove();
  }
  var text_content = document.createElement("div");
  text_content.classList.add("p-2", "mb-2");
  text_content.innerHTML = `
    <textarea id="text_content" name="text_content" class="form-control tinymce d-none" data-tinymce="data-tinymce" rows="4" placeholder="Input your text."></textarea>
  `;

  var selfNoteInput = document.createElement("form");
  selfNoteInput.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
  selfNoteInput.innerHTML =
    `
		<h5 class="text-center">Note to self</h5>
		<input class="form-control" type="text" placeholder="Ex. This is a funny text" id="self_note" value="` +
    self_note +
    `" required />
	`;

  document.getElementById("displayStyle").parentNode.classList.add("d-none");
  document.getElementById("properties").appendChild(text_content);
  document.getElementById("properties").appendChild(selfNoteInput);

  window.tinymce.remove();
  tinymceInitCustomize();
  document.getElementById("text_content").value = content;
  document.getElementById("properties").parentNode.classList.remove("d-none");
}

function tinymceInitCustomize() {
  var tinymces = $(".tinymce");
  if (tinymces.length) {
    window.tinymce.init({
      selector: ".tinymce",
      height: "50vh",
      menubar: false,
      skin: utils.settings.tinymce.theme,
      images_upload_url: "postAcceptor.php",
      automatic_uploads: false,
      block_unsupported_drop: false,
      file_picker_types: "file image media",
      content_style: ".mce-content-body { color: " + utils.grays.black + " }",
      mobile: {
        theme: "mobile",
        toolbar: ["undo", "bold"],
      },
      statusbar: false,
      plugins: "lists,textcolor",
      toolbar: "bold italic underline | bullist numlist | forecolor backcolor",
      textcolor_map: [
        "000000",
        "Black",
        "993300",
        "Burnt orange",
        "333300",
        "Dark olive",
        "003300",
        "Dark green",
        "003366",
        "Dark azure",
        "000080",
        "Navy Blue",
        "333399",
        "Indigo",
        "333333",
        "Very dark gray",
        "800000",
        "Maroon",
        "FF6600",
        "Orange",
        "808000",
        "Olive",
        "008000",
        "Green",
        "008080",
        "Teal",
        "0000FF",
        "Blue",
        "666699",
        "Grayish blue",
        "808080",
        "Gray",
        "FF0000",
        "Red",
        "FF9900",
        "Amber",
        "99CC00",
        "Yellow green",
        "339966",
        "Sea green",
        "33CCCC",
        "Turquoise",
        "3366FF",
        "Royal blue",
        "800080",
        "Purple",
        "999999",
        "Medium gray",
        "FF00FF",
        "Magenta",
        "FFCC00",
        "Gold",
        "FFFF00",
        "Yellow",
        "00FF00",
        "Lime",
        "00FFFF",
        "Aqua",
        "00CCFF",
        "Sky blue",
        "993366",
        "Red violet",
        "FFFFFF",
        "White",
        "FF99CC",
        "Pink",
        "FFCC99",
        "Peach",
        "FFFF99",
        "Light yellow",
        "CCFFCC",
        "Pale green",
        "CCFFFF",
        "Pale cyan",
        "99CCFF",
        "Light sky blue",
        "CC99FF",
        "Plum",
      ],
    });
  }
}
