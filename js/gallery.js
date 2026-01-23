
function handleGalleryAnchors() {
    const images = document.querySelectorAll(".modal-gallery *");
    const galleryAnchors = document.querySelectorAll(".gallery-anchors *");

    const galleryObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    galleryAnchors.forEach(anchor => {
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
        {threshold: 0.7}
    );

    
    images.forEach(section => galleryObserver.observe(section));
    
    
}


