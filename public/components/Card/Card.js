import {Ajax} from '/modules/AjaxModule.js';

export class Card {
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    setData(id, name) {
        this._data = {
            "id": id,
            "name": name
        };
    }

    render(callback) {
        console.log("Рендер Card", this._data);
        let id = this._data.id;

        let elem = document.createElement("card_" + id);
        elem.innerHTML = "<h1>" + id + ". " + this._data.name + "</h1>";

        let nextBtn = document.createElement('button');
        nextBtn.innerHTML = 'Завершить';
        elem.appendChild(nextBtn);
        
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Ajax.doPut({
                url: '/api/next',
                body: { 'id': id },
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

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Удалить';
        elem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Ajax.doDelete({
                url: '/api/card',
                body: { 'id': id },
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

        this._parent.appendChild(elem);
    }
}