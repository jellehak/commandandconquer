var tiberium = {
    type: 'tiberium',
    list: {
      tiberium: {
        name: 'tiberium',
        label: 'Tiberium Ore',
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [{
          name: 'default',
          count: 12
        }],
        gridShape: [
          [0]
        ],
        gridBuild: [
          [1]
        ]
      }
    },
    defaults: {
      z: -2,
      stage: 12,
      selected: false,
      unselectable: true,
      unattackable: true,
      processOrders: function () {},
      draw: function () {
        var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth || y > game.viewportHeight) {
          return
        }
        if (this.stage) {
          game.foregroundContext.drawImage(this.spriteSheet, (this.stage - 1) * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        }
      },
      animate: function () {
        this.spriteColorOffset = 0
        if (this.stage <= 0) {
          game.remove(this)
        }
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      $.extend(item, details)
      item.cgX = item.x + 0.5
      item.cgY = item.y + 0.5
      item.softCollisionRadius = item.pixelWidth / 2
      return item
    },
    load: function (name) {
      console.log('Loading', name, '...')
      var item = this.list[name]
      item.type = this.type
      item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function () {})
      item.spriteArray = []
      item.spriteCount = 0
      for (var i = 0; i < item.spriteImages.length; i++) {
        var constructImageCount = item.spriteImages[i].count
        var constructImageName = item.spriteImages[i].name
        if (item.spriteImages[i].direction) {
          for (var j = 0; j < item.directions; j++) {
            item.spriteArray[constructImageName + '-' + j] = {
              name: constructImageName + '-' + j,
              count: constructImageCount,
              offset: item.spriteCount
            }
            item.spriteCount += constructImageCount
          }
        } else {
          item.spriteArray[constructImageName] = {
            name: constructImageName,
            count: constructImageCount,
            offset: item.spriteCount
          }
          item.spriteCount += constructImageCount
        }
      }
    }
  }