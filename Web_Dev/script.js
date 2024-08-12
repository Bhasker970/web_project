document.addEventListener('DOMContentLoaded', function () {
    // Load projects from localStorage on page load
    loadProjects();

    document.getElementById('project-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const url = document.getElementById('url').value;

        // Get current date and time
        const now = new Date();
        const timestamp = now.toLocaleString(); // e.g., "8/9/2024, 3:24:45 PM"

        // Create a new project object
        const project = {
            title,
            description,
            url,
            timestamp
        };

        // Save project to localStorage
        saveProject(project);

        // Add the project card to the projects section
        addProjectToDOM(project);

        // Clear the form
        document.getElementById('project-form').reset();
    });
});

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(project => addProjectToDOM(project));
}

function saveProject(project) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addProjectToDOM(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.url}" target="_blank">View Project</a>
        <p class="timestamp">Added on: ${project.timestamp}</p>
        <button class="modify-btn">Modify</button>
        <button class="delete-btn">Delete</button>
    `;

    // Add the project card to the projects section
    document.getElementById('projects').appendChild(projectCard);

    // Add event listeners for the modify and delete buttons
    projectCard.querySelector('.delete-btn').addEventListener('click', function () {
        deleteProject(project.title);
        projectCard.remove();
    });

    projectCard.querySelector('.modify-btn').addEventListener('click', function () {
        document.getElementById('title').value = project.title;
        document.getElementById('description').value = project.description;
        document.getElementById('url').value = project.url;
        deleteProject(project.title);
        projectCard.remove();
    });
}

function deleteProject(title) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project.title !== title);
    localStorage.setItem('projects', JSON.stringify(projects));
}