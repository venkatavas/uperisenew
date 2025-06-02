// Visitor Tracking Script
console.log("Visitor tracking initialized");

// Simple page view tracking
function trackPageView() {
    const pageUrl = window.location.pathname;
    const pageTitle = document.title;
    const referrer = document.referrer;
    
    console.log(`Page view tracked: ${pageTitle} (${pageUrl})`);
    
    // In a real implementation, you would send this data to your analytics service
    // Example: sendToAnalytics({ pageUrl, pageTitle, referrer });
}

// Track user interactions
function trackEvent(category, action, label = null, value = null) {
    console.log(`Event tracked: ${category} - ${action}${label ? ' - ' + label : ''}${value ? ' - ' + value : ''}`);
    
    // In a real implementation, you would send this data to your analytics service
    // Example: sendToAnalytics({ eventCategory: category, eventAction: action, eventLabel: label, eventValue: value });
}

// Initialize tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    trackPageView();
    
    // Set up event listeners for important interactions
    const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });
    
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formId = this.id || 'unknown-form';
            trackEvent('Form', 'Submit', formId);
        });
    });
});