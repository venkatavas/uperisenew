// Main JavaScript file for Uperise Global Advisors

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize counter animations
    initCounterAnimations();
    
    // Country switcher functionality
    setupCountrySwitcher();
    
    // Initialize country selection popup
    initCountrySelectionPopup();
    
    // Initialize parallax effect
    setTimeout(function() {
        try {
            handleParallax();
        } catch(e) {
            console.error("Error initializing parallax:", e);
        }
    }, 1000);
});

// Parallax effect for explore services section
function handleParallax() {
    const exploreSection = document.querySelector('.explore-services');
    if (!exploreSection) return;
    
    // Only apply parallax in light mode
    if (document.body.classList.contains('dark-theme')) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const sectionPosition = exploreSection.offsetTop;
        const sectionHeight = exploreSection.offsetHeight;
        
        // Check if section is in viewport
        if (scrollPosition > sectionPosition - window.innerHeight && 
            scrollPosition < sectionPosition + sectionHeight) {
            
            // Calculate parallax effect
            const yPos = -(scrollPosition - sectionPosition) / 5;
            exploreSection.style.backgroundPositionY = yPos + 'px';
        }
    });
}

// Counter animations
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.counter-value');
    
    counterElements.forEach(function(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let count = 0;
        
        const options = {
            threshold: 0.7
        };
        
        const observer = new IntersectionObserver(function(entries) {
            if(entries[0].isIntersecting) {
                const countUp = new CountUp(element, target, {
                    duration: 2.5,
                    separator: ',',
                    decimal: '.'
                });
                
                if (!countUp.error) {
                    countUp.start();
                } else {
                    console.error(countUp.error);
                }
                
                observer.unobserve(element);
            }
        }, options);
        
        observer.observe(element);
    });
}

// Country switcher functionality
function setupCountrySwitcher() {
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
}

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

// Typewriter effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        
        let typeSpeed = 100;
        
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init typewriter effect on load
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
});

// Country selection popup functionality
function initCountrySelectionPopup() {
    // Check if it's the first visit
    if (!localStorage.getItem('countrySelected')) {
        // Show popup with a slight delay for better UX
        setTimeout(function() {
            const popup = document.getElementById('countrySelectionPopup');
            if (popup) {
                popup.classList.add('show');
            }
        }, 1000);
    }
    
    // Close button functionality
    const closePopupBtn = document.getElementById('closePopup');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            const popup = document.getElementById('countrySelectionPopup');
            popup.classList.remove('show');
            
            // Set a flag in localStorage so popup doesn't show again
            localStorage.setItem('countrySelected', 'true');
        });
    }
    
    // Country option selection
    const countryOptions = document.querySelectorAll('.country-option');
    countryOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get country from data attribute
            const country = this.getAttribute('data-country');
            
            // Handle country selection functionality
            switchCountry(country);
            
            // Close the popup
            const popup = document.getElementById('countrySelectionPopup');
            if (popup) {
                popup.classList.remove('show');
            }
            
            // Set a flag in localStorage so popup doesn't show again
            localStorage.setItem('countrySelected', 'true');
            localStorage.setItem('selectedCountry', country);
        });
    });
}