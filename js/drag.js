function dragElement(elmnt) {
    let dragGroup = [];
    let startPositions = [];

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let moved = false;
    const DRAG_THRESHOLD = 5;

    const dragTarget = document.getElementById(elmnt.id + "-header") || elmnt;
    dragTarget.addEventListener("pointerdown", dragPointerDown);


    function dragPointerDown(e) {
        // e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        moved = false;

        if (elmnt.classList.contains('folder') && elmnt.classList.contains('selected')) {
            dragGroup = Array.from(document.querySelectorAll('.folder.selected'));
        } else {
            dragGroup = [elmnt];
        }

        startPositions = dragGroup.map(el => ({
            el,
            left: el.offsetLeft,
            top: el.offsetTop
        }));

        document.addEventListener("pointermove", elementDrag);
        document.addEventListener("pointerup", closeDragElement);

    }




    function elementDrag(e) {
        if (isIOSMode()) return; // 🚫 movement disabled in iOS

        e.preventDefault();

        const dx = e.clientX - pos3;
        const dy = e.clientY - pos4;

        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            moved = true;
        }

        pos3 = e.clientX;
        pos4 = e.clientY;

        startPositions.forEach(item => {
            item.el.style.left = (item.el.offsetLeft + dx) + "px";
            item.el.style.top = (item.el.offsetTop + dy) + "px";
        });
    }



    function closeDragElement() {
        document.removeEventListener("pointermove", elementDrag);
        document.removeEventListener("pointerup", closeDragElement);

        dragGroup.forEach(el => {
            if (el.classList.contains("folder")) {
                localStorage.setItem(
                    'folder-data' + el.id,
                    JSON.stringify({
                        x: el.style.left,
                        y: el.style.top
                    })
                );
            }
        });
        // Only open explorer if it was a click (not a drag) on a single folder
        if (
            dragGroup.length === 1 &&
            dragGroup[0].classList.contains("folder") &&
            !moved
        ) {
            const explorer = document.getElementById(elmnt.id + "explorer");
            if (explorer) {
                explorer.style.visibility = "visible";
            }
        }
    }

}
