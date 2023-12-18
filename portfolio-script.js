function onload() {
    // retrieve the values from cookies
    var storedSiteMode = getCookie("siteMode");

    // User uses dark mode
    if (storedSiteMode == "dark") {
        document.querySelector("#dark-mode").checked = true;
        document.querySelector("#dark-mode-mobile").checked = true;

        // Dark mode
        document.querySelector(".background").style.background = "linear-gradient(to top, #150426, var(--almost-black) 65%) fixed";
        document.querySelector(".navigation").style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        document.querySelector(".navigation").style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";
    }

    onFinishLoadCards();
}

function onFinishLoadCards() {
    document.querySelector("body").style.overflowY = "scroll";
    document.querySelector("#loading-card-grid").style.opacity = "0";
    document.querySelector("#loading-card-grid").style.pointerEvents = "none";
    setTimeout(() => {
        document.querySelector("#loading-card-grid").style.display = "none";
    }, 500);
}

// Dark mode
function doDarkMode(element) {
    const isChecked = element.checked;
    const background = document.querySelector(".background");
    const navigation = document.querySelector(".navigation");

    if (isChecked) {
        // Dark mode
        background.style.opacity = "0";
        navigation.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        navigation.style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";

        setTimeout(() => {
            background.style.background = "linear-gradient(to top, #150426, var(--almost-black) 65%) fixed";
        }, 300);

        setTimeout(() => {
            background.style.opacity = "1";
        }, 301);

        setCookie("siteMode", "dark", 30);
    } else {
        // Light mode
        background.style.opacity = "0";

        setTimeout(() => {
            navigation.style.borderBottom = "1px solid rgba(255, 255, 255, 0.5)";
            background.style.background = "linear-gradient(to top, #b9d7ed, #4B40D0 95%) fixed"
        }, 300);

        setTimeout(() => {
            background.style.opacity = "1";
            navigation.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            navigation.style.boxShadow = "0 0.5rem 1.5rem rgb(0, 0, 0, 0.2)";
        }, 301);

        setCookie("siteMode", "light", 30);
    }
}

for (const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
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
 * Radial blur ipadOs mouse effect looks cut off on image-card s because the img is expanding, not the card. Need
 * to find a way for the card to expand
 * 
 * Tune hover animation
 * Might need more exciting background and look since home page is so epic
 * 
 * Could use mix-blend-mode: soft-light; for the radial gradient on the cards
 */