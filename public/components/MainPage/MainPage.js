import {MenuComponent} from '/components/Menu/Menu.js';
import {Stage} from '/components/Stage/Stage.js';
import {Ajax} from '/modules/AjaxModule.js';

class MainPageSingleton {
    constructor(parent = document.body) {
        this._parent = parent;
        this.elem = document.createElement("MainPage");
        this.Menu = new MenuComponent(this.elem, this._render);
    }

    render() {
        this.elem.innerHTML = '';
        console.log('Рендер MainPage');
        this.Menu.render(this.render.bind(this));

        Ajax.doPromiseGet({
            url: '/api/stage',
            body: null
        })
        .then( obj => {
            const { responseText } = obj;
            try {
                const responseBody = JSON.parse(responseText);
                console.log("ответ с /api/stage", responseBody)
                for(const i in responseBody) {

                    console.log(i, responseBody[i]);

                    const stage = new Stage(this.elem);
                    stage.setData(i, responseBody[i].name)
                    stage.render(this.render.bind(this));

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
        .catch( obj => {
            console.error(obj);
            return;
        })
        this._parent.appendChild(this.elem);
    }
}
export let MainPage = new MainPageSingleton()