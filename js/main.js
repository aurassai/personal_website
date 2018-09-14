/* jshint browser:true */
/* jshint esnext:true */
/* jshint jquery:true */

const parallax = document.querySelectorAll(".parallax");
const sections = document.querySelectorAll(".section");
const sectionsPosition = [];
const projects = document.querySelectorAll(".project");

function generateSectionsPosition() {
    sections.forEach((section) => {
        const position = getElementPositions(section);
        sectionsPosition.push({
            "id": section.id,
            "top": (position.top + window.pageYOffset),
            "bottom": (position.bottom + window.pageYOffset),
            "height": position.height
        });
    });
}

function getElementPositions(element) {
    return {
        "top": element.getBoundingClientRect().top,
        "bottom": element.getBoundingClientRect().bottom,
        "height": element.getBoundingClientRect().height
    };
}

document.addEventListener("DOMContentLoaded", () => {
    generateSectionsPosition();

    //smooth transition
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    //scroll events
    window.addEventListener("scroll", () => {
        let offset = window.pageYOffset;

        //parallax effects
        parallax.forEach((section) => section.style.backgroundPositionY = offset * 0.7 + "px");

        //hide logo
        if (offset <= getElementPositions(document.querySelector("#welcome")).bottom) {
            document.querySelector("#logo").classList.toggle("hidden", true);
        } else {
            document.querySelector("#logo").classList.toggle("hidden", false);
        }

        //hide footer
        if (offset <= getElementPositions(document.querySelector("#about")).bottom) {
            document.querySelector("#footer").classList.toggle("hidden", true);
        } else {
            document.querySelector("#footer").classList.toggle("hidden", false);
        }

        //change active section
        sectionsPosition.forEach((section) => {
            if (section.top - 0.5 * section.height <= offset && section.bottom - 0.5 * section.height > offset) {
                document.querySelector(`#${section.id}-li`).classList.toggle("active", true);
            } else {
                document.querySelector(`#${section.id}-li`).classList.toggle("active", false);
            }
        });

    });

    //click events
    function removeActiveProjectClass(ignore) {
        projects.forEach((project) => {
            if (project.id !== ignore) {
                project.classList.toggle("active", false);
            }
        });
    }

    projects.forEach((project) => {
        project.addEventListener("click", () => {
            removeActiveProjectClass(project.id);
            project.classList.toggle("active");
        });
    });

    document.querySelector("#menu-icon").addEventListener("click", ()=> {
        document.querySelector("#mobile-nav").classList.toggle("hidden");
        document.querySelector("#menu-icon").classList.toggle("fa-times");
        document.querySelector("#menu-icon").classList.toggle("fa-bars");
    });

});