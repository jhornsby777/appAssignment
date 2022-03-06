class Model{
    constructor(name, style) {
        this.name = name;
        this.style = style;
    }

    describe() {
        return `${this.name} plays ${this.style}`;
    }
}

class Make {
    constructor(name){
        this.name = name;
        this.models = [];
    }

    addmodel(model) {
        if (model instanceof model){
            this.models.push(model);
        } else {
            throw new Error(`You can only add an instance of model. Argument is not a model: ${model}`)
        }
    }

    describe(){
        return `${this.name} has ${this.models.length} models.`
    }
}

class Menu {
    constructor() {
        this.makes = [];
        this.selectedmake = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
         switch (selection) {
             case '1':
                 this.createmake();
                 break;
            case '2':
                this.viewmake();
                break;
            case '3':
                this.deletemake();
                break;
            case '4':
                this.displaymake();
                break;
            default:
                selection = 0;
         }   
         selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt (`
        0) exit
        1) create new make
        2) view make
        3) delete make
        4) display all makes
        `);
    }

    showmakeMenuOptions(makeInfo) {
        return prompt (`
        0) back
        1) create model
        2) delete model
        --------------------
        ${makeInfo}
        `);
    }

    displaymakes() {
        let makeString = '';
        for (let i = 0; i < this.makes.length; i++){
            makeString += i+ ') ' + this.makes[i].name + '\n';
        }
        alert(makeString);
    }

    createmake() {
        let name = prompt('Enter name for new make:');
        this.makes.push(new Make(name));
    }

    viewmake() {
        let index = prompt('Enter the index of the make you wish to view');
        if (index > -1 && index < this.makes.length) {
            this.selectedmake = this.makes[index];
            let description = 'make Name: ' + this.selectedmake.name + '\n';

            for (let i = 0; i < this.selectedmake.models.length; i++) {
                description += i + ') ' + this.selectedmake.models[i].name 
                + ' - ' + this.selectedmake.models[i].style + '\n';
            }

            let selection = this.showmakeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createmodel();
                    break;
                case '2':
                    this.deletemodel(); 
            }
        }
    }

    deletemake() { 
        let index = prompt('Enter the index of the make you wish to delete');
        if (index > -1 && index < this.makes.length) {
            this.makes.splice(index, 1);
        }
    }

    createmodel() {
        let name = prompt('Enter name for new model:');
        let style = prompt ('Enter style for new model');
        this.selectedmake.models.push(new Model(name, style));
    }

    deletemodel() {
        let index = prompt('Enter the index of the model you would like to delete:');
        if (index > -1 && index < this.selectedmake.models.length) {
            this.selectedmake.models.splice(index, 1);
        }
    }
}

    
    let menu = new Menu()
    menu.start();