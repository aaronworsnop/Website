function onload() {
    // retrieve the values from cookies
    var storedSiteMode = getCookie("siteMode");
    console.log(storedSiteMode);

    // User uses dark mode
    if (storedSiteMode == "dark") {
        document.querySelector("#dark-mode").checked = true;
        document.querySelector("#dark-mode-mobile").checked = true;
        
        // Dark mode
        document.querySelector("body").style.backgroundColor = "var(--almost-black)";
        document.querySelector(".navigation").style.backgroundColor = "var(--almost-black)";
        document.querySelector(".navigation").style.boxShadow = "0 2rem 1.5rem var(--almost-black)";
    }
}

function doDarkMode(element) {
    const isChecked = element.checked;

    if (isChecked) {
        // Dark mode
        document.querySelector("body").style.backgroundColor = "var(--almost-black)";
        document.querySelector(".navigation").style.backgroundColor = "var(--almost-black)";
        document.querySelector(".navigation").style.boxShadow = "0 2rem 1.5rem var(--almost-black)";

        setCookie("siteMode", "dark", 30); 
    } else {
        // Light mode
        document.querySelector("body").style.backgroundColor = "#2b2e30";
        document.querySelector(".navigation").style.backgroundColor = "#747e8a";
        document.querySelector(".navigation").style.boxShadow = "0 0.5rem 1.5rem rgba(0, 0, 0, 0.6)";

        setCookie("siteMode", "light", 30); 
    }
}

for(const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${ x }px`);
    target.style.setProperty('--mouse-y', `${ y }px`);
}

// Cookies

// set cookie
function setCookie(name, value, daysToExpire) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    var cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + cookieValue;
}
  
// get cookie
    function getCookie(name) {
    var cookieName = name + "=";
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }
    return null;
}

/**
 * Make dark mode work
 * Cookies across the pages
 * When uploaded to live, check if navbar needs more or less height depending on matching the home page
   for dark mode height
 * 
 * Tune hover animation
 * Might need more exciting background and look since home page is so epic
 * Change padding to margin for back button. Selecting the left of the back button counts as the button right now...
 * 
 * Might want to dynamically set transform anchors for hover effects
 * Fade in/out for API fetches and loading? For example leetcode statistics fade instead of
 * just popping in
 * 
 * Could use mix-blend-mode: soft-light; for the radial gradient on the cards
 */