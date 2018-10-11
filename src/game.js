 var game = {
  canvasWidth: 640,
  canvasHeight: 535,
  gridSize: 24,
  init: function () {
    $(window).resize(game.resize)
    game.resize()
    $('#fullscreenbutton').click(game.startFullScreen)
    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', game.fullScreenChanged)
    loader.init()
    videos.init()
    menus.load()
    sounds.load()
    sidebar.load()
    mouse.load()
    bullets.loadAll()
    effects.loadAll()
    game.backgroundContext = $('.gamebackgroundcanvas')[0].getContext('2d')
    game.foregroundContext = $('.gameforegroundcanvas')[0].getContext('2d')
    if (loader.loaded) {
      menus.show('game-type')
    } else {
      loader.onload = function () {
        menus.show('game-type')
      }
    }
  },
  fullScreen: false,
  aspectRatio: 640 / 535,
  scaleFactor: 1,
  startFullScreen: function () {
    var gameinterfacescreen = $('.fullscreencontainer')[0]
    if (gameinterfacescreen.requestFullScreen) {
      gameinterfacescreen.requestFullScreen()
    } else if (gameinterfacescreen.mozRequestFullScreen) {
      gameinterfacescreen.mozRequestFullScreen()
    } else if (gameinterfacescreen.webkitRequestFullScreen) {
      gameinterfacescreen.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (gameinterfacescreen.requestFullscreen) {
      gameinterfacescreen.requestFullscreen()
    }
  },
  fullScreenChanged: function () {
    game.fullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    game.resize()
  },
  resize: function () {
    var $window = $(window)
    var windowWidth = $window.width()
    var windowHeight = $window.height()
    var maxPossibleHeight = windowHeight
    var maxPossibleWidth = windowWidth
    if (!game.fullScreen) {
      $('.gamecontainer').css('border', '')
      maxPossibleHeight = maxPossibleHeight - $('footer').height() - 10
      maxPossibleWidth = maxPossibleWidth - $('.leftpanel').width() - $('.rightpanel').width() - 10
    } else {
      $('.gamecontainer').css('border', 'none')
      maxPossibleHeight = maxPossibleHeight - 10
      maxPossibleWidth = maxPossibleWidth - 10
    }
    var newWidth, newHeight
    if (windowWidth >= 1100) {
      if (maxPossibleWidth / maxPossibleHeight > game.aspectRatio) {
        newWidth = Math.floor(maxPossibleHeight * game.aspectRatio)
        newHeight = maxPossibleHeight
      } else {
        newHeight = Math.floor(maxPossibleWidth / game.aspectRatio)
        newWidth = maxPossibleWidth
      }
      game.scaleFactor = 640 / newWidth
      $('.gamecontainer').width(newWidth).height(newHeight)
      $('.gamelayer').width(newWidth).height(newHeight)
      $('.middlepanel').width(newWidth)
      menus.reposition(newWidth, newHeight)
    }
  },
  viewportX: 0,
  viewportY: 0,
  viewportTop: 35,
  viewportLeft: 0,
  viewportHeight: 481,
  viewportAdjustX: 0,
  viewportAdjustY: 0,
  screenWidth: 640,
  screenHeight: 535,
  animationTimeout: 100,
  animationInterval: undefined,
  createGrids: function () {
    if (!game.terrainGrid) {
      game.buildingLandscapeChanged = true
      var terrainGrid = Array(maps.currentMapTerrain.length)
      for (var i = 0; i < maps.currentMapTerrain.length; i++) {
        terrainGrid[i] = Array(maps.currentMapTerrain[i].length)
        for (var j = 0; j < maps.currentMapTerrain[i].length; j++) {
          if (maps.currentMapTerrain[i][j]) {
            terrainGrid[i][j] = 1
          } else {
            terrainGrid[i][j] = 0
          }
        }
      }
      for (var i = game.trees.length - 1; i >= 0; i--) {
        var item = game.trees[i]
        if (!item.gridShape) {
          console.log(item.name)
        }
        for (var j = item.gridShape.length - 1; j >= 0; j--) {
          for (var k = item.gridShape[j].length - 1; k >= 0; k--) {
            if (item.gridShape[j][k] == 1) {
              try {
                terrainGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = 1
              } catch (e) {}
            }
          }
        }
      }
      game.terrainGrid = terrainGrid
    }
    if (game.buildingLandscapeChanged) {
      game.obstructionGrid = $.extend(true, [], game.terrainGrid)
      for (var i = game.buildings.length - 1; i >= 0; i--) {
        var item = game.buildings[i]
        for (var j = item.gridShape.length - 1; j >= 0; j--) {
          for (var k = item.gridShape[j].length - 1; k >= 0; k--) {
            if (item.gridShape[j][k] == 1) {
              game.obstructionGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = item.name
            }
          }
        }
      }
      for (var i = game.turrets.length - 1; i >= 0; i--) {
        var item = game.turrets[i]
        for (var j = item.gridShape.length - 1; j >= 0; j--) {
          for (var k = item.gridShape[j].length - 1; k >= 0; k--) {
            if (item.gridShape[j][k] == 1) {
              game.obstructionGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = item.name
            }
          }
        }
      }
      for (var i = game.walls.length - 1; i >= 0; i--) {
        var item = game.walls[i]
        for (var j = item.gridShape.length - 1; j >= 0; j--) {
          for (var k = item.gridShape[j].length - 1; k >= 0; k--) {
            if (item.gridShape[j][k] == 1) {
              game.obstructionGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = item.name
            }
          }
        }
      }
    }
    if (!game.foggedObstructionGrid) {
      game.foggedObstructionGrid = {}
    }
    for (var l = game.players.length - 1; l >= 0; l--) {
      var player = game.players[l]
      var fogGrid = fog.fogGrid[player]
      if (!game.foggedObstructionGrid[player]) {
        game.foggedObstructionGrid[player] = $.extend(true, [], game.obstructionGrid)
      }
      for (var j = game.foggedObstructionGrid[player].length - 1; j >= 0; j--) {
        for (var k = game.foggedObstructionGrid[player][j].length - 1; k >= 0; k--) {
          game.foggedObstructionGrid[player][j][k] = fogGrid[j][k] == 1 ? 0 : game.obstructionGrid[j][k] === 0 ? 0 : 1
        }
      }
    }
    if (sidebar.deployMode || game.selectedMCVs.length > 0) {
      game.foggedBuildableGrid = game.createFoggedBuildableGrid(game.player)
    }
  },
  createFoggedBuildableGrid: function (player) {
    var fogGrid = fog.fogGrid[player]
    var foggedBuildableGrid = $.extend(true, [], game.terrainGrid)
    for (var j = foggedBuildableGrid.length - 1; j >= 0; j--) {
      for (var k = foggedBuildableGrid[j].length - 1; k >= 0; k--) {
        foggedBuildableGrid[j][k] = fogGrid[j][k] == 1 ? 1 : game.terrainGrid[j][k]
      }
    }
    for (var i = game.buildings.length - 1; i >= 0; i--) {
      var item = game.buildings[i]
      for (var j = item.gridBuild.length - 1; j >= 0; j--) {
        for (var k = item.gridBuild[j].length - 1; k >= 0; k--) {
          if (item.gridBuild[j][k] == 1) {
            foggedBuildableGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = 1
          }
        }
      }
    }
    for (var i = game.turrets.length - 1; i >= 0; i--) {
      var item = game.turrets[i]
      for (var j = item.gridBuild.length - 1; j >= 0; j--) {
        for (var k = item.gridBuild[j].length - 1; k >= 0; k--) {
          if (item.gridBuild[j][k] == 1) {
            foggedBuildableGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = 1
          }
        }
      }
    }
    for (var i = game.walls.length - 1; i >= 0; i--) {
      var item = game.walls[i]
      for (var j = item.gridBuild.length - 1; j >= 0; j--) {
        for (var k = item.gridBuild[j].length - 1; k >= 0; k--) {
          if (item.gridBuild[j][k] == 1) {
            foggedBuildableGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = 1
          }
        }
      }
    }
    for (var i = game.tiberium.length - 1; i >= 0; i--) {
      var item = game.tiberium[i]
      for (var j = item.gridBuild.length - 1; j >= 0; j--) {
        for (var k = item.gridBuild[j].length - 1; k >= 0; k--) {
          if (item.gridBuild[j][k] == 1) {
            foggedBuildableGrid[Math.floor(item.y) + j][Math.floor(item.x) + k] = 1
          }
        }
      }
    }
    for (var i = game.vehicles.length - 1; i >= 0; i--) {
      var item = game.vehicles[i]
      if (item.name === 'mcv' && item.selected && mouse.objectUnderMouse == item && item.player == game.player) {} else {
        var yFloor = Math.floor(item.y)
        var xFloor = Math.floor(item.x)
        if (yFloor >= 0 && yFloor <= foggedBuildableGrid.length && xFloor >= 0 && xFloor < foggedBuildableGrid[0].length) {
          foggedBuildableGrid[Math.floor(item.y)][Math.floor(item.x)] = 1
        }
      }
    }
    for (var i = game.infantry.length - 1; i >= 0; i--) {
      var item = game.infantry[i]
      var yFloor = Math.floor(item.y)
      var xFloor = Math.floor(item.x)
      if (yFloor >= 0 && yFloor <= foggedBuildableGrid.length && xFloor >= 0 && xFloor < foggedBuildableGrid[0].length) {
        foggedBuildableGrid[Math.floor(item.y)][Math.floor(item.x)] = 1
      }
    }
    for (var i = game.aircraft.length - 1; i >= 0; i--) {
      var item = game.aircraft[i]
      var yFloor = Math.floor(item.y)
      var xFloor = Math.floor(item.x)
      if (item.z < 1 / 8 && yFloor >= 0 && yFloor <= foggedBuildableGrid.length && xFloor >= 0 && xFloor < foggedBuildableGrid[0].length) {
        foggedBuildableGrid[Math.floor(item.y)][Math.floor(item.x)] = 1
      }
    }
    return foggedBuildableGrid
  },
  canBuildOnFoggedGrid: function (building, foggedBuildableGrid) {
    var buildingType = window[building.type].list[building.name]
    var grid = $.extend(true, [], buildingType.gridBuild)
    var canBuildHere = true
    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == 1) {
          if (foggedBuildableGrid[building.y + y][building.x + x] !== 0) {
            return false
          }
        }
      }
    }
    return true
  },
  animationLoop: function () {
    mouse.setCursor()
    sidebar.animate()
    game.createGrids()
    game.buildingLandscapeChanged = false
    triggers.process()
    for (var i = game.items.length - 1; i >= 0; i--) {
      var item = game.items[i]
      if (item.processOrders) {
        item.processOrders()
      }
      item.animate()
      if (item.preRender) {
        item.preRender()
      }
    }
    for (var i = game.effects.length - 1; i >= 0; i--) {
      game.effects[i].animate()
    }
    for (var i = game.bullets.length - 1; i >= 0; i--) {
      game.bullets[i].animate()
    }
    fog.animate()
    game.sortedItemsArray = $.extend([], game.items)
    game.sortedItemsArray.sort(function (a, b) {
      var by = b.cgY ? b.cgY : b.y
      var ay = a.cgY ? a.cgY : a.y
      return (b.z - a.z) * 1.25 + (by - ay) + (by == ay ? a.x - b.x : 0)
    })
    game.lastAnimationTime = (new Date()).getTime()
  },
  drawingLoop: function () {
    game.foregroundContext.clearRect(0, 0, game.screenWidth, game.screenHeight)
    sidebar.draw()
    game.lastDrawTime = (new Date()).getTime()
    if (game.lastAnimationTime) {
      game.movementInterpolationFactor = (game.lastDrawTime - game.lastAnimationTime) / game.animationTimeout - 1
      if (game.movementInterpolationFactor > 0) {
        game.movementInterpolationFactor = 0
      }
    } else {
      game.movementInterpolationFactor = -1
    }
    game.foregroundContext.save()
    game.foregroundContext.beginPath()
    game.viewportWidth = sidebar.visible ? game.screenWidth - sidebar.width : game.screenWidth
    game.foregroundContext.rect(game.viewportLeft, game.viewportTop, game.viewportWidth - game.viewportLeft, game.viewportHeight)
    game.foregroundContext.clip()
    mouse.handlePanning()
    maps.draw()
    for (var i = game.sortedItemsArray.length - 1; i >= 0; i--) {
      game.sortedItemsArray[i].draw()
    }
    for (var i = game.effects.length - 1; i >= 0; i--) {
      game.effects[i].draw()
    }
    for (var i = game.bullets.length - 1; i >= 0; i--) {
      game.bullets[i].draw()
    }
    fog.draw()
    if (sidebar.deployMode && sidebar.deployBuilding) {
      var buildingType = sidebar.deployBuilding
      var grid = $.extend(true, [], buildingType.gridBuild)
      sidebar.canBuildHere = true
      sidebar.tooFarAway = true
      for (var i = game.buildings.length - 1; i >= 0; i--) {
        var building = game.buildings[i]
        if (building.player == game.player) {
          if (Math.abs(building.x + building.gridWidth / 2 - mouse.gridX - buildingType.gridWidth / 2) < building.gridWidth / 2 + buildingType.gridWidth / 2 + 2 && Math.abs(building.y + building.gridHeight / 2 - mouse.gridY - buildingType.gridHeight / 2) < building.gridHeight / 2 + buildingType.gridHeight / 2 + 3) {
            sidebar.tooFarAway = false
            break
          }
        }
      }
      for (var i = game.turrets.length - 1; i >= 0; i--) {
        var building = game.turrets[i]
        if (building.player == game.player) {
          if (Math.abs(building.x + building.gridWidth / 2 - mouse.gridX - buildingType.gridWidth / 2) < building.gridWidth / 2 + buildingType.gridWidth / 2 + 2 && Math.abs(building.y + building.gridHeight / 2 - mouse.gridY - buildingType.gridHeight / 2) < building.gridHeight / 2 + buildingType.gridHeight / 2 + 3) {
            sidebar.tooFarAway = false
            break
          }
        }
      }
      for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
          if (grid[y][x] == 1) {
            if (sidebar.tooFarAway || mouse.gridY + y < 0 || mouse.gridY + y >= game.foggedBuildableGrid.length || mouse.gridX + x < 0 || mouse.gridX + x >= game.foggedBuildableGrid[mouse.gridY + y].length || game.foggedBuildableGrid[mouse.gridY + y][mouse.gridX + x] !== 0) {
              game.highlightGrid(mouse.gridX + x, mouse.gridY + y, 1, 1, sidebar.placementRedImage)
              sidebar.canBuildHere = false
            } else {
              game.highlightGrid(mouse.gridX + x, mouse.gridY + y, 1, 1, sidebar.placementWhiteImage)
            }
          }
        }
      }
    }
    if (game.showEnding) {
      var endingImage = game.showEnding == 'success' ? sidebar.missionAccomplished : sidebar.missionFailed
      game.foregroundContext.drawImage(endingImage, game.viewportLeft + game.viewportWidth / 2 - endingImage.width / 2, game.viewportTop + game.viewportHeight / 2 - endingImage.height / 2)
    }
    game.foregroundContext.restore()
    if (game.type === 'multiplayer' && !game.replay) {
      game.foregroundContext.fillStyle = 'rgb(40,40,40)'
      game.foregroundContext.fillText('C: ' + game.gameTick, game.canvasWidth - 200, game.canvasHeight - 5)
      game.foregroundContext.fillText('S: ' + multiplayer.lastReceivedTick, game.canvasWidth - 100, game.canvasHeight - 5)
      if (multiplayer.gameLagging) {
        game.foregroundContext.fillText('Server Syncing...', 150, game.canvasHeight - 5)
      }
      game.foregroundContext.fillStyle = 'rgb(100,100,100)'
      game.foregroundContext.fillText('L: ' + multiplayer.averageLatency + ' ms', 20, game.canvasHeight - 5)
    }
    if (game.replay) {
      var replayTop = sidebar.top
      game.foregroundContext.drawImage(sidebar.replayMenuImage, 0, replayTop)
      if (game.type !== 'singleplayer') {
        game.foregroundContext.fillStyle = 'black'
        game.foregroundContext.fillRect(0, sidebar.top + 87, 130, 32)
      }
      game.foregroundContext.fillStyle = 'lightgreen'
      game.foregroundContext.font = '16px Command'
      game.foregroundContext.globalAlpha = sidebar.textBrightness
      game.foregroundContext.fillText('R E P L A Y', 32, replayTop + 20)
      game.foregroundContext.globalAlpha = 1
    }
    mouse.draw()
    if (game.running) {
      game.drawingInterval = requestAnimationFrame(game.drawingLoop)
    }
    if (!game.fps) {
      game.fps = []
    }
    game.fps.push(new Date())
    if (game.fps.length > 51) {
      game.fps.shift()
      var fps = Math.round(5e4 / (game.fps[50] - game.fps[0]))
      mouse.context.fillStyle = 'rgb(100,100,100)'
      mouse.context.fillText('FPS: ' + fps, 100, game.canvasHeight - 5)
    }
  },
  highlightGrid: function (i, j, width, height, optionalImage) {
    var gridSize = game.gridSize
    if (optionalImage && $(optionalImage).is('img')) {
      game.foregroundContext.drawImage(optionalImage, i * gridSize + game.viewportAdjustX, j * gridSize + game.viewportAdjustY, width * gridSize, height * gridSize)
    } else {
      if (optionalImage) {
        game.foregroundContext.fillStyle = optionalImage
      } else {
        game.foregroundContext.fillStyle = 'rgba(225,225,225,0.5)'
      }
      game.foregroundContext.fillRect(i * gridSize + game.viewportAdjustX, j * gridSize + game.viewportAdjustY, width * gridSize, height * gridSize)
    }
  },
  remove: function (item) {
    item.lifeCode = 'dead'
    if (item.selected) {
      item.selected = false
      for (var j = game.selectionArrays.length - 1; j >= 0; j--) {
        var type = game.selectionArrays[j]
        for (var i = game[type].length - 1; i >= 0; i--) {
          if (game[type][i].uid == item.uid) {
            game[type].splice(i, 1)
            break
          }
        }
      }
    }
    for (var i = game.items.length - 1; i >= 0; i--) {
      if (game.items[i].uid == item.uid) {
        game.items.splice(i, 1)
        break
      }
    }
    for (var i = game.attackableItems.length - 1; i >= 0; i--) {
      if (game.attackableItems[i].uid == item.uid) {
        game.attackableItems.splice(i, 1)
        break
      }
    }
    for (var j = game.controlGroups.length - 1; j >= 0; j--) {
      var group = game.controlGroups[j]
      if (group) {
        for (var i = group.length - 1; i >= 0; i--) {
          if (group[i].uid == item.uid) {
            group.splice(i, 1)
            break
          }
        }
      }
    }
    for (var i = game[item.type].length - 1; i >= 0; i--) {
      if (game[item.type][i].uid == item.uid) {
        game[item.type].splice(i, 1)
        break
      }
    }
    if (item.type == 'buildings' || item.type == 'turrets' || item.type == 'walls') {
      game.buildingLandscapeChanged = true
    }
  },
  add: function (item) {
    var object
    game.counter++
    if (item.uid == undefined) {
      item.uid = game.counter
    }
    if (item.type == 'buildings' || item.type == 'turrets' || item.type == 'walls') {
      game.buildingLandscapeChanged = true
    }
    console.log(`Adding ${item.type}`)
    switch (item.type) {
      case 'infantry':
      case 'vehicles':
      case 'ships':
      case 'buildings':
      case 'turrets':
      case 'walls':
      case 'aircraft':
        object = window[item.type].add(item)
        game[item.type].push(object)
        game.items.push(object)
        game.attackableItems.push(object)
        break
      case 'tiberium':
      case 'trees':
        object = window[item.type].add(item)
        game[item.type].push(object)
        game.items.push(object)
        break
      case 'triggers':
      case 'effects':
      case 'bullets':
        object = window[item.type].add(item)
        game[item.type].push(object)
        break
      default:
        console.log('Did not add ' + item.type + ' : ' + item.name)
        break
    }
    return object
  },
  gameSpeed: 1,
  scrollSpeed: 1,
  speedAdjustmentFactor: 6,
  selectionArrays: ['selectedItems', 'selectedUnits', 'selectedVehicles', 'selectedAttackers', 'selectedHarvesters', 'selectedEngineers', 'selectedInfantry', 'selectedCommandos', 'selectedMCVs', 'selectedAircraft'],
  itemArrays: ['attackableItems', 'vehicles', 'ships', 'infantry', 'buildings', 'turrets', 'effects', 'bullets', 'walls', 'aircraft', 'items', 'trees', 'tiberium', 'triggers', 'controlGroups', 'permissions', 'attackedPlayers', 'discoveredPlayers'],
  resetTypes: function () {
    game.counter = 1
    game.showEnding = false
    game.terrainGrid = undefined
    game.foggedObstructionGrid = undefined
    game.refreshBackground = true
    for (var i = game.itemArrays.length - 1; i >= 0; i--) {
      game[game.itemArrays[i]] = []
    }
    for (var j = game.selectionArrays.length - 1; j >= 0; j--) {
      game[game.selectionArrays[j]] = []
    }
  },
  selectItem: function (item, shiftPressed, multipleSelection) {
    if (shiftPressed && item.selected) {
      item.selected = false
      for (var j = game.selectionArrays.length - 1; j >= 0; j--) {
        game[game.selectionArrays[j]].remove(item)
      }
      return
    }
    item.selected = true
    this.selectedItems.push(item)
    if (item.type != 'buildings' && item.type != 'turrets' && item.type != 'ships' && item.type != 'walls' && item.player == game.player) {
      this.selectedUnits.push(item)
      if (!multipleSelection && !game.replay) {
        if (item.name == 'commando') {
          sounds.play('commando_select')
        } else {
          sounds.play(item.type + '_select')
        }
      }
      if (item.type == 'vehicles') {
        this.selectedVehicles.push(item)
      }
      if (item.primaryWeapon) {
        this.selectedAttackers.push(item)
      }
      if (item.name == 'harvester') {
        this.selectedHarvesters.push(item)
      }
      if (item.type == 'aircraft') {
        this.selectedAircraft.push(item)
      }
      if (item.type == 'infantry') {
        this.selectedInfantry.push(item)
      }
      if (item.name == 'engineer') {
        this.selectedEngineers.push(item)
      }
      if (item.name == 'commando') {
        this.selectedCommandos.push(item)
      }
      if (item.name == 'mcv') {
        this.selectedMCVs.push(item)
      }
    }
  },
  clearSelection: function () {
    for (var i = this.selectedItems.length - 1; i >= 0; i--) {
      this.selectedItems[i].selected = false
      this.selectedItems.splice(i, 1)
    }
    for (var j = game.selectionArrays.length - 1; j >= 0; j--) {
      game[game.selectionArrays[j]].length = 0
    }
  },
  click: function (ev, rightClick) {
    if (game.replay) {
      if (mouse.x >= 22 && mouse.x <= 124) {
        if (mouse.y >= 60 && mouse.y <= 85) {
          if (mouse.x >= 22 && mouse.x <= 52) {
            sounds.play('button')
            window[game.type].pauseReplay()
          } else if (mouse.x >= 56 && mouse.x <= 88) {
            sounds.play('button')
            window[game.type].resumeReplay()
          } else if (mouse.x >= 92 && mouse.x <= 124) {
            if (game.gameSpeed >= 8) {
              sounds.play('scold')
            } else {
              sounds.play('button')
              window[game.type].fastForwardReplay()
            }
          }
        } else if (mouse.y >= 94 && mouse.y <= 116) {
          sounds.play('button')
          window[game.type].exitReplay()
          return
        } else if (game.type === 'singleplayer' && mouse.y >= 126 && mouse.y <= 148) {
          sounds.play('button')
          singleplayer.resumeGameFromHere()
          return
        }
      }
    }
    var clickedObject = mouse.objectUnderMouse
    if (rightClick) {
      this.clearSelection()
      sidebar.repairMode = false
      sidebar.deployMode = false
      sidebar.sellMode = false
    } else if (sidebar.deployMode) {
      if (sidebar.deploySpecial) {
        sidebar.finishDeployingSpecial()
      } else if (sidebar.deployBuilding) {
        if (sidebar.canBuildHere) {
          sidebar.finishDeployingBuilding()
        } else {
          sounds.play('cannot_deploy_here')
        }
      }
    } else if (!rightClick && !mouse.dragSelect) {
      var commandUids = []
      if (clickedObject && clickedObject.name == 'mcv' && mouse.cursor == mouse.cursors['build_command'] && !game.replay) {
        game.sendCommand([clickedObject.uid], {
          type: 'deploy'
        })
      } else if (clickedObject && clickedObject.name == 'apc' && mouse.cursor == mouse.cursors['build_command'] && !game.replay) {
        game.sendCommand([clickedObject.uid], {
          type: 'unload'
        })
      } else if (clickedObject && clickedObject.name == 'chinook' && mouse.cursor == mouse.cursors['build_command'] && !game.replay) {
        game.sendCommand([clickedObject.uid], {
          type: 'unload'
        })
      } else if (clickedObject && mouse.cursor == mouse.cursors['sell'] && clickedObject.orders.type != 'sell') {
        game.sendCommand([clickedObject.uid], {
          type: 'sell'
        })
      } else if (clickedObject && clickedObject.name == 'apc' && game.selectedInfantry.length > 0 && mouse.cursor == mouse.cursors['load'] && !game.replay) {
        for (var i = game.selectedInfantry.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedInfantry[i].uid)
        }
        if (game.selectedCommandos.length > 0) {
          sounds.play('commando_move')
        } else {
          sounds.play('infantry_move')
        }
        game.sendCommand(commandUids, {
          type: 'load',
          uidto: clickedObject.uid
        })
        game.sendCommand([clickedObject.uid], {
          type: 'load'
        })
      } else if (clickedObject && clickedObject.name == 'chinook' && game.selectedInfantry.length > 0 && mouse.cursor == mouse.cursors['load'] && !game.replay) {
        for (var i = game.selectedInfantry.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedInfantry[i].uid)
        }
        if (game.selectedCommandos.length > 0) {
          sounds.play('commando_move')
        } else {
          sounds.play('infantry_move')
        }
        game.sendCommand(commandUids, {
          type: 'load',
          uidto: clickedObject.uid
        })
        game.sendCommand([clickedObject.uid], {
          type: 'load'
        })
      } else if (clickedObject && mouse.cursor == mouse.cursors['repair']) {
        if (clickedObject.repairing) {
          game.sendCommand([clickedObject.uid], {
            type: 'stop-repair'
          })
        } else {
          game.sendCommand([clickedObject.uid], {
            type: 'repair'
          })
        }
      } else if (clickedObject && game.selectedCommandos.length > 0 && mouse.cursor == mouse.cursors['detonate'] && !game.replay) {
        for (var i = game.selectedCommandos.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedCommandos[i].uid)
        }
        sounds.play('commando_move')
        game.sendCommand(commandUids, {
          type: 'infiltrate',
          uidto: clickedObject.uid
        })
      } else if (clickedObject && game.selectedEngineers.length > 0 && mouse.cursor == mouse.cursors['load'] && !game.replay) {
        for (var i = game.selectedEngineers.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedEngineers[i].uid)
        }
        sounds.play('infantry_move')
        game.sendCommand(commandUids, {
          type: 'infiltrate',
          uidto: clickedObject.uid
        })
      } else if (clickedObject && game.selectedVehicles.length > 0 && clickedObject.player == game.player && clickedObject.name == 'repair-facility' && !game.replay) {
        for (var i = game.selectedVehicles.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedVehicles[i].uid)
        }
        sounds.play('vehicles_move')
        game.sendCommand(commandUids, {
          type: 'move',
          to: {
            x: Math.round(16 * mouse.gameX / game.gridSize) / 16,
            y: Math.round(16 * mouse.gameY / game.gridSize) / 16
          }
        })
      } else if (clickedObject && game.selectedHarvesters.length > 0 && clickedObject.name == 'tiberium' && !game.replay) {
        for (var i = game.selectedHarvesters.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedHarvesters[i].uid)
        }
        sounds.play('vehicles_move')
        game.sendCommand(commandUids, {
          type: 'harvest',
          uidtiberium: clickedObject.uid
        })
      } else if (clickedObject && game.selectedAircraft.length > 0 && clickedObject.player == game.player && clickedObject.name == 'helipad' && !game.replay) {
        for (var i = game.selectedAircraft.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedAircraft[i].uid)
        }
        sounds.play('vehicles_move')
        game.sendCommand(commandUids, {
          type: 'return',
          uidhelipad: clickedObject.uid
        })
      } else if (clickedObject && game.selectedHarvesters.length > 0 && clickedObject.player == game.player && clickedObject.name == 'refinery' && !game.replay) {
        for (var i = game.selectedHarvesters.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedHarvesters[i].uid)
        }
        sounds.play('vehicles_move')
        game.sendCommand(commandUids, {
          type: 'harvest-return',
          uidrefinery: clickedObject.uid
        })
      } else if (clickedObject && game.selectedAttackers.length > 0 && mouse.objectUnderMouse.player != game.player && !mouse.objectUnderMouse.unattackable && !game.replay) {
        for (var i = game.selectedAttackers.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedAttackers[i].uid)
        }
        if (game.selectedCommandos.length > 0) {
          sounds.play('commando_move')
        } else {
          sounds.play(game.selectedAttackers[0].type + '_move')
        }
        game.sendCommand(commandUids, {
          type: 'attack',
          uidto: clickedObject.uid
        })
      } else if (clickedObject && !clickedObject.unselectable) {
        if (!ev.shiftKey) {
          this.clearSelection()
        }
        if (!clickedObject.unselectable) {
          this.selectItem(clickedObject, ev.shiftKey)
        }
      } else if (this.selectedUnits.length > 0 && !game.replay) {
        for (var i = game.selectedUnits.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedUnits[i].uid)
        }
        if (game.selectedCommandos.length > 0) {
          sounds.play('commando_move')
        } else {
          sounds.play(game.selectedUnits[0].type + '_move')
        }
        game.sendCommand(commandUids, {
          type: 'move',
          to: {
            x: Math.round(16 * mouse.gameX / game.gridSize) / 16,
            y: Math.round(16 * mouse.gameY / game.gridSize) / 16
          }
        })
      }
    }
  },
  sendCommand: function (commandUids, command) {
    if (game.replay) {
      return
    }
    if (game.type === 'singleplayer') {
      singleplayer.sendCommand(commandUids, command)
    } else {
      multiplayer.sendCommand(commandUids, command)
    }
  },
  getItemByUid: function (uid) {
    for (var i = game.items.length - 1; i >= 0; i--) {
      var item = game.items[i]
      if (item.uid === uid) {
        return item
      }
    }
  },
  receiveCommand: function (commandUids, command) {
    if (commandUids == 'sidebar') {
      sidebar.processOrders(command)
      return
    }
    for (var i = commandUids.length - 1; i >= 0; i--) {
      var item = game.getItemByUid(commandUids[i])
      if (item) {
        var orders = $.extend(true, {}, command)
        orders.to = orders.uidto ? game.getItemByUid(orders.uidto) : orders.to
        orders.refinery = orders.uidrefinery ? game.getItemByUid(orders.uidrefinery) : undefined
        orders.tiberium = orders.uidtiberium ? game.getItemByUid(orders.uidtiberium) : undefined
        orders.helipad = orders.uidhelipad ? game.getItemByUid(orders.uidhelipad) : undefined
        item.orders = orders
        item.animationIndex = 0
      }
    }
  },
  reset: function () {
    game.foregroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
    game.backgroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
    mouse.context.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
  },
  count: function (type, player, uid, name) {
    if (!player) {
      return game[type].length
    } else {
      if (!uid) {
        var count = 0
        if (type) {
          for (var i = 0; i < game[type].length; i++) {
            if (game[type][i].player == player && (!name || name === game[type][i].name)) {
              count++
            }
          }
        } else {
          for (var i = 0; i < game.attackableItems.length; i++) {
            if (game.attackableItems[i].player == player) {
              count++
            }
          }
        }
        return count
      } else {
        var count = 0
        for (var i = 0; i < game.attackableItems.length; i++) {
          if (game.attackableItems[i].player == player && game.attackableItems[i].uid == uid) {
            count++
            break
          }
        }
        return count
      }
    }
  },
  keyPressed: function (ev) {
    if (!game.running && !videos.running) {
      return
    }
    var keyCode = ev.which
    var ctrlPressed = ev.ctrlKey
    if (videos.running) {
      if (keyCode == 27) {
        videos.stop()
      }
      return
    }
    if (game.running) {
      if (game.type == 'multiplayer' && !game.replay) {
        $inputbox = $('#gameinterfacescreen .input-message')
        if (game.chatMode) {
          if (keyCode == 13 || keyCode == 27) {
            if (keyCode == 27) {
              $inputbox.hide()
              game.chatMode = false
            } else if (keyCode == 13) {
              if ($inputbox.val() != '') {
                multiplayer.sendMessageToPlayers($inputbox.val())
                $inputbox.val('')
                $inputbox.focus()
              } else {
                $inputbox.hide()
                game.chatMode = false
              }
            }
          } else {
            return
          }
        } else {
          if ((keyCode == 13 || keyCode == 115) && !game.chatMode) {
            game.chatMode = true
            $inputbox.val('')
            $inputbox.show()
            $inputbox.focus()
          }
        }
      }
      if (keyCode >= 37 && keyCode <= 40) {
        if (keyCode >= 37 && keyCode <= 40) {
          switch (keyCode) {
            case 37:
              game.leftKeyPressed = true
              break
            case 38:
              game.upKeyPressed = true
              break
            case 39:
              game.rightKeyPressed = true
              break
            case 40:
              game.downKeyPressed = true
              break
          }
        }
      } else if (keyCode >= 48 && keyCode <= 57) {
        var keyNumber = keyCode - 48
        if (ctrlPressed) {
          if (game.selectedItems.length > 0) {
            game.controlGroups[keyNumber] = $.extend([], game.selectedItems)
            console.log('Control Group', keyNumber, 'now has', game.controlGroups[keyNumber].length, 'items')
          }
        } else {
          if (game.controlGroups[keyNumber]) {
            game.clearSelection()
            var lastUnit
            for (var i = game.controlGroups[keyNumber].length - 1; i >= 0; i--) {
              var item = game.controlGroups[keyNumber][i]
              if (item.lifeCode == 'dead') {
                game.controlGroups[keyNumber].splice(i, 1)
              } else {
                if (item.type == 'infantry' || item.type == 'vehicles') {
                  lastUnit = item
                }
                game.selectItem(item, ev.shiftKey, true)
              }
            }
            if (lastUnit && !game.replay) {
              sounds.play(lastUnit.type + '_select')
            }
          }
        }
      } else if (keyCode == 71 && game.selectedAttackers.length) {
        var commandUids = []
        for (var i = game.selectedAttackers.length - 1; i >= 0; i--) {
          commandUids.push(game.selectedAttackers[i].uid)
        }
        game.sendCommand(commandUids, {
          type: 'guard'
        })
        sounds.play(game.selectedAttackers[0].type + '_move')
      } else if (keyCode == 32 && game.running) {
        if (game.type == 'singleplayer') {
          singleplayer.gameOptions()
        } else {
          multiplayer.gameOptions()
        }
      } else if (keyCode == 72 && game.running) {
        var homeBase
        for (var i = game.buildings.length - 1; i >= 0; i--) {
          if (game.buildings[i].player == game.player && game.buildings[i].name == 'construction-yard') {
            homeBase = game.buildings[i]
            if (homeBase.primaryBuilding) {
              break
            }
          }
        }
        if (!homeBase) {
          for (var i = game.vehicles.length - 1; i >= 0; i--) {
            if (game.vehicles[i].player == game.player && game.vehicles[i].name == 'mcv') {
              homeBase = game.vehicles[i]
            }
          }
        }
        if (homeBase) {
          var x = homeBase.x * game.gridSize
          var y = homeBase.y * game.gridSize
          game.viewportX = Math.max(0, Math.min(x - game.viewportWidth / 2, maps.currentMapImage.width - game.viewportWidth))
          game.viewportY = Math.max(0, Math.min(y - game.viewportHeight / 2, maps.currentMapImage.height - game.viewportHeight))
          game.viewportAdjustX = 0
          game.viewportAdjustY = 0
          game.viewportDeltaX = 0
          game.viewportDeltaY = 0
          game.refreshBackground = true
        }
      } else {
        return
      }
    }
    ev.preventDefault()
    ev.stopPropagation()
    return false
  },
  keyReleased: function (ev) {
    var keyCode = ev.which
    if (keyCode >= 37 && keyCode <= 40) {
      switch (keyCode) {
        case 37:
          game.leftKeyPressed = false
          break
        case 38:
          game.upKeyPressed = false
          break
        case 39:
          game.rightKeyPressed = false
          break
        case 40:
          game.downKeyPressed = false
          break
      }
    }
  }
}
