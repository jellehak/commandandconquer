 var multiplayer = {
  websocket_url: 'wss://servers.adityaravishankar.com/command-and-conquer',
  websocket: undefined,
  gameSpeed: 1,
  start: function () {
    $('.messages').html('')
    game.type = 'multiplayer'
    var WebSocketObject = window.WebSocket || window.MozWebSocket
    if (!WebSocketObject) {
      menus.showMessageBox('WebSockets Not Available', 'Your browser does not support HTML5 WebSockets. Multiplayer will not work.', function () {
        menus.show('game-type')
      })
      return
    }
    this.websocket = new WebSocketObject(this.websocket_url)
    this.websocket.onmessage = multiplayer.handleWebSocketMessage
    var connectionErrorMessage = function (evt) {
      if (!game.running) {
        menus.showMessageBox('Multiplayer Server Not Available', 'Problem connecting with C&amp;C-HTML5 multiplayer server. <br><br>The server may either have too many connected players or has been switched off for maintenance.<br><br>Please try again later.', function () {
          menus.show('game-type')
        })
      } else {
        multiplayer.pauseLevel()
        menus.showMessageBox('Connection Lost', 'You have got disconnected from the C&amp;C-HTML5 multiplayer server. <br><br> This may be because of network connectivity issues, or the server may have been switched off for maintenance.', function () {
          menus.show('game-type')
        })
      }
    }
    this.websocket.onclose = connectionErrorMessage
    this.websocket.onerror = connectionErrorMessage
    this.websocket.onopen = function () {
      menus.show('join-network-game')
    }
  },
  gameOptions: function () {
    menus.show('multiplayer-game-options')
  },
  pauseLevel: function () {
    sounds.stopMusic()
    game.running = false
    clearInterval(game.animationInterval)
  },
  handleWebSocketMessage: function (message) {
    var messageObject = JSON.parse(message.data)
    switch (messageObject.type) {
      case 'room_list':
        multiplayer.updateRoomStatus(messageObject.status)
        multiplayer.updatePlayerList()
        break
      case 'latency_ping':
        multiplayer.sendWebSocketMessage({
          type: 'latency_pong',
          userAgent: navigator.userAgent
        })
        break
      case 'system_message':
        var systemMessageHTML = "<p style='color:white'>SYSTEM: " + messageObject.details + '</p>'
        $('.messages').append($(systemMessageHTML))
        multiplayer.showInGameMessages()
        $('.messages').each(function () {
          $(this).animate({
            scrollTop: $(this).prop('scrollHeight')
          })
        })
        sounds.play('system_message')
        break
      case 'lobby_message':
        var lobbyMessageHTML = "<p style='color:" + messageObject.color + "'>" + messageObject.from + ': ' + messageObject.details + '</p>'
        $('#join-network-game-menu-div .messages').append($(lobbyMessageHTML))
        $('.messages').each(function () {
          $(this).animate({
            scrollTop: $(this).prop('scrollHeight')
          })
        })
        if (menus.isActive('join-network-game')) {
          sounds.play('lobby_message')
        }
        break
      case 'chat_message':
        var messageHTML = "<p style='color:" + messageObject.color + "'>" + messageObject.from + ': ' + messageObject.details + '</p>'
        $('.messages').append($(messageHTML))
        multiplayer.showInGameMessages()
        $('.messages').each(function () {
          $(this).animate({
            scrollTop: $(this).prop('scrollHeight')
          })
        })
        if (menus.isActive('start-network-game' || menus.isActive('joined-network-game'))) {
          sounds.play('lobby_message')
        } else {
          sounds.play('chat_message')
        }
        break
      case 'create_new_game_fail':
        menus.showMessageBox('Could Not Create Game', messageObject.details)
        $("#join-network-game-menu-div input[type='button']").attr('disabled', false)
        break
      case 'create_new_game_success':
        multiplayer.playerId = messageObject.playerId
        multiplayer.roomId = messageObject.roomId
        multiplayer.color = messageObject.color
        multiplayer.team = messageObject.team
        menus.show('start-network-game')
        $('.input-message').css('color', multiplayer.color)
        menus.showMessageBox('Game Created', 'New game created (' + messageObject.roomName + '). You need at least one other player to join before starting the game.', function () {
          $('#start-network-game-menu-div .starting-credits').focus()
        })
        break
      case 'join_existing_game_fail':
        menus.showMessageBox('Could Not Join Game', messageObject.details)
        $("#join-network-game-menu-div input[type='button']").attr('disabled', false)
        break
      case 'kicked_from_game':
        menus.show('join-network-game')
        menus.showMessageBox('Kicked Out From Game', messageObject.details)
        break
      case 'join_existing_game_success':
        menus.show('joined-network-game')
        menus.showMessageBox('Game Joined', 'You have joined the game (' + messageObject.roomName + '). Wait for the host to start the game.')
        multiplayer.playerId = messageObject.playerId
        multiplayer.roomId = messageObject.roomId
        multiplayer.color = messageObject.color
        multiplayer.team = messageObject.team
        $('.input-message').css('color', multiplayer.color)
        break
      case 'start_game_fail':
        menus.showMessageBox('Could Not Start Game', messageObject.details)
        $('#start-network-game-menu-div input').attr('disabled', false)
        break
      case 'init_game':
        multiplayer.initializeMultiplayer(messageObject.details)
        break
      case 'start_playing_game':
        multiplayer.startLevel()
        multiplayer.showInGameMessages()
        break
      case 'game_tick':
        multiplayer.lastReceivedTick = messageObject.gameTick
        multiplayer.commands[messageObject.gameTick] = messageObject.commands
        break
      case 'end_defeat':
        multiplayer.endGame('failure')
        break
      case 'end_victory':
        multiplayer.endGame('success')
        break
      case 'report_desync':
        multiplayer.sendDeSyncReport()
        break
      case 'end_desync':
        multiplayer.endGame('desync')
        break
    }
  },
  showInGameMessages: function () {
    if (game.running) {
      $('#gameinterfacescreen .messages').fadeIn()
      $('.messages').each(function () {
        $(this).animate({
          scrollTop: $(this).prop('scrollHeight')
        })
      })
      clearTimeout(multiplayer.chatHideTimeout)
      multiplayer.chatHideTimeout = setInterval(function () {
        $('#gameinterfacescreen .messages').fadeOut(1e3)
      }, 1e4)
    } else {
      $('.messages').each(function () {
        $(this).animate({
          scrollTop: $(this).prop('scrollHeight')
        })
      })
    }
  },
  surrender: function (message) {
    multiplayer.sendWebSocketMessage({
      type: 'surrender'
    })
  },
  saveMission: function () {
    var savedGame = {
      gameTick: game.gameTick,
      player: game.player,
      commands: multiplayer.commands,
      level: multiplayer.currentLevel,
      players: multiplayer.players,
      credits: multiplayer.credits
    }
    localStorage.lastMultiplayerGame = JSON.stringify(savedGame)
    return savedGame
  },
  sendDeSyncReport: function () {
    var report = {
      savedGame: multiplayer.saveMission(),
      items: []
    }
    for (var i = game.items.length - 1; i >= 0; i--) {
      var item = game.items[i]
      report.items.unshift({
        uid: item.uid,
        name: item.name,
        team: item.team,
        player: item.player,
        type: item.type,
        x: item.x,
        y: item.y
      })
    }
    multiplayer.sendWebSocketMessage({
      type: 'desync_report',
      report: report
    })
  },
  updateSavedMissionList: function () {
    var savedGameString = localStorage.lastMultiplayerGame
    if (savedGameString || multiplayer.debugSavedGame) {
      var savedGame
      if (multiplayer.debugSavedGame) {
        savedGame = multiplayer.debugSavedGame
        savedGameString = JSON.stringify(multiplayer.debugSavedGame)
      } else if (savedGameString) {
        savedGame = JSON.parse(savedGameString)
      }
      if (savedGameString) {
        var savedGameDescription = 'Map: ' + maps.multiplayer[savedGame.level] + ' Players: ' + savedGame.players.length
        $('#replay-game-menu-div .mission-list').append("<option value='-1'>[MULTIPLAYER] " + savedGameDescription + '</option>')
      }
    }
  },
  endGame: function (type) {
    multiplayer.pauseLevel()
    multiplayer.websocket.onopen = null
    multiplayer.websocket.onclose = null
    multiplayer.websocket.onerror = null
    multiplayer.websocket.close()
    $('#gameinterfacescreen .messages').hide()
    $('#gameinterfacescreen .input-message').hide()
    menus.show('mission-ended')
    var sweetMessage = '<br><br>If you enjoyed playing this game, please take the time to tell all your friends about C&amp;C - HTML5.'
    multiplayer.saveMission()
    if (type == 'success') {
      sounds.play('mission_accomplished')
      game.showEnding = 'success'
      setTimeout(function () {
        menus.showMessageBox('Victory', 'Congratulations! You have won the match.' + sweetMessage, function () {
          menus.show('game-type')
        })
      }, 3e3)
    } else if (type == 'failure') {
      sounds.play('mission_failure')
      game.showEnding = 'failure'
      setTimeout(function () {
        menus.showMessageBox('Failure', 'You have lost the match.' + sweetMessage, function () {
          menus.show('game-type')
        })
      }, 3e3)
    } else if (type == 'desync') {
      menus.showMessageBox('Game Out of Sync', 'Your game has gone out of sync with the other player. The administrator has been notified and he will review your game as soon as possible. <br><br>If the problem persists, please wait and watch the <a href="http://www.facebook.com/CommandConquerHtml5" target="_blank">C&amp;C - HTML5 Facebook Page</a> for updates.', function () {
        menus.show('game-type')
      })
    }
  },
  startLevel: function () {
    game.gameTick = 0
    multiplayer.commands = []
    sidebar.init()
    multiplayer.resumeLevel()
    sounds.playMusic()
  },
  resumeLevel: function () {
    menus.hide()
    game.running = true
    game.animationInterval = setInterval(multiplayer.animationLoop, game.animationTimeout / game.gameSpeed)
    game.animationLoop()
    game.refreshBackground = true
    game.drawingLoop()
  },
  animationLoop: function () {
    if (game.gameTick <= multiplayer.lastReceivedTick) {
      multiplayer.gameLagging = false
      var commands = multiplayer.commands[game.gameTick]
      if (commands) {
        for (var i = 0; i < multiplayer.commands[game.gameTick].length; i++) {
          var commandObject = commands[i]
          game.receiveCommand(commandObject.uids, commandObject.command)
        }
      }
      game.animationLoop()
      if (!multiplayer.sentCommandForTick) {
        multiplayer.sendCommand()
      }
      game.gameTick++
      multiplayer.sentCommandForTick = false
    } else {
      multiplayer.gameLagging = true
    }
  },
  initializeMultiplayer: function (details) {
    menus.hide()
    game.type = 'multiplayer'
    game.gameSpeed = details.gameSpeed || 1
    multiplayer.currentLevel = details.level
    multiplayer.players = details.players
    multiplayer.credits = details.credits
    var mapName = game.type + '/' + maps[game.type][multiplayer.currentLevel]
    maps.load(mapName, function () {
      multiplayer.sendWebSocketMessage({
        type: 'initialized_game'
      })
    })
  },
  replaySavedLevelInteractive: function (savedGame) {
    game.gameTick = 0
    multiplayer.commands = $.extend(true, [], savedGame.commands)
    game.team = savedGame.player.team
    sidebar.init()
    sounds.muteAudio = false
    menus.hide()
    game.running = true
    game.replay = true
    game.replayTick = savedGame.gameTick
    multiplayer.animationLoopReplay()
    game.refreshBackground = true
    game.drawingLoop()
    this.resumeReplay()
  },
  pauseReplay: function () {
    clearInterval(game.animationInterval)
  },
  exitReplay: function () {
    game.running = false
    game.replay = false
    clearInterval(game.animationInterval)
    menus.show('game-type')
  },
  resumeReplay: function () {
    clearInterval(game.animationInterval)
    game.gameSpeed = 1
    game.animationInterval = setInterval(function () {
      if (game.gameTick <= game.replayTick) {
        multiplayer.animationLoopReplay()
      } else {
        multiplayer.pauseReplay()
      }
    }, game.animationTimeout / game.gameSpeed)
  },
  fastForwardReplay: function () {
    clearInterval(game.animationInterval)
    game.gameSpeed *= 2
    if (game.gameSpeed > 8) {
      game.gameSpeed = 8
    }
    game.animationInterval = setInterval(function () {
      if (game.gameTick <= game.replayTick) {
        multiplayer.animationLoopReplay()
      } else {
        multiplayer.pauseReplay()
      }
    }, game.animationTimeout / game.gameSpeed)
  },
  animationLoopReplay: function () {
    game.gameTick++
    if (multiplayer.commands.length > game.gameTick && multiplayer.commands[game.gameTick]) {
      for (var i = 0; i < multiplayer.commands[game.gameTick].length; i++) {
        var commandObject = multiplayer.commands[game.gameTick][i]
        game.receiveCommand(commandObject.uids, commandObject.command)
      }
    }
    game.animationLoop()
  },
  loadMultiplayerReplay: function (index) {
    menus.hide()
    game.type = 'multiplayer'
    game.gameSpeed = 1
    var savedGame
    if (multiplayer.debugSavedGame) {
      savedGame = multiplayer.debugSavedGame
    } else {
      savedGame = JSON.parse(localStorage.lastMultiplayerGame)
    }
    multiplayer.currentLevel = savedGame.level
    multiplayer.players = savedGame.players
    multiplayer.credits = savedGame.credits
    multiplayer.playerId = savedGame.player
    var mapName = game.type + '/' + maps[game.type][multiplayer.currentLevel]
    maps.load(mapName, function () {
      multiplayer.replaySavedLevelInteractive(savedGame)
    })
  },
  initializeLevel: function (data) {
    game.colorHash = {}
    game.players = []
    game.kills = {}
    game.deaths = {}
    game.cash = {}
    game.player = multiplayer.playerId
    var startingTypes = Object.keys(data.starting).sort()
    for (var st = startingTypes.length - 1; st >= 0; st--) {
      var type = startingTypes[st]
      var startingArray = data.starting[type]
      for (var i = 0; i < startingArray.length; i++) {
        var item = startingArray[i]
        item.type = type
        game.add(item)
      }
    }
    for (var i = 0; i < multiplayer.players.length; i++) {
      var player = multiplayer.players[i]
      game.colorHash[player.playerId] = {
        index: i,
        color: player.color,
        team: player.team
      }
      game.players.push(player.playerId)
      game.kills[player.playerId] = 0
      game.deaths[player.playerId] = 0
      game.cash[player.playerId] = multiplayer.credits
      var spawnLocation = data.spawns[player.spawn]
      if (player.playerId === multiplayer.playerId) {
        game.viewportX = spawnLocation.viewportx * game.gridSize
        game.viewportY = spawnLocation.viewporty * game.gridSize
        multiplayer.averageLatency = player.averageLatency
        game.team = player.team
      }
      var startingUnits = Object.keys(data.startingunits[player.team]).sort()
      for (var su = startingUnits.length - 1; su >= 0; su--) {
        var type = startingUnits[su]
        var startingArray = data.startingunits[player.team][type]
        for (var j = 0; j < startingArray.length; j++) {
          var item = $.extend(true, [], startingArray[j])
          item.type = type
          item.x = item.dx + spawnLocation.x
          item.y = item.dy + spawnLocation.y
          item.player = player.playerId
          item.team = player.team
          game.add(item)
        }
      }
    }
  },
  updateRoomStatus: function (roomStatus) {
    multiplayer.roomStatus = roomStatus
    $('.games-list').empty()
    for (var i = 0; i < multiplayer.roomStatus.length; i++) {
      var room = multiplayer.roomStatus[i]
      $('.games-list').append($('<option>').attr('value', room.roomId).attr('selected', room.roomId == multiplayer.roomId).text(room.roomName + (room.status == 'running' ? ' (RUNNING)' : '')))
    }
  },
  selectGame: function () {
    multiplayer.roomId = $('#join-network-game-menu-div .games-list option:selected').val()
    multiplayer.updatePlayerList()
  },
  updatePlayerList: function () {
    var playerSelect = $('.player-list')
    playerSelect.empty()
    if (multiplayer.roomId) {
      for (var i = 0; i < multiplayer.roomStatus.length; i++) {
        var room = multiplayer.roomStatus[i]
        if (room.roomId == multiplayer.roomId) {
          for (var j = 0; j < room.players.length; j++) {
            var player = room.players[j]
            playerSelect.append($("<option style='color:" + player.color + "'>").attr('value', player.id).text(player.name + ' (' + player.team.toUpperCase() + ')'))
          }
        }
      }
    }
  },
  trimmedPlayerName: function () {
    var name = $.trim($('#join-network-game-menu-div .player-name').val().replace(/\W/g, ''))
    $('#join-network-game-menu-div .player-name').val(name)
    return name
  },
  createNewGame: function () {
    var name = multiplayer.trimmedPlayerName()
    if (name === '') {
      menus.showMessageBox('Name not entered', 'You need to enter your name before creating a new game.', function () {
        $('#join-network-game-menu-div .player-name').focus()
      })
      return
    }
    $("#join-network-game-menu-div input[type='button']").attr('disabled', true)
    var color = $('input:radio[name=multiplayer-team-color]:checked').val()
    var team = $('input:radio[name=multiplayer-team]:checked').val()
    multiplayer.sendWebSocketMessage({
      type: 'create_new_game',
      name: name,
      color: color,
      team: team
    })
  },
  cancelNewGame: function () {
    multiplayer.sendWebSocketMessage({
      type: 'cancel_new_game'
    })
    menus.show('join-network-game')
    menus.showMessageBox('Game Cancelled', 'The game has been cancelled.')
  },
  rejectPlayer: function () {
    var playerId = $('#start-network-game-menu-div .player-list').val()
    if (!playerId) {
      menus.showMessageBox('', 'You must select a player to reject.')
      return
    }
    if (playerId == multiplayer.playerId) {
      menus.showMessageBox('', "You can't reject yourself! You might develop serious self-esteem problems.")
      return
    }
    multiplayer.sendWebSocketMessage({
      type: 'reject_player',
      playerId: playerId
    })
  },
  joinExistingGame: function () {
    var name = multiplayer.trimmedPlayerName()
    if (name === '') {
      menus.showMessageBox('Name not entered', 'You need to enter your name before joining a game.', function () {
        $('#join-network-game-menu-div .player-name').focus()
      })
      return
    }
    var roomId = $('#join-network-game-menu-div .games-list option:selected').val()
    if (!roomId) {
      menus.showMessageBox('No Game Selected', 'Please select a game to join. <br><br>If there are no games for you to join, please try starting a new game so your friends can join.')
      return
    }
    $("#join-network-game-menu-div input[type='button']").attr('disabled', true)
    var color = $('input:radio[name=multiplayer-team-color]:checked').val()
    var team = $('input:radio[name=multiplayer-team]:checked').val()
    multiplayer.sendWebSocketMessage({
      type: 'join_existing_game',
      name: name,
      color: color,
      team: team,
      roomId: roomId
    })
  },
  cancelJoinedGame: function () {
    multiplayer.sendWebSocketMessage({
      type: 'cancel_joined_game'
    })
    menus.show('join-network-game')
  },
  cancel: function () {
    multiplayer.websocket.onopen = null
    multiplayer.websocket.onclose = null
    multiplayer.websocket.onerror = null
    multiplayer.websocket.close()
    menus.show('game-type')
  },
  sendWebSocketMessage: function (messageObject) {
    this.websocket.send(JSON.stringify(messageObject))
  },
  sendMessageToPlayers: function (message) {
    multiplayer.sendWebSocketMessage({
      type: 'message_to_players',
      message: message
    })
  },
  sendMessageToLobby: function (message) {
    var name = multiplayer.trimmedPlayerName()
    var color = $('input:radio[name=multiplayer-team-color]:checked').val()
    if (name === '') {
      menus.showMessageBox('Name not entered', 'You need to enter your name before sending a message.', function () {
        $('#join-network-game-menu-div .player-name').focus()
      })
      return
    }
    multiplayer.sendWebSocketMessage({
      type: 'message_to_lobby',
      message: message,
      name: name,
      color: color
    })
  },
  startNewGame: function (details) {
    $('#start-network-game-menu-div input').attr('disabled', true)
    multiplayer.sendWebSocketMessage({
      type: 'start_game',
      details: details
    })
  },
  getGameHash: function () {
    var gameHash = '_' + game.gameTick + '_' + game.items.length + '_' + game.infantry.length + '_' + (game.infantry.length ? game.infantry[game.infantry.length - 1].uid + '_' : '0_') + game.vehicles.length + '_' + (game.vehicles.length ? game.vehicles[game.vehicles.length - 1].uid + '_' : '0_') + game.buildings.length + '_' + (game.buildings.length ? game.buildings[game.buildings.length - 1].uid + '_' : '0_') + game.counter + '_'
    return gameHash
  },
  sendCommand: function (commandUids, command) {
    multiplayer.sentCommandForTick = true
    var gameHash = multiplayer.getGameHash()
    multiplayer.sendWebSocketMessage({
      type: 'command',
      uids: commandUids,
      command: command,
      gameTick: game.gameTick,
      hash: gameHash
    })
  }
}
