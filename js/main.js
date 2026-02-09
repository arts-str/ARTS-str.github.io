
const contextMenu = document.getElementById('context-menu');


let topZ = 1;

function bringToFront(el) {
    el.style.zIndex = ++topZ;
}
