
// Get the modal
var modal = document.getElementById("popup-modal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.search = "";
  }
}

function returnModal(project) {
  const anchors = returnGallery(project).join("");
  const media = returnMedia(project).join("");

  return `
      <fieldset style="color:${project.color}; border: 1px solid ${project.color}" class="modal-content">
        <legend style="color:${project.color}">${project.title}</legend>
        <span style="color:${project.color}" class="close">&times;</span>
        <div class="modal-carousel">
          <div class="modal-gallery">
              ${media}
          </div>
          <div class="gallery-anchors">
            ${anchors}
          </div>
        </div>
        <p>${project.description}</p>
      </div>
      `
}

function returnMedia(project) {
  const imgTypes = ["png", "jpg"]; //Tipos de imagen
  //Si el tipo de archivo es imagen, insertar un img tag, si es video, un video tag
  let media = [];
  project.gallery.forEach((mediaElement, index) => {
    let isImage = imgTypes.includes(mediaElement.slice(mediaElement.length - 3));
    let mediaHtml = isImage ? `<img draggable="false" id="${index}" src="assets/img/${mediaElement}" alt=""></img>` : `<video draggable="false" id="${index}" autoplay muted loop playsinline> <source src="assets/img/${mediaElement}"> </video>`
    media.push(mediaHtml);
  });
  return media;
}

function returnGallery(project) {
  let anchors = [];
  project.gallery.forEach((e, index) => {
    anchors.push(`<a class="gallery-anchor" href="#${index}" data-section="${index}">&bull;</a>`);
  })
  return anchors;
}

