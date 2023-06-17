function onload() {
    // User uses dark mode
    if (storedSiteMode == "dark") {
        document.querySelector("#dark-mode").checked = true;
        document.querySelector("#dark-mode-mobile").checked = true;
        
        // Dark mode
        document.querySelector("body").style.backgroundColor = "var(--almost-black)";
    }
}

function doDarkMode(element) {
    const isChecked = element.checked;

    // Change the background video to dark mode
    if (isChecked) {

    } else {

    }
}

/**
 * Make dark mode work
 * Add more top padding to the grid area
 * Cookies across the pages
 * 
 * Tune hover animation
 * Might need more exciting background and look since home page is so epic
 * 
 */