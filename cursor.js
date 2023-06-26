const cursor = document.querySelector(".cursor");

var posX = 0;
var posY = 0;
var mouseX = 0;
var mouseY = 0;

// Cursor follows mouse
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update the cursor position
    cursor.style.left = mouseX - 10 + "px";
    cursor.style.top = mouseY - 10 + "px";

    // Cursor disappears when hovering over disappearable elements
    if (document.querySelector(".cursor-disappear-interactable:hover")) {
        cursor.classList.add("cursor-disappear");
    } else {
        cursor.classList.remove("cursor-disappear");
    }

    // Cursor highlights when hovering over highlightable elements
    if (document.querySelector(".cursor-highlight-interactable:hover")) {
        cursor.classList.add("cursor-highlight");
    } else {
        cursor.classList.remove("cursor-highlight");
    }

    // Cursor turns into a caret when hovering over a textbox
    if (document.querySelector(".cursor-caret-interactable:hover")) {
        cursor.classList.add("cursor-caret");
    } else {
        cursor.classList.remove("cursor-caret");
    }

    // Cursor turns enlarges when hovering over enlargable elements
    if (document.querySelector(".cursor-enlarge-interactable:hover")) {
        cursor.classList.add("cursor-enlarge");
    } else {
        cursor.classList.remove("cursor-enlarge");
    }

    // Cursor "presses" when pressing and hovering over pressable elements
    if (document.querySelector(".cursor-pressed-interactable:hover")) {
        cursor.classList.add("cursor-enlarge-pressed");
    } else {
        cursor.classList.remove("cursor-enlarge-pressed");
    }
});