window.onload = function () {
    const character = document.getElementsByClassName("character");
    if (character.length) {
        const type = character[0].id;
        const currentColor = getComputedStyle(document.getElementById(type)).backgroundColor;
        document.documentElement.style.backgroundColor = currentColor;
    }
}



