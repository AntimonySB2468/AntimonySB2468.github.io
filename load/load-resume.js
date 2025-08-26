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
        document.getElementById('resume-content').innerHTML = 
            '<div class="error">Failed to load resume data. Please try again later.</div>';
    }
}

// Function to render resume data using Handlebars templates
function renderResumeWithHandlebars(data) {
    const resumeContainer = document.getElementById('resume-content');
    
    // Compile templates
    const experienceTemplate = Handlebars.compile(document.getElementById('experience-template').innerHTML);
    const educationTemplate = Handlebars.compile(document.getElementById('education-template').innerHTML);
    const skillsTemplate = Handlebars.compile(document.getElementById('skills-template').innerHTML);
    const projectsTemplate = Handlebars.compile(document.getElementById('projects-template').innerHTML);
    const certificationsTemplate = Handlebars.compile(document.getElementById('certifications-template').innerHTML);
    const languagesTemplate = Handlebars.compile(document.getElementById('languages-template').innerHTML);
    const achievementsTemplate = Handlebars.compile(document.getElementById('achievements-template').innerHTML);
    
    let html = '';
    
    // Render each section if data exists
    if (data.experience && data.experience.length > 0) {
        html += experienceTemplate(data);
    }
    
    if (data.education && data.education.length > 0) {
        html += educationTemplate(data);
    }
    
    if (data.skills && (data.skills.technical.length > 0 || data.skills.soft.length > 0)) {
        html += skillsTemplate(data);
    }
    
    if (data.projects && data.projects.length > 0) {
        html += projectsTemplate(data);
    }
    
    if (data.certifications && data.certifications.length > 0) {
        html += certificationsTemplate(data);
    }
    
    if (data.languages && data.languages.length > 0) {
        html += languagesTemplate(data);
    }
    
    if (data.achievements && data.achievements.length > 0) {
        html += achievementsTemplate(data);
    }
    
    resumeContainer.innerHTML = html;
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