function onload() {
    // User uses dark mode
    if (storedSiteMode == "dark") {
        document.querySelector("#dark-mode").checked = true;
        document.querySelector("#dark-mode-mobile").checked = true;
        
        // Dark mode
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("#background-video").style.opacity = "0";
        darken();
    }
}

function doDarkMode(element) {
    const isChecked = element.checked;

    // Change the background video to dark mode
    if (isChecked) {
        document.querySelector("body").style.backgroundColor = "";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(darken, 300);
    } else {
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(lighten, 400);
    }
}