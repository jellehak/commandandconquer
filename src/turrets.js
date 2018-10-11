var turrets = {
    type: 'turrets',
    list: {
      'gun-turret': {
        name: 'gun-turret',
        label: 'Gun Turret',
        powerIn: 20,
        primaryWeapon: 'turretcannon',
        cost: 600,
        hitPoints: 400,
        sight: 5,
        turnSpeed: 5,
        armor: 3,
        directions: 32,
        direction: 7,
        dependency: ['construction-yard', 'hand-of-nod', 'power-plant|advanced-power-plant'],
        owner: 'nod',
        pixelWidth: 24,
        pixelHeight: 24,
        selectOffsetX: 0,
        selectOffsetY: 0,
        spriteImages: [{
          name: 'build',
          count: 20
        }, {
          name: 'damaged',
          count: 32
        }, {
          name: 'healthy',
          count: 32
        }, {
          name: 'ultra-damaged',
          count: 32,
          spriteCount: 20
        }],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ]
      },
      'guard-tower': {
        name: 'guard-tower',
        label: 'Guard Tower',
        powerIn: 10,
        primaryWeapon: 'chaingun',
        cost: 500,
        hitPoints: 400,
        sight: 3,
        turnSpeed: undefined,
        armor: 3,
        directions: 32,
        dependency: ['construction-yard', 'barracks', 'power-plant|advanced-power-plant'],
        owner: 'gdi',
        pixelWidth: 24,
        pixelHeight: 24,
        selectOffsetX: 0,
        selectOffsetY: 0,
        spriteImages: [{
          name: 'build',
          count: 20
        }, {
          name: 'damaged',
          count: 1
        }, {
          name: 'healthy',
          count: 1
        }, {
          name: 'ultra-damaged',
          count: 1
        }],
        gridShape: [
          [1]
        ],
        gridBuild: [
          [1]
        ]
      },
      obelisk: {
        name: 'obelisk',
        label: 'Obelisk of Light',
        powerIn: 150,
        requiresPower: true,
        primaryWeapon: 'laser',
        cost: 1500,
        hitPoints: 400,
        sight: 5,
        turnSpeed: undefined,
        armor: 2,
        directions: 32,
        dependency: ['construction-yard', 'communications-center', 'power-plant|advanced-power-plant'],
        owner: 'nod',
        pixelWidth: 24,
        pixelHeight: 48,
        selectOffsetX: 0,
        selectOffsetY: 0,
        spriteImages: [{
          name: 'healthy',
          count: 4
        }, {
          name: 'damaged',
          count: 4
        }, {
          name: 'ultra-damaged',
          count: 1
        }, {
          name: 'build',
          count: 20
        }],
        gridShape: [
          [0],
          [1]
        ],
        gridBuild: [
          [0],
          [1]
        ]
      },
      'advanced-guard-tower': {
        name: 'advanced-guard-tower',
        label: 'Advanced Guard Tower',
        powerIn: 20,
        requiresPower: true,
        primaryWeapon: 'agtmissile',
        cost: 1e3,
        hitPoints: 600,
        sight: 4,
        turnSpeed: undefined,
        armor: 2,
        directions: 32,
        dependency: ['construction-yard', 'communications-center', 'power-plant|advanced-power-plant'],
        owner: 'gdi',
        pixelWidth: 24,
        pixelHeight: 48,
        selectOffsetX: 0,
        selectOffsetY: 0,
        spriteImages: [{
          name: 'healthy',
          count: 1
        }, {
          name: 'damaged',
          count: 1
        }, {
          name: 'ultra-damaged',
          count: 1
        }, {
          name: 'build',
          count: 14
        }],
        gridShape: [
          [0],
          [1]
        ],
        gridBuild: [
          [0],
          [1]
        ]
      },
      'sam-site': {
        name: 'sam-site',
        label: 'SAM Site',
        powerIn: 20,
        requiresPower: true,
        primaryWeapon: 'sammissile',
        cost: 750,
        hitPoints: 400,
        sight: 3,
        turnSpeed: 5,
        armor: 3,
        directions: 32,
        firesTwice: true,
        dependency: ['construction-yard', 'barracks|hand-of-nod', 'power-plant|advanced-power-plant'],
        owner: 'nod',
        pixelWidth: 48,
        pixelHeight: 24,
        selectOffsetX: 0,
        selectOffsetY: 0,
        orders: {
          type: 'sam-guard'
        },
        action: 'hidden',
        spriteImages: [{
          name: 'healthy-rising',
          count: 17
        }, {
          name: 'healthy',
          count: 1,
          count: 32
        }, {
          name: 'healthy-dropping',
          count: 15
        }, {
          name: 'damaged-rising',
          count: 17
        }, {
          name: 'damaged',
          count: 1,
          count: 32
        }, {
          name: 'damaged-dropping',
          count: 15
        }, {
          name: 'ultra-damaged',
          count: 1
        }, {
          name: 'build',
          count: 30
        }, {
          name: 'healthy-hidden',
          count: 1,
          spriteCount: 0
        }, {
          name: 'damaged-hidden',
          count: 1,
          spriteCount: 64
        }, {
          name: 'ultra-damaged-hidden',
          count: 1,
          spriteCount: 128
        }],
        gridShape: [
          [1, 1]
        ],
        gridBuild: [
          [1, 1]
        ]
      }
    },
    defaults: {
      z: 0,
      powerIn: 0,
      powerOut: 0,
      action: 'guard',
      type: 'turrets',
      orders: {
        type: 'stand'
      },
      animationIndex: 0,
      direction: 0,
      selected: false,
      findEnemyInRange: findEnemyInRange,
      canAttackEnemy: canAttackEnemy,
      turnTo: function (newDirection) {
        var turnDirection = angleDiff(this.direction, newDirection, this.directions)
        if (turnDirection) {
          if (this.turnSpeed) {
            var turnAmount = turnDirection / Math.abs(turnDirection) * this.turnSpeed / 10
            this.direction = wrapDirection(this.direction + turnAmount, this.directions)
          } else {
            this.direction = newDirection
          }
        }
      },
      processOrders: function () {
        if (this.timeBomb) {
          this.timeBomb--
          if (this.timeBomb == 0) {
            this.life = 0
          }
        }
        this.lifeCode = getLifeCode(this)
        if (this.lifeCode == 'dead') {
          game.remove(this)
          game.add({
            type: 'effects',
            name: 'frag3',
            x: this.cgX,
            y: this.cgY,
            background: this
          })
          sounds.play('crumble')
          game.kills[this.attackedBy]++
          game.deaths[this.player]++
          return
        }
        if (this.action == 'build' || this.action == 'sell') {
          return
        }
        if (this.weapon.cooldown > 0) {
          this.weapon.cooldown--
        }
        switch (this.orders.type) {
          case 'sell':
            if (this.animationIndex === 0) {
              sounds.play('sell')
            }
            this.repairing = false
            this.action = 'sell'
            break
          case 'repair':
            if (this.name == 'sam-site') {
              this.orders = {
                type: 'sam-guard'
              }
            } else {
              this.orders = {
                type: 'stand'
              }
            }
            this.repairing = true
            sounds.play('button')
            break
          case 'sam-guard':
            this.firing = false
            if (this.lifeCode == 'ultra-damaged' || this.lifeCode == 'dead') {
              this.action == 'hidden'
              break
            }
            var newDirection
            var enemy
            if (sidebar.power[this.player].powerIn <= sidebar.power[this.player].powerOut) {
              enemy = this.findEnemyInRange()
            }
            if (enemy) {
              if (this.action == 'hidden') {
                this.action = 'rise'
                sounds.play('sammotr2')
                this.animationIndex = 0
                break
              }
              if (this.action == 'guard') {
                newDirection = findAngle(enemy, {
                  x: this.x + 1,
                  y: this.y + 0.5
                }, this.directions)
                if (this.direction != newDirection) {
                  this.turnTo(newDirection)
                  break
                }
                if (Math.abs(angleDiff(this.direction, newDirection, this.directions)) < 3) {
                  if (this.weapon.cooldown <= 0) {
                    this.weapon.fire(this, this.direction, enemy)
                  }
                }
              }
            } else {
              if (this.action == 'guard') {
                if (this.direction != 0) {
                  this.turnTo(0)
                  break
                }
                this.action = 'drop'
                sounds.play('sammotr2')
                this.animationIndex = 0
              }
            }
            break
          default:
            if (this.lifeCode == 'ultra-damaged' && this.requiresPower) {
              break
            }
            this.firing = false
            var newDirection
            var enemy
            if (!this.requiresPower || sidebar.power[this.player].powerIn <= sidebar.power[this.player].powerOut) {
              enemy = this.findEnemyInRange()
            }
            if (enemy) {
              newDirection = findAngle(enemy, {
                x: this.x + 0.5,
                y: this.y + 0.5
              }, this.directions)
              var turnDirection = angleDiff(this.direction, newDirection, this.directions)
              if (turnDirection) {
                if (this.turnSpeed) {
                  var turnAmount = turnDirection / Math.abs(turnDirection) * this.turnSpeed / 10
                  this.direction = wrapDirection(this.direction + turnAmount, this.directions)
                } else {
                  this.direction = newDirection
                }
              }
            }
            if (enemy && this.weapon.cooldown <= 0) {
              if (this.direction === newDirection) {
                this.weapon.fire(this, this.direction, enemy)
              }
            } else {
              if (this.name == 'obelisk' && this.weapon.cooldown == 60) {
                sounds.play('obelpowr')
              }
            }
            break
        }
      },
      drawSelection: function () {
        var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft + this.selectOffsetX
        var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop + this.selectOffsetY
        game.foregroundContext.drawImage(this.selectImage, x, y)
        var selectBarHeight = 4
        game.foregroundContext.beginPath()
        game.foregroundContext.rect(x, y - selectBarHeight - 3, this.pixelWidth * this.life / this.hitPoints, selectBarHeight)
        if (this.lifeCode == 'healthy') {
          game.foregroundContext.fillStyle = 'lightgreen'
        } else if (this.lifeCode == 'damaged') {
          game.foregroundContext.fillStyle = 'yellow'
        } else {
          game.foregroundContext.fillStyle = 'red'
        }
        game.foregroundContext.fill()
        game.foregroundContext.beginPath()
        game.foregroundContext.strokeStyle = 'black'
        game.foregroundContext.rect(x, y - selectBarHeight - 3, this.pixelWidth, selectBarHeight)
        game.foregroundContext.stroke()
      },
      draw: function () {
        var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth || y > game.viewportHeight) {
          return
        }
        game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        if (this.selected) {
          this.drawSelection()
        }
        if (this.repairing) {
          game.foregroundContext.globalAlpha = sidebar.textBrightness
          game.foregroundContext.drawImage(sidebar.repairImageBig, x + (this.pixelWidth - sidebar.repairImageBig.width) / 2, y + (this.pixelHeight - sidebar.repairImageBig.height) / 2)
          game.foregroundContext.globalAlpha = 1
        }
      },
      animate: function () {
        if (this.lifeCode == 'dead') {
          this.imageList = this.spriteArray['ultra-damaged']
          if (this.name == 'gun-turret' || this.name == 'sam-site') {
            this.imageOffset = this.imageList.offset + Math.floor(this.direction)
          } else {
            this.imageOffset = this.imageList.offset
          }
          return
        }
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        switch (this.action) {
          case 'rise':
            this.imageList = this.spriteArray[this.lifeCode + '-rising']
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
              this.action = 'guard'
            }
            break
          case 'drop':
            this.imageList = this.spriteArray[this.lifeCode + '-dropping']
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
              this.action = 'hidden'
            }
            break
          case 'hidden':
            this.imageList = this.spriteArray[this.lifeCode + '-hidden']
            this.imageOffset = this.imageList.offset
            break
          case 'guard':
            this.imageList = this.spriteArray[this.lifeCode]
            if (this.name == 'gun-turret' || this.name == 'sam-site') {
              this.imageOffset = this.imageList.offset + Math.floor(this.direction)
            } else {
              this.imageOffset = this.imageList.offset
            }
            break
          case 'build':
            this.imageList = this.spriteArray['build']
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
              if (this.name == 'sam-site') {
                this.action = 'hidden'
              } else {
                this.action = 'guard'
              }
            }
            break
          case 'sell':
            this.imageList = this.spriteArray['build']
            this.imageOffset = this.imageList.offset + (this.imageList.count - this.animationIndex - 1)
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
              game.remove(this)
              game.cash[this.player] += this.cost / 2
              this.action = 'guard'
            }
            break
        }
        if (this.repairing) {
          if (this.life >= this.hitPoints) {
            this.repairing = false
            this.life = this.hitPoints
          } else {
            var cashSpent = 0.5
            if (game.cash[this.player] > cashSpent) {
              game.cash[this.player] -= cashSpent
              this.life += cashSpent * 2 * this.hitPoints / this.cost
            }
          }
        }
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      if (details.percentLife) {
        item.life = item.hitPoints * details.percentLife
        delete item.percentLife
      } else {
        item.life = item.hitPoints
      }
      $.extend(item, details)
      item.cgX = item.x + item.pixelWidth / 2 / game.gridSize
      item.cgY = item.y + item.pixelHeight / 2 / game.gridSize
      item.softCollisionRadius = item.pixelWidth / 2
      item.hardCollisionRadius = item.pixelWidth / 4
      item.weapon = weapons.add({
        name: item.primaryWeapon
      })
      return item
    },
    load: function (name) {
      var item = this.list[name]
      console.log('Loading', name, '...')
      item.type = this.type
      item.spriteCanvas = document.createElement('canvas')
      item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function (image) {
        createSpriteSheetCanvas(image, item.spriteCanvas, 'colormap')
      })
      item.selectImage = loader.loadImage('images/' + 'sidebar/select-' + item.pixelWidth / game.gridSize + '-' + item.pixelHeight / game.gridSize + '.png')
      item.spriteArray = []
      item.spriteCount = 0
      item.gridWidth = item.gridShape[0].length
      item.gridHeight = item.gridShape.length
      for (var i = 0; i < item.spriteImages.length; i++) {
        var constructImageCount = item.spriteImages[i].count
        var constructImageName = item.spriteImages[i].name
        if (typeof item.spriteImages[i].spriteCount !== 'undefined') {
          item.spriteCount = item.spriteImages[i].spriteCount
        }
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