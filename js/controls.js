function initControls() {
    
    const nextControl = document.querySelectorAll('.next');
    for (const control of nextControl) {
        control.onclick = (e) =>{
            e.preventDefault(); // important for anchors
            const scrollParent = e.target.parentElement.previousElementSibling;
            const scrollParentChild = e.target.parentElement.previousElementSibling.children[0];            
            scrollParent.scrollBy({top: 0, left: scrollParentChild.clientWidth + convertRemToPixels(3), behavior: "smooth",});
        }
    }
    

    const prevControl = document.querySelectorAll('.prev');
    for (const control of prevControl) {
        control.onclick = (e) =>{
            e.preventDefault(); // important for anchors
            const scrollParent = e.target.parentElement.previousElementSibling;
            const scrollParentChild = e.target.parentElement.previousElementSibling.children[0];            
            scrollParent.scrollBy({top: 0, left: -(scrollParentChild.clientWidth + convertRemToPixels(3)), behavior: "smooth",});
        }
    }
    

}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
