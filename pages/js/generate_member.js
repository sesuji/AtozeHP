function setMembers(id, list) {
    const container = document.getElementById(id);
    container.appendChild(generateCharacterList(list));
    unwrap(container);
}

function generateCharacterList(list) {
    const members = document.createElement("div");
    members.className = "members";
    list.forEach(chara => {
        let member = generateDivElement('member');
        const name = generateDivElement('name');

        // 画像
        const imgContainer = generateDivElement('image');
        if (chara.img) {
            const img = document.createElement("img");
            img.src = chara.img;
            imgContainer.appendChild(img);
        }
        name.appendChild(imgContainer);

        // 名前
        if (chara.name) {
            name.appendChild(document.createTextNode(chara.name));
        }

        // プロフィール
        const profile = generateDivElement('profile');
        if (chara.profile) {
            // name.style.borderBottom = 'dotted 1px #fff';
            profile.className += ' ' + 'texted';
            profile.appendChild(document.createTextNode(chara.profile));
        }
        //　リンク
        if (chara.url) {
            const link = document.createElement("a");
            link.href = chara.url;
            link.appendChild(name);
            if (chara.profile) {
                link.appendChild(profile);
            }
            member.appendChild(link);
        } else {
            member.appendChild(name);
            if (chara.profile) {
                member.appendChild(profile);
            }
        }
        members.appendChild(member);
    });
    return members;
}

const generateDivElement = name => {
    const element = document.createElement("div");
    element.className = name
    return element;
}