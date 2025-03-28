function onload() {
    // retrieve the values from cookies
    var storedSiteMode = getCookie("siteMode");

    // User uses dark mode
    if (storedSiteMode == "dark") {
        document.querySelector("#dark-mode").checked = true;
        document.querySelector("#dark-mode-mobile").checked = true;

        // Dark mode
        document.querySelector(".background").style.background = "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(22,0,94,1) 65%, rgba(37,0,50,1) 100%)";
        document.querySelector(".navigation").style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        document.querySelector(".navigation").style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";
    }

    // Simulate a click in the experience list to enable arrow key navigation
    document.querySelector("#experience-list").focus();
}

function onScroll() {
    const viewportHeight = window.innerHeight;

    // Expand the middle panel
    const experiencePanels = document.querySelectorAll(".experience-panel");
    experiencePanels.forEach((panel) => {
        const panelTop = panel.getBoundingClientRect().top;
        const panelBottom = panel.getBoundingClientRect().bottom;

        if (panelTop - 7 < viewportHeight / 2 && panelBottom + 7 > viewportHeight / 2) {
            panel.classList.add("experience-panel-expanded");
        } else {
            panel.classList.remove("experience-panel-expanded");
        }
    });
}

function panelClick(panel) {
    if (!panel.classList.contains("experience-panel-expanded")) {
        const experienceList = document.querySelector("#experience-list");
        const scrollPosition = panel.offsetTop - experienceList.offsetTop + (panel.offsetHeight - experienceList.clientHeight) / 2;

        experienceList.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        });
    }
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
            background.style.background = "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(22,0,94,1) 65%, rgba(37,0,50,1) 100%)";
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