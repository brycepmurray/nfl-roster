function PlayerService(callback) {
    var playersData = [];
    var myPlayers = [];

    this.getPlayers = function() {
        return playersData;
        console.log(playersData.pro_team)
    }

    this.getMyPlayers = function() {
        return myPlayers;
    }

    this.getPlayersByTeam = function(teamName) {
        return playersData.filter(function(player) {
            if (player.pro_team == teamName) {
                return true;
            }
        })
    }
    this.getPlayersByPosition = function(position) {
        return playersData.filter(function(player) {
            if (player.position == position) {
                return true;
            }
        })
    }
    this.getPlayersByName = function(name) {
        return playersData.filter(function(player) {
            if (player.fullname.toLowerCase().includes(name.toLowerCase())) {
                return true
            }
        })
    }

    this.addPlayer = function addPlayer(id) {
        for (var i = 0; i < playersData.length; i++) {
            const player = playersData[i];
            if (player.id == id) {
                myPlayers.push(player)
            }
        }
    }

    this.removePlayerById = function removePlayerById(id) {
        for (var i = 0; i < myPlayers.length; i++) {
            const player = myPlayers[i];
            if (player.id == id) {
                myPlayers.splice(i, 1)
            }
        }
    }

    function loadPlayersData() {

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
        }


        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function(data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }
    loadPlayersData();
}