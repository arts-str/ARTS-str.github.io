/**Fetch al JSON
 * @params url
*/
const fetchURL = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/**Devolver el HTML de una tarjeta
 * @param Object project
 * @property title
 * @property assetURL
 * @property description
 */
function returnCard(project, index) {
    const imgTypes = ["png", "jpg"]; //Tipos de imagen
    //Si el tipo de archivo es imagen, insertar un img tag, si es video, un video tag
    const media = imgTypes.includes(project.assetURL.slice(project.assetURL.length - 3)) ?  //Chequea los ultimos tres caracteres de la url y los compara con el array de imgTypes
        `<a href='${project.href}'><img style='${project.injectedStyle}' src='assets/img/${project.assetURL}' alt=""></img></a>` : `<a href='${project.href}'><video style='${project.injectedStyle}' autoplay muted loop playsinline src='assets/img/${project.assetURL}'></video></a>`;
    
    return `
    <fieldset class="project-card" style="border: 1px solid ${project.color}">
        <legend style="color:${project.color}">${project.title}</legend>
        ${media}
        <section>
            <p style="color:${project.color}">${project.description}</p>
        </section>
    </fieldset>
    `
}