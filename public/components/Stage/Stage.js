import {Card} from '/components/Card/Card.js';
import {Ajax} from '/modules/AjaxModule.js';

export class Stage {
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
        console.log('Рендер Stage, this._data:', this._data);
        let elem = document.createElement('div');
        elem.classList.add('board');
        elem.innerHTML = "<h2>" + this._data.name + "</h2>";

        Ajax.doPromiseGet({
            url: '/api/card/?id=' + this._data.id,
        })
        .then(function (obj) {
            const { responseText } = obj;
            try {
                const responseBody = JSON.parse(responseText);
                console.log("ответ с /api/card", responseBody)
                for(const i in responseBody) {

                    console.log(i, responseBody[i]);

                    let card = new Card(elem);
                    card.setData(i, responseBody[i].name)
                    card.render(callback);
                }
            }
            catch (err) {
                console.log(err);
                return;
            }
        })
        .catch(function (obj) {
            console.error(obj);
            return;
        })
        this._parent.appendChild(elem);
    }   
}