const heading = document.getElementById("name-title");
const navActive = document.querySelector(".nav-link.active");
const allCards = document.getElementsByClassName("card");

if (heading) {
    heading.style.color = "var(--text)";
    heading.style.transition = "color 0.3s ease";
}

if (navActive) {
    navActive.textContent = "You're Here 💼";
}

if (allCards.length > 0) {
    allCards[0].style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
}

const firstImg = document.querySelector("img");
if (firstImg) {
    firstImg.alt = "Profile Image";
    firstImg.style.borderRadius = "12px";
}


const colorBtn = document.getElementById("colorBtn");
const audioBtn = document.getElementById("audioBtn");

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add("dark-mode");
    isDark = true;
}

if (colorBtn) {
    colorBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

if (audioBtn) {
    audioBtn.addEventListener("click", () => {
        const audio = new Audio("audio/click.mp3");
        audio.play();
    });
}

// хайордер функция
function highlightCards(fn) {
    Array.from(allCards).forEach(fn);
}

highlightCards(card => {
    card.style.border = "1px solid var(--secondary)";
});

//объект с методом
const student = {
    name: "Almat",
    degree: "Big Data Analysis",
    updateResume: function () {
        const note = document.createElement("div");
        note.className = "text-center mt-4 fw-semibold";
        note.textContent = `${this.name} is currently pursuing ${this.degree} at AITU.`;
        document.querySelector("main").appendChild(note);
    }
};

student.updateResume();