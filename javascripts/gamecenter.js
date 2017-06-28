class ServerComm {
    static addTrophy(data, callback) {
        ServerComm.sendRequestTrophy('add-trophy', data, callback);
    }

    static listTrophy(callback) {
        ServerComm.sendRequestTrophy('list-trophy', {}, callback);
    }

    static clearTrophy(callback) {
        ServerComm.sendRequestTrophy('clear-trophy', {}, callback);
    }

    // metodo generico a ser usado por todas as 
    // requisicoes de trofeus
    static sendRequestTrophy(opName, opData, callback) {
        opData.password = Config.PASSWORD;
        let data = {
            id: Config.PLAYER,
            game: Config.GAME,
            op: opName,
            data: opData
        };
        ServerComm.ajaxPost(data, callback);
    }

    static logout() {
        let button = $("#form-login-button");
        button.attr("onclick", "ServerComm.login()");
        button.html('<span class="glyphicon glyphicon-log-in"></span>Login');
    }

    static signup() {
        let strLogin = $('#login-login').val();
        let strPassword = $('#login-password').val();
        let request = {
            id: strLogin,
            game: "marioevolution",
            op: 'add-profile',
            data: {
                password: strPassword
            }
        }
        ServerComm.ajaxPost(request, function (data) {
            if (data.response === "ok") {
                Config.PLAYER = strLogin;
                Config.PASSWORD = strPassword;
                let button = $("#form-login-button");
                button.attr("onclick", "ServerComm.logout()");
                button.html('<span class="glyphicon glyphicon-log-in"></span>Logout');
                ServerComm.populateProfile(data.data);
            } else {
                alert("Credenciais inválidas!");
            }
        });
    }

    static login() {
        let strLogin = $('#login-login').val();
        let strPassword = $('#login-password').val();
        let request = {
            id: strLogin,
            game: "marioevolution",
            op: 'query-profile',
            data: {
                password: strPassword
            }
        }
        ServerComm.ajaxPost(request, function (data) {
            if (data.response === "ok" && data.data.password === strPassword) {
                Config.PLAYER = strLogin;
                Config.PASSWORD = strPassword;
                let button = $("#form-login-button");
                button.attr("onclick", "ServerComm.logout()");
                button.html('<span class="glyphicon glyphicon-log-in"></span>Logout');
                ServerComm.populateProfile(data.data);
            } else {
                alert("Credenciais inválidas!");
            }
        });
    }

    static populateProfile(data) {
        Config.PROFILE.id = data.id;
        Config.PROFILE.data.password = data.password;
    }

    static ajaxPost(data, callback) {
        let url = 'http://localhost:8888/games';
        $.post(url, JSON.stringify(data))
                .done(function (data, status) {
                    callback(data);
                    $('#status').addClass("label-success").removeClass("label-warning");
                    $('#status').text("ONLINE");
                })
                .fail(function (jqXHR, status, errorThrown) {
                    console.log('ERROR: cannot reach game server');
                    $('#status').addClass("label-warning").removeClass("label-success");
                    $('#status').text('OFFLINE');
                });
    }
}