document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".threat-card, .social-card");

    if (!window.IntersectionObserver) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18,
        }
    );

    revealItems.forEach((item) => observer.observe(item));
});
