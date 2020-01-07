class MenuComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {
        console.log("Рендер меню");
        let menu = document.createElement("div");
        
        let createStageButton = document.createElement("button");
        createStageButton.name = "createStageButton";
        let createStageText = document.createTextNode("Добавить стадию");
        createStageButton.appendChild(createStageText);
        createStageButton.onclick = function(){
            alert("Добавить стадию");
        };

        let createCardButton = document.createElement("button");
        createCardButton.name = "createCardButton";
        let createCardText = document.createTextNode("Добавить карточку");
        createCardButton.appendChild(createCardText);
        createCardButton.onclick = function(){
            alert("Добавить карточку");
        };

        menu.appendChild(createStageButton);
        menu.appendChild(createCardButton);

        this._parent.appendChild(menu);
    }
}

export let Menu = new MenuComponent();