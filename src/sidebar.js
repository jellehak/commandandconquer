var sidebar = {
  visible: false,
  width: 160,
  iconWidth: 64,
  iconHeight: 48,
  constructing: {},
  power: {},
  load: function () {
    this.top = game.viewportTop - 2
    this.left = game.canvasWidth - this.width
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.tabsImage = loader.loadImage('images/sidebar/tabs.png')
    this.sidebarImage = loader.loadImage('images/sidebar/sidebar.png')
    this.primaryBuildingImage = loader.loadImage('images/sidebar/primary.png')
    this.readyImage = loader.loadImage('images/sidebar/ready.png')
    this.holdImage = loader.loadImage('images/sidebar/hold.png')
    this.placementWhiteImage = loader.loadImage('images/sidebar/placement-white.gif')
    this.placementRedImage = loader.loadImage('images/sidebar/placement-red.gif')
    this.powerIndicator = loader.loadImage('images/sidebar/power/power_indicator2.png')
    this.repairButtonPressed = loader.loadImage('images/sidebar/buttons/repair-pressed.png')
    this.sellButtonPressed = loader.loadImage('images/sidebar/buttons/sell-pressed.png')
    this.mapButtonPressed = loader.loadImage('images/sidebar/buttons/map-pressed.png')
    this.mapButtonNotPressed = loader.loadImage('images/sidebar/buttons/map-not-pressed.png')
    this.repairImageBig = loader.loadImage('images/sidebar/repair-big.png')
    this.repairImageSmall = loader.loadImage('images/sidebar/repair-small.png')
    this.selectImageBig = loader.loadImage('images/sidebar/select-big.png')
    this.selectImageSmall = loader.loadImage('images/sidebar/select-small.png')
    this.iconsSpriteSheet = loader.loadImage('images/sidebar/icons-sprite-sheet.png')
    this.missionAccomplished = loader.loadImage('images/sidebar/mission-accomplished.png')
    this.missionFailed = loader.loadImage('images/sidebar/mission-failed.png')
    this.replayMenuImage = loader.loadImage('images/menu/replay-controls-menu.png')
    this.nodRadar = loader.loadImage('images/sidebar/nod-radar.png')
  },
  init: function () {
    this.visible = false
    var iconSpriteList = ['advanced-communications-tower', 'advanced-guard-tower', 'advanced-power-plant', 'air-strike', 'airstrip', 'apache', 'apc', 'artillery', 'barb-wire', 'barracks', 'chain-link', 'chem-warrior', 'commando', 'communications-center', 'concrete-wall', 'engineer', 'flame-tank', 'flame-thrower', 'grenadier', 'guard-tower', 'gunboat', 'hand-of-nod', 'harvester', 'helipad', 'hover-craft', 'ion-cannon', 'jeep', 'light-tank', 'mammoth-tank', 'mcv', 'medium-tank', 'minigunner', 'mobile-rocket-launch-system', 'buggy', 'nuclear-strike', 'obelisk', 'orca', 'power-plant', 'recon-bike', 'refinery', 'repair-facility', 'bazooka', 'sam-site', 'sandbag', 'ssm-launcher', 'stealth-tank', 'air-strike', 'temple-of-nod', 'tiberium-silo', 'chinook', 'gun-turret', 'weapons-factory', 'wooden-fence']
    var iconSprites = []
    for (var i = 0; i < iconSpriteList.length; i++) {
      iconSprites[iconSpriteList[i]] = {
        offset: i * this.iconWidth,
        index: i,
        name: iconSpriteList[i]
      }
    }
    this.mapCanvas = document.createElement('canvas')
    this.mapContext = this.mapCanvas.getContext('2d')
    this.mapCanvas.width = 148
    this.mapCanvas.height = 132
    this.tempMapCanvas = document.createElement('canvas')
    this.tempMapContext = this.tempMapCanvas.getContext('2d')
    this.tempMapCanvas.width = 148
    this.tempMapCanvas.height = 132
    var data = maps.currentMapData
    this.iconList = []
    this.leftButtons = []
    this.rightButtons = []
    this.leftButtonOffset = 0
    this.rightButtonOffset = 0
    this.repairMode = false
    this.sellMode = false
    this.mapMode = false
    this.deployMode = false
    this.mapEnabled = false
    this.constructing = []
    this.power = []
    var buildableTypes = Object.keys(data.buildable).sort()
    for (var bt = buildableTypes.length - 1; bt >= 0; bt--) {
      var type = buildableTypes[bt]
      var requirementArray = data.buildable[type]
      for (var i = 0; i < requirementArray.length; i++) {
        var name = requirementArray[i]
        var details = window[type].list[name]
        if (details.dependency) {
          var iconObject = {
            name: name,
            offset: iconSprites[name].offset,
            type: type,
            details: details,
            dependency: details.dependency,
            constructedIn: details.constructedIn,
            owner: details.owner,
            cost: details.cost,
            label: details.label,
            satisfied: false
          }
          this.iconList.push(iconObject)
        }
      }
    }
  },
  textBrightness: 1,
  checkSpecial: function () {
    for (var i = this.iconList.length - 1; i >= 0; i--) {
      var icon = this.iconList[i]
      if (icon.type == 'special') {
        if (icon.satisfied) {
          if (icon.details.needsPower) {
            if (sidebar.power[game.player].powerIn <= sidebar.power[game.player].powerOut) {
              if (icon.status !== 'building' && icon.status !== 'ready') {
                game.sendCommand('sidebar', {
                  type: 'build',
                  item: {
                    player: game.player,
                    cost: icon.cost,
                    constructedIn: icon.constructedIn,
                    type: icon.type,
                    name: icon.name
                  }
                })
                icon.status = 'building'
              }
            } else {
              if (icon.status != 'disabled' && sidebar.constructing[game.player] && sidebar.constructing[player][icon.name]) {
                game.sendCommand('sidebar', {
                  type: 'cancel',
                  item: {
                    player: game.player,
                    type: icon.type,
                    name: icon.name
                  }
                })
              }
              icon.status = 'disabled'
            }
          } else {
            if (icon.status !== 'building' && icon.status !== 'ready') {
              game.sendCommand('sidebar', {
                type: 'build',
                item: {
                  player: game.player,
                  cost: icon.cost,
                  constructedIn: icon.constructedIn,
                  type: icon.type,
                  name: icon.name
                }
              })
              icon.status = 'building'
            }
          }
        } else {
          if (icon.status != 'disabled' && sidebar.constructing && sidebar.constructing.hasOwnProperty(game.player) && sidebar.constructing[player].hasOwnProperty(icon.name)) {
            game.sendCommand('sidebar', {
              type: 'cancel',
              item: {
                player: game.player,
                type: icon.type,
                name: icon.name
              }
            })
          }
          icon.status = 'disabled'
        }
      }
    }
  },
  animate: function () {
    this.textBrightness -= 0.1
    if (this.textBrightness < 0) {
      this.textBrightness = 1
    }
    sidebar.checkDependencies()
    sidebar.checkPower()
    sidebar.checkSpecial()
    var havePower = sidebar.power[game.player].powerIn <= sidebar.power[game.player].powerOut
    if (havePower) {
      sidebar.lowPower = false
    } else {
      if (!sidebar.lowPower) {
        sidebar.lowPower = true
        sounds.play('low_power')
      }
    }
    var canRunRadar = sidebar.isDependencySatisfied(['communications-center|advanced-communications-tower'], 'both', 'radar')
    if (canRunRadar && havePower) {
      if (!sidebar.mapEnabled) {
        sidebar.mapEnabled = true
        sidebar.mapMode = true
        sounds.play('communications_center_enabled')
      }
    } else {
      if (sidebar.mapEnabled) {
        sidebar.mapEnabled = false
        sidebar.mapMode = false
        sounds.play('power_down')
      }
    }
    sidebar.animateMap()
    var constructingPlayers = Object.keys(sidebar.constructing).sort()
    for (var cp = constructingPlayers.length - 1; cp >= 0; cp--) {
      var player = constructingPlayers[cp]
      var constructingItems = Object.keys(sidebar.constructing[player]).sort()
      for (var ci = constructingItems.length - 1; ci >= 0; ci--) {
        var itemName = constructingItems[ci]
        var item = sidebar.constructing[player][itemName]
        if (item.status == 'building') {
          var constructingBuildingCount = 1
          var deltaCost = 2
          if (sidebar.power[player].powerIn > sidebar.power[player].powerOut) {
            deltaCost = deltaCost / (1 + 20 * (1 - Math.pow(sidebar.power[player].powerOut / sidebar.power[player].powerIn, 2)))
          }
          if (deltaCost <= game.cash[item.player] || item.spent <= game.cash[item.player] || item.type == 'special') {
            item.spent -= deltaCost
            if (item.type !== 'special') {
              game.cash[item.player] -= deltaCost
            } else {
              if (sidebar.power[player].powerIn > sidebar.power[player].powerOut) {
                item.spent = item.cost
              }
            }
            if (item.spent < 0) {
              game.cash[item.player] -= item.spent
              item.spent = 0
              item.status = 'ready'
              if (item.type == 'buildings' || item.type == 'turrets' || item.type == 'walls') {
                if (item.player == game.player) {
                  sounds.play('construction_complete')
                  var buttons = this.leftButtons
                  var button
                  for (var i = buttons.length - 1; i >= 0; i--) {
                    button = buttons[i]
                    if (button.name == item.name) {
                      break
                    }
                  }
                  button.status = 'ready'
                }
              } else if (item.type == 'infantry' || item.type == 'vehicles' || item.type == 'aircraft') {
                if (item.player == game.player) {
                  sounds.play('unit_ready')
                  var dependency = window[item.type].list[item.name].dependency
                  for (var i = this.iconList.length - 1; i >= 0; i--) {
                    if (this.iconList[i].dependency[0] == dependency[0]) {
                      this.iconList[i].status = undefined
                    }
                  }
                }
                sidebar.finishDeployingUnit(item)
              } else if (item.type == 'special') {
                if (item.player == game.player) {
                  var buttons = this.rightButtons
                  var button
                  for (var i = buttons.length - 1; i >= 0; i--) {
                    button = buttons[i]
                    if (button.name == item.name) {
                      break
                    }
                  }
                  if (button.details.readySound) {
                    sounds.play(button.details.readySound)
                  }
                  button.status = 'ready'
                }
              }
            }
            item.percentComplete = 1 - item.spent / item.cost
          }
        }
      }
    }
  },
  minimapWidth: 148,
  minimapHeight: 132,
  minimapSquareWidth: 132,
  minimapImageSize: 128,
  animateMap: function () {
    if (sidebar.mapEnabled && sidebar.mapMode) {
      var squareWidth = this.minimapHeight
      var squareLeft = (this.minimapWidth - squareWidth) / 2
      var squareTop = (this.minimapHeight - squareWidth) / 2
      var imageWidth = this.minimapImageSize
      var imageHeight = this.minimapImageSize
      var imageTop = squareTop + (squareWidth - imageWidth) / 2
      var imageLeft = squareLeft + (squareWidth - imageHeight) / 2
      if (maps.currentMapImage.width > maps.currentMapImage.height) {
        imageHeight = maps.currentMapImage.height / maps.currentMapImage.width * imageWidth
        imageTop += (imageWidth - imageHeight) / 2
        this.minimapScale = maps.currentMapImage.width / this.minimapImageSize
      } else {
        imageWidth = maps.currentMapImage.width / maps.currentMapImage.height * imageHeight
        imageLeft += (imageHeight - imageWidth) / 2
        this.minimapScale = maps.currentMapImage.height / this.minimapImageSize
      }
      this.minimapImageWidth = imageWidth
      this.minimapImageHeight = imageHeight
      this.minimapImageTop = imageTop
      this.minimapImageLeft = imageLeft
      if (game.gameTick % 10 == 0) {
        this.tempMapContext.fillStyle = 'rgb(80,80,80)'
        this.tempMapContext.fillRect(0, 0, this.minimapWidth, this.minimapHeight)
        this.tempMapContext.drawImage(maps.currentMapImage, 0, 0, maps.currentMapImage.width, maps.currentMapImage.height, imageLeft, imageTop, imageWidth, imageHeight)
        var drawItemOnMap = function (item, size) {
          var color = game.colorHash[item.player] ? game.colorHash[item.player].color : console.log(item.name, item)
          sidebar.tempMapContext.fillStyle = color
          sidebar.tempMapContext.fillRect(imageLeft + item.x * imageWidth / maps.currentMapData.width - size / 2, imageTop + item.y * imageHeight / maps.currentMapData.height - size / 2, size, size)
        }
        for (var i = game.buildings.length - 1; i >= 0; i--) {
          drawItemOnMap(game.buildings[i], 2)
        }
        for (var i = game.turrets.length - 1; i >= 0; i--) {
          drawItemOnMap(game.turrets[i], 2)
        }
        for (var i = game.vehicles.length - 1; i >= 0; i--) {
          drawItemOnMap(game.vehicles[i], 1)
        }
        for (var i = game.infantry.length - 1; i >= 0; i--) {
          drawItemOnMap(game.infantry[i], 1)
        }
        for (var i = game.aircraft.length - 1; i >= 0; i--) {
          drawItemOnMap(game.aircraft[i], 1)
        }
        this.tempMapContext.drawImage(fog.canvas, 0, 0, maps.currentMapImage.width, maps.currentMapImage.height, imageLeft, imageTop, imageWidth, imageHeight)
      }
      this.mapContext.drawImage(this.tempMapCanvas, 0, 0)
      this.mapContext.strokeStyle = 'green'
      this.mapContext.strokeRect(imageLeft + game.viewportX * imageWidth / maps.currentMapImage.width, imageTop + game.viewportY * imageHeight / maps.currentMapImage.height, game.viewportWidth * imageWidth / maps.currentMapImage.width, game.viewportHeight * imageHeight / maps.currentMapImage.height)
    } else {
      if (game.type === 'multiplayer') {
        this.mapContext.fillStyle = 'black'
        this.mapContext.fillRect(0, 0, 148, 132)
        this.mapContext.font = '12px Command'
        this.mapContext.fillStyle = 'gray'
        this.mapContext.fillText('Name:', 4, 9)
        this.mapContext.fillText('Kills:', 104, 9)
        this.mapContext.fillRect(0, 12, 148, 1)
        for (var i = multiplayer.players.length - 1; i >= 0; i--) {
          var player = multiplayer.players[i]
          this.mapContext.fillStyle = player.color
          this.mapContext.fillText(player.name, 4, 25 + i * 12)
          this.mapContext.fillText(game.kills[player.playerId], 104, 25 + i * 12)
        }
      } else {
        this.mapContext.clearRect(0, 0, this.minimapWidth, this.minimapHeight)
      }
    }
  },
  drawMap: function () {
    if (!sidebar.mapEnabled) {
      if (game.type === 'multiplayer') {
        game.foregroundContext.drawImage(this.mapCanvas, this.left + 6, this.top + 5)
      } else if (game.team === 'nod') {
        game.foregroundContext.drawImage(this.nodRadar, this.left, this.top)
      }
    } else {
      game.foregroundContext.drawImage(this.mapCanvas, this.left + 6, this.top + 5)
    }
  },
  draw: function () {
    game.foregroundContext.drawImage(this.tabsImage, 0, this.top - this.tabsImage.height + 2)
    game.foregroundContext.fillStyle = 'lightgreen'
    game.foregroundContext.font = '12px Command'
    var c = (Math.round(game.cash[game.player]) + '').split('').join(' ')
    game.foregroundContext.fillText(c, 400 - c.length * 5 / 2, 31)
    if (sidebar.visible) {
      game.foregroundContext.drawImage(this.sidebarImage, this.left, this.top)
      sidebar.drawMap()
      if (sidebar.repairMode) {
        game.foregroundContext.drawImage(this.repairButtonPressed, this.left + 4, this.top + 145)
      }
      if (sidebar.sellMode) {
        game.foregroundContext.drawImage(this.sellButtonPressed, this.left + 57, this.top + 145)
      }
      if (sidebar.mapEnabled) {
        if (sidebar.mapMode) {
          game.foregroundContext.drawImage(this.mapButtonPressed, this.left + 110, this.top + 145)
        } else {
          game.foregroundContext.drawImage(this.mapButtonNotPressed, this.left + 110, this.top + 145)
        }
      }
      sidebar.drawButtons()
      sidebar.drawPower()
    }
  },
  powerOut: 0,
  powerIn: 0,
  powerScale: 5,
  checkPower: function () {
    for (var l = game.players.length - 1; l >= 0; l--) {
      var player = game.players[l]
      if (!sidebar.power[player]) {
        sidebar.power[player] = {}
      }
      sidebar.power[player].powerIn = 0
      sidebar.power[player].powerOut = 0
    }
    for (var i = game.buildings.length - 1; i >= 0; i--) {
      var building = game.buildings[i]
      if (building.lifeCode != 'ultra-damaged') {
        sidebar.power[building.player].powerOut += building.powerOut
        sidebar.power[building.player].powerIn += building.powerIn
      }
    }
    for (var i = game.turrets.length - 1; i >= 0; i--) {
      var turret = game.turrets[i]
      if (turret.lifeCode != 'ultra-damaged' && turret.lifeCode != 'dead') {
        sidebar.power[turret.player].powerOut += turret.powerOut
        sidebar.power[turret.player].powerIn += turret.powerIn
      }
    }
  },
  hoveredButton: function () {
    var clickY = mouse.y - sidebar.top
    var clickX = mouse.x
    if (clickY >= 165 && clickY <= 455) {
      var buttonPosition = 0
      for (var i = 0; i < 6; i++) {
        if (clickY >= 165 + i * 48 && clickY <= 165 + i * 48 + 48) {
          buttonPosition = i
          break
        }
      }
      var buttonSide, buttonPressedIndex, buttons
      if (clickX >= 500 && clickX <= 564) {
        buttonSide = 'left'
        buttonPressedIndex = this.leftButtonOffset + buttonPosition
        buttons = sidebar.leftButtons
      } else if (clickX >= 570 && clickX <= 634) {
        buttonSide = 'right'
        buttonPressedIndex = this.rightButtonOffset + buttonPosition
        buttons = sidebar.rightButtons
      }
      if (buttons && buttons.length > buttonPressedIndex) {
        var buttonPressed = buttons[buttonPressedIndex]
        return buttonPressed
      }
    }
  },
  isDependencySatisfied: function (dependency, owner, name) {
    if (!dependency) {
      return false
    }
    for (var i = dependency.length - 1; i >= 0; i--) {
      var multiDependencies = dependency[i].split('|')
      var satisfied = false
      for (var k = multiDependencies.length - 1; k >= 0; k--) {
        var currentDependency = multiDependencies[k]
        for (var j = game.permissions.length - 1; j >= 0; j--) {
          var permission = game['permissions'][j]
          if (permission.player == game.player && permission.name == currentDependency) {
            satisfied = true
            break
          }
        }
        for (var j = game.buildings.length - 1; j >= 0; j--) {
          var building = game['buildings'][j]
          if (building.player == game.player && building.name == currentDependency && (i > 0 || owner == 'both' || owner == building.originalteam || owner == building.team)) {
            satisfied = true
            break
          }
        }
        for (var j = game.turrets.length - 1; j >= 0; j--) {
          var turret = game['turrets'][j]
          if (turret.player == game.player && turret.name == currentDependency && (i > 0 || owner == 'both' || owner == turret.originalteam || owner == turret.team)) {
            satisfied = true
            break
          }
        }
      }
      if (!satisfied) {
        return false
      }
    }
    return true
  },
  checkDependencies: function () {
    var newConstructionOptions = false
    for (var i = this.iconList.length - 1; i >= 0; i--) {
      var icon = this.iconList[i]
      var buttonArray = icon.type == 'buildings' || icon.type == 'turrets' || icon.type == 'walls' ? this.leftButtons : this.rightButtons
      if (sidebar.isDependencySatisfied(icon.dependency, icon.owner, icon.name)) {
        if (!icon.satisfied) {
          icon.satisfied = true
          newConstructionOptions = true
          if (buttonArray.indexOf(icon) > -1) {
            alert('wft' + icon.name)
          }
          buttonArray.push(icon)
        }
      } else {
        if (icon.satisfied) {
          icon.satisfied = false
          if (icon.status !== undefined && icon.status !== 'disabled' && icon.type != 'special') {
            game.sendCommand('sidebar', {
              type: 'cancel',
              item: {
                player: game.player,
                type: icon.type,
                name: icon.name
              }
            })
            for (var i = this.iconList.length - 1; i >= 0; i--) {
              if (this.iconList[i].dependency[0] == icon.dependency[0]) {
                this.iconList[i].status = undefined
              }
            }
          }
          buttonArray.remove(icon)
        }
      }
    }
    if (newConstructionOptions) {
      sidebar.visible = true
      sounds.play('new_construction_options')
    }
    if (this.leftButtonOffset + 6 > this.leftButtons.length) {
      this.leftButtonOffset = Math.max(0, this.leftButtons.length - 6)
    }
    if (this.rightButtonOffset + 6 > this.rightButtons.length) {
      this.rightButtonOffset = Math.max(0, this.rightButtons.length - 6)
    }
  },
  leftButtonOffset: 0,
  rightButtonOffset: 0,
  disabledStyle: 'rgba(200,200,200,0.6)',
  drawButtonLabel: function (labelImage, x, y) {
    var labelOffsetX = this.iconWidth / 2 - labelImage.width / 2
    var labelOffsetY = this.iconHeight / 2
    game.foregroundContext.globalAlpha = this.textBrightness
    game.foregroundContext.drawImage(labelImage, x + labelOffsetX, y + labelOffsetY)
    game.foregroundContext.globalAlpha = 1
  },
  drawPower: function () {
    var red = 'rgba(174,52,28,0.7)'
    var orange = 'rgba(250,100,0,0.6)'
    var green = 'rgba(84,252,84,0.3)'
    var offsetX = this.left
    var offsetY = this.top + 160
    var barHeight = 320
    var barWidth = 20
    var powerIn = sidebar.power[game.player].powerIn
    var powerOut = sidebar.power[game.player].powerOut
    if (powerOut / powerIn >= 1.1) {
      game.foregroundContext.fillStyle = green
    } else if (powerOut / powerIn >= 1) {
      game.foregroundContext.fillStyle = orange
    } else if (powerOut < powerIn) {
      game.foregroundContext.fillStyle = red
    }
    game.foregroundContext.fillRect(offsetX + 8, offsetY + barHeight - powerOut / this.powerScale, barWidth - 14, powerOut / this.powerScale)
    game.foregroundContext.drawImage(this.powerIndicator, offsetX, offsetY + barHeight - powerIn / this.powerScale)
  },
  drawButton: function (side, index) {
    var buttons = side == 'left' ? this.leftButtons : this.rightButtons
    var offset = side == 'left' ? this.leftButtonOffset : this.rightButtonOffset
    var button = buttons[index + offset]
    var xOffset = side == 'left' ? 500 : 570
    var yOffset = 165 + this.top + index * this.iconHeight
    game.foregroundContext.drawImage(sidebar.iconsSpriteSheet, button.offset, 0, this.iconWidth, this.iconHeight, xOffset, yOffset, this.iconWidth, this.iconHeight)
    var percentComplete
    if (button.status == 'ready') {
      this.drawButtonLabel(this.readyImage, xOffset, yOffset + 5)
    } else if (button.status == 'disabled') {
      game.foregroundContext.fillStyle = sidebar.disabledStyle
      game.foregroundContext.fillRect(xOffset, yOffset, this.iconWidth, this.iconHeight)
    } else if (button.status == 'building') {
      percentComplete = 0
      if (sidebar.constructing[game.player] && sidebar.constructing[game.player][button.name]) {
        percentComplete = sidebar.constructing[game.player][button.name].percentComplete
      }
      sidebar.context.clearRect(0, 0, this.iconWidth, this.iconHeight)
      sidebar.context.fillStyle = sidebar.disabledStyle
      sidebar.context.beginPath()
      sidebar.context.moveTo(this.iconWidth / 2, this.iconHeight / 2)
      sidebar.context.arc(this.iconWidth / 2, this.iconHeight / 2, 40, Math.PI * 2 * percentComplete - Math.PI / 2, 3 * Math.PI / 2)
      sidebar.context.moveTo(this.iconWidth / 2, this.iconHeight / 2)
      sidebar.context.fill()
      game.foregroundContext.drawImage(sidebar.canvas, 0, 0, this.iconWidth, this.iconHeight, xOffset, yOffset, this.iconWidth, this.iconHeight)
    } else if (button.status == 'hold') {
      percentComplete = 0
      if (sidebar.constructing[game.player] && sidebar.constructing[game.player][button.name]) {
        percentComplete = sidebar.constructing[game.player][button.name].percentComplete
      }
      sidebar.context.clearRect(0, 0, this.iconWidth, this.iconHeight)
      sidebar.context.fillStyle = sidebar.disabledStyle
      sidebar.context.beginPath()
      sidebar.context.moveTo(this.iconWidth / 2, this.iconHeight / 2)
      sidebar.context.arc(this.iconWidth / 2, this.iconHeight / 2, 40, Math.PI * 2 * percentComplete - Math.PI / 2, 3 * Math.PI / 2)
      sidebar.context.moveTo(this.iconWidth / 2, this.iconHeight / 2)
      sidebar.context.fill()
      game.foregroundContext.drawImage(sidebar.canvas, 0, 0, this.iconWidth, this.iconHeight, xOffset, yOffset, this.iconWidth, this.iconHeight)
      this.drawButtonLabel(this.holdImage, xOffset, yOffset)
    }
  },
  drawButtons: function () {
    var maxLeft = this.leftButtons.length > 6 ? 6 : this.leftButtons.length
    for (var i = 0; i < maxLeft; i++) {
      this.drawButton('left', i)
    }
    var maxRight = this.rightButtons.length > 6 ? 6 : this.rightButtons.length
    for (var i = 0; i < maxRight; i++) {
      this.drawButton('right', i)
    }
  },
  click: function (ev, rightClick) {
    if (game.replay) {
      return
    }
    var clickY = mouse.y - this.top
    var clickX = mouse.x
    var imageTop = 5 + this.minimapImageTop
    var imageLeft = this.left + 6 + this.minimapImageLeft
    var imageWidth = this.minimapImageWidth
    var imageHeight = this.minimapImageHeight
    if (this.mapEnabled && clickX >= imageLeft && clickY >= imageTop && clickX <= imageLeft + imageWidth && clickY <= imageTop + imageHeight) {
      var x = (clickX - imageLeft) * this.minimapScale
      var y = (clickY - imageTop) * this.minimapScale
      game.viewportX = Math.max(0, Math.min(x - game.viewportWidth / 2, maps.currentMapImage.width - game.viewportWidth))
      game.viewportY = Math.max(0, Math.min(y - game.viewportHeight / 2, maps.currentMapImage.height - game.viewportHeight))
      game.viewportAdjustX = 0
      game.viewportAdjustY = 0
      game.viewportDeltaX = 0
      game.viewportDeltaY = 0
      game.refreshBackground = true
    } else if (clickY >= 146 && clickY <= 160) {
      if (clickX >= 485 && clickX <= 530) {
        sounds.play('button')
        this.repairMode = !this.repairMode
        if (this.repairMode) {
          game.clearSelection()
        }
        this.sellMode = false
        this.deployMode = false
      } else if (clickX >= 538 && clickX <= 582) {
        sounds.play('button')
        this.sellMode = !this.sellMode
        if (this.sellMode) {
          game.clearSelection()
        }
        this.repairMode = false
        this.deployMode = false
      } else if (clickX >= 590 && clickX <= 635) {
        if (this.mapEnabled) {
          sounds.play('button')
          this.mapMode = !this.mapMode
          this.repairMode = false
          this.sellMode = false
          this.deployMode = false
        }
      }
    } else if (clickY >= 455 && clickY <= 480) {
      if (clickX >= 500 && clickX <= 530) {
        if (this.leftButtonOffset > 0) {
          this.leftButtonOffset--
          sounds.play('button')
        }
      } else if (clickX >= 532 && clickX <= 562) {
        if (this.leftButtonOffset + 6 < this.leftButtons.length) {
          this.leftButtonOffset++
          sounds.play('button')
        }
      } else if (clickX >= 570 && clickX <= 600) {
        if (this.rightButtonOffset > 0) {
          this.rightButtonOffset--
          sounds.play('button')
        }
      } else if (clickX >= 602 && clickX <= 632) {
        if (this.rightButtonOffset + 6 < this.rightButtons.length) {
          this.rightButtonOffset++
          sounds.play('button')
        }
      }
    } else if (clickY >= 165 && clickY <= 455) {
      var buttonPosition = 0
      for (var i = 0; i < 6; i++) {
        if (clickY >= 165 + i * 48 && clickY <= 165 + i * 48 + 48) {
          buttonPosition = i
          break
        }
      }
      var buttonSide, buttonPressedIndex, buttons
      if (clickX >= 500 && clickX <= 564) {
        buttonSide = 'left'
        buttonPressedIndex = this.leftButtonOffset + buttonPosition
        buttons = this.leftButtons
      } else if (clickX >= 570 && clickX <= 634) {
        buttonSide = 'right'
        buttonPressedIndex = this.rightButtonOffset + buttonPosition
        buttons = this.rightButtons
      }
      if (buttons && buttons.length > buttonPressedIndex) {
        var buttonPressed = buttons[buttonPressedIndex]
        if (!buttonPressed.status && !rightClick) {
          for (var i = buttons.length - 1; i >= 0; i--) {
            if (buttons[i].dependency[0] == buttonPressed.dependency[0]) {
              buttons[i].status = 'disabled'
            }
          }
          buttonPressed.status = 'building'
          sounds.play('building')
          game.sendCommand('sidebar', {
            type: 'build',
            item: {
              player: game.player,
              cost: buttonPressed.cost,
              constructedIn: buttonPressed.constructedIn,
              type: buttonPressed.type,
              name: buttonPressed.name
            }
          })
        } else if (buttonPressed.status == 'building' && !rightClick) {
          sounds.play('not_ready')
        } else if (buttonPressed.status == 'building' && rightClick) {
          if (buttonPressed.type !== 'special') {
            buttonPressed.status = 'hold'
            sounds.play('on_hold')
            game.sendCommand('sidebar', {
              type: 'hold',
              item: {
                player: game.player,
                type: buttonPressed.type,
                name: buttonPressed.name
              }
            })
          }
        } else if (buttonPressed.status == 'hold' && !rightClick) {
          buttonPressed.status = 'building'
          sounds.play('building')
          game.sendCommand('sidebar', {
            type: 'resume',
            item: {
              player: game.player,
              type: buttonPressed.type,
              name: buttonPressed.name
            }
          })
        } else if (buttonPressed.status == 'hold' && rightClick) {
          buttonPressed.status = undefined
          sounds.play('cancelled')
          game.sendCommand('sidebar', {
            type: 'cancel',
            item: {
              player: game.player,
              type: buttonPressed.type,
              name: buttonPressed.name
            }
          })
          for (var i = this.iconList.length - 1; i >= 0; i--) {
            if (this.iconList[i].dependency[0] == buttonPressed.dependency[0]) {
              this.iconList[i].status = undefined
            }
          }
        } else if (buttonPressed.status == 'ready' && !rightClick) {
          if (buttonPressed.type == 'buildings' || buttonPressed.type == 'turrets' || buttonPressed.type == 'walls') {
            sidebar.deployMode = true
            game.clearSelection()
            sidebar.repairMode = false
            sidebar.sellMode = false
            sidebar.deployBuilding = buttonPressed.details
            sidebar.deploySpecial = undefined
          } else if (buttonPressed.type == 'infantry' || buttonPressed.type == 'vehicles') {} else if (buttonPressed.type === 'special') {
            sounds.play('select_target')
            sidebar.deployMode = true
            sidebar.deploySpecial = buttonPressed.details
            sidebar.deployBuilding = undefined
          }
        } else if (buttonPressed.status == 'disabled') {
          if (buttonPressed.type !== 'special') {
            sounds.play('building_in_progress')
          }
        }
      }
    }
  },
  processOrders: function (commandObject) {
    switch (commandObject.type) {
      case 'build':
        var item = commandObject.item
        item.status = 'building'
        item.spent = item.cost
        item.percentComplete = 0
        if (!sidebar.constructing[item.player]) {
          sidebar.constructing[item.player] = {}
        }
        var playerConstructing = sidebar.constructing[item.player]
        playerConstructing[item.name] = item
        if (game.replay && item.player == game.player && item.type !== 'special') {
          sounds.play('building')
          var dependency = window[item.type].list[item.name].dependency
          for (var i = this.iconList.length - 1; i >= 0; i--) {
            if (this.iconList[i].dependency[0] == dependency[0]) {
              this.iconList[i].status = this.iconList[i].name !== item.name ? 'disabled' : 'building'
            }
          }
        }
        break
      case 'cancel':
        var playerConstructing = sidebar.constructing[commandObject.item.player]
        var item = playerConstructing[commandObject.item.name]
        game.cash[item.player] += item.cost - item.spent
        delete this.constructing[item.player][item.name]
        if (game.replay && item.player == game.player && item.type !== 'special') {
          sounds.play('cancelled')
        }
        break
      case 'hold':
        var playerConstructing = sidebar.constructing[commandObject.item.player]
        var item = playerConstructing[commandObject.item.name]
        item.status = 'hold'
        if (game.replay && item.player == game.player && item.type !== 'special') {
          sounds.play('on_hold')
        }
        break
      case 'resume':
        var playerConstructing = sidebar.constructing[commandObject.item.player]
        var item = playerConstructing[commandObject.item.name]
        item.status = 'building'
        if (game.replay && item.player == game.player && item.type !== 'special') {
          sounds.play('building')
        }
        break
      case 'deploy-building':
        var item = commandObject.item
        delete item.uid
        game.add(item)
        if (sidebar.constructing[item.player] && sidebar.constructing[item.player][item.name]) {
          delete sidebar.constructing[item.player][item.name]
        }
        if (item.player === game.player) {
          var dependency = window[item.type].list[item.name].dependency
          for (var i = this.iconList.length - 1; i >= 0; i--) {
            if (this.iconList[i].dependency[0] == dependency[0]) {
              this.iconList[i].status = undefined
            }
          }
          sounds.play('construction')
        }
        break
      case 'deploy-special':
        var item = commandObject.item
        var object = window[item.type].list[item.name]
        delete sidebar.constructing[item.player][item.name]
        if (item.player === game.player) {
          if (object.firedSound) {
            sounds.play(object.firedSound)
          }
        }
        var constructedAt = undefined
        for (var i = 0; i < game.buildings.length; i++) {
          if (object.constructedIn.indexOf(game.buildings[i].name) > -1 && game.buildings[i].player == item.player) {
            constructedAt = game.buildings[i]
            if (constructedAt.primaryBuilding) {
              break
            }
          }
        }
        if (constructedAt && item.name == 'nuclear-strike') {
          constructedAt.action = 'launch'
          constructedAt.animationIndex = 0
          sounds.play('nukemisl')
          game.add({
            type: 'effects',
            name: 'atomsmoke',
            x: constructedAt.x + 1.5,
            y: constructedAt.y
          })
          game.add({
            type: 'bullets',
            name: 'atombomb',
            x: constructedAt.x + 1.5,
            y: constructedAt.y,
            target: {
              x: item.x,
              y: item.y
            },
            from: constructedAt.player
          })
        } else if (item.name == 'ion-cannon') {
          sounds.play('ion1')
          game.add({
            type: 'effects',
            name: 'ioncannon',
            x: item.x,
            y: item.y
          })
          game.add({
            type: 'bullets',
            name: 'ioncannon',
            x: item.x,
            y: item.y,
            z: 0.1,
            delay: 8,
            from: constructedAt.player,
            target: {
              x: item.x,
              y: item.y
            }
          })
        } else if (item.name == 'air-strike') {
          game.add({
            type: 'aircraft',
            name: 'c17',
            x: maps.currentMapData['air-strike-from'].x,
            y: maps.currentMapData['air-strike-from'].y,
            team: game.team,
            player: game.player,
            selectable: false,
            orders: {
              type: 'bomb',
              to: {
                x: item.x,
                y: item.y
              },
              from: {
                x: maps.currentMapData['air-strike-from'].x,
                y: maps.currentMapData['air-strike-from'].y
              }
            }
          })
        }
        break
    }
  },
  finishDeployingBuilding: function () {
    for (var i = 0; i < game.buildings.length; i++) {
      if (game.buildings[i].name == 'construction-yard' && game.buildings[i].player == game.player) {
        game.buildings[i].status = 'construct'
        game.buildings[i].animationIndex = 0
        break
      }
    }
    game.sendCommand('sidebar', {
      type: 'deploy-building',
      item: {
        name: sidebar.deployBuilding.name,
        player: game.player,
        team: game.team,
        type: sidebar.deployBuilding.type,
        x: mouse.gridX,
        y: mouse.gridY,
        action: 'build'
      }
    })
    for (var i = this.iconList.length - 1; i >= 0; i--) {
      if (this.iconList[i].name == this.deployBuilding.name) {
        this.iconList[i].status = 'disabled'
      }
    }
    sidebar.deployMode = false
    sidebar.deployBuilding = null
  },
  finishDeployingSpecial: function () {
    game.sendCommand('sidebar', {
      type: 'deploy-special',
      item: {
        name: sidebar.deploySpecial.name,
        player: game.player,
        team: game.team,
        type: sidebar.deploySpecial.type,
        x: mouse.gameX / game.gridSize,
        y: mouse.gameY / game.gridSize
      }
    })
    for (var i = this.iconList.length - 1; i >= 0; i--) {
      if (this.iconList[i].name == this.deploySpecial.name) {
        this.iconList[i].status = 'disabled'
      }
    }
    sidebar.deployMode = false
    sidebar.deploySpecial = null
  },
  finishDeployingUnit: function (unit) {
    var constructedAt
    for (var i = 0; i < game.buildings.length; i++) {
      if (unit.constructedIn.indexOf(game.buildings[i].name) > -1 && game.buildings[i].player == unit.player) {
        constructedAt = game.buildings[i]
        if (constructedAt.primaryBuilding) {
          break
        }
      }
    }
    delete sidebar.constructing[unit.player][unit.name]
    if (constructedAt) {
      if (unit.type == 'infantry') {
        if (constructedAt.name == 'barracks') {
          var side = constructedAt.side ? 0.5 : 1.25
          var extraStep = game.obstructionGrid.length > constructedAt.y + 3 && game.obstructionGrid[constructedAt.y + 3][constructedAt.x + Math.floor(side)] ? 2.5 : 3.5
          game.add({
            name: unit.name,
            type: unit.type,
            player: constructedAt.player,
            team: constructedAt.team,
            x: constructedAt.x + side,
            y: constructedAt.y + 1.25,
            direction: 4,
            orders: {
              type: 'move',
              to: {
                x: constructedAt.x + side,
                y: constructedAt.y + extraStep
              }
            }
          })
        } else {
          var side = constructedAt.side ? 0.5 : 1.25
          var extraStep = game.obstructionGrid.length > constructedAt.y + 4 && game.obstructionGrid[constructedAt.y + 4][constructedAt.x + Math.floor(side)] ? 3.5 : 4.5
          game.add({
            name: unit.name,
            type: unit.type,
            player: constructedAt.player,
            team: constructedAt.team,
            x: constructedAt.x + 0.5,
            y: constructedAt.y + 2.5,
            direction: 4,
            orders: {
              type: 'move',
              to: {
                x: constructedAt.x + side,
                y: constructedAt.y + extraStep
              }
            }
          })
        }
        constructedAt.side = !constructedAt.side
      } else if (unit.type == 'vehicles') {
        if (constructedAt.name == 'weapons-factory') {
          var side = 0.5
          var point = {
            x: constructedAt.x + side,
            y: constructedAt.y + 2.5
          }
          var destination = findClosestEmptySpot(point)
          game.add({
            name: unit.name,
            type: unit.type,
            player: constructedAt.player,
            team: constructedAt.team,
            direction: 16,
            x: point.x,
            y: point.y,
            orders: {
              type: 'move',
              to: destination
            }
          })
          constructedAt.action = 'construct'
          constructedAt.animationIndex = 0
        } else {
          var side = constructedAt.side ? 0.5 : 1.25
          var extraStep = game.obstructionGrid.length > constructedAt.y + 3 && game.obstructionGrid[constructedAt.y + 3][constructedAt.x + Math.floor(side)] ? 2.5 : 3.5
          var point = {
            x: constructedAt.x + side,
            y: constructedAt.y + 2.5
          }
          var destination = findClosestEmptySpot(point)
          game.add({
            name: unit.name,
            type: unit.type,
            player: constructedAt.player,
            team: constructedAt.team,
            x: point.x,
            y: point.y,
            direction: 16,
            orders: {
              type: 'move',
              to: destination
            }
          })
        }
        constructedAt.side = !constructedAt.side
      } else if (unit.type == 'aircraft') {
        if (constructedAt.name == 'helipad') {
          var xDistanceFromSide = Math.min(constructedAt.x, maps.currentMapData.width - constructedAt.x)
          var yDistanceFromSide = Math.min(constructedAt.y, maps.currentMapData.height - constructedAt.y)
          var xSpawn, ySpawn
          if (xDistanceFromSide > yDistanceFromSide) {
            ySpawn = yDistanceFromSide == constructedAt.y ? 0 : maps.currentMapData.height
            xSpawn = constructedAt.x
          } else {
            ySpawn = constructedAt.y
            xSpawn = xDistanceFromSide == constructedAt.x ? 0 : maps.currentMapData.width
          }
          game.add({
            name: unit.name,
            type: unit.type,
            player: constructedAt.player,
            team: constructedAt.team,
            x: xSpawn,
            y: ySpawn,
            direction: 16,
            z: 1,
            orders: {
              type: 'move',
              to: {
                x: constructedAt.cgX,
                y: constructedAt.cgY
              }
            }
          })
        }
      }
    }
  }
}
