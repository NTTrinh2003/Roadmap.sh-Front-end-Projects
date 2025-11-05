// Project List
const ALL_PROJECTS = [
    "05-testimonial-cards",
    "06-datepicker-ui",
    "07-accessible-form-ui",
    "08-image-grid-layout",
    "09-tooltip-ui",
    "10-tabs",
    "11-cookie-consent",
    "12-restricted-textarea",
    "13-accordion",
    "14-age-calculator",
    "15-flash-cards",
    "16-custom-dropdown",
    "17-task-tracker",
    "18-github-random-repository",
    "19-reddit-client",
    "20-temperature-converter",
    "21-pomodoro-timer",
    "22-23-24final-projects"
];

const PROJECT_NAME = [
    "Testimonial Cards",
    "Datepicker UI",
    "Accessible Form UI",
    "Image Grid Layout",
    "Tooltip UI",
    "Tabs",
    "Cookie Consent",
    "Restricted Textarea",
    "Accordion",
    "Age Calculator",
    "Flashcards",
    "Custom Dropdown",
    "Task Tracker",
    "Github Random Repository",
    "Reddit Client",
    "Temperature Converter",
    "Pomodoro Timer",
    "Final Projects"
]

// DOM References
const trigger       = document.getElementById("project-trigger");
const label         = document.getElementById("selected-project");
const menu          = document.getElementById("project-menu");
const viewer        = document.querySelector(".viewer-content");

// Build menu
function buildMenu() {
    const fragment = document.createDocumentFragment();
    let i = 0;
    ALL_PROJECTS.forEach(id => {
        const li = document.createElement("li");
        li.setAttribute("data-value", id);
        li.textContent = PROJECT_NAME[i++];
        li.role = 'menuitem';
        fragment.appendChild(li);
    })
    menu.appendChild(fragment);
};
buildMenu();

// Open / Close helpers
function openDropdown() {
    menu.hidden = false;
    menu.setAttribute("aria-hidden", false);
    trigger.setAttribute("aria-expanded", true);
    trigger.querySelector('.dropdown-arrow'.style.transform = 'rotate(180deg)');
};

function closeDropdown() {
    menu.hidden = true;
    menu.setAttribute("aria-hidden", true);
    trigger.setAttribute("aria-expanded", false);
    trigger.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
};

// Toggle on trigger click
trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.hidden) openDropdown();
    else closeDropdown(); 
});

// Load project on selection
trigger.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    if (!item) return;
    
    const name  = item.textContent.trim();
    const id    = item.dataset.value;

    // Update selected project
    label.textContent = name;

    // Load project and close dropdown
    loadProject(id);
    closeDropdown();
});

// Close when clicking outside of the dropdown
document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        closeDropdown();
    }
});

// Close with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
        closeDropdown();
    }
});

// Load project by ID
function loadProject(projectId) {
    const iframe = document.createElement('iframe');
    iframe.src = `./components/${projectId}/index.html`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    // Clear previous content then add new one
    viewer.innerHTML = ''; 
    viewer.appendChild(iframe);
}