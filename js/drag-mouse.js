const dragArea = document.createElement('div');
dragArea.classList.add('drag-area');

let startX, startY;


main.onmousedown = (e) => {
    if (e.target.closest('.explorer, .folder')) return;
    if (e.button === 2) return;
    if (!contextMenu.classList.contains('inactive')) {
        contextMenu.classList.toggle('inactive');
    }

    startX = e.clientX;
    startY = e.clientY;

    dragArea.style.left = startX + 'px';
    dragArea.style.top = startY + 'px';
    dragArea.style.width = '0px';
    dragArea.style.height = '0px';

    main.appendChild(dragArea);

    main.onmousemove = (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        dragArea.style.left = left + 'px';
        dragArea.style.top = top + 'px';
        dragArea.style.width = width + 'px';
        dragArea.style.height = height + 'px';

        const dragRect = dragArea.getBoundingClientRect();
        const folders = document.querySelectorAll('.folder');

        folders.forEach(folder => {
            const folderRect = folder.getBoundingClientRect();

            if (isOverlapping(dragRect, folderRect)) {
                folder.classList.add('selected');
            } else {
                folder.classList.remove('selected');
            }
        });
    };

};

main.onmouseup = () => {
    main.onmousemove = null;
    dragArea.remove();
};

function isOverlapping(a, b) {
    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );
}

function clearFolderSelection() {
    document.querySelectorAll('.folder.selected')
        .forEach(f => f.classList.remove('selected'));
}

document.addEventListener('mousedown', (e) => {
    // If clicking a folder don't clear
    if (e.target.closest('.folder')) return;

    // If Cmd / Ctrl is pressed keep multi-selection
    if (e.metaKey || e.ctrlKey) return;

    clearFolderSelection();
});
