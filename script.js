document.addEventListener('DOMContentLoaded', () => {

    // --- FIX FOR NO-SCROLL PROBLEM ---
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.style.overflowY = "auto"; // Allows scrolling
        contentArea.style.height = "80vh";    // Sets a height so it knows when to scroll
    }

    // --- GLOBAL ACCESSIBILITY: LOAD SAVED SETTING ---
    const savedSize = localStorage.getItem('userFontSize');
    if (savedSize && contentArea) {
        contentArea.style.fontSize = savedSize;
    }

    // --- ACCESSIBILITY: FONT RESIZER FUNCTION ---
    window.changeFontSize = function (action) {
        const content = document.querySelector('.content-area');
        if (!content) return;

        let currentSize = window.getComputedStyle(content).fontSize;
        let sizeValue = parseFloat(currentSize);
        let newSize;

        if (action === 'increase') {
            newSize = (sizeValue + 4) + "px";
        } else if (action === 'decrease') {
            if (sizeValue > 10) {
                newSize = (sizeValue - 4) + "px";
            }
        } else if (action === 'reset') {
            newSize = "16px";
        }

        if (newSize) {
            content.style.fontSize = newSize;
            localStorage.setItem('userFontSize', newSize);
        }
    }

    // --- SLIDER LOGIC (For games.html) ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    window.changeSlide = function (direction) {
        if (slides.length === 0) return;

        // Hide current
        slides[currentSlide].style.display = 'none';

        // Calculate next
        currentSlide += direction;

        if (currentSlide >= slides.length) { currentSlide = 0; }
        if (currentSlide < 0) { currentSlide = slides.length - 1; }

        // Show next
        slides[currentSlide].style.display = 'block';
    }

    // --- EXTRA INFO TOGGLE ---
    window.toggleExtraInfo = function () {
        var content = document.getElementById("extraInfoContent");
        if (content) {
            content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
        }
    }

    // --- MODAL IMAGE LOGIC ---
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const span = document.getElementsByClassName("close-modal")[0];

    window.updateModalTriggers = function () {
        const images = document.querySelectorAll(".modal-trigger");
        images.forEach(img => {
            img.onclick = function () {
                if (modal) {
                    modal.style.display = "flex";
                    modalImg.src = this.src;
                }
            }
        });
    }

    updateModalTriggers();

    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    // --- ACCORDION LOGIC ---
    const acc = document.getElementsByClassName("accordion-header");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;

            // Check if it's the new evolution accordion or your original one
            if (panel.classList.contains('accordion-content')) {
                panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";

                // Toggle the +/- sign if it exists
                const span = this.querySelector('span');
                if (span) {
                    span.innerText = panel.style.maxHeight ? "-" : "+";
                }
            }
        });
    }
});