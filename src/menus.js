 var menus = {
  list: {
    'game-type': {
      background: 'none',
      images: ['game-type-menu.png'],
      onshow: function () {
        setTimeout(game.reset, 200)
      }
    },
    'select-campaign': {
      background: 'black',
      images: ['select-transmission-animation.gif', 'select-transmission.png'],
      onshow: function () {
        sounds.startStruggle()
      }
    },
    'message-box': {
      background: 'none',
      images: ['message-box.jpg']
    },
    'load-mission': {
      background: 'none',
      images: ['load-mission-menu.png']
    },
    'replay-game': {
      background: 'none',
      images: ['replay-game-menu.png'],
      onshow: function () {
        setTimeout(game.reset, 200)
      }
    },
    'delete-mission': {
      background: 'none',
      images: ['delete-mission-menu.png']
    },
    'save-mission': {
      background: 'none',
      images: ['save-mission-menu.png']
    },
    'singleplayer-game-options': {
      background: 'none',
      images: ['game-options-menu.png']
    },
    'multiplayer-game-options': {
      background: 'none',
      images: ['multiplayer-game-options-menu.png']
    },
    'abort-mission': {
      background: 'none',
      images: ['abort-mission-menu.png']
    },
    'restate-mission': {
      background: 'none',
      images: ['restate-mission-menu.png']
    },
    'game-controls': {
      background: 'none',
      images: ['game-controls-menu.png', 'slider.png']
    },
    'mission-ended': {
      background: 'none'
    },
    'sound-controls': {
      background: 'none',
      images: ['sound-controls-menu.png', 'slider-small.png']
    },
    'join-network-game': {
      background: 'none',
      images: ['join-network-game-menu.png'],
      onshow: function () {
        $('#join-network-game-menu-div .player-name').focus()
        $('#join-network-game-menu-div input').attr('disabled', false)
      }
    },
    'start-network-game': {
      background: 'none',
      images: ['start-network-game-menu.png'],
      onshow: function () {
        $('#start-network-game-menu-div input').attr('disabled', false)
      }
    },
    'joined-network-game': {
      background: 'none',
      images: ['joined-network-game-menu.png']
    }
  },
  notYetImplemented: function (feature) {
    var plural = feature.substring(feature.length - 1) == 's'
    menus.showMessageBox(feature + ' ' + (plural ? 'Are' : 'Is') + ' Coming Soon', feature + ' ' + (plural ? 'have' : 'has') + " not yet been implemented completely. I have enabled this menu option because I plan to release this feature soon.<br><br>Keep checking the <a href='http://www.facebook.com/CommandConquerHtml5' target='_blank'>C&amp;C - HTML5 Facebook Page</a> for updates :)")
  },
  load: function () {
    for (var menuName in menus.list) {
      var menu = menus.list[menuName]
      if (menu.images) {
        for (var i = menu.images.length - 1; i >= 0; i--) {
          loader.loadImage('images/menu/' + menu.images[i])
        }
      }
    }
    $('#game-type-menu-div .singleplayer-game').click(singleplayer.start)
    $('#game-type-menu-div .load-game').click(function () {
      $('#load-mission-menu-div .cancel-button').unbind('click').click(function () {
        menus.show('game-type')
      })
      singleplayer.updateSavedMissionList()
      menus.show('load-mission')
    })
    $('#singleplayer-game-options-menu-div .load-mission-button').click(function () {
      $('#load-mission-menu-div .cancel-button').unbind('click').click(function () {
        menus.show('singleplayer-game-options')
      })
      singleplayer.updateSavedMissionList()
      menus.show('load-mission')
    })
    $('#load-mission-menu-div .load-button').click(function () {
      singleplayer.loadMission($('#load-mission-menu-div .mission-list').prop('selectedIndex'))
    })
    $('#game-type-menu-div .multiplayer-game').click(function () {
      multiplayer.start()
    })
    $('#game-type-menu-div .view-game-replay').click(function () {
      singleplayer.updateSavedMissionList()
      multiplayer.updateSavedMissionList()
      menus.show('replay-game')
    })
    $('#replay-game-menu-div .load-button').click(function () {
      var replayIndex = $('#replay-game-menu-div .mission-list').prop('selectedIndex')
      if (replayIndex > -1) {
        var savedGames = []
        var savedGamesString = localStorage.savedGames
        if (savedGamesString) {
          savedGames = JSON.parse(savedGamesString)
        }
        if (replayIndex < savedGames.length) {
          singleplayer.loadMission(replayIndex, true)
        } else {
          multiplayer.loadMultiplayerReplay(replayIndex - savedGames.length)
        }
      } else {
        menus.showMessageBox('Nothing Selected', 'Please select a saved game to replay')
      }
    })
    $('#replay-game-menu-div .cancel-button').click(function () {
      menus.show('game-type')
    })
    $('#replay-game-menu-div .save-button').click(function () {
      var replayIndex = $('#replay-game-menu-div .mission-list').prop('selectedIndex')
      if (replayIndex > -1) {
        var savedGames = []
        var savedGamesString = localStorage.savedGames
        if (savedGamesString) {
          savedGames = JSON.parse(savedGamesString)
        }
        var savedGame
        if (replayIndex < savedGames.length) {
          savedGame = JSON.stringify(savedGames[replayIndex])
        } else {
          savedGame = localStorage.lastMultiplayerGame
        }
        window.location = 'data:application/x-json;base64,' + btoa(savedGame)
      } else {
        menus.showMessageBox('Nothing Selected', 'Please select a game to save')
      }
    })
    $('#select-campaign-menu-div .gdi-campaign').click(function () {
      singleplayer.beginCampaign('gdi')
      sounds.stopStruggle()
    })
    $('#select-campaign-menu-div .nod-campaign').click(function () {
      singleplayer.beginCampaign('nod')
      sounds.stopStruggle()
    })
    $('#multiplayer-game-options-menu-div .resume-game-button').click(menus.hide)
    $('#multiplayer-game-options-menu-div .sound-controls-button').click(function () {
      menus.show('sound-controls')
    })
    $('#multiplayer-game-options-menu-div .abort-game-button').click(multiplayer.surrender)
    $('#singleplayer-game-options-menu-div .resume-mission-button').click(singleplayer.resumeLevel)
    $('#singleplayer-game-options-menu-div .abort-mission-button').click(function () {
      menus.show('abort-mission')
    })
    $('#abort-mission-menu-div .yes-button').click(function () {
      sounds.play('battle_control_terminated')
      singleplayer.exitLevel()
    })
    $('#abort-mission-menu-div .restart-button').click(function () {
      menus.hide()
      sounds.stopMusic()
      game.reset()
      singleplayer.loadLevel()
    })
    $('#abort-mission-menu-div .no-button').click(function () {
      menus.show('singleplayer-game-options')
    })
    $('#singleplayer-game-options-menu-div .restate-mission-button').click(singleplayer.restateMission)
    $('#restate-mission-menu-div .options-button').click(function () {
      menus.show('singleplayer-game-options')
    })
    $('#restate-mission-menu-div .video-button').click(function () {
      if (maps.currentMapData.videos && maps.currentMapData.videos.briefing) {
        menus.hide()
        videos.play(maps.currentMapData.videos.briefing, singleplayer.restateMission)
      }
    })
    $('#singleplayer-game-options-menu-div .game-controls-button').click(function () {
      menus.show('game-controls')
    })
    $('#game-controls-menu-div .visual-controls-button').click(function () {
      menus.notYetImplemented('Visual Controls')
    })
    $('#game-controls-menu-div .sound-controls-button').click(function () {
      menus.show('sound-controls')
    })
    $('#sound-controls-menu-div .musicvolume').noUiSlider('init', {
      handles: 1,
      scale: [0, 10],
      connect: true,
      step: 1,
      start: 10,
      change: function () {
        var value = $(this).noUiSlider('value')[1]
        sounds.setMusicVoume(value / 10)
      }
    })
    $('#sound-controls-menu-div .soundvolume').noUiSlider('init', {
      handles: 1,
      scale: [0, 10],
      start: 10,
      change: function () {
        var value = $(this).noUiSlider('value')[1]
        sounds.setAudioVoume(value / 10)
      }
    })
    $('#sound-controls-menu-div .stop-button').click(function () {
      sounds.stopMusic()
    })
    $('#sound-controls-menu-div .play-button').click(function () {
      var selectedSong = $('#sound-controls-menu-div .music-tracks-list').prop('selectedIndex')
      sounds.playMusic(selectedSong)
    })
    $('#sound-controls-menu-div .shuffle-button').click(function () {
      sounds.toggleShuffle()
      $('#sound-controls-menu-div .shuffle-button').val(sounds.shuffle ? 'On' : 'Off')
    })
    $('#sound-controls-menu-div .repeat-button').click(function () {
      sounds.toggleRepeat()
      $('#sound-controls-menu-div .repeat-button').val(sounds.repeat ? 'On' : 'Off')
    })
    $('#sound-controls-menu-div .options-button').click(function () {
      if (game.type == 'multiplayer') {
        menus.show('multiplayer-game-options')
      } else {
        menus.show('singleplayer-game-options')
      }
    })
    $('#game-controls-menu-div .options-button').click(function () {
      if (game.type == 'multiplayer') {
        menus.show('multiplayer-game-options')
      } else {
        menus.show('singleplayer-game-options')
      }
    })
    $('#start-network-game-menu-div .gamespeed').noUiSlider('init', {
      handles: 1,
      scale: [0, 6],
      connect: false,
      step: 1,
      start: 2,
      change: function () {
        var value = $(this).noUiSlider('value')[0]
        multiplayer.gameSpeed = value * 0.25 + 0.5
      }
    })
    $('#game-controls-menu-div .gamespeed').noUiSlider('init', {
      handles: 1,
      scale: [0, 6],
      connect: false,
      step: 1,
      start: 2,
      change: function () {
        var value = $(this).noUiSlider('value')[0]
        singleplayer.gameSpeed = value * 0.25 + 0.5
      }
    })
    $('#game-controls-menu-div .scrollspeed').noUiSlider('init', {
      handles: 1,
      scale: [0, 6],
      step: 1,
      start: 2,
      change: function () {
        var value = $(this).noUiSlider('value')[1]
        game.scrollSpeed = value * 0.25 + 0.5
      }
    })
    $('#singleplayer-game-options-menu-div .save-mission-button').click(function () {
      singleplayer.updateSavedMissionList()
      menus.show('save-mission')
      $('.mission-name').focus()
    })
    $('#save-mission-menu-div .mission-list').change(function () {
      if ($('#save-mission-menu-div .mission-list').prop('selectedIndex') > 0) {
        $('#save-mission-menu-div .mission-name').val($('#save-mission-menu-div .mission-list option:selected').html())
      }
      $('#save-mission-menu-div .mission-name').focus()
    })
    $('#save-mission-menu-div .save-button').click(function () {
      menus.notYetImplemented('Save Mission')
      singleplayer.saveMission($('#save-mission-menu-div .mission-list').prop('selectedIndex'), $('#save-mission-menu-div .mission-name').val())
    })
    $('#save-mission-menu-div .cancel-button').click(function () {
      menus.show('singleplayer-game-options')
    })
    $('#singleplayer-game-options-menu-div .delete-mission-button').click(function () {
      singleplayer.updateSavedMissionList()
      menus.show('delete-mission')
    })
    $('#delete-mission-menu-div .delete-button').click(function () {
      singleplayer.deleteMission($('#delete-mission-menu-div .mission-list').prop('selectedIndex'))
    })
    $('#delete-mission-menu-div .cancel-button').click(function () {
      menus.show('singleplayer-game-options')
    })
    $('#join-network-game-menu-div .join-multiplayer-button').click(multiplayer.joinExistingGame)
    $('#join-network-game-menu-div .cancel-multiplayer-button').click(multiplayer.cancel)
    $('#join-network-game-menu-div .new-multiplayer-button').click(multiplayer.createNewGame)
    $('#join-network-game-menu-div .games-list').change(multiplayer.selectGame)
    var sendMessage = function (container) {
      if (container == '#join-network-game-menu-div') {
        multiplayer.sendMessageToLobby($(container + ' .input-message').val())
      } else {
        multiplayer.sendMessageToPlayers($(container + ' .input-message').val())
      }
      $(container + ' .input-message').val('')
      $(container + ' .input-message').focus()
    }
    $('#joined-network-game-menu-div .input-message').keydown(function (ev) {
      if (ev.which == 13 && this.value != '') {
        sendMessage('#joined-network-game-menu-div')
      }
    })
    $('#join-network-game-menu-div .input-message').keydown(function (ev) {
      if (ev.which == 13 && this.value != '') {
        sendMessage('#join-network-game-menu-div')
      }
    })
    $('#start-network-game-menu-div .input-message').keydown(function (ev) {
      if (ev.which == 13 && this.value != '') {
        sendMessage('#start-network-game-menu-div')
      }
    })
    $('#joined-network-game-menu-div .send-message-button').click(function () {
      sendMessage('#joined-network-game-menu-div')
    })
    $('#join-network-game-menu-div .send-message-button').click(function () {
      sendMessage('#join-network-game-menu-div')
    })
    $('#start-network-game-menu-div .send-message-button').click(function () {
      sendMessage('#start-network-game-menu-div')
    })
    $('#start-network-game-menu-div .cancel-multiplayer-button').click(multiplayer.cancelNewGame)
    $('#start-network-game-menu-div .reject-player-button').click(multiplayer.rejectPlayer)
    $('#joined-network-game-menu-div .cancel-multiplayer-button').click(multiplayer.cancelJoinedGame)
    $('#start-network-game-menu-div .start-multiplayer-button').click(function () {
      var credits = parseInt($('#start-network-game-menu-div .starting-credits').val(), 10)
      if (isNaN(credits) || credits < 0) {
        menus.showMessageBox('Invalid Starting Credits', 'Please enter a valid value for starting credits.', function () {
          $('#start-network-game-menu-div .starting-credits').focus()
        })
        return
      }
      var level = $('#start-network-game-menu-div .scenarios').val()
      multiplayer.startNewGame({
        credits: credits,
        level: level,
        gameSpeed: multiplayer.gameSpeed
      })
    })
  },
  reposition: function (containerWidth, containerHeight) {
    $('#select-campaign-menu-div').width(containerWidth).height(containerHeight)
    $('.game-menu').each(function (index, element) {
      var $menu = $(this)
      $menu.css({
        top: Math.round((containerHeight - $menu.height()) / 2),
        left: Math.round((containerWidth - $menu.width()) / 2)
      })
    })
  },
  show: function (menuName) {
    if (menuName === 'game-type') {
      game.reset()
    }
    menus.hide()
    $('#menu-container').show()
    $('#menu-container').css('background', menus.list[menuName].background)
    $('#' + menuName + '-menu-div').show()
    if (menus.list[menuName].onshow) {
      menus.list[menuName].onshow()
    }
  },
  isActive: function (menuName) {
    return $('#' + menuName + '-menu-div').is(':visible')
  },
  hide: function () {
    $('#menu-container').css('background', 'none')
    $('#menu-container').hide()
    $('.game-menu').hide()
    $('#message-box-menu-div').hide()
    $('#message-box-container').hide()
  },
  showMessageBox: function (title, content, onclickhandler) {
    $('#message-box-container').show()
    $('#message-box-container').css('background', menus.list['message-box'].background)
    $('#message-box-menu-div').show()
    $('#message-box-menu-div .message-box-title').html(title)
    $('#message-box-menu-div .message-box-content').html(content)
    $('#message-box-menu-div .message-box-ok').unbind('click').click(function () {
      $('#message-box-menu-div').hide()
      $('#message-box-container').hide()
      if (onclickhandler) {
        onclickhandler()
      }
    })
  }
}
