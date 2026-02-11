const isIOSMode = () => window.matchMedia("(max-width: 500px)").matches;


const contextMenu = document.getElementById('context-menu');


let topZ = 1;

function bringToFront(el) {
    el.style.zIndex = ++topZ;
}
