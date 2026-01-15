const toolsContainer = document.getElementById('web');

/**Cuando carga el JSON agregar las tarjetas de proyecto con los datos del JSON */
fetchURL('assets/web.json').then(tools => {
  tools.projects.forEach((tool, index) => {
    toolsContainer.innerHTML += returnCard(tool, index);
  });
  if (isOneLoaded) {
    isAllLoaded = true;
    initControls();
  }else{
    isOneLoaded = true;
  }
});

