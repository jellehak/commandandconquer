var walls = {
    type: 'walls',
    list: {
      sandbag: {
        name: 'sandbag',
        label: 'Sandbag Wall',
        cost: 50,
        hitPoints: 1,
        sight: 0,
        armor: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ],
        dependency: ['construction-yard'],
        owner: 'both'
      },
      'chain-link': {
        name: 'chain-link',
        label: 'Chainlink Fence',
        cost: 75,
        hitPoints: 1,
        sight: 0,
        armor: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ],
        dependency: ['construction-yard'],
        owner: 'both'
      },
      'concrete-wall': {
        name: 'concrete-wall',
        label: 'Concrete Wall',
        cost: 100,
        hitPoints: 1,
        sight: 0,
        armor: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ],
        dependency: ['construction-yard'],
        owner: 'both'
      },
      'barb-wire': {
        name: 'barb-wire',
        label: 'Barbwire Fence',
        cost: 25,
        hitPoints: 1,
        sight: 0,
        armor: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ],
        dependency: ['construction-yard'],
        owner: 'both'
      },
      'wooden-fence': {
        name: 'wooden-fence',
        label: 'Wooden Fence',
        cost: 25,
        hitPoints: 1,
        sight: 0,
        armor: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        spriteImages: [],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ],
        dependency: ['construction-yard'],
        owner: 'both'
      },
      vision: {
        name: 'vision',
        sight: 2,
        counter: 2,
        pixelWidth: 24,
        pixelHeight: 24,
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ]
      }
    },
    defaults: {
      selected: false,
      unselectable: true,
      unattackable: true,
      z: 0,
      processOrders: function () {
        if (this.name == 'vision') {
          return
        }
        this.lifeCode = getLifeCode(this)
      },
      draw: function () {
        if (this.name == 'vision') {
          return
        }
        var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth || y > game.viewportHeight) {
          return
        }
        game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
      },
      animate: function () {
        if (this.name == 'vision') {
          this.counter--
          if (!this.counter) {
            game.remove(this)
          }
          return
        }
        this.spriteColorOffset = 0
        if (this.lifeCode == 'dead') {
          game.remove(this)
          return
        }
        var hasAbove = this.y > 0 ? game.obstructionGrid[this.y - 1][this.x] == this.name : false
        var hasBelow = this.y < game.obstructionGrid.length - 1 ? game.obstructionGrid[this.y + 1][this.x] == this.name : false
        var hasLeft = this.x > 0 ? game.obstructionGrid[this.y][this.x - 1] == this.name : false
        var hasRight = this.x < game.obstructionGrid[this.y].length - 1 ? game.obstructionGrid[this.y][this.x + 1] == this.name : false
        this.imageOffset = (this.lifeCode == 'healthy' ? 0 : 16) + (hasAbove ? 1 : 0) + (hasRight ? 2 : 0) + (hasBelow ? 4 : 0) + (hasLeft ? 8 : 0)
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      item.life = item.hitPoints
      $.extend(item, details)
      item.cgX = item.x + item.pixelWidth / 2 / game.gridSize
      item.cgY = item.y + item.pixelHeight / 2 / game.gridSize
      item.softCollisionRadius = item.pixelWidth / 2
      return item
    },
    load: function (name) {
      var item = this.list[name]
      if (item.spriteCanvas) {
        return
      }
      console.log('Loading', name, '...')
      item.type = this.type
      item.spriteCanvas = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png')
      item.spriteArray = []
      item.spriteCount = 0
      item.gridWidth = item.gridShape[0].length
      item.gridHeight = item.gridShape.length
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