document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add neural network animation
    createNeuralNetwork();
    
    // Add fade-in animation to sections
    animateSections();
    
    // Mobile menu toggle
    setupMobileMenu();
});

// Create neural network animation
function createNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    if (!neuralNetwork) return;
    
    // Create nodes
    const nodeCount = 20;
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        // Random animation delay
        node.style.animationDelay = `${Math.random() * 3}s`;
        
        neuralNetwork.appendChild(node);
    }
    
    // Create connections between nodes
    const nodes = neuralNetwork.querySelectorAll('.node');
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < i + 4 && j < nodes.length; j++) {
            createConnection(neuralNetwork, nodes[i], nodes[j]);
        }
    }
}

// Create a connection line between two nodes
function createConnection(parent, nodeA, nodeB) {
    const connection = document.createElement('div');
    connection.classList.add('connection');
    
    // Get positions
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    
    // Calculate positions relative to parent
    const x1 = rectA.left - parentRect.left + rectA.width / 2;
    const y1 = rectA.top - parentRect.top + rectA.height / 2;
    const x2 = rectB.left - parentRect.left + rectB.width / 2;
    const y2 = rectB.top - parentRect.top + rectB.height / 2;
    
    // Calculate distance and angle
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // Set connection style
    connection.style.width = `${length}px`;
    connection.style.left = `${x1}px`;
    connection.style.top = `${y1}px`;
    connection.style.transform = `rotate(${angle}deg)`;
    
    // Random animation delay
    connection.style.animationDelay = `${Math.random() * 2}s`;
    
    parent.appendChild(connection);
}

// Animate sections on scroll
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const burger = document.createElement('div');
    burger.classList.add('mobile-menu-toggle');
    burger.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    if (header && nav) {
        header.appendChild(burger);
        
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Event registration function
function registerForEvent(eventId) {
    const eventName = document.querySelector(`#event-${eventId} h3`).textContent;
    alert(`Registration for "${eventName}" successful! You will receive a confirmation email shortly.`);
}

// Projects filter function
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
    } else {
        projects.forEach(project => {
            if (project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Event Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // All existing code from script.js remains...
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add neural network animation
    createNeuralNetwork();
    
    // Add fade-in animation to sections
    animateSections();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Add gallery functionality
    setupGallery();
});

// Function to setup gallery
function setupGallery() {
    // Get modal elements
    const modal = document.getElementById('gallery-modal');
    if (!modal) return; // Exit if no modal exists (on pages other than events)
    
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const gallerySlider = document.querySelector('.gallery-slider');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    
    let currentSlide = 0;
    let currentEventImages = [];
    
    // Set up event listeners for all past event images
    const pastEventImages = document.querySelectorAll('.past-event-image');
    pastEventImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function() {
            // Find the parent card and its hidden gallery
            const parentCard = this.closest('.past-event-card');
            const gallery = parentCard.querySelector('.event-gallery');
            
            if (gallery) {
                // Get all images from this gallery
                currentEventImages = Array.from(gallery.querySelectorAll('img'));
                
                // Clear the slider and thumbnails
                gallerySlider.innerHTML = '';
                thumbnailsContainer.innerHTML = '';
                
                // Add images to the slider
                currentEventImages.forEach((img, index) => {
                    const imgClone = img.cloneNode(true);
                    imgClone.classList.toggle('active', index === 0);
                    gallerySlider.appendChild(imgClone);
                    
                    // Create thumbnail
                    const thumb = document.createElement('img');
                    thumb.src = img.src;
                    thumb.alt = 'Thumbnail';
                    thumb.classList.toggle('active', index === 0);
                    thumb.addEventListener('click', () => showSlide(index));
                    thumbnailsContainer.appendChild(thumb);
                });
                
                // Reset current slide
                currentSlide = 0;
                
                // Show the modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent body scrolling
            }
        });
    });
    
    // Close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Navigate slides
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateSlide(-1));
        nextBtn.addEventListener('click', () => navigateSlide(1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateSlide(-1);
            if (e.key === 'ArrowRight') navigateSlide(1);
        }
    });
    
    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore body scrolling
    }
    
    // Function to navigate slides
    function navigateSlide(direction) {
        const slides = gallerySlider.querySelectorAll('img');
        const thumbnails = thumbnailsContainer.querySelectorAll('img');
        
        if (slides.length === 0) return;
        
        // Update current slide index
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        
        // Update active slide and thumbnail
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Function to show specific slide
    function showSlide(index) {
        const slides = gallerySlider.querySelectorAll('img');
        const thumbnails = thumbnailsContainer.querySelectorAll('img');
        
        currentSlide = index;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentSlide);
        });
    }
}

// Create neural network animation
function createNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    if (!neuralNetwork) return;
    
    // Create nodes
    const nodeCount = 20;
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        // Random animation delay
        node.style.animationDelay = `${Math.random() * 3}s`;
        
        neuralNetwork.appendChild(node);
    }
    
    // Create connections between nodes
    const nodes = neuralNetwork.querySelectorAll('.node');
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < i + 4 && j < nodes.length; j++) {
            createConnection(neuralNetwork, nodes[i], nodes[j]);
        }
    }
}

// Create a connection line between two nodes
function createConnection(parent, nodeA, nodeB) {
    const connection = document.createElement('div');
    connection.classList.add('connection');
    
    // Get positions
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    
    // Calculate positions relative to parent
    const x1 = rectA.left - parentRect.left + rectA.width / 2;
    const y1 = rectA.top - parentRect.top + rectA.height / 2;
    const x2 = rectB.left - parentRect.left + rectB.width / 2;
    const y2 = rectB.top - parentRect.top + rectB.height / 2;
    
    // Calculate distance and angle
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // Set connection style
    connection.style.width = `${length}px`;
    connection.style.left = `${x1}px`;
    connection.style.top = `${y1}px`;
    connection.style.transform = `rotate(${angle}deg)`;
    
    // Random animation delay
    connection.style.animationDelay = `${Math.random() * 2}s`;
    
    parent.appendChild(connection);
}

// Animate sections on scroll
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const burger = document.createElement('div');
    burger.classList.add('mobile-menu-toggle');
    burger.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    if (header && nav) {
        header.appendChild(burger);
        
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Event registration function
function registerForEvent(eventId) {
    const eventName = document.querySelector(`#event-${eventId} h3`).textContent;
    alert(`Registration for "${eventName}" successful! You will receive a confirmation email shortly.`);
}

// Projects filter function
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
    } else {
        projects.forEach(project => {
            if (project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}