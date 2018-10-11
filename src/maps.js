 var maps = {
  gdi: ['scg01ea', 'scg02ea', 'scg03ea'],
  nod: ['scb01ea', 'scb02ea'],
  multiplayer: ['green-acres', 'sand-trap', 'lost-arena', 'river-raid', 'eye-of-the-storm'],
  load: function (mapName, onloadEventHandler, savedGame) {
    $.ajax({
      url: 'maps/' + mapName + '.js',
      dataType: 'json',
      success: function (data) {
        maps.loadMapData(mapName, data, onloadEventHandler, savedGame)
      },
      error: function (data, status) {
        menus.showMessageBox(status, data, function () {
          menus.show('game-type')
        })
      }
    })
  },
  draw: function () {
    if (game.refreshBackground) {
      game.backgroundContext.drawImage(maps.currentMapImage, game.viewportX, game.viewportY, game.viewportWidth - 1, game.viewportHeight, game.viewportLeft, game.viewportTop, game.viewportWidth, game.viewportHeight - 1)
      game.refreshBackground = false
    }
  },
  currentMapData: undefined,
  loadMapData: function (mapName, data, onloadEventHandler, savedGame) {
    game.backgroundContext.fillStyle = 'black'
    game.backgroundContext.fillRect(0, 0, game.canvasWidth, game.canvasHeight)
    game.foregroundContext.fillStyle = 'black'
    game.foregroundContext.fillRect(0, 0, game.canvasWidth, game.canvasHeight)
    mouse.context.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
    maps.currentMapData = data
    maps.currentMapImage = loader.loadImage('images/maps/' + mapName + '.jpg')
    game.resetTypes()
    maps.currentMapTerrain = []
    for (var i = 0; i < data.height; i++) {
      maps.currentMapTerrain[i] = Array(data.width)
    }
    if (data.videos) {
      for (var videoType in data.videos) {
        videos.load(data.videos[videoType])
      }
    }
    var terrainTypes = Object.keys(data.terrain).sort()
    for (var tt = terrainTypes.length - 1; tt >= 0; tt--) {
      var terrainType = terrainTypes[tt]
      var terrainArray = data.terrain[terrainType]
      for (var i = terrainArray.length - 1; i >= 0; i--) {
        maps.currentMapTerrain[terrainArray[i][1]][terrainArray[i][0]] = terrainType
      }
    }
    if (game.type === 'multiplayer' || data.name == 'testbed') {
      data.requirements = $.extend(data.requirements, {
        infantry: ['minigunner', 'engineer', 'bazooka', 'grenadier', 'flame-thrower', 'chem-warrior', 'commando'],
        vehicles: ['apc', 'flame-tank', 'stealth-tank', 'mammoth-tank', 'harvester', 'mcv', 'jeep', 'recon-bike', 'buggy', 'light-tank', 'medium-tank', 'mobile-rocket-launch-system', 'ssm-launcher', 'artillery'],
        aircraft: ['orca', 'apache', 'chinook'],
        turrets: ['gun-turret', 'guard-tower', 'obelisk', 'advanced-guard-tower', 'sam-site'],
        buildings: ['refinery', 'construction-yard', 'power-plant', 'helipad', 'advanced-power-plant', 'barracks', 'tiberium-silo', 'communications-center', 'advanced-communications-tower', 'temple-of-nod', 'hand-of-nod', 'airstrip', 'weapons-factory', 'repair-facility'],
        tiberium: ['tiberium'],
        walls: ['sandbag', 'chain-link', 'concrete-wall'],
        special: ['nuclear-strike', 'ion-cannon']
      })
      data.buildable = {
        infantry: ['bazooka', 'grenadier', 'engineer', 'minigunner', 'flame-thrower', 'chem-warrior', 'commando'],
        turrets: ['gun-turret', 'guard-tower', 'obelisk', 'advanced-guard-tower', 'sam-site'],
        aircraft: ['orca', 'apache', 'chinook'],
        buildings: ['power-plant', 'advanced-power-plant', 'communications-center', 'advanced-communications-tower', 'temple-of-nod', 'tiberium-silo', 'barracks', 'hand-of-nod', 'refinery', 'airstrip', 'weapons-factory', 'repair-facility', 'helipad'],
        vehicles: ['apc', 'stealth-tank', 'flame-tank', 'mammoth-tank', 'harvester', 'jeep', 'recon-bike', 'buggy', 'light-tank', 'medium-tank', 'mcv', 'mobile-rocket-launch-system', 'ssm-launcher', 'artillery'],
        walls: ['sandbag', 'chain-link', 'concrete-wall'],
        special: ['nuclear-strike', 'ion-cannon']
      }
    }
    if (game.type === 'multiplayer') {
      data.startingunits = {
        nod: {
          vehicles: [{
            name: 'buggy',
            dx: 0,
            dy: 0.5,
            direction: 16
          }, {
            name: 'mcv',
            dx: 2,
            dy: 0.5,
            direction: 16
          }],
          infantry: [{
            name: 'minigunner',
            dx: 4.25,
            dy: 0.25
          }, {
            name: 'minigunner',
            dx: 4.75,
            dy: 0.75
          }, {
            name: 'minigunner',
            dx: 4.75,
            dy: 0.25
          }, {
            name: 'minigunner',
            dx: 4.25,
            dy: 0.75
          }]
        },
        gdi: {
          vehicles: [{
            name: 'jeep',
            dx: 0,
            dy: 0.5,
            direction: 16
          }, {
            name: 'mcv',
            dx: 2,
            dy: 0.5,
            direction: 16
          }],
          infantry: [{
            name: 'minigunner',
            dx: 4.25,
            dy: 0.25
          }, {
            name: 'minigunner',
            dx: 4.75,
            dy: 0.75
          }, {
            name: 'minigunner',
            dx: 4.75,
            dy: 0.25
          }, {
            name: 'minigunner',
            dx: 4.25,
            dy: 0.75
          }]
        }
      }
    }
    var requirementsTypes = Object.keys(data.requirements).sort()
    for (var rt = requirementsTypes.length - 1; rt >= 0; rt--) {
      var type = requirementsTypes[rt]
      var requirementArray = data.requirements[type]
      for (var i = 0; i < requirementArray.length; i++) {
        var name = requirementArray[i]
        if (window[type]) {
          window[type].load(name)
        } else {
          console.log('Not loading type :', type)
        }
      }
    }
    if (game.type === 'singleplayer') {
      singleplayer.initializeLevel(data)
      game.viewportX = data.x * game.gridSize
      game.viewportY = data.y * game.gridSize
    } else {
      multiplayer.initializeLevel(data)
    }
    fog.init()
    if (loader.loaded) {
      onloadEventHandler()
    } else {
      loader.onload = onloadEventHandler
    }
  }
}
