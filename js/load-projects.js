const projectsContainer = document.getElementById('projects');

/**Cuando carga el JSON agregar las tarjetas de proyecto con los datos del JSON */
fetchURL('assets/projects.json').then(projects => {
  projects.projects.forEach((project, index) => {
    projectsContainer.innerHTML += returnCard(project, index);
  });
  if (isOneLoaded) {
    isAllLoaded = true;
    initControls();
  }else{
    isOneLoaded = true;
  }
});
