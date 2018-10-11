var fog = {
    fogGrid: [],
    canvas: document.createElement('canvas'),
    init: function () {
      this.context = this.canvas.getContext('2d')
      this.canvas.width = maps.currentMapData.width * game.gridSize
      this.canvas.height = maps.currentMapData.height * game.gridSize
      this.context.fillStyle = 'rgba(0,0,0,1)'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      var fogGrid = []
      for (var i = 0; i < maps.currentMapData.height; i++) {
        fogGrid[i] = []
        for (var j = 0; j < maps.currentMapData.width; j++) {
          fogGrid[i][j] = 1
        }
      }
      for (var l = game.players.length - 1; l >= 0; l--) {
        this.fogGrid[game.players[l]] = $.extend(true, [], fogGrid)
      }
    },
    isPointOverFog: function (x, y) {
      if (y < 0 || y / game.gridSize >= maps.currentMapData.height || x < 0 || x / game.gridSize >= maps.currentMapData.width) {
        return true
      }
      return this.fogGrid[game.player][Math.floor(y / game.gridSize)][Math.floor(x / game.gridSize)] == 1
    },
    animate: function () {
      fog.context.globalCompositeOperation = 'destination-out'
      for (var i = game.items.length - 1; i >= 0; i--) {
        var item = game.items[i]
        for (var l = game.players.length - 1; l >= 0; l--) {
          player = game.players[l]
          if (item.player == player || item.firing) {
            var x = Math.floor(item.cgX)
            var y = Math.floor(item.cgY)
            var x0, y0, x1, y1
            if (item.player === player) {
              x0 = x - item.sight < 0 ? 0 : x - item.sight
              y0 = y - item.sight < 0 ? 0 : y - item.sight
              x1 = x + item.sight > maps.currentMapData.width - 1 ? maps.currentMapData.width - 1 : x + item.sight
              y1 = y + item.sight > maps.currentMapData.height - 1 ? maps.currentMapData.height - 1 : y + item.sight
            } else {
              x0 = x - 1 < 0 ? 0 : x - 1
              y0 = y - 1 < 0 ? 0 : y - 1
              x1 = x + 1 > maps.currentMapData.width - 1 ? maps.currentMapData.width - 1 : x + 1
              y1 = y + 1 > maps.currentMapData.height - 1 ? maps.currentMapData.height - 1 : y + 1
            }
            for (var j = x0; j <= x1; j++) {
              for (var k = y0; k <= y1; k++) {
                if (j > x0 && j < x1 || k > y0 && k < y1) {
                  if (game.player == player && this.fogGrid[player][k][j]) {
                    this.context.fillStyle = 'rgba(100,0,0,0.9)'
                    this.context.beginPath()
                    this.context.arc(j * game.gridSize + 12, k * game.gridSize + 12, 16, 0, 2 * Math.PI, false)
                    this.context.fill()
                    this.context.fillStyle = 'rgba(100,0,0,0.7)'
                    this.context.beginPath()
                    this.context.arc(j * game.gridSize + 12, k * game.gridSize + 12, 18, 0, 2 * Math.PI, false)
                    this.context.fill()
                    this.context.fillStyle = 'rgba(100,0,0,0.5)'
                    this.context.beginPath()
                    this.context.arc(j * game.gridSize + 12, k * game.gridSize + 12, 24, 0, 2 * Math.PI, false)
                    this.context.fill()
                  }
                  this.fogGrid[player][k][j] = 0
                }
              }
            }
          }
        }
      }
      fog.context.globalCompositeOperation = 'source-over'
    },
    draw: function () {
      game.foregroundContext.drawImage(this.canvas, game.viewportX, game.viewportY, game.viewportWidth, game.viewportHeight, game.viewportLeft, game.viewportTop, game.viewportWidth, game.viewportHeight)
    }
  }