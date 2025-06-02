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
});

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
    const countrySwitcher = document.getElementById('country-switcher');
    const indiaContent = document.querySelectorAll('.india-content');
    const usaContent = document.querySelectorAll('.usa-content');
    const indiaLogo = document.getElementById('india-logo');
    const usaLogo = document.getElementById('usa-logo');
    
    if (countrySwitcher) {
        countrySwitcher.addEventListener('change', function() {
            const countryChangeEvent = new Event('countryChanged');
            
            if (this.checked) {
                // Show USA content
                indiaContent.forEach(item => item.style.display = 'none');
                usaContent.forEach(item => item.style.display = 'block');
                indiaLogo.style.display = 'none';
                usaLogo.style.display = 'block';
            } else {
                // Show India content
                indiaContent.forEach(item => item.style.display = 'block');
                usaContent.forEach(item => item.style.display = 'none');
                indiaLogo.style.display = 'block';
                usaLogo.style.display = 'none';
            }
            
            document.dispatchEvent(countryChangeEvent);
        });
    }
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