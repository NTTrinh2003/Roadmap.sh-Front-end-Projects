// Add changing tab functionality to the tabs
// Change active tab and tab header when clicked on a tab 

/**
 * Changes the active tab and updates the tab headers
 * @param {string} tabId - The ID of the tab to activate
 */
function changeTab(tabId) {
    // Get all task tabs and tab headers
    const taskTabs = document.querySelectorAll('.task-tab');
    const tabHeaders = document.querySelectorAll('.tab-headers div');
    const id = tabId.split('-')[1]; // Extract the numeric part of the ID
    
    // Remove all active or non-active to reset then add later
    // In case of unidentify className
    for (let i = 0; i < taskTabs.length; i++) {
        if (i == id - 1) {
            taskTabs[i].classList.remove('active');
            taskTabs[i].classList.remove('non-active');
            taskTabs[i].classList.add('active');
            tabHeaders[i].classList.remove('active');
            tabHeaders[i].classList.remove('non-active');
            tabHeaders[i].classList.add('active');
        } else {
            taskTabs[i].classList.remove('active');
            taskTabs[i].classList.remove('non-active');
            taskTabs[i].classList.add('non-active');
            tabHeaders[i].classList.remove('active');
            tabHeaders[i].classList.remove('non-active');
            tabHeaders[i].classList.add('non-active');
        }
    }
}
