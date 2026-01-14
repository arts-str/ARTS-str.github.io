/**Cuando carga el JSON agregar las tarjetas de proyecto con los datos del JSON */
fetchURL('assets/projects.json').then(projects => {
    if (window.location.search !== "") {
        modal.innerHTML = returnModal(projects.projects[Number(window.location.search.substring(1))]);
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            window.location.search = "";
        }
        
        modal.style.display = "block";
        
    }
    setTimeout(() => {
        handleGalleryAnchors();
    }, 500);
});