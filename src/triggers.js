var triggers = {
    timeConversionFactor: 80,
    process: function () {
      if (game.gameTick === 1 || game.gameTick % triggers.timeConversionFactor === 0) {
        for (var i = game.triggers.length - 1; i >= 0; i--) {
          var trigger = game.triggers[i]
          if (trigger.triggered) {
            game.triggers.splice(i, 1)
          } else {
            trigger.process()
          }
        }
      }
    },
    add: function (item) {
      switch (item.action) {
        case 'add':
          item.triggerFunction = function () {
            item.triggered = true
            if (item.reinforcements) {
              sounds.play('reinforcements_have_arrived')
            }
            for (var i = item.items.length - 1; i >= 0; i--) {
              game.add(item.items[i])
            }
          }
          break
        case 'hunt':
          item.triggerFunction = function () {
            item.triggered = true
            for (var i = game.items.length - 1; i >= 0; i--) {
              var unit = game.items[i]
              if (unit.player == item.player && (unit.type == 'infantry' || unit.type == 'vehicles')) {
                unit.orders = {
                  type: 'hunt'
                }
              }
            }
          }
          break
        case 'air-strike-available':
          item.triggerFunction = function () {
            item.triggered = true
            game.permissions.push({
              name: 'air-strike-available',
              player: game.player
            })
          }
          break
        case 'function':
          item.triggerFunction = function () {
            item.triggered = true
            eval(item.function)
          }
          break
        case 'success':
          item.triggerFunction = function () {
            item.triggered = true
            singleplayer.endLevel(true)
          }
          break
        case 'failure':
          item.triggerFunction = function () {
            item.triggered = true
            singleplayer.endLevel(false)
          }
          break
        case 'surrender':
          item.triggerFunction = function () {
            item.triggered = true
            multiplayer.surrender()
          }
          break
        case 'light-flare':
          item.triggerFunction = function () {
            item.triggered = true
            game.add({
              type: 'effects',
              name: 'flare',
              x: item.x,
              y: item.y
            })
            game.add({
              type: 'walls',
              name: 'vision',
              x: item.x,
              y: item.y,
              player: item.player
            })
          }
          break
        case 'destroy-trigger':
          item.triggerFunction = function () {
            item.triggered = true
            for (var i = game.triggers.length - 1; i >= 0; i--) {
              if (game.triggers[i].nickname.toUpperCase() === item.target.toUpperCase()) {
                game.triggers[i].triggered = true
                break
              }
            }
          }
          break
        case 'rebuild-base':
          item.triggerFunction = function () {
            if (game.count('buildings', item.player, undefined, 'construction-yard') > 0) {
              var playerFoggedBuildableGrid = game.createFoggedBuildableGrid(item.player)
              for (var i = item.base.length - 1; i >= 0; i--) {
                var building = item.base[i]
                if (game.canBuildOnFoggedGrid(building, playerFoggedBuildableGrid)) {
                  building.player = item.player
                  building.team = item.team
                  building.action = 'build'
                  game.sendCommand('sidebar', {
                    type: 'deploy-building',
                    item: building
                  })
                }
              }
            } else {
              item.triggered = true
            }
          }
          break
        case 'create-team':
          item.triggerFunction = function () {
            for (var i = item.units.length - 1; i >= 0; i--) {
              var unit = item.units[i]
              unit.x = item.x + i / 2
              unit.y = item.y + i % 2
              unit.orders = {
                type: 'hunt'
              }
              game.add(unit)
            }
            item.triggered = true
          }
          break
        case 'auto-create':
          item.triggerFunction = function () {
            var units = item.teams[Math.floor(item.teams.length * Math.random())]
            for (var i = units.length - 1; i >= 0; i--) {
              var unit = units[i]
              unit.x = item.x + i / 2
              unit.y = item.y + i % 2
              unit.orders = {
                type: 'hunt'
              }
              game.add(unit)
            }
            item.triggered = true
          }
          break
        default:
          item.triggered = true
          console.log('Unknown action', item)
          break
      }
      switch (item.name) {
        case 'timed':
          if (item.loop) {
            item.resetTime = item.time
          }
          item.process = function () {
            item.time--
            if (item.time <= 0) {
              item.triggerFunction()
              if (item.loop) {
                item.time = item.resetTime
                item.triggered = false
              } else {
                item.triggered = true
              }
            }
          }
          break
        case 'enters':
          item.region = {}
          for (var i = item.area.length - 1; i >= 0; i--) {
            var point = item.area[i]
            if (item.region.x1 === undefined || item.region.x1 > point.x) {
              item.region.x1 = point.x
            }
            if (item.region.y1 === undefined || item.region.y1 > point.y) {
              item.region.y1 = point.y
            }
            if (item.region.x2 === undefined || item.region.x2 < point.x) {
              item.region.x2 = point.x
            }
            if (item.region.y2 === undefined || item.region.y2 < point.y) {
              item.region.y2 = point.y
            }
          }
        case 'enter':
          item.process = function () {
            var triggered = false
            for (var i = game.items.length - 1; i >= 0; i--) {
              var unit = game.items[i]
              if (unit.player == item.player && unit.name !== 'c17' && unit.x >= item.region.x1 && unit.x <= item.region.x2 && unit.y >= item.region.y1 && unit.y <= item.region.y2) {
                triggered = true
                break
              }
            }
            if (triggered) {
              item.triggered = true
              item.triggerFunction()
            }
          }
          break
        case 'n-units-destroyed':
          item.process = function () {
            if (game.deaths[item.player] >= item.count) {
              item.triggered = true
              item.triggerFunction()
            }
          }
          break
        case 'all-destroyed':
          item.process = function () {
            if (game.count('infantry', item.player) === 0 && game.count('vehicles', item.player) === 0 && game.count('buildings', item.player) === 0 && game.count('turrets', item.player) === 0 && game.count('aircraft', item.player) === 0) {
              item.triggered = true
              item.triggerFunction()
            }
          }
          break
        case 'destroyed':
          item.process = function () {
            var triggered = true
            if (item.buildings) {
              for (var i = item.buildings.length - 1; i >= 0; i--) {
                if (game.count('buildings', item.player, undefined, item.buildings[i]) > 0) {
                  triggered = false
                  break
                }
              }
            }
            if (triggered) {
              item.triggered = true
              item.triggerFunction()
            }
          }
          break
        case 'condition':
          item.process = function () {
            if (eval(item.condition)) {
              item.triggerFunction()
              if (item.loop) {
                item.triggered = false
              }
            }
          }
          break
        case 'repeat-condition':
          item.process = function () {
            if (eval(item.condition)) {
              item.triggerFunction()
              item.triggered = false
            }
          }
          break
        case 'discovered':
        case 'attacked':
          item.process = function () {
            if (game.attackedPlayers[item.player]) {
              item.triggerFunction()
              item.triggered = true
            }
          }
          break
        default:
          console.log('Unprocessed trigger', item)
          item.process = function () {}
          break
      }
      return item
    }
  }