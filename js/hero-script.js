const heroContainer = document.getElementById('hero-section');
const homeAnchors = document.getElementById('home-anchors');
const heroFwd = document.getElementById('hero-next');
const heroBck = document.getElementById('hero-back');
let heroSrollInterval, heroScrollDebounce;

/**Cuando carga el JSON agregar las tarjetas de proyecto con los datos del JSON */
fetchURL('assets/hero.json').then(heroProjects => {
    heroProjects.projects.forEach((heroProject, index) => {
        heroContainer.innerHTML += returnHeroCard(heroProject, index);
    });

    homeAnchors.innerHTML += returnAnchors(heroProjects.projects);

}).then(() => {
    handleHeroAnchors();
    autoscrollHero();
    console.log(homeAnchors);
    
    for (const anchor of homeAnchors.children) {
        anchor.onclick = () => {
            clearTimeout(heroScrollDebounce);
            clearInterval(heroSrollInterval);
            heroScrollDebounce = setTimeout(() => {
                autoscrollHero();
            }, 5000);
        }
    }
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
        `<img draggable="false" style='${heroProject.injectedStyle}' src='assets/img/${heroProject.assetURL}' alt=""></img>` : `<video draggable="false" style='${heroProject.injectedStyle}' autoplay muted loop playsinline src='assets/img/${heroProject.assetURL}'></video>`;

    return `
    <section class="hero-card" id="hero-${index}">
        <div class="hero-background">
            ${media}
        </div>
                <div style="color:${heroProject.color}; border: 1px dashed ${heroProject.color};" class="hero-content" >
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
        anchors.push(`<a class="hero-anchor" href="#hero-${index}" data-section="hero-${index}">&bull;</a>`);
    })
    return anchors.join('');
}


function handleHeroAnchors() {
    const images = document.querySelectorAll(".hero-card");
    const heroAnchors = document.querySelectorAll(".hero-anchor");

    const heroObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    heroAnchors.forEach(anchor => {
                        if (anchor.dataset.section === id) {
                        }
                        anchor.classList.toggle(
                            "active-gallery-anchor",
                            anchor.dataset.section === id
                        );
                    });
                }
            });
        },
        { threshold: 0.9 }
    );


    images.forEach(section => heroObserver.observe(section));


}

heroContainer.ontouchmove = () => {
    clearTimeout(heroScrollDebounce);
    clearInterval(heroSrollInterval);
}
heroContainer.ontouchstart = () => {
    clearTimeout(heroScrollDebounce);
    clearInterval(heroSrollInterval);
}
heroContainer.onclick = () => {
    clearTimeout(heroScrollDebounce);
    clearInterval(heroSrollInterval);
    heroScrollDebounce = setTimeout(() => {
        autoscrollHero();
    }, 5000);
}
heroContainer.ontouchend = () => {
    heroScrollDebounce = setTimeout(() => {
        autoscrollHero();
    }, 5000);
}

heroFwd.onclick = (e) => {
    clearTimeout(heroScrollDebounce);
    heroContainer.scrollBy({ top: 0, left: heroContainer.children[0].clientWidth, behaviour: "smooth" });
    clearInterval(heroSrollInterval);
    heroScrollDebounce = setTimeout(() => {
        autoscrollHero();
    }, 5000);

};
heroBck.onclick = (e) => {
    clearTimeout(heroScrollDebounce);
    heroContainer.scrollBy({ top: 0, left: -heroContainer.children[0].clientWidth, behaviour: "smooth" });
    clearInterval(heroSrollInterval);
    heroScrollDebounce = setTimeout(() => {
        autoscrollHero();
    }, 5000);
};
function autoscrollHero() {
    heroSrollInterval = setInterval(() => {
        if (heroContainer.scrollLeft < heroContainer.scrollWidth - heroContainer.clientWidth) {
            heroContainer.scrollBy({ top: 0, left: heroContainer.children[0].clientWidth, behaviour: "smooth" })

        } else {
            heroContainer.scrollTo({ top: 0, left: 0, behaviour: "smooth" })

        }
    }, 3000);
}