
// ========================================
// 1. MOBILE NAVBAR
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu when a navigation link is clicked
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// ========================================
// 2. PROJECT CATEGORY NAVIGATION
// ========================================

const categoryCards = document.querySelectorAll(".category-card");
const categoryOverview = document.getElementById("project-categories");
const projectDetails = document.getElementById("category-projects");
const categoryTitle = document.getElementById("selected-category-title");
const backButton = document.getElementById("back-to-categories");

const projectCards = document.querySelectorAll(
    "#category-projects .project-card"
);

const categoryNames = {
    frontend: "Frontend Projects",
    python: "Python Projects",
    ui: "UI Design Projects"
};


// Show selected category
categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
        const selectedCategory = card.dataset.category;

        projectDetails.querySelector(".project-grid")
    .classList.toggle("ui-layout", selectedCategory === "ui");

        if (!categoryNames[selectedCategory]) {
            return;
        }

        // Hide categories and show projects
        categoryOverview.hidden = true;
        projectDetails.hidden = false;

        // Update heading
        categoryTitle.textContent = categoryNames[selectedCategory];

        // Show only projects from selected category
        projectCards.forEach((project) => {
            project.hidden =
                project.dataset.category !== selectedCategory;
        });

        // Scroll to the heading without hiding it behind the navbar
        requestAnimationFrame(() => {
            projectDetails.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});


// Back to project categories
backButton.addEventListener("click", () => {
    projectDetails.hidden = true;
    categoryOverview.hidden = false;

    requestAnimationFrame(() => {
        document.getElementById("projects").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// ========================================
// 3. ACTIVE NAVIGATION LINK
// ========================================

const pageSections = document.querySelectorAll("main section[id]");

function updateActiveNavLink() {
    let currentSection = "home";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);


// ========================================
// 4. AUTOMATIC FOOTER YEAR
// ========================================

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ========================================
// 5. CLOSE MOBILE MENU ON RESIZE
// ========================================

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }
});

