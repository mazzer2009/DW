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
                let button = $("#form-login-button");
                button.attr("onclick", "ServerComm.logout()");
                button.html('<span class="glyphicon glyphicon-log-in"></span>Logout');
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
            console.log(data);
            if (data.response === "ok" && data.data.password === strPassword) {
                let button = $("#form-login-button");
                button.attr("onclick", "ServerComm.logout()");
                button.html('<span class="glyphicon glyphicon-log-in"></span>Logout');
            } else {
                alert("Credenciais inválidas!");
            }
        });
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