const projectsContainer = document.getElementById('projects');

fetchURL('assets/projects.json').then(projects => {
    projects.projects.forEach((project, index) => {
        projectsContainer.innerHTML += returnCard(project, index);
    });

    // Wire up click-to-open-modal on each card.
    // Clicks on <a> tags inside the description pass through normally.
    projectsContainer.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Let description links open normally
            if (e.target.closest('section a')) return;
            // Let the media <a> handle its own href (project page / external)
            // but if it points to the modal pattern (?N), intercept it
            const projectIndex = card.dataset.projectIndex;
            if (projectIndex === undefined) return;

            e.preventDefault();
            modal.innerHTML = returnModal(projects.projects[Number(projectIndex)]);

            const span = modal.querySelector('.close');
            span.onclick = () => {
                modal.style.display = 'none';
            };

            modal.style.display = 'block';
            requestAnimationFrame(() => { initModalGallery(); });
        });
    });

    if (isOneLoaded) {
        isAllLoaded = true;
        initControls();
    } else {
        isOneLoaded = true;
    }
});
