var singleplayer = {
  start: function () {
    menus.show('select-campaign')
  },
  beginCampaign: function (faction) {
    sounds.play(faction + '_selected')
    game.type = 'singleplayer'
    singleplayer.currentFaction = faction
    singleplayer.currentLevel = 0
    singleplayer.loadLevel()
  },
  gameSpeed: 1,
  currentFaction: undefined,
  currentLevel: undefined,
  updateSavedMissionList: function () {
    var savedGamesString = localStorage.savedGames
    $('.mission-list').empty()
    $('#save-mission-menu-div .mission-list').append('<option selected>[EMPTY SLOT]</option>')
    if (savedGamesString) {
      var savedGames = JSON.parse(savedGamesString)
      for (var i = 0; i < savedGames.length; i++) {
        $('.mission-list').append('<option>' + savedGames[i].name + '</option>')
      }
    }
  },
  replaySavedLevelInteractive: function (savedGame) {
    game.gameTick = 0
    singleplayer.commands = $.extend(true, [], savedGame.commands)
    game.team = singleplayer.currentFaction
    sidebar.init()
    sounds.muteAudio = false
    menus.hide()
    game.running = true
    game.replay = true
    game.replayTick = savedGame.gameTick
    singleplayer.animationLoop()
    game.refreshBackground = true
    game.drawingLoop()
    singleplayer.resumeReplay()
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
        singleplayer.animationLoop()
      } else {
        singleplayer.pauseReplay()
      }
    }, game.animationTimeout / game.gameSpeed)
  },
  resumeGameFromHere: function () {
    clearInterval(game.animationInterval)
    game.replay = false
    game.running = true
    game.gameSpeed = singleplayer.gameSpeed
    singleplayer.commands = singleplayer.commands.slice(0, game.gameTick)
    game.animationInterval = setInterval(singleplayer.animationLoop, game.animationTimeout / game.gameSpeed)
    game.refreshBackground = true
  },
  fastForwardReplay: function () {
    clearInterval(game.animationInterval)
    game.gameSpeed *= 2
    if (game.gameSpeed > 8) {
      game.gameSpeed = 8
    }
    game.animationInterval = setInterval(function () {
      if (game.gameTick <= game.replayTick) {
        singleplayer.animationLoop()
      } else {
        singleplayer.pauseReplay()
      }
    }, game.animationTimeout / game.gameSpeed)
  },
  loadMission: function (index, interactive) {
    if (index < 0) {
      menus.showMessageBox('Nothing Selected', 'Please select a mission to load')
      return
    }
    sounds.stopMusic()
    var savedGamesString = localStorage.savedGames
    var savedGames = JSON.parse(savedGamesString)
    var savedGame = savedGames[index]
    singleplayer.currentFaction = savedGame.faction
    singleplayer.currentLevel = savedGame.level
    game.type = 'singleplayer'
    var mapName = game.type + '/' + singleplayer.currentFaction + '/' + maps[singleplayer.currentFaction][singleplayer.currentLevel]
    maps.load(mapName, function () {
      if (interactive) {
        singleplayer.replaySavedLevelInteractive(savedGame)
      } else {
        singleplayer.replaySavedLevel(savedGame)
        singleplayer.resumeLevel()
        sounds.playMusic()
      }
    }, savedGame)
  },
  replaySavedLevel: function (savedGame) {
    game.gameTick = 0
    singleplayer.commands = $.extend(true, [], savedGame.commands)
    game.team = singleplayer.currentFaction
    sidebar.init()
    sounds.muteAudio = true
    do {
      singleplayer.animationLoop()
    } while (game.gameTick < savedGame.gameTick)
    sounds.muteAudio = false
    game.viewportX = savedGame.viewportX
    game.viewportY = savedGame.viewportY
  },
  startLevel: function () {
    game.gameTick = 0
    singleplayer.commands = []
    game.team = singleplayer.currentFaction
    sidebar.init()
    if (maps.currentMapData.videos && maps.currentMapData.videos.briefing) {
      videos.play(maps.currentMapData.videos.briefing, function () {
        singleplayer.resumeLevel()
        sounds.playMusic()
      })
    } else {
      singleplayer.resumeLevel()
      sounds.playMusic()
    }
  },
  deleteMission: function (index) {
    if (index < 0) {
      menus.showMessageBox('Nothing Selected', 'Please select a mission to delete')
      return
    }
    var savedGamesString = localStorage.savedGames
    var savedGames = JSON.parse(savedGamesString)
    savedGames.splice(index, 1)
    localStorage.savedGames = JSON.stringify(savedGames)
    singleplayer.updateSavedMissionList()
    menus.show('singleplayer-game-options')
  },
  saveMission: function (index, name) {
    name = name.trim()
    if (name === '') {
      menus.showMessageBox('No Name Given', 'Please enter a name for the saved mission')
      return
    }
    var savedGamesString = localStorage.savedGames
    var savedGames
    if (savedGamesString) {
      savedGames = JSON.parse(savedGamesString)
    } else {
      savedGames = []
    }
    if (index <= 0) {
      index = savedGames.length
    } else {
      index = index - 1
    }
    for (var i = singleplayer.commands.length - 1; i >= 0; i--) {
      if (!singleplayer.commands[i]) {
        singleplayer.commands[i] = 0
      }
    }
    var savedGame = {
      gameTick: game.gameTick,
      viewportX: game.viewportX,
      viewportY: game.viewportY,
      name: name,
      faction: singleplayer.currentFaction,
      level: singleplayer.currentLevel,
      commands: singleplayer.commands
    }
    console.log('Game paused at tick', game.gameTick)
    savedGames[index] = savedGame
    localStorage.savedGames = JSON.stringify(savedGames)
    singleplayer.updateSavedMissionList()
    menus.show('singleplayer-game-options')
  },
  loadLevel: function () {
    if (maps[singleplayer.currentFaction].length <= singleplayer.currentLevel) {
      menus.showMessageBox('Register As Beta Tester To Play More Missions', 'This was the last mission in this campaign. More are currently in BETA TESTING.<br><br>To play more missions, and get special access to my latest game projects (like Commandos HTML5), please register as a BETA TESTER, using the form on the right.', function () {
        menus.show('game-type')
      })
    } else {
      var mapName = game.type + '/' + singleplayer.currentFaction + '/' + maps[singleplayer.currentFaction][singleplayer.currentLevel]
      maps.load(mapName, singleplayer.startLevel)
    }
  },
  initializeLevel: function (data) {
    game.colorHash = {
      GoodGuy: {
        index: 0,
        color: 'yellow',
        team: 'gdi'
      },
      BadGuy: {
        index: 1,
        color: 'red',
        team: 'nod'
      },
      Neutral: {
        index: 0,
        color: 'yellow',
        team: 'civilian'
      }
    }
    game.players = ['GoodGuy', 'BadGuy', 'Neutral']
    game.kills = []
    game.deaths = []
    for (var i = game.players.length - 1; i >= 0; i--) {
      game.kills[game.players[i]] = 0
      game.deaths[game.players[i]] = 0
    }
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
    game.team = data.team
    game.player = data.player
    game.cash = $.extend([], data.cash)
  },
  gameOptions: function () {
    singleplayer.pauseLevel()
    menus.show('singleplayer-game-options')
  },
  pauseLevel: function () {
    game.running = false
    clearInterval(game.animationInterval)
  },
  resumeLevel: function () {
    menus.hide()
    game.running = true
    game.gameSpeed = singleplayer.gameSpeed
    game.animationInterval = setInterval(singleplayer.animationLoop, game.animationTimeout / game.gameSpeed)
    singleplayer.animationLoop()
    game.refreshBackground = true
    game.drawingLoop()
  },
  sendCommand: function (commandUids, command) {
    if (singleplayer.commands.length <= game.gameTick + 1) {
      singleplayer.commands[game.gameTick + 1] = [{
        commandUids: commandUids,
        command: command
      }]
    } else {
      singleplayer.commands[game.gameTick + 1].push({
        commandUids: commandUids,
        command: command
      })
    }
  },
  animationLoop: function () {
    game.gameTick++
    if (singleplayer.commands.length > game.gameTick && singleplayer.commands[game.gameTick]) {
      for (var i = 0; i < singleplayer.commands[game.gameTick].length; i++) {
        var commandObject = singleplayer.commands[game.gameTick][i]
        game.receiveCommand(commandObject.commandUids, commandObject.command)
      }
    }
    game.animationLoop()
  },
  exitLevel: function () {
    sounds.stopMusic()
    menus.show('game-type')
  },
  endLevel: function (success) {
    sounds.stopMusic()
    menus.show('mission-ended')
    singleplayer.pauseLevel()
    mouse.setCursor()
    if (success) {
      sounds.play('mission_accomplished')
      game.showEnding = 'success'
      setTimeout(function () {
        singleplayer.currentLevel++
        singleplayer.loadLevel()
        game.showEnding = false
      }, 5e3)
    } else {
      sounds.play('mission_failure')
      game.showEnding = 'failure'
      setTimeout(function () {
        menus.show('game-type')
      }, 5e3)
    }
  },
  restateMission: function () {
    $('#restate-mission-menu-div .mission-briefing').html(maps.currentMapData.briefing)
    menus.show('restate-mission')
  }
}
