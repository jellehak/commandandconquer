var effects = {
    type: 'effects',
    list: {
      piff: {
        imageCount: 4,
        pixelWidth: 9,
        pixelHeight: 13
      },
      piffpiff: {
        imageCount: 7,
        pixelWidth: 15,
        pixelHeight: 15
      },
      vehhit1: {
        imageCount: 17,
        pixelWidth: 30,
        pixelHeight: 17
      },
      vehhit2: {
        imageCount: 22,
        pixelWidth: 21,
        pixelHeight: 17
      },
      vehhit3: {
        imageCount: 14,
        pixelWidth: 19,
        pixelHeight: 13
      },
      'art-exp1': {
        imageCount: 22,
        pixelWidth: 41,
        pixelHeight: 35
      },
      napalm1: {
        imageCount: 14,
        pixelWidth: 22,
        pixelHeight: 18
      },
      napalm2: {
        imageCount: 14,
        pixelWidth: 41,
        pixelHeight: 40
      },
      napalm3: {
        imageCount: 14,
        pixelWidth: 72,
        pixelHeight: 72
      },
      frag1: {
        imageCount: 14,
        pixelWidth: 45,
        pixelHeight: 33
      },
      frag3: {
        imageCount: 22,
        pixelWidth: 41,
        pixelHeight: 28
      },
      fball1: {
        imageCount: 18,
        pixelWidth: 67,
        pixelHeight: 44
      },
      smokey: {
        imageCount: 7,
        pixelWidth: 19,
        pixelHeight: 17
      },
      smoke: {
        imageCount: 91,
        pixelWidth: 23,
        pixelHeight: 23,
        animationIndex: 0,
        draw: function () {
          this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
          this.interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
          var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
          var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
          if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth || y > game.viewportHeight) {
            return
          }
          game.foregroundContext.drawImage(this.spriteSheet, this.animationIndex * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x - this.pixelWidth / 2, y - this.pixelHeight + 3, this.pixelWidth, this.pixelHeight)
        }
      },
      'minigun-fire': {
        imageCount: 6,
        pixelWidth: 18,
        pixelHeight: 17,
        directions: 8
      },
      chem: {
        imageCount: 13,
        pixelWidth: 79,
        pixelHeight: 79,
        directions: 8
      },
      flame: {
        imageCount: 13,
        pixelWidth: 79,
        pixelHeight: 79,
        directions: 8
      },
      flare: {
        imageCount: 92,
        pixelWidth: 42,
        pixelHeight: 31,
        loop: 60
      },
      'sam-fire': {
        pixelWidth: 55,
        pixelHeight: 35,
        directions: 8,
        imageCount: 16,
        draw: function () {
          if (this.animationIndex < 0) {
            this.animationIndex = 0
          }
          var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
          var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
          if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth || y > game.viewportHeight) {
            return
          }
          game.foregroundContext.drawImage(this.spriteSheet, (this.direction * this.imageCount + this.animationIndex) * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        }
      },
      'laser-fire': {
        imageCount: 5,
        spriteSheet: true,
        draw: function () {
          var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
          var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
          var targetX = Math.round(this.targetX * game.gridSize) - game.viewportX + game.viewportLeft
          var targetY = Math.round(this.targetY * game.gridSize) - game.viewportY + game.viewportTop
          game.foregroundContext.beginPath()
          game.foregroundContext.moveTo(x, y)
          game.foregroundContext.lineTo(targetX, targetY)
          game.foregroundContext.strokeStyle = 'red'
          game.foregroundContext.stroke()
        }
      },
      atomsfx: {
        imageCount: 27,
        pixelWidth: 78,
        pixelHeight: 121
      },
      atomsmoke: {
        imageCount: 33,
        pixelWidth: 24,
        pixelHeight: 48
      },
      ioncannon: {
        imageCount: 15,
        pixelWidth: 72,
        pixelHeight: 191,
        draw: function () {
          if (this.animationIndex < 0) {
            this.animationIndex = 0
          }
          var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
          var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
          game.foregroundContext.drawImage(this.spriteSheet, (this.direction * this.imageCount + this.animationIndex) * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x - this.pixelWidth / 2, y - this.pixelHeight + 12, this.pixelWidth, this.pixelHeight)
        }
      }
    },
    defaults: {
      animationIndex: -1,
      direction: 0,
      lastMovementY: 0,
      lastMovementX: 0,
      z: 0,
      animate: function () {
        this.animationIndex++
        if (this.animationIndex >= this.imageCount) {
          this.animationIndex = 0
          if (!this.loop) {
            game.remove(this)
            if (this.oncomplete) {
              this.oncomplete()
            }
          } else {
            this.animationIndex = this.loop
          }
        }
      },
      draw: function () {
        if (this.animationIndex < 0) {
          this.animationIndex = 0
        }
        var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round((this.y - this.z) * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth + this.pixelWidth || y > game.viewportHeight + this.pixelHeight) {
          return
        }
        if (this.background && this.animationIndex <= this.imageCount / 3) {
          this.background.draw()
        }
        game.foregroundContext.drawImage(this.spriteSheet, (this.direction * this.imageCount + this.animationIndex) * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x - this.pixelWidth / 2, y - this.pixelHeight / 2, this.pixelWidth, this.pixelHeight)
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      $.extend(item, details)
      return item
    },
    load: function (name) {
      var item = this.list[name]
      if (item.spriteSheet) {
        return
      }
      item.name = name
      item.type = this.type
      item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png')
    },
    loadAll: function () {
      var names = Object.keys(this.list).sort()
      for (var i = names.length - 1; i >= 0; i--) {
        this.load(names[i])
      }
    }
  }