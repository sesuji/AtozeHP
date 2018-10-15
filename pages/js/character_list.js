// chracter_list_variables required
document.addEventListener("DOMContentLoaded", function () {
    generateCharacters();
});

function generateCharacters() {
    const list = Array.from(document.getElementsByClassName("list"));
    list.forEach(el => {
        var member_list = [];
        switch (el.id) {
            case 'first':
                member_list = first;
                break;
            case 'second':
                member_list = second;
                break;
            case 'second_another':
                member_list = second_another;
                break;
            case 'third':
                member_list = third;
                break;
            case 'fourth':
                member_list = fourth;
                break;
            case 'fifth':
                member_list = fifth;
                break;
        }
        el.appendChild(generateCharacterList(member_list));
    });
}

function generateCharacterList(list) {
    const members = document.createElement("div");
    members.className = "members";
    list.forEach(chara => {
        let member = generateElement('member');
        const name = generateElement('name');

        // 画像
        const imgContainer = generateElement('image');
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
        const profile = generateElement('profile');
        if (chara.profile) {
            name.style.paddingBottom = '4px';
            profile.style.textAlign = 'center';
            profile.style.borderTop = 'dotted 1px #fff';
            profile.style.paddingTop = '4px';
            profile.appendChild(document.createTextNode(chara.profile));
        }
        //　リンク
        if (chara.url) {
            const link = document.createElement("a");
            link.href = chara.url;
            link.appendChild(name);
            link.appendChild(profile);
            member.appendChild(link);
        } else {
            member.appendChild(name);
            member.appendChild(profile);
        }
        members.appendChild(member);
    });
    return members;
}

const generateElement = name => {
    const element = document.createElement("div");
    element.className = name
    return element;
}