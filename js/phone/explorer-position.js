
window.addEventListener("resize", () => {
    if (isIOSMode()) {
        resetExplorersForIOS();
    }
});
function resetExplorersForIOS() {
    const explorers = document.querySelectorAll('.explorer');

    explorers.forEach(el => {
        el.style.left = "";
        el.style.top = "";

        // 🔥 this is the important part
        el.style.width = "";
        el.style.height = "";
    });
}
