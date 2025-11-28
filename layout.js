/* layout.js */

// 1. Load HTML Components (Header/Nav)
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
            if (elementId === 'navbar-container') {
                setActiveNav();
            }
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// 2. Highlight Active Menu Item
function setActiveNav() {
    const path = window.location.pathname;
    const page = path.split("/").pop(); 
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        // Match explicit filename or folder root
        if (href === page || (page === '' && href === 'crm-home.html')) {
            item.classList.add('active');
        }
    });
}

// 3. Tab Switching Logic for CRM Dashboard
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.style.display = 'none';
    });
    
    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected content and activate button
    document.getElementById(tabName + '-content').style.display = 'grid'; // Grid to match CSS
    document.getElementById(tabName + '-btn').classList.add('active');
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-container", "header.html");
    loadComponent("navbar-container", "navbar.html");
    
    // Default Tab
    if(document.getElementById('bookings-content')) {
        switchTab('bookings');
    }
});