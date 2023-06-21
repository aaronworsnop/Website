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

    // If the mouse HOVERS any element with the class "card", add the class "cursor-disappear" to the cursor
    if (document.querySelector(".card:hover")) {
        cursor.classList.add("cursor-disappear");
    } else {
        cursor.classList.remove("cursor-disappear");
    }
});