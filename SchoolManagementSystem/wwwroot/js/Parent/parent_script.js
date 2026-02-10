/**
 * Global Child Selection Logic for Parent Dashboard
 */

// Initialize selection on page load
document.addEventListener('DOMContentLoaded', function () {
    syncUIWithSelection();
});

// Sync UI elements with the current value in localStorage
function syncUIWithSelection() {
    let savedChild = localStorage.getItem('selectedChild');

    // Default to 'salma' if nothing is saved
    if (!savedChild) {
        savedChild = 'salma';
        localStorage.setItem('selectedChild', savedChild);
    }

    // Update all dropdowns on the page (child-select on data pages, student-select on Index page)
    const dropdownIds = ['child-select', 'student-select'];
    dropdownIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = savedChild;
        }
    });

    // Highlight cards on Index page
    const cards = document.querySelectorAll('.child-card');
    cards.forEach(card => {
        card.classList.remove('selected');
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`'${savedChild}'`)) {
            card.classList.add('selected');
        }
    });
}

// Global function for card clicks (Index page)
function selectChild(childId, performanceUrl) {
    localStorage.setItem('selectedChild', childId);
    if (performanceUrl) {
        window.location.href = performanceUrl + '?child=' + childId;
    } else {
        syncUIWithSelection();
    }
}

// Global function for dropdown changes (Data pages)
function changeChild() {
    const childSelect = document.getElementById('child-select');
    if (childSelect) {
        const selectedId = childSelect.value;
        localStorage.setItem('selectedChild', selectedId);
        // Reload to update dynamic data (if any)
        location.reload();
    }
}

// Global function for footer dropdown changes (Index page)
function syncSelection(childId) {
    localStorage.setItem('selectedChild', childId);
    syncUIWithSelection();
}
