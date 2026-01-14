const articles = document.querySelectorAll("article");
const navLinks = document.querySelectorAll("nav section a");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.dataset.section === id
                    );
                });
            }
        });
    },
    {
        threshold: 0.6
    }
);

articles.forEach(section => observer.observe(section));
