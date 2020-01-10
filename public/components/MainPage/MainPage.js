import {MenuComponent} from '/components/Menu/Menu.js';
import {Stage} from '/components/Stage/Stage.js';
import {Ajax} from '/modules/AjaxModule.js';

class MainPageSingleton {
    constructor(parent = document.body) {
        this._parent = parent;

        this.elem = document.createElement('div');

        this.Menu = new MenuComponent(this.elem, this._render);
        this.Menu.render(this.render.bind(this));

        this.place = document.createElement('div');
        this.place.classList.add('board-place');

        this.elem.appendChild(this.place);
        this._parent.appendChild(this.elem);
    }

    render() {
        this.place.innerHTML = '';

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

                    const stage = new Stage(this.place);
                    stage.setData(i, responseBody[i].name)
                    stage.render(this.render.bind(this));
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
    }
}
export let MainPage = new MainPageSingleton()