function initControls() {
    
    const nextControl = document.querySelectorAll('.next');
    for (const control of nextControl) {
        control.onclick = (e) =>{
            e.preventDefault(); // important for anchors
            const scrollParent = e.target.parentElement.previousElementSibling;
            scrollParent.scrollBy({top: 0, left: 632, behavior: "smooth",});
        }
    }
    

    const prevControl = document.querySelectorAll('.prev');
    for (const control of prevControl) {
        control.onclick = (e) =>{
            e.preventDefault(); // important for anchors
            const scrollParent = e.target.parentElement.previousElementSibling;
            scrollParent.scrollBy({top: 0, left: -632, behavior: "smooth",});
        }
    }
    

}


