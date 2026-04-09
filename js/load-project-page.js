fetchURL('assets/projects.json').then(projects => {
    if (window.location.search !== "") {
        modal.innerHTML = returnModal(projects.projects[Number(window.location.search.substring(1))]);

        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
            window.location.search = "";
        }

        modal.style.display = "block";

        // Init gallery controls after DOM is ready
        requestAnimationFrame(() => {
            initModalGallery();
        });
    }
});
