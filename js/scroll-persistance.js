if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

/**Guardar scroll */
window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollpos", window.scrollY);
});

/**Guardar scroll Safari*/
window.addEventListener("pagehide", () => {
    sessionStorage.setItem("scrollpos", window.scrollY);
});

//**Restaural la posicion del scroll instantaneamente */
function restoreScroll() {
    const scrollpos = sessionStorage.getItem("scrollpos"); //Tomar la posicion guardada
    if (!scrollpos) return; //Si no existe salir de la funcion

    const y = parseInt(scrollpos, 10); //Tomar el valor en string y lo hace int
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; //Calcular la posicion maxima de scroll

    if (maxScroll >= y) { //Si el valor guardado es menor al valor maximo posible
        //Desactivar temporalmente el scroll suave
        const html = document.documentElement;
        const previous = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";

        window.scrollTo(0, y); //Ir a la posicion

        //Restaurar el scroll suave
        html.style.scrollBehavior = previous;
    } else { //Si el valor es mayor que el maximo posible
        requestAnimationFrame(restoreScroll); //Reintentar
    }
}

restoreScroll(); //Llamar la funcion
