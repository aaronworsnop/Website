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
    scrollAreaLeft.style.cursor = "grabbing";
}

function mouseIsDownRight(e) {
    isDown = true;
    startY = e.pageY - scrollAreaRight.offsetTop;
    scrollTop = scrollAreaRight.scrollTop;

    // Set scroll snap to none
    scrollAreaRight.style.scrollSnapType = "none";

    // set cursor to grabbing
    scrollAreaRight.style.cursor = "grabbing";
}

function mouseUp(e) {
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
        elements.forEach(function(element) {
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

        // 0.5s after scrolling to desired position, reset scroll-snap
        setTimeout(function() {
            scrollAreaLeft.style.scrollSnapType = "y mandatory";
            scrollAreaRight.style.scrollSnapType = "y mandatory";
        }, 175);
    }
      

    // Resetting the cursor
    scrollAreaLeft.style.cursor = "grab";
    scrollAreaRight.style.cursor = "grab";
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
        elements.forEach(function(element) {
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

        // 0.5s after scrolling to desired position, reset scroll-snap
        setTimeout(function() {
            scrollAreaLeft.style.scrollSnapType = "y mandatory";
            scrollAreaRight.style.scrollSnapType = "y mandatory";
        }, 175);
    }
    
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

function closeContactPane() {
    const contactForm = document.querySelector(".contact-glass");
    const contactBackground = document.querySelector(".contact-background");
    contactForm.classList.add("animate-glass-out");
    contactForm.classList.remove("animate-glass-in");
    contactBackground.style.display = "none";
}

function openContactPane() {
    const contactForm = document.querySelector(".contact-glass");
    const contactBackground = document.querySelector(".contact-background");
    contactForm.classList.add("animate-glass-in");
    contactForm.classList.remove("animate-glass-out");
    contactBackground.style.display = "block";
}

// Dark mode

function darken() {
    document.querySelector("#background-video").src = "vid/Dark Background Better.mp4";
    document.querySelector("#background-video").style.opacity = "0.5";
}

function lighten() {
    document.querySelector("#background-video").src = "vid/Background.mp4";
    document.querySelector("#background-video").style.opacity = "1";
}

function doDarkMode() {
    const isChecked = document.querySelector("#dark-mode").checked;

    // Change the background video to dark mode
    if (isChecked) {
        // Set body colour to black

        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(darken, 600);
    }

    if (!isChecked) {
        document.querySelector("body").style.backgroundColor = "white";
        document.querySelector("#background-video").style.opacity = "0";
        setTimeout(lighten, 500);
    }
}

// Contact pane
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // disable submit button
    var submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('submit-sending');

    // Get form data
    var formData = new FormData(this);

    // Create AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'mail.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Success and clear form
            alert('Email sent successfully!');
            document.getElementById('contact-form').reset();
        } else {
            var errorMessage = 'An error occurred with the contact pane. Please email me directly instead.';
            if (xhr.status === 500) {
                errorMessage = 'Internal server error. Please try again later or email me directly instead.';
            } else if (xhr.status === 400) {
                errorMessage = 'Bad request. Please check the contact pane and ensure you entered your details correctly.';
            }
            // Display error message to the user
            alert(errorMessage);
        }
        // re-enable submit button
        submitButton.disabled = false;
        submitButton.classList.remove('submit-sending');
    };

    // Send AJAX request with form data
    xhr.send(formData);
});


/* Currently working on:
 * - Currently, no one knows how to use the website. I need to add a tooltip for the domains
 * - Give the mobile site a navbar, darkmode and contact can be seperate. Also needs tooltip for
 * - opening the navexpander
 * - Mobile landing-title is too low, needs to be higher by a little bit to be centered (maybe menu)
 *   will offset this optical illusion
 * 
 * - Going from dark mode to light mode shows button, really ugly
 * 
 * - contact form clamp for text (min, vw, current size). Notice how the title scales, don't forget
 *   the "window text" (Contact pane)
 * - Figure out how to make text box take up a certain percentage of the screen, rather
 *   than the current, specified size. This way send button doesn't get pushed off.
 * - Create custom and clean (apple like) scrollbar for contact form text
 * 
 * - Animations for the domains need to be more smooth (tuning)
 * 
 * - Right domains are so glitchy
 * -
 * - PHP for sending email from content section
 * - Cookie for remembering dark mode
 * - Tic tac toe game on a portfolio card
 * - Use javascript to "animate" the contact-title in the contact form with "Let's connect.", "Reach out", 
 * "Send me a message", "Say hi" etc. Kinda like the type writer effect I have on the stream.
 * -
 * - Console font for code
 * - Mobile load "Hey, I know it's convenient to use your phone, but this experience is best on desktop;
 * And I wouldn't want anything but the best for you, my friend" or something like that. More formal?
 * 
 * - Portfolio needs to include prettiest designs made at finergy (the better ones are good, April organic posts koura,
 * new landing page images, merx, etc.)
*/