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
        menu.classList.add('flex-container');
        // menu.classList.add('header');

        // const text = document.createElement('a');
        // text.innerHtml = 'TODO';
        // text.classList.add('stamp-words');
        // menu.appendChild(text);
        
        const stageInput = document.createElement('input');
        stageInput.type = 'text';
        stageInput.name = 'name';
        stageInput.placeholder = 'Введите название стадии...';
        stageInput.classList.add('one-line-input');

        const stageBtn = document.createElement('input');
        stageBtn.type = 'submit';
        stageBtn.value = 'Добавить стадию';
        stageBtn.classList.add('btn-green');

        const stageForm = document.createElement('form');
        stageForm.classList.add('one-line-form')
        stageForm.appendChild(stageInput);
        stageForm.appendChild(stageBtn);

        const stageContainer = document.createElement('div')
        stageContainer.classList.add('inline-flex-container');
        stageContainer.appendChild(stageForm);

        const cardInput = document.createElement('input');
        cardInput.type = 'text';
        cardInput.name = 'name';
        cardInput.placeholder = 'Введите название задачи...';
        cardInput.classList.add('one-line-input');

        const cardBtn = document.createElement('input');
        cardBtn.type = 'submit';
        cardBtn.value = 'Добавить задачу';
        cardBtn.classList.add('btn-green');

        const cardForm = document.createElement('form');
        cardForm.classList.add('one-line-form')
        cardForm.appendChild(cardInput);
        cardForm.appendChild(cardBtn);

        const cardContainer = document.createElement('div')
        cardContainer.classList.add('inline-flex-container');
        cardContainer.appendChild(cardForm);

        stageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = stageForm.elements['name'].value;
            stageForm.elements['name'].value = '';
            if (name == '') {
                alert('Внимание! Необходимо ввести название стадии.')
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
            cardForm.elements['name'].value = '';
            if (name == '') {
                alert('Внимание! Необходимо ввести название задачи.')
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

        menu.appendChild(stageContainer);
        menu.appendChild(cardContainer);

        this._parent.appendChild(menu);
    }
}
