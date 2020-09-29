/* Query Selectors (these values may change) */
const mainContainer = document.querySelector(".jsMainContainer"); 
const resetButton = document.querySelector(".jsButtonReset"); 
const gridSlider = document.querySelector(".jsGridSlider");
const rainbowButton = document.querySelector(".jsButtonRainbow");
const htmlGridSize = document.querySelector(".jsGridSize");

/* Variables */
let gridSize = 8;
let rainbowModeToggle = false;

/* Event Listeners */
resetButton.addEventListener("click", resetGrid);
rainbowButton.addEventListener("click", () => {
    rainbowModeToggle = rainbowModeToggle ? false : true;
    checkRainbowMode();
});
gridSlider.addEventListener("input", resizeGrid);

/* Functions */

/**
 * Function to add multiple elements to a container
 */
function createGrid (gridSize) { 
    console.log("size: " + gridSize);
    mainContainer.style.setProperty("--grid-size", gridSize);
    gridSlider.setAttribute("value", gridSize);

    for(let i = 0; i < (gridSize * gridSize); i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("main__grid");
        gridItem.setAttribute("data-colored", "false");

        mainContainer.appendChild(gridItem);

        gridItem.addEventListener("mouseover", addHoverEffect);
    }
}

/**
 * Function that adds hover effect to a grid item
 */
function addHoverEffect() {
    backgroundColor = checkRainbowMode();
    
    colored = (this.getAttribute("data-colored") == "false") ? false : true;

    if(!colored) { 
        this.style.setProperty("--background-color", backgroundColor);
        this.classList.add("main__grid--hover");
        this.setAttribute("data-colored", "true");
    }
}

/**
 * Function that checks if rainbow mode is active
 *    When active, button gets activated and background color gets created by the function createRandomBackgroundColor;
 *    When inactive, button gets deactivated and background color is set to black.
 */
function checkRainbowMode() {
    if(rainbowModeToggle) {
        rainbowButton.classList.add("button__rainbow--active");
        backgroundColor = createRandomBackgroundColor();
    }
    else {
        rainbowButton.classList.remove("button__rainbow--active");
        backgroundColor = "black";   
    }

    return backgroundColor
}

/**
 * Function that resizes the grid
 */
function resizeGrid () {
    while(mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }

    htmlGridSize.innerHTML = gridSlider.value;

    createGrid(gridSlider.value);
}

/**
 * Function that clear colored grid
 */
function resetGrid() {
    const gridNodes = mainContainer.childNodes;

    gridNodes.forEach(gridNode => {
        gridNode.classList.remove("main__grid--hover");
        gridNode.setAttribute("data-colored", "false");
    });
}

/**
 * Function that creates an random background color for a grid item
 */
function createRandomBackgroundColor() {
    let num = Math.round(0xffffff * Math.random());

    let r = num >> 16; //bit shift 16 places, so you keep the first 8 bits from num.
    let g = num >> 8 & 255; //bit shift 8 place, so you keep first 16 bits. Then do a bitwise and with 255 (11111111) to eliminate the first 8 bits. This way you keep the middle 8 bits from num.
    let b = num & 255; //no bit shift. Bitwise and with 255 (11111111) to eliminate first 16 bits. This way you keep the last 8 bits from num.

    let color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

createGrid(gridSize);