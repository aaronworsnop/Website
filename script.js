var leftScrollCount = 0;
var hasTravelledDomain = false;

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

    // User hasn't scrolled before
    if (storedHasUsedDomains === null) {
        document.querySelector(".tooltip").style.display = "flex";
        document.querySelector(".tooltip").style.opacity = "0";
        const top = document.querySelector(".current-domain-link").getBoundingClientRect().top - 105;
        const left = document.querySelector("body").getBoundingClientRect().right / 2 - document.querySelector(".tooltip").clientWidth / 2;
        document.querySelector(".tooltip").style.top = top + "px";
        document.querySelector(".tooltip").style.left = left + "px";

        document.querySelector(".tooltip-text").style.display = "flex";
        const topText = document.querySelector(".landing-domains-left").getBoundingClientRect().bottom + 15;
        const leftText = document.querySelector(".landing-domains-left").getBoundingClientRect().right / 1.6 - document.querySelector(".tooltip-text").clientWidth / 2;
        document.querySelector(".tooltip-text").style.top = topText + "px";
        document.querySelector(".tooltip-text").style.left = leftText + "px";

        document.querySelector(".tooltip-drag").style.display = "flex";
        const topDrag = document.querySelector(".landing-domains-left").getBoundingClientRect().bottom - 100;
        const leftDrag = document.querySelector(".landing-domains-left").getBoundingClientRect().right / 1.6 - document.querySelector(".tooltip-drag").clientWidth / 2;
        document.querySelector(".tooltip-drag").style.top = topDrag + "px";
        document.querySelector(".tooltip-drag").style.left = leftDrag + "px";
    }
}

// Add this function at the end of your script.js file
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('background-video');
    video.addEventListener('canplay', function () {
        video.poster = '';
    });
});

// Keyboard listners

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeContactPane()
    }
});

const emailInput = document.getElementById('email');
const emailText = document.getElementById('email-label');
const emailUnderline = document.getElementById('email-underline');

emailInput.addEventListener('input', () => {
    if (emailInput.value) {
        emailText.classList.add('email-entered-but-invalid');
        emailUnderline.classList.add('email-entered-but-invalid-underline');
        emailUnderline.classList.remove('contact-content-input-underline');
    } else {
        emailText.classList.remove('email-entered-but-invalid');
        emailUnderline.classList.remove('email-entered-but-invalid-underline');
        emailUnderline.classList.add('contact-content-input-underline');
    }
});

// Tooltip animation (change first querySelector between tooltip-drag/tooltip depending on which one you want to animate)
// Make sure to uncomment all related code to do with tooltip-drag/tooltip in case of switching

document.querySelector('.tooltip-drag').addEventListener('animationend', function (event) {
    if (event.animationName === 'animate-tooltip-drag') {
        if (leftScrollCount > 10) {
            document.querySelector(".tooltip").style.display = "flex";
        } else {
            // Reset the animation by temporarily setting it to "none"
            document.querySelector(".tooltip-drag").style.animation = "none";

            // Delay the reapplication of the animation by a short duration
            setTimeout(function () {
                document.querySelector(".tooltip-drag").style.animation = "animate-tooltip-drag 2.5s ease-in-out forwards";
            }, 10);
        }
    }
});

document.querySelector('.tooltip').addEventListener('animationend', function (event) {
    if (event.animationName === 'animate-tooltip') {
        if (hasTravelledDomain == true) {
            document.querySelector(".tooltip").style.animation = "animate-tooltip-out 0.3s ease-out forwards";
        } else {
            // Reset the animation by temporarily setting it to "none"
            document.querySelector(".tooltip").style.animation = "none";

            // Delay the reapplication of the animation by a short duration
            setTimeout(function () {
                document.querySelector(".tooltip").style.animation = "animate-tooltip 2s ease-in-out forwards";
            }, 1);
        }
    }
});

document.querySelector('.current-domain-link').addEventListener('click', function (event) {
    hasTravelledDomain = true;
});

// Left and right domains scrolling

function leftScroll() {
    const triangleLeft = document.querySelector(".dot-triangle-left")
    const leftDomainScroll = document.querySelector(".landing-domains-left").scrollTop;
    const leftDomainScrollHeight = document.querySelector(".landing-domains-left").scrollHeight;
    const leftDomainHeight = document.querySelector(".landing-domains-left").clientHeight;
    const dotsTop = document.querySelector(".dots").offsetTop;
    const dotsHeight = document.querySelector(".dots").clientHeight;
    const viewportHeight = window.innerHeight;

    if (leftDomainScroll / (leftDomainScrollHeight - leftDomainHeight) * viewportHeight < dotsTop - dotsHeight / 2) {
        triangleLeft.style.top = Math.max(leftDomainScroll / (leftDomainScrollHeight - leftDomainHeight) * viewportHeight, dotsTop - dotsHeight / 2) + "px";
    } else {
        triangleLeft.style.top = Math.min(leftDomainScroll / (leftDomainScrollHeight - leftDomainHeight) * viewportHeight, dotsTop + dotsHeight / 2) + "px";
    }

    // Checking domains for animation
    const github = document.querySelector(".github");
    const linkedin = document.querySelector(".linkedin");
    const youtube = document.querySelector(".youtube");

    const com = document.querySelector(".com");
    const gmail = document.querySelector(".gmail");
    const businessGmail = document.querySelector(".business-gmail");

    const middle = document.querySelector(".landing-screen-title");

    if (github.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        github.classList.add("in-focus");
        youtube.classList.remove("in-focus");
        linkedin.classList.remove("in-focus");
        com.classList.remove("in-focus");
        gmail.classList.remove("in-focus");
        businessGmail.classList.remove("in-focus");

    } else if (linkedin.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        linkedin.classList.add("in-focus");
        youtube.classList.remove("in-focus");
        github.classList.remove("in-focus");
        com.classList.remove("in-focus");
        gmail.classList.remove("in-focus");
        businessGmail.classList.remove("in-focus");
    } else if (youtube.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        youtube.classList.add("in-focus");
        linkedin.classList.remove("in-focus");
        github.classList.remove("in-focus");
        com.classList.remove("in-focus");
        gmail.classList.remove("in-focus");
        businessGmail.classList.remove("in-focus");
    }

    // Setting the current domain
    document.querySelector(".current-domain").href = "https://" + document.querySelector(".in-focus").innerHTML + "aaronworsnop";

    // User knows how to scroll domains cookie
    leftScrollCount++;

    if (storedHasUsedDomains == "true" && leftScrollCount > 10) {
    } else if (storedHasUsedDomains != "true" && leftScrollCount > 10 && hasTravelledDomain == false) {
        setCookie("hasUsedDomains", "true", 30);
        document.querySelector(".tooltip").style.opacity = "0.5";
        setTimeout(function () {
            document.querySelector(".tooltip").style.animation = "animate-tooltip 2s ease-in-out forwards";
        }, 300);
    }
}

function rightScroll() {
    const triangleRight = document.querySelector(".dot-triangle-right")
    const rightDomainScroll = document.querySelector(".landing-domains-right").scrollTop;
    const rightDomainScrollHeight = document.querySelector(".landing-domains-right").scrollHeight;
    const rightDomainHeight = document.querySelector(".landing-domains-right").clientHeight;
    const dotsTop = document.querySelector(".dots-right").offsetTop;
    const dotsHeight = document.querySelector(".dots-right").clientHeight;
    const viewportHeight = window.innerHeight;

    // Element height and element scroll not relating to eachother properly hence the weird numbers

    if (rightDomainScroll / (rightDomainScrollHeight - rightDomainHeight) * viewportHeight < dotsTop - dotsHeight / 2) {
        triangleRight.style.top = Math.max(rightDomainScroll / (rightDomainScrollHeight - rightDomainHeight) * viewportHeight, dotsTop - dotsHeight / 2) + "px";
    } else {
        triangleRight.style.top = Math.min(rightDomainScroll / (rightDomainScrollHeight - rightDomainHeight) * viewportHeight, dotsTop + dotsHeight / 2) + "px";
    }

    // Checking domains for animation
    const com = document.querySelector(".com");
    const gmail = document.querySelector(".gmail");
    const businessGmail = document.querySelector(".business-gmail");

    const github = document.querySelector(".github");
    const linkedin = document.querySelector(".linkedin");
    const youtube = document.querySelector(".youtube");

    const middle = document.querySelector(".landing-screen-title");

    if (com.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        com.classList.add("in-focus");
        gmail.classList.remove("in-focus");
        businessGmail.classList.remove("in-focus");
        linkedin.classList.remove("in-focus");
        github.classList.remove("in-focus");
        youtube.classList.remove("in-focus");
    } else if (gmail.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        gmail.classList.add("in-focus");
        businessGmail.classList.remove("in-focus");
        com.classList.remove("in-focus");
        linkedin.classList.remove("in-focus");
        github.classList.remove("in-focus");
        youtube.classList.remove("in-focus");
    } else if (businessGmail.getBoundingClientRect().top >= middle.getBoundingClientRect().top - 50) {
        businessGmail.classList.add("in-focus");
        com.classList.remove("in-focus");
        gmail.classList.remove("in-focus");
        linkedin.classList.remove("in-focus");
        github.classList.remove("in-focus");
        youtube.classList.remove("in-focus");
    }

    // Setting the current domain
    if (document.querySelector(".in-focus").innerHTML == ".com") {
        document.querySelector(".current-domain").href = "https://aaronworsnop" + document.querySelector(".in-focus").innerHTML;
    } else {
        document.querySelector(".current-domain").href = "mailto:aaronworsnop" + document.querySelector(".in-focus").innerHTML + "?subject=&body=Hey%20Aaron%2C";
    }
}

// Domains scrollable via mouse drag

const scrollAreaLeft = document.querySelector(".landing-domains-left");
const scrollAreaRight = document.querySelector(".landing-domains-right");

let startX;
let scrollTop;
let isDown;

scrollAreaLeft.addEventListener("mousedown", (e) => mouseIsDownLeft(e));
scrollAreaLeft.addEventListener("mouseup", (e) => mouseUp(e));
scrollAreaLeft.addEventListener("mouseleave", (e) => mouseLeave(e));
scrollAreaLeft.addEventListener("mousemove", (e) => mouseMoveLeft(e));
scrollAreaLeft.addEventListener("mouseover", (e) => mouseOverLeftDomains(e));
scrollAreaLeft.addEventListener("mouseout", (e) => mouseLeaveLeftDomains(e));

scrollAreaRight.addEventListener("mousedown", (e) => mouseIsDownRight(e));
scrollAreaRight.addEventListener("mouseup", (e) => mouseUp(e));
scrollAreaRight.addEventListener("mouseleave", (e) => mouseLeave(e));
scrollAreaRight.addEventListener("mousemove", (e) => mouseMoveRight(e));

function mouseIsDownLeft(e) {
    isDown = true;
    startY = e.pageY - scrollAreaLeft.offsetTop;
    scrollTop = scrollAreaLeft.scrollTop;

    // Set scroll snap to none
    scrollAreaLeft.style.scrollSnapType = "none";

    // set cursor to grabbing
    scrollAreaLeft.classList.add("cursor-pressed-interactable");
    cursor.classList.add("cursor-enlarge-pressed");

    if (document.querySelector(".tooltip-text").style.display == "flex") {
        document.querySelector(".tooltip-text").classList.add("bounce-animation");
        setTimeout(function () {
            document.querySelector(".tooltip-text").classList.remove("bounce-animation");
        }, 600);

    }
}

function mouseIsDownRight(e) {
    isDown = true;
    startY = e.pageY - scrollAreaRight.offsetTop;
    scrollTop = scrollAreaRight.scrollTop;

    // Set scroll snap to none
    scrollAreaRight.style.scrollSnapType = "none";

    // set cursor to grabbing
    scrollAreaRight.classList.add("cursor-pressed-interactable");
    cursor.classList.add("cursor-enlarge-pressed");
}

function mouseUp(e) {
    isDown = false;

    cursor.classList.remove("cursor-enlarge-pressed");

    var elements = document.querySelectorAll('.desktop');

    scrollToNearestElement(scrollAreaLeft, elements);
    scrollToNearestElement(scrollAreaRight, elements);

    function scrollToNearestElement(scrollableElement, elements) {
        var closestDistance = Infinity;
        var closestElement;

        // Get the vertical center of the scrollableElement
        var scrollableCenter = scrollableElement.scrollTop + scrollableElement.clientHeight / 2;

        // Iterate through each element and calculate its distance from the scrollable center
        elements.forEach(function (element) {
            var distance = Math.abs(element.offsetTop + element.clientHeight / 2 - scrollableCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = element;
            }
        });

        // Calculate the desired scroll position to center the closest element
        var scrollPosition = closestElement.offsetTop - scrollableElement.clientHeight / 2 + closestElement.clientHeight / 2;

        // Scroll to the desired position
        scrollableElement.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        });

        // After scrolling to desired position, reset scroll-snap
        setTimeout(function () {
            scrollAreaLeft.style.scrollSnapType = "y mandatory";
            scrollAreaRight.style.scrollSnapType = "y mandatory";
        }, 175);
    }


    // Resetting the cursor
    scrollAreaLeft.classList.remove("cursor-pressed-interactable");
    scrollAreaRight.classList.remove("cursor-pressed-interactable");
}

function mouseLeave(e) {
    isDown = false;

    var elements = document.querySelectorAll('.desktop');

    scrollToNearestElement(scrollAreaLeft, elements);
    scrollToNearestElement(scrollAreaRight, elements);

    function scrollToNearestElement(scrollableElement, elements) {
        var closestDistance = Infinity;
        var closestElement;

        // Get the vertical center of the scrollableElement
        var scrollableCenter = scrollableElement.scrollTop + scrollableElement.clientHeight / 2;

        // Iterate through each element and calculate its distance from the scrollable center
        elements.forEach(function (element) {
            var distance = Math.abs(element.offsetTop + element.clientHeight / 2 - scrollableCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = element;
            }
        });

        // Calculate the desired scroll position to center the closest element
        var scrollPosition = closestElement.offsetTop - scrollableElement.clientHeight / 2 + closestElement.clientHeight / 2;

        // Scroll to the desired position
        scrollableElement.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        });

        // After scrolling to desired position, reset scroll-snap
        setTimeout(function () {
            scrollAreaLeft.style.scrollSnapType = "y mandatory";
            scrollAreaRight.style.scrollSnapType = "y mandatory";
        }, 175);
    }

    // Resetting the cursor
    scrollAreaLeft.classList.remove("cursor-pressed-interactable");
    scrollAreaRight.classList.remove("cursor-pressed-interactable");
}

function mouseMoveLeft(e) {
    if (isDown) {
        e.preventDefault();
        //Move vertcally
        const y = e.pageY - scrollAreaLeft.offsetTop;
        const walkY = (y - startY) * 1;
        scrollAreaLeft.scrollTop = scrollTop - walkY;
    }
}

function mouseMoveRight(e) {
    if (isDown) {
        e.preventDefault();
        //Move vertcally
        const y = e.pageY - scrollAreaRight.offsetTop;
        const walkY = (y - startY) * 1;
        scrollAreaRight.scrollTop = scrollTop - walkY;
    }
}

function mouseOverLeftDomains(e) {
    document.querySelector(".tooltip-text").style.opacity = "1";
}

function mouseLeaveLeftDomains(e) {
    if (leftScrollCount > 10) {
        document.querySelector(".tooltip-text").style.opacity = "0";
        setTimeout(function () {
            document.querySelector(".tooltip-text").style.display = "none";
        }, 300);
    } else {
        document.querySelector(".tooltip-text").style.opacity = "0";
    }
}

// Contact pane

function closeContactPane() {
    const contactForm = document.querySelector(".contact-glass");
    const contactBackground = document.querySelector(".contact-background");
    contactForm.classList.add("animate-glass-out");
    contactForm.classList.remove("animate-glass-in");
    contactBackground.style.display = "none";
}

function openContactPane(element) {
    if (element.classList.contains("nav-item")) {
        var textarea = document.querySelector('.contact-content-textarea textarea[name="message"]');
        textarea.placeholder = "Let's start a conversation.";
    }
    const contactForm = document.querySelector(".contact-glass");
    const contactBackground = document.querySelector(".contact-background");
    contactForm.classList.add("animate-glass-in");
    contactForm.classList.remove("animate-glass-out");
    contactBackground.style.display = "block";
}

// Dark mode

function darken() {
    document.querySelector("#background-video").src = "vid/Dark Background.mp4";
    document.querySelector("#background-video").style.opacity = "0.6";
    setCookie("siteMode", "dark", 30);
}

function lighten() {
    const video = document.querySelector("#background-video");
    video.src = "vid/Background.mp4";

    video.addEventListener("canplaythrough", function () {
        video.style.opacity = "1";
    }, { once: true });

    setCookie("siteMode", "light", 30);
}

function doDarkMode(element) {
    const isChecked = element.checked;

    // Change the background video to dark mode
    if (isChecked) {
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(darken, 300);
    } else {
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(lighten, 400);
    }
}

function toggleLinks() {
    const mobileGithub = document.querySelector(".link-git");
    const mobileLinkedin = document.querySelector(".link-in");
    const mobileYoutube = document.querySelector(".link-tube");

    const title = document.querySelector(".landing-screen-title");

    if (title.classList.contains("title-down") && document.querySelector(".link-folio").classList.contains("link-appear")) {
        document.querySelector(".link-folio").classList.remove("link-appear");
        document.querySelector(".link-folio").classList.add("link-disappear");
        document.querySelector(".link-perience").classList.remove("link-appear");
        document.querySelector(".link-perience").classList.add("link-disappear");
        document.querySelector(".link-script").classList.remove("link-appear");
        document.querySelector(".link-script").classList.add("link-disappear");
        document.querySelector(".link-resume").classList.remove("link-appear");
        document.querySelector(".link-resume").classList.add("link-disappear");
        mobileGithub.classList.remove("link-disappear");
        mobileGithub.classList.add("link-appear");
        mobileLinkedin.classList.remove("link-disappear");
        mobileLinkedin.classList.add("link-appear");
        mobileYoutube.classList.remove("link-disappear");
        mobileYoutube.classList.add("link-appear");
    } else if (mobileGithub.classList.contains("link-appear")) {
        mobileGithub.classList.remove("link-appear");
        mobileGithub.classList.add("link-disappear");
        mobileLinkedin.classList.remove("link-appear");
        mobileLinkedin.classList.add("link-disappear");
        mobileYoutube.classList.remove("link-appear");
        mobileYoutube.classList.add("link-disappear");
        title.classList.remove("title-down");
        title.classList.add("title-up");
    } else {
        mobileGithub.classList.remove("link-disappear");
        mobileGithub.classList.add("link-appear");
        mobileLinkedin.classList.remove("link-disappear");
        mobileLinkedin.classList.add("link-appear");
        mobileYoutube.classList.remove("link-disappear");
        mobileYoutube.classList.add("link-appear");
        title.classList.remove("title-up");
        title.classList.add("title-down");
    }
}

function toggleLinksMe() {
    const mobilePortfolio = document.querySelector(".link-folio");
    const mobileExperience = document.querySelector(".link-perience");
    const mobileTranscript = document.querySelector(".link-script");
    const mobileResume = document.querySelector(".link-resume");

    const title = document.querySelector(".landing-screen-title");

    if (title.classList.contains("title-down") && document.querySelector(".link-git").classList.contains("link-appear")) {
        document.querySelector(".link-git").classList.remove("link-appear");
        document.querySelector(".link-git").classList.add("link-disappear");
        document.querySelector(".link-in").classList.remove("link-appear");
        document.querySelector(".link-in").classList.add("link-disappear");
        document.querySelector(".link-tube").classList.remove("link-appear");
        document.querySelector(".link-tube").classList.add("link-disappear");
        mobilePortfolio.classList.remove("link-disappear");
        mobilePortfolio.classList.add("link-appear");
        mobileExperience.classList.remove("link-disappear");
        mobileExperience.classList.add("link-appear");
        mobileTranscript.classList.remove("link-disappear");
        mobileTranscript.classList.add("link-appear");
        mobileResume.classList.remove("link-disappear");
        mobileResume.classList.add("link-appear");
    } else if (mobilePortfolio.classList.contains("link-appear")) {
        mobilePortfolio.classList.remove("link-appear");
        mobilePortfolio.classList.add("link-disappear");
        mobileExperience.classList.remove("link-appear");
        mobileExperience.classList.add("link-disappear");
        mobileTranscript.classList.remove("link-appear");
        mobileTranscript.classList.add("link-disappear");
        mobileResume.classList.remove("link-appear");
        mobileResume.classList.add("link-disappear");
        title.classList.remove("title-down");
        title.classList.add("title-up");
    } else {
        mobilePortfolio.classList.remove("link-disappear");
        mobilePortfolio.classList.add("link-appear");
        mobileExperience.classList.remove("link-disappear");
        mobileExperience.classList.add("link-appear");
        mobileTranscript.classList.remove("link-disappear");
        mobileTranscript.classList.add("link-appear");
        mobileResume.classList.remove("link-disappear");
        mobileResume.classList.add("link-appear");
        title.classList.remove("title-up");
        title.classList.add("title-down");
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

// retrieve the values from cookies
var storedSiteMode = getCookie("siteMode");
var storedHasUsedDomains = getCookie("hasUsedDomains");
