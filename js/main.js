document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.getElementById("name-title");
  if (titleElement) {
    titleElement.addEventListener("mouseover", function () {
      titleElement.style.color = "var(--secondary)";
      titleElement.style.transition = "var(--transition)";
    });
    titleElement.addEventListener("mouseout", function () {
      titleElement.style.color = "";
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
// объект с инфой
      const newEntry = { name, email, message };

      const existingData = JSON.parse(localStorage.getItem("contactMessages")) || [];

      existingData.push(newEntry);

      localStorage.setItem("contactMessages", JSON.stringify(existingData));

      contactForm.reset();

      alert("Your message has been successfully send!");
    });
  }


});

function initAboutPage() {
  const infoBox = document.getElementById("js-output");
  if (infoBox) {
    let studentName = "Almat";
    let enrolledCourses = 7;
    let hasAccess = true;

    let loginAttempts = localStorage.getItem("loginAttempts");
    loginAttempts = loginAttempts ? parseInt(loginAttempts) + 1 : 1;
    localStorage.setItem("loginAttempts", loginAttempts);

    infoBox.innerHTML = `
      <div class="card mb-3" style="background: var(--card-bg); box-shadow: var(--shadow);">
        <div class="card-body">
          <h5 class="card-title">Student Information</h5>
          <div class="d-flex justify-content-between py-1"><span><strong>Student:</strong></span><span>${studentName}</span></div>
          <div class="d-flex justify-content-between py-1"><span><strong>Total Courses:</strong></span><span>${enrolledCourses}</span></div>
          <div class="d-flex justify-content-between py-1"><span><strong>Access Granted:</strong></span><span class="text-${hasAccess ? 'success' : 'danger'}">${hasAccess}</span></div>
          <div class="d-flex justify-content-between py-1"><span><strong>Next Trimester:</strong></span><span>${enrolledCourses - 2} courses</span></div>
          <div class="d-flex justify-content-between py-1"><span><strong>Login Attempts:</strong></span><span class="text-primary">${loginAttempts}</span></div>
        </div>
      </div>
    `;
  }

  const skills = [
    "Machine Learning", "Data Analysis", "Python",
    "JavaScript", "Sociability", "Node.js", "SQL",
    "Java", "C++", "Young", "FL Studio", "Chatting"
  ];

  const skillsBtn = document.getElementById("random-skills-btn");
  if (skillsBtn) {
    skillsBtn.addEventListener("click", function () {
      const shuffled = [...skills].sort(() => 0.5 - Math.random());
      const selectedSkills = shuffled.slice(0, 5);

      const skillsList = document.getElementById("skills-list");
      skillsList.innerHTML = selectedSkills.map(skill => `
        <li class="list-group-item">${skill}</li>
      `).join("");
    });

    skillsBtn.click();
  }
}

function initPortfolioPage() {
  const projects = [
    "Scooter Rental API", "Social Analytics Dashboard",
    "E-Learning Platform", "Music Production Toolkit",
    "Smart Home Controller", "Pack of abandoned scripts",
    "Auction Platform DataBase", "Telegram channel with memes",
  ];

  const projectsBtn = document.getElementById("projects-btn");
  if (projectsBtn) {
    projectsBtn.addEventListener("click", function () {
      const shuffled = [...projects].sort(() => 0.5 - Math.random());
      const selectedProjects = shuffled.slice(0, 3);

      const output = document.getElementById("projects-output");
      output.innerHTML = selectedProjects.map(project => `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5>${project}</h5>
            </div>
          </div>
        </div>
      `).join("");
    });

    projectsBtn.click();
  }

  const compareBtn = document.getElementById("compareBtn");
  if (compareBtn) {
    compareBtn.addEventListener("click", function () {
      const a = parseFloat(document.getElementById("inputA").value);
      const b = parseFloat(document.getElementById("inputB").value);
      const output = document.getElementById("compareOutput");

      if (isNaN(a) || isNaN(b)) {
        output.innerHTML = '<div class="alert alert-danger">Enter valid numbers!</div>';
        return;
      }

      let result, alertClass;
      if (a > b) {
        result = `${a} > ${b}`;
        alertClass = "alert-success";
      } else if (a < b) {
        result = `${a} < ${b}`;
        alertClass = "alert-warning";
      } else {
        result = `${a} = ${b}`;
        alertClass = "alert-info";
      }

      output.innerHTML = `
        <div class="alert ${alertClass}">
          <strong>Result:</strong> ${result}
        </div>
      `;
    });
  }

  const addItemBtn = document.getElementById("addItemBtn");
  if (addItemBtn) {
    const itemList = document.getElementById("itemList");
    const savedItems = JSON.parse(localStorage.getItem("portfolioItems")) || [];

    savedItems.forEach(text => createTaskItem(text));

    addItemBtn.addEventListener("click", function () {
      const input = document.getElementById("itemInput");
      const text = input.value.trim();
      if (text) {
        createTaskItem(text);
        input.value = "";
        updateLocalStorage();
      }
    });

    function createTaskItem(text) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const span = document.createElement("span");
      span.textContent = text;
      span.style.flexGrow = "1";
      span.style.cursor = "pointer";

      span.addEventListener("click", () => {
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim()) {
          span.textContent = newText.trim();
          updateLocalStorage();
        }
      });

      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-sm btn-danger";
      delBtn.textContent = "×";
      delBtn.addEventListener("click", function () {
        li.remove();
        updateLocalStorage();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      itemList.appendChild(li);
    }

    function updateLocalStorage() {
      const items = [...itemList.querySelectorAll("li span")].map(span =>
          span.textContent.trim()
      );
      localStorage.setItem("portfolioItems", JSON.stringify(items));
    }
  }
}

window.onload = function () {
  if (document.getElementById("js-output")) {
    initAboutPage();
  }
  if (document.getElementById("compareBtn") || document.getElementById("addItemBtn")) {
    initPortfolioPage();
  }

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "var(--shadow-hover)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "var(--shadow)";
    });
  });
};
