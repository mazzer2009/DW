class ServerComm {
    static addTrophy(data, callback) {
        ServerComm.sendRequestTrophy('john_doe', 'add-trophy', data, callback);
    }

    static listTrophy(callback) {
        ServerComm.sendRequestTrophy('john_doe', 'list-trophy', '', callback);
    }

    static clearTrophy(callback) {
        ServerComm.sendRequestTrophy('john_doe', 'clear-trophy', '', callback);
    }

    // metodo generico a ser usado por todas as 
    // requisicoes de trofeus
    static sendRequestTrophy(user, opName, opData, callback) {
        let data = {
            id: user,
            game: null,
            op: opName,
            data: opData
        };
        ServerComm.ajaxPost(data, callback);
    }

    static ajaxPost(data, callback) {
        let url = 'http://localhost:8080/game'
        $.post(url, JSON.stringify(data))
                .done(function (data, status) {
                    callback(data);
                })
                .fail(function (jqXHR, status, errorThrown) {
                    console.log('ERROR: cannot reach game server');
                });
    }
}