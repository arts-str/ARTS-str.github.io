const heroContainer = document.getElementById('hero-section');
const homeAnchors = document.getElementById('home-anchors');

/**Cuando carga el JSON agregar las tarjetas de proyecto con los datos del JSON */
fetchURL('assets/hero.json').then(heroProjects => {
    heroProjects.projects.forEach((heroProject, index) => {
        heroContainer.innerHTML += returnHeroCard(heroProject, index);
    });

    console.log(heroProjects);

    homeAnchors.innerHTML += returnAnchors(heroProjects.projects);
});


/**Devolver el HTML de una tarjeta HERO
 * @param Object heroProject
 * @property title
 * @property assetURL
 * @property description
 */
function returnHeroCard(heroProject, index) {
    const imgTypes = ["png", "jpg"]; //Tipos de imagen
    //Si el tipo de archivo es imagen, insertar un img tag, si es video, un video tag
    const media = imgTypes.includes(heroProject.assetURL.slice(heroProject.assetURL.length - 3)) ?  //Chequea los ultimos tres caracteres de la url y los compara con el array de imgTypes
        `<img style='${heroProject.injectedStyle}' src='assets/img/${heroProject.assetURL}' alt=""></img>` : `<video style='${heroProject.injectedStyle}' autoplay muted loop playsinline src='assets/img/${heroProject.assetURL}'></video>`;

    return `
    <section class="hero-card" id="${index}">
        <div class="hero-background">
            ${media}
        </div>
                <div style="color:${heroProject.color}" class="hero-content">
                    <h1>${heroProject.title}</h1>
                    <p>${heroProject.description}</p>
                    <a href='${heroProject.href}' class="hero-engage">Ver más</a>
                </div>

            </section>
    `
}

function returnAnchors(heroProjects) {
    let anchors = [];
    heroProjects.forEach((e, index) => {
        anchors.push(`<a class="gallery-anchor" href="#${index}" data-section="${index}">&bull;</a>`);
    })
    return anchors.join('');
}