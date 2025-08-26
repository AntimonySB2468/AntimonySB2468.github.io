// resume-loader.js

// Function to load and display resume data using Handlebars
async function loadResumeData() {
    try {
        // Fetch the JSON resume data
        const response = await fetch('resume.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resumeData = await response.json();
        
        // Render templates with Handlebars
        renderResumeWithHandlebars(resumeData);
    } catch (error) {
        console.error('Error loading resume data:', error);
        document.getElementById('experience-container').innerHTML = 
            '<div class="error">Failed to load resume data. Please try again later.</div>';
    }
}

// Function to render resume data using Handlebars templates
function renderResumeWithHandlebars(data) {
    const experienceContainer = document.getElementById('experience-container');
    
    // Compile templates
    const experienceTemplate = Handlebars.compile(document.getElementById('experience-template').innerHTML);
    
    let html = '';
    
    // Render each section if data exists
    if (data.experience && data.experience.length > 0) {
        html += experienceTemplate(data);
    }
    
    experienceContainer.innerHTML = html;
}

// Register Handlebars helpers for additional functionality
Handlebars.registerHelper('formatDate', function(dateString) {
    if (!end_date) return '';
    
    // Handle "PRESENT" case
    if (end_date.toUpperCase() === 'PRESENT') {
        return 'Present';
    }
    
    // Simple date formatting (you can enhance this as needed)
    return end_date;
});

Handlebars.registerHelper('ifNotEmpty', function(value, options) {
    if (value && value.length > 0) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load resume data when the page is ready
    loadResumeData();
});