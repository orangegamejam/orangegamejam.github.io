document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const hamburgerDropdown = document.querySelector(".hamburger-dropdown");

    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburgerDropdown.classList.toggle('active');
    })

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (hamburgerDropdown.classList.contains('active')) {
                hamburgerDropdown.classList.remove('active');
            }
        });
    })
})