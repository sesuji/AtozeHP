var topContent = document.getElementById('top'),
    nextContent = document.getElementById('character'),
    documentElement = null;
isOver = false;

if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
    // Webkit系（Safari, Chrome, iOS）、IE5はbody要素
    documentElement = document.body;
} else {
    // IE（6以上）、Firefox、Operaはhtml要素
    documentElement = document.documentElement;
}
if (nextContent.getBoundingClientRect().top > 0) {
    document.getElementById("header").classList.add("invisible");
    isOver = false;
} else {
    isOver = true;
}

// 指定要素のスクロール量取得
topContent.onscroll = function () {
    let positionTop = this.scrollTop;
    console.log(positionTop);
};

// ウィンドウのスクロール量取得
window.onscroll = function () {
    // console.log(documentElement.scrollTop || window.scrollY);
    enableMenu();

};

function enableMenu() {
    if (nextContent.getBoundingClientRect().top > 0 && isOver) {
        document.getElementById("header").classList.toggle("invisible");
        isOver = false;
    }
    if (nextContent.getBoundingClientRect().top < 0 && !isOver) {
        document.getElementById("header").classList.toggle("invisible");
        isOver = true;
    }
}