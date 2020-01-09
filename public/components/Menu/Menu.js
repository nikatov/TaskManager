import {Ajax} from '/modules/AjaxModule.js';

export class MenuComponent {
    constructor(parent, renderPage) {
        this._parent = parent;
        this._stageForm = document.createElement("form");
        this._cardForm = document.createElement("form");
        this._parent.appendChild(this._stageForm);
        this._renderPage = renderPage;
    }

    render(callback) {
        console.log("Рендер меню");
        let menu = document.createElement("div");

        const stageInput = document.createElement('input');
        stageInput.type = 'text';
        stageInput.name = 'name';
        stageInput.placeholder = 'Название состояния';

        const stageBtn = document.createElement('input');
        stageBtn.type = 'submit';
        stageBtn.value = 'Добавить состояние';

        const stageForm = document.createElement('form');
        stageForm.appendChild(stageInput);
        stageForm.appendChild(stageBtn);

        const cardInput = document.createElement('input');
        cardInput.type = 'text';
        cardInput.name = 'name';
        cardInput.placeholder = 'Название карточки';

        const cardBtn = document.createElement('input');
        cardBtn.type = 'submit';
        cardBtn.value = 'Добавить карточку';

        const cardForm = document.createElement('form');
        cardForm.appendChild(cardInput);
        cardForm.appendChild(cardBtn);

        stageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = stageForm.elements['name'].value;
            if (name == '') {
                alert('Внимание! Необходимо ввести название состояния.')
                return;
            }
            Ajax.doPost({
                url: '/api/stage',
                body: { name },
                callback: function (status, responseText) {
                    if (status === 201) {
                        callback();
                        return;
                    }
                    const {error} = JSON.parse(responseText);
                    alert(error);
                }
            });
        });

        cardForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = cardForm.elements['name'].value;
            if (name == '') {
                alert('Внимание! Необходимо ввести название карточки.')
                return;
            }
            Ajax.doPost({
                url: '/api/card',
                body: { name },
                callback: function (status, responseText) {
                    if (status === 201) {
                        callback();
                        return;
                    }
                    const {error} = JSON.parse(responseText);
                    alert(error);
                }
            });
        });

        menu.appendChild(stageForm);
        menu.appendChild(cardForm);

        this._parent.appendChild(menu);
    }
}
