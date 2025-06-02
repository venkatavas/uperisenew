// Country Switcher Script
console.log("Country switcher initialized");

// Function to switch country content
function switchCountry(country) {
    const indiaContent = document.querySelectorAll('.india-content, .india-only');
    const usaContent = document.querySelectorAll('.usa-content, .usa-only');
    const currentFlag = document.getElementById('current-flag');
    const currentCountry = document.getElementById('current-country');
    
    // Dispatch country change event
    const countryChangeEvent = new Event('countryChanged');
    
    if (country === 'usa') {
        // Show USA content
        indiaContent.forEach(item => item.style.display = 'none');
        usaContent.forEach(item => item.style.display = 'block');
        
        // Update navbar country selector
        if (currentFlag) currentFlag.src = "assests/flags/usa.svg";
        if (currentCountry) currentCountry.textContent = "USA";
    } else if (country === 'india') {
        // Show India content
        indiaContent.forEach(item => item.style.display = 'block');
        usaContent.forEach(item => item.style.display = 'none');
        
        // Update navbar country selector
        if (currentFlag) currentFlag.src = "assests/flags/india.svg";
        if (currentCountry) currentCountry.textContent = "India";
    }
    
    // Save selection to localStorage
    localStorage.setItem('selectedCountry', country);
    localStorage.setItem('countrySelected', 'true');
    
    // Dispatch the event for other components to react
    document.dispatchEvent(countryChangeEvent);
}

// Initialize country switcher
document.addEventListener('DOMContentLoaded', function() {
    // Set up country dropdown options
    const countryOptions = document.querySelectorAll('.country-option');
    countryOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const country = this.getAttribute('data-country');
            switchCountry(country);
        });
    });
    
    // Check if there's a saved country preference
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
        switchCountry(savedCountry);
    }
});