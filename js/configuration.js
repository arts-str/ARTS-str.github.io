const configExplorer = document.getElementById('configuration');
const screensaverInput = document.getElementById('screensaver-input');
const currentScreensaver = document.getElementById('current-screensaver');
const READER = new FileReader(); //Lector de archivos
const configButton = document.getElementById('config');
dragElement(configExplorer);

configExplorer.querySelector('.explorer-close')
    .addEventListener('mousedown', e => e.stopPropagation());
configExplorer.querySelector('.explorer-aside-list')
    .addEventListener('mousedown', e => {
        const item = e.target.closest('.explorer-aside-section-item');
        item.classList.add('active');

    });
configExplorer.querySelector('.explorer-close')
    .addEventListener('click', () => {
        configExplorer.style.visibility = 'hidden';
    });
configExplorer.querySelector('.explorer-restore')
    .addEventListener('click', () => {
        configExplorer.classList.toggle('explorer-max');
    });
contextMenu.querySelector('#context-config')
    .addEventListener('mousedown', e => e.stopPropagation());
contextMenu.querySelector('#context-config')
    .addEventListener('click', () => {
        configExplorer.style.visibility = 'visible';
        configExplorer.style.zIndex = topZ + 1;
        contextMenu.classList.toggle('inactive');
    });
configButton.addEventListener('mousedown', e => e.stopPropagation());
configButton.addEventListener('click', () => {
    configExplorer.style.visibility = 'visible';
    configExplorer.style.zIndex = topZ + 1;
});

window.onload = async () => {
    const savedImage = await loadImageFromDB('image-loaded'); //Buscamos una imagen previa en IndexerDB
    if (savedImage) { //Si existe
        document.body.style.backgroundImage = 'url(' + savedImage + ')';
        currentScreensaver.src = savedImage;
    }

}

screensaverInput.oninput = (e) => {
    const file = screensaverInput.files[0]; //Tomamos el archivo
    if (!file) return; //Si cancela la operación salimos de la funcion
    console.log(e, file);

    READER.onload = async (e) => { //Al cargar el lector
        console.log(e.target.result);
        document.body.style.backgroundImage = 'url(' + e.target.result + ')';
        currentScreensaver.src = e.target.result;
        await saveImageToDB('image-loaded', e.target.result); //Se guarda con IndexerDB para mantener la imagen entre sesiones
    }

    READER.readAsDataURL(file); //Leer la imagen con el lector y pasarla a base64


}

configExplorer.onmousedown = () => {
    bringToFront(configExplorer);
}
