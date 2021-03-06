class Trophy extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, '');
        this.data = {};
        this.data['first coin'] = {
            name: 'first coin',
            xp: 10,
            title: 'First Coin',
            description: 'The adventure begins'
        };

        this.panels = []; // fila de paineis de trofeus
        this.achieved = []; // lista dos nomes do trofeus jah conquistados

        //ServerComm.clearTrophy((r) => console.log( JSON.stringify(r) ) ) 

        // listar os trofeus no servidor e atualizar this.achieved
        ServerComm.listTrophy((response) => this.updateAchievedTrophies(response));
    }

    updateAchievedTrophies(json) {
        // coloca os nomes dos trofeus na lista de controle: this.achieved
        for (var i = 0; i < json.data.length; i++) {
            this.achieved.push(json.data[i]);
            this.addTrophyOnPage(json.data[i]);
        }
    }

    createPanel(trophyName) {
        let panelY = this.game.height - 74 - this.panels.length * 74;
        let panel = this.game.add.sprite(this.game.width - 250, panelY, 'trophy');
        panel.fixedToCamera = true;
        //panel.alpha = 0

        let labelX = 66;
        let labelWidth = panel.width - labelX;
        let style = {
            font: '10px Arial',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: labelWidth
        };
        let label = this.game.add.text(labelX, 5, '', style);
        label.lineSpacing = -7;
        panel.addChild(label);

        // define label
        label.text = this.data[trophyName].title + '   +';
        label.text += this.data[trophyName].xp + '\n\n';
        label.text += this.data[trophyName].description;

        return panel;
    }

    show(trophyName) {
        if (this.achieved.includes(trophyName)) {
            return;
        }

        ServerComm.addTrophy(this.data['first coin'], (response) => this.onServerResponse(response, trophyName))
    }

    onServerResponse(response, trophyName) {
        if (response['response'] !== 'ok') {
            console.log("ERRO de comunicao com o servidor");
            return
        }
        this.achieved.push(trophyName);

        let panel = this.createPanel(trophyName);
        this.panels.push(panel);
        // agenda a destruicao do panel
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removePanel, this);

        this.addTrophyOnPage(trophyName);
    }

    addTrophyOnPage(trophyName) {
        /*
         // DOM
         let divTrophy = document.getElementById('div-trophy')
         divTrophy.innerHTML += 
         '<p>' + JSON.stringify(this.data['first death']) + '</p>'
         */
        // jQuery
//        $('#div-trophy').append('<p>' + JSON.stringify(this.data[trophyName]) + '</p>')
    }

    removePanel() {
        let p = this.panels.shift();
        p.destroy();
    }
}