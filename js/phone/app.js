fetchURL("json/projectsInfo.json").then(projects => {
    for (let i = 0; i < projects.projects.length; i++) {
        const app = createApp(projects.projects[i], i);
        main.appendChild(app);
    }
});


function createApp(project, i) {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="app-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.75 53.99">
                <g>
                    <path fill="#1392d1"
                        d="M59.37,5.04h-30.84c-2.03-.42-3.37-1.18-4.22-1.8-1.33-.97-2.06-2.03-3.85-2.74-.81-.32-1.52-.44-1.97-.49H5.2c-.35,0-2.19.03-3.68,1.52-.94.94-1.52,2.24-1.52,3.68v43.58c0,2.87,2.33,5.2,5.2,5.2h54.17c2.87,0,5.2-2.33,5.2-5.2V10.24c0-2.87-2.33-5.2-5.2-5.2Z" />
                    <rect fill="#76d1fb" y="8.76" width="64.75" height="45.22" rx="5.2" ry="5.2" />
                </g>
            </svg>
        </div>
            <p class="app-label">${project.title}</p>`
    element.setAttribute('id', i);
    element.setAttribute('class', "app");
    return element;
}