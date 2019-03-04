/* jshint browser:true */
/* jshint esnext:true */
/* jshint jquery:true */

const parallax = document.querySelectorAll(".parallax");
const sections = document.querySelectorAll(".section");
const sectionsPosition = [];
const projects = document.querySelectorAll(".project");

function generateSectionsPosition() {
    sections.forEach(section => {
        const position = getElementPositions(section);
        sectionsPosition.push({
            id: section.id,
            top: position.top + window.pageYOffset,
            bottom: position.bottom + window.pageYOffset,
            height: position.height
        });
    });
}

function getElementPositions(element) {
    return {
        top: element.getBoundingClientRect().top,
        bottom: element.getBoundingClientRect().bottom,
        height: element.getBoundingClientRect().height
    };
}

document.addEventListener("DOMContentLoaded", () => {
    generateSectionsPosition();

    //smooth transition
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    //scroll events
    window.addEventListener("scroll", () => {
        let offset = window.pageYOffset;
        let windowHeight = window.innerHeight;

        //parallax effects
        parallax.forEach(
            section => (section.style.backgroundPositionY = offset * 0.7 + "px")
        );

        //hide logo
        if (
            offset <=
            getElementPositions(document.querySelector("#welcome")).bottom
        ) {
            document.querySelector("#logo").classList.toggle("hidden", true);
        } else {
            document.querySelector("#logo").classList.toggle("hidden", false);
        }

        //hide footer
        if (
            offset <=
            getElementPositions(document.querySelector("#about")).bottom + 1
        ) {
            document
                .querySelector("#footer")
                .classList.toggle("invisible", true);
        } else {
            document
                .querySelector("#footer")
                .classList.toggle("invisible", false);
        }

        //change active section
        sectionsPosition.forEach(section => {
            if (
                section.bottom - section.height / 2.5 > offset &&
                section.top + section.height / 2 < offset + windowHeight
            ) {
                document
                    .querySelector(`#${section.id}-li`)
                    .classList.toggle("active", true);
            } else {
                document
                    .querySelector(`#${section.id}-li`)
                    .classList.toggle("active", false);
            }
        });
    });

    //click events
    // function removeActiveProjectClass(ignore) {
    //     projects.forEach(project => {
    //         if (project.id !== ignore) {
    //             project.classList.toggle("active", false);
    //         }
    //     });
    // }

    projects.forEach(project => {
        project.addEventListener("click", () => {
            // removeActiveProjectClass(project.id);
            // project.classList.toggle("active");
            document
                .querySelector(`#${project.id}Mod`)
                .classList.toggle("hidden");
            document.querySelector(".modal-overlay").classList.toggle("hidden");
        });
    });

    document.querySelectorAll(".modal-close").forEach(button =>
        button.addEventListener("click", e => {
            document
                .querySelector(`#${e.target.parentNode.parentNode.id}`)
                .classList.toggle("hidden");
            document.querySelector(".modal-overlay").classList.toggle("hidden");
        })
    );

    document.querySelector(".modal-overlay").addEventListener("click", () => {
        document
            .querySelectorAll(".modal")
            .forEach(e => e.classList.toggle("hidden", true));
        document.querySelector(".modal-overlay").classList.toggle("hidden");
    });

    document.querySelector("#menu-icon").addEventListener("click", () => {
        document.querySelector("#mobile-nav").classList.toggle("hidden");
        document.querySelector("#menu-icon").classList.toggle("fa-times");
        document.querySelector("#menu-icon").classList.toggle("fa-bars");
    });
});
