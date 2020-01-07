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

    render() {
        console.log("Рендер Card", this._data);
        let elem = document.createElement("card_" + this._data.id);
        elem.innerHTML = "<h1>" + this._data.id + ". " + this._data.name + "</h1>";
        this._parent.appendChild(elem);
    }
}