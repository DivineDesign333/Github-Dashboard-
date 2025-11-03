// Helper utility functions
const DashboardHelpers = {
    // Generate random data for demo purposes
    generateRandomPrice(base = 100, variance = 10) {
        return base + (Math.random() - 0.5) * variance;
    },

    // Generate random percentage change
    generateRandomChange(min = -5, max = 5) {
        return (Math.random() * (max - min) + min).toFixed(2);
    },

    // Get timestamp
    getCurrentTimestamp() {
        return new Date().getTime();
    },

    // Add class helper
    addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    // Remove class helper
    removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    // Toggle class helper
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    // Get element by ID
    getElement(id) {
        return document.getElementById(id);
    },

    // Create element helper
    createElement(tag, className = '', textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardHelpers;
}
