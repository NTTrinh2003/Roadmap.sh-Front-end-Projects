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
    "22-23-24-final-projects"
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
    "Flash Cards",
    "Custom Dropdown",
    "Task Tracker",
    "Github Random Repository",
    "Reddit Client",
    "Temperature Converter",
    "Pomodoro Timer",
    "Final Projects"
];

const PROJECT_DESCRIPTION_LINK = [
    "https://roadmap.sh/projects/testimonial-cards",
    "https://roadmap.sh/projects/datepicker-ui",
    "https://roadmap.sh/projects/accessible-form-ui",
    "https://roadmap.sh/projects/image-grid",
    "https://roadmap.sh/projects/tooltip-ui",
    "https://roadmap.sh/projects/simple-tabs",
    "https://roadmap.sh/projects/cookie-consent",
    "https://roadmap.sh/projects/restricted-textarea",
    "https://roadmap.sh/projects/accordion",
    "https://roadmap.sh/projects/age-calculator",
    "https://roadmap.sh/projects/flash-cards",
    "https://roadmap.sh/projects/custom-dropdown",
    "https://roadmap.sh/projects/task-tracker-js",
    "https://roadmap.sh/projects/github-random-repo",
    "https://roadmap.sh/projects/reddit-client",
    "https://roadmap.sh/projects/temperature-converter",
    "https://roadmap.sh/projects/pomodoro-timer",

];

let currentComponentStyle = null;


// DOM References
const trigger       = document.getElementById("project-trigger");
const label         = document.getElementById("selected-project");
const menu          = document.getElementById("project-menu");
const viewer        = document.querySelector(".viewer-content");
const align         = document.querySelector(".dropdown-align");

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
    menu.setAttribute("aria-hidden", 'false');
    trigger.setAttribute("aria-expanded", 'true');
    trigger.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
};

function closeDropdown() {
    menu.hidden = true;
    menu.setAttribute("aria-hidden", 'true');
    trigger.setAttribute("aria-expanded", 'false');
    trigger.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
};

// Toggle on trigger click
trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.hidden) openDropdown();
    else closeDropdown(); 
});

// Load project on selection
menu.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    // if (!item) return;
    
    const name  = item.textContent.trim();
    const id    = item.dataset.value;

    // Update selected project
    label.textContent = name;
    if (id != '22-23-24-final-projects') {
        align.innerHTML = `<a href="${PROJECT_DESCRIPTION_LINK[ALL_PROJECTS.indexOf(id)]}" target="_blank" class="link-to-description">Link to project description</a>`;
    } else {
        // Links in the content viewer
        align.innerHTML = ``;
    }

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
async function loadProject(projectId) {
    const base = `./components/${projectId}`;

    if (currentComponentStyle) {
        currentComponentStyle.remove();
        currentComponentStyle = null;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = `${base}/style.css`;
    document.head.appendChild(cssLink);
    currentComponentStyle = cssLink;


    const jsScript = document.createElement('script');
    jsScript.src = `${base}/script.js`;
    if (jsScript != null) { 

    
    document.body.appendChild(jsScript);
    }

    await new Promise((resolve, reject) => {
        cssLink.onload = resolve;
        cssLink.onerror = () => {
            console.error(`Failed to load CSS for ${projectId}`);
            resolve();
        };
    });

    try {
        const res = await fetch(`${base}/index.html`);
        if (!res.ok) throw new Error(`Not found: ${projectId}`);
        const html = await res.text();
        viewer.innerHTML = html;
    } catch(err) {
        viewer.innerHTML = `<p style="color:red;">Error loading component: ${err.message}</p>`
    };
}