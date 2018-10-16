/*
window.onload = function () {
    const character = document.getElementsByClassName("character");
    if (character.length) {
        const type = character[0].id;
        const currentColor = getComputedStyle(document.getElementById(type)).backgroundColor;
        document.body.style.backgroundColor = currentColor;
        document.documentElement.style.backgroundColor = currentColor;
    }
}
*/

// document.addEventListener("DOMContentLoaded", function () {
// generateCharacterStatus();
// });

function generateCharacterStatus(chara) {
    if (chara.element_id) {
        const html = document.getElementsByTagName('html')[0];
        html.className += ' ' + chara.element_id;
        document.body.className += ' ' + chara.element_id;
        const content = document.getElementsByClassName('character')[0];
        content.id = chara.element_id;
    }
    if (chara.image) {
        const img = document.getElementById('image');
        img.src = chara.image;
    }
    if (chara.name_main) {
        setValueToElementID('name-main', document.createTextNode(chara.name_main));
    }
    if (chara.name_kana) {
        setValueToElementID('name-kana', document.createTextNode(chara.name_kana));
        document.title += (chara.name_kana).toUpperCase();
    }
    if (chara.quote) {
        setValueToElementID('quote', document.createTextNode(chara.quote));
    }
    if (chara.spec_l && chara.spec_l.length > 0) {
        const fragment = document.createDocumentFragment();
        chara.spec_l.forEach(element => {
            if (element.value) {
                fragment.appendChild(createSpecElement(element.id, element.name, element.value));
            }
        });
        setValueToElementID('spec-l', fragment);
    }
    if (chara.spec_r && chara.spec_r.length > 0) {
        const fragment = document.createDocumentFragment();
        chara.spec_r.forEach(element => {
            if (element.value) {
                fragment.appendChild(createSpecElement(element.id, element.name, element.value));
            }
        });
        setValueToElementID('spec-r', fragment);
    }
    if (chara.profile) {
        setValueToElementID('profile-text', document.createTextNode(chara.profile));
    }
    if (chara.talk && chara.talk.length > 0) {
        const fragment = document.createDocumentFragment();
        chara.talk.forEach(element => {
            if (element.value) {
                fragment.appendChild(createTalkElement(element.name, element.value, element.icon, element.isRight));
            }
        });
        setValueToElementID('talk', fragment);
    }
    if (chara.pictures && chara.pictures.length > 0) {

    }
}

function setValueToElementID(id, value) {
    const profile = document.getElementById(id);
    profile.appendChild(value);
}

function createSpecElement(id, name, value) {
    const dl = document.createElement('dl');
    if (id) {
        dl.id = id;
    }
    
    const dt = document.createElement('dt');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(name));
    dt.appendChild(span);
    dt.appendChild(document.createElement('i'));

    const dd = document.createElement('dd');
    dd.appendChild(document.createTextNode(value));

    dl.appendChild(dt);
    dl.appendChild(dd);
    return dl;
}

function createTalkElement(name, text, icon, isRight = false) {
    const talk = document.createElement('div');
    talk.className = 'talk';
    if (isRight) {
        talk.className += ' ' + 'right';
    }
    const iconEl = document.createElement('div');
    iconEl.className = 'icon';

    const imgEl = document.createElement('img');
    imgEl.src = icon
    iconEl.appendChild(imgEl);
    var br = document.createElement("br");
    iconEl.appendChild(br);
    iconEl.appendChild(document.createTextNode(name));

    const textEl = document.createElement('div');
    textEl.className = 'text';
    textEl.appendChild(document.createTextNode(text));

    talk.appendChild(iconEl);
    talk.appendChild(textEl);
    return talk;
}

