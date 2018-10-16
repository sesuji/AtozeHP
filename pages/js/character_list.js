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