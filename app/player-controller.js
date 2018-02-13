function PlayerController() {
    var loading = true;
    var playerService = new PlayerService(ready);

    function ready() {

        loading = false;
    }
    //PUBLIC
    this.addPlayer = function addPlayer(id) {
        playerService.addPlayer(id)
        drawMyPlayers()
    }
    this.removePlayerById = function removePlayerById(id) {
        playerService.removePlayerById(id)
        drawMyPlayers()
    }
    this.getPlayersByTeam = function getPlayersByTeam(event) {
        event.preventDefault()
        var teamName = event.target.team.value
        var filteredPlayers = playerService.getPlayersByTeam(teamName)
        updatePlayers(filteredPlayers)
    }
    this.getPlayersByPosition = function getPlayersByPosition(event) {
        event.preventDefault()
        var position = event.target.position.value
        var filtered = playerService.getPlayersByPosition(position)
        updatePlayers(filtered)
    }
    this.getPlayersByName = function getPlayersByName(event) {
            event.preventDefault()
            var name = event.target.name.value
            var filtered = playerService.getPlayersByName(name)
            updatePlayers(filtered)
        }
        //PRIVATE
    function drawRoster(players) {
        var playersElem = document.getElementById('player')
        var players = playerService.getPlayers()
        template = ''
        for (var i = 0; i < players.length; i++) {
            var player = players[i];

            template += `
            <div class="col-sm-5 text-center">
            <img src=${player.photo}></img>
            <h3>Name: ${player.fullname}</h3>
            <h5>Team: ${player.pro_team}</h5>
            <h5>Position: ${player.position}</h5>
            <button class="btn btn-success" onclick="app.controllers.playerCtrl.addPlayer(${player.id})">Add</button>
            </div>
            `
            if (i == 100) {
                i = players.length
            }
        }
        playersElem.innerHTML = template
    }

    function drawMyPlayers() {
        var myPlayersElem = document.getElementById('myPlayers')
        var players = playerService.getMyPlayers()
        template = ''
        for (var i = 0; i < players.length; i++) {
            var player = players[i];

            template += `
            <div class="col-sm-5 text-center">
            <img src=${player.photo}></img>
            <h3>Name: ${player.fullname}</h3>
            <h5>Team: ${player.pro_team}</h5>
            <h5>Position: ${player.position}</h5>
            <button class="btn btn-danger" onclick="app.controllers.playerCtrl.removePlayerById(${player.id})">Remove</button>
            </div>
            `
        }
        myPlayersElem.innerHTML = template
    }

    function updatePlayers(arr) {
        var playersElem = document.getElementById('player')
        template = ''
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i];

            template += `
            <div class="col-sm-5 text-center">
            <img src=${player.photo}></img>
            <h3>Name: ${player.fullname}</h3>
            <h5>Team: ${player.pro_team}</h5>
            <h5>Position: ${player.position}</h5>
            <button class="btn btn-success" onclick="app.controllers.playerCtrl.addPlayer(${player.id})">Add</button>
            </div>
            `
        }
        playersElem.innerHTML = template
    }
    drawRoster()
}