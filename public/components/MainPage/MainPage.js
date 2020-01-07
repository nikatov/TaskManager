import {Menu} from '/components/Menu/Menu.js';
import {Stage} from '/components/Stage/Stage.js';
import {Ajax} from '/modules/AjaxModule.js';

class MainPageSingleton {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {

        console.log('Рендер MainPage, this._data:', this._data);
        let elem = document.createElement("MainPage");

        Menu.render();

        Ajax.doPromiseGet({
            url: '/api/stage',
            body: null
        })
        .then(function (obj) {
            const { responseText } = obj;
            try {
                const responseBody = JSON.parse(responseText);
                console.log("ответ с /api/stage", responseBody)
                for(const i in responseBody) {

                    console.log(i, responseBody[i]);

                    const stage = new Stage(elem);
                    stage.setData(i, responseBody[i].name)
                    stage.render();

                    // addevetlistener тут
                    // listadd css
                    // appendChild
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
export let MainPage = new MainPageSingleton()