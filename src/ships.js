var ships = {
  type: 'ships',
  list: {
    gunboat: {
      name: 'gunboat',
      label: 'Gun Boat',
      speed: 8,
      turnSpeed: 1,
      armor: 3,
      primaryWeapon: 'boatmissile',
      cost: 300,
      sight: 5,
      hitPoints: 700,
      direction: 0,
      directions: 2,
      turretDirection: 0,
      turretDirections: 32,
      animationIndex: 0,
      wakeAnimationIndex: 0,
      firesTwice: true,
      spriteImages: [{
        name: 'move-healthy-0',
        count: 32
      }, {
        name: 'move-damaged-0',
        count: 32
      }, {
        name: 'move-ultra-damaged-0',
        count: 32
      }, {
        name: 'move-healthy-1',
        count: 32
      }, {
        name: 'move-damaged-1',
        count: 32
      }, {
        name: 'move-ultra-damaged-1',
        count: 32
      }],
      pixelOffsetX: -25,
      pixelOffsetY: -10,
      pixelHeight: 19,
      pixelWidth: 51,
      wakePixelHeight: 8,
      wakePixelWidth: 85,
      softCollisionRadius: 25,
      animate: function () {
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        if (this.lifeCode == 'dead') {
          game.remove(this)
          game.add({
            type: 'effects',
            name: 'frag3',
            x: this.x + 0.5,
            y: this.y + 0.5
          })
          sounds.play('xplosml2')
          game.kills[this.attackedBy]++
          game.deaths[this.player]++
          return
        }
        this.imageList = this.spriteArray['move-' + this.lifeCode + '-' + this.direction]
        var td = Math.round(this.turretDirection)
        if (td >= this.turretDirections) {
          td -= this.turretDirections
        }
        this.imageOffset = this.imageList.offset + td
        this.wakeImageList = this.wakeSpriteArray['wake-' + (1 - this.direction)]
        this.wakeImageOffset = this.wakeImageList.offset + this.wakeAnimationIndex
        this.wakeAnimationIndex++
        if (this.wakeAnimationIndex >= this.wakeImageList.count) {
          this.wakeAnimationIndex = 0
        }
        this.cgX = this.x
        this.cgY = this.y
      },
      draw: function () {
        this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
        this.interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
        var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth + this.pixelOffsetX || y < -this.pixelHeight + this.pixelOffsetY || x > game.viewportWidth + this.pixelWidth - this.pixelOffsetX || y > game.viewportHeight + this.pixelHeight - this.pixelOffsetY) {
          return
        }
        var wakeXOffset = (this.pixelWidth - this.wakePixelWidth) / 2
        var wakeYOffset = this.pixelHeight - this.wakePixelHeight
        game.foregroundContext.drawImage(this.wakeSpriteSheet, this.wakeImageOffset * this.wakePixelWidth, 0, this.wakePixelWidth, this.wakePixelHeight, x + this.pixelOffsetX + wakeXOffset, y + this.pixelOffsetY + wakeYOffset, this.wakePixelWidth, this.wakePixelHeight)
        game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
        if (this.selected) {
          this.drawSelection()
        }
      },
      processOrders: function () {
        this.lifeCode = getLifeCode(this)
        this.lastMovementY = 0
        this.lastMovementX = 0
        switch (this.orders.type) {
          case 'patrol':
            var newDirection
            if (Math.abs(this.x - this.orders.to.x) < 0.5) {
              this.orders = {
                type: 'patrol',
                from: this.orders.to,
                to: this.orders.from
              }
            } else {
              this.moveTo(this.orders.to)
            }
            if (this.weapon.cooldown > 0) {
              this.weapon.cooldown = this.weapon.cooldown - 1
            }
            var enemy = this.findEnemyInRange()
            this.enemy = enemy
            if (enemy) {
              newDirection = findAngle(enemy, this, this.turretDirections)
              if (Math.abs(angleDiff(this.turretDirection, newDirection)) > 1) {
                this.aimTo(newDirection)
              }
            } else {
              this.aimTo(this.direction * 16 + 8)
            }
            if (enemy && this.weapon.cooldown <= 0) {
              if (Math.abs(angleDiff(this.turretDirection, newDirection)) < 8) {
                this.weapon.fire(this, this.turretDirection, enemy)
              }
            }
            break
        }
      },
      drawSelection: function () {
        var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft + this.pixelOffsetX
        var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop + this.pixelOffsetY
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
      findEnemyInRange: findEnemyInRange,
      moveTo: function (destination) {
        var start = this
        var end = destination
        if (Math.abs(start.x - end.x) > 0.2) {
          var newDirection = start.x < end.x ? 1 : 0
          if (this.direction != newDirection) {
            this.direction = newDirection
          } else {
            var movement = this.speed / game.gridSize / game.speedAdjustmentFactor
            this.lastMovementX = this.direction === 0 ? -movement : movement
            this.x = this.x + this.lastMovementX
          }
        }
      }
    },
    hovercraft: {
      name: 'hovercraft',
      label: 'Hovercraft',
      speed: 30,
      turnSpeed: 127,
      armor: 2,
      unselectable: true,
      cargo: [],
      cost: 300,
      sight: 3,
      hitPoints: 400,
      directions: 4,
      spriteImages: [{
        name: 'move',
        count: 1,
        direction: true
      }],
      pixelOffsetX: -24,
      pixelOffsetY: -24,
      z: -1,
      pixelHeight: 48,
      pixelWidth: 48,
      softCollisionRadius: 24,
      animate: function () {
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        this.imageList = this.spriteArray['move-' + this.direction]
        this.imageOffset = this.imageList.offset
        for (var i = this.cargo.length - 1; i >= 0; i--) {
          var unit = this.cargo[i]
          switch (unit.type) {
            case 'infantry':
              unit.x = this.x + Math.floor(i / 2) / 2 - 0.25
              unit.y = this.y + i % 2 / 2 - 0.25
              if (!unit.hitPoints) {
                unit = infantry.add(unit)
                unit.direction = Math.floor(this.direction * unit.directions / this.directions)
                this.cargo[i] = unit
              }
              unit.animate()
              unit.preRender()
              break
            case 'vehicles':
              unit.x = this.x
              unit.y = this.y
              if (!unit.hitPoints) {
                unit = vehicles.add(unit)
                unit.direction = Math.floor(this.direction * unit.directions / this.directions)
                unit.turretDirection = Math.floor(this.direction * unit.directions / this.directions)
                this.cargo[i] = unit
              }
              unit.animate()
              break
          }
        }
        this.cgX = this.x
        this.cgY = this.y
      },
      draw: function () {
        this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
        this.interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
        var x = Math.floor(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.floor(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth + this.pixelOffsetX || y < -this.pixelHeight + this.pixelOffsetY || x > game.viewportWidth + this.pixelWidth - this.pixelOffsetX || y > game.viewportHeight + this.pixelHeight - this.pixelOffsetY) {
          return
        }
        game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
        for (var i = this.cargo.length - 1; i >= 0; i--) {
          var unit = this.cargo[i]
          if (unit.draw) {
            unit.lastMovementY = this.lastMovementY
            unit.lastMovementX = this.lastMovementX
            unit.draw()
          }
        }
      },
      processOrders: function () {
        this.lastMovementY = 0
        this.lastMovementX = 0
        switch (this.orders.type) {
          case 'unload':
            if (Math.abs(this.x - this.orders.to.x) < 0.5 && Math.abs(this.y - this.orders.to.y) < 0.5) {
              if (this.cargo.length > 0) {
                for (var i = this.cargo.length - 1; i >= 0; i--) {
                  var unit = this.cargo.pop()
                  unit.lastMovementY = this.lastMovementY
                  unit.lastMovementX = this.lastMovementX
                  unit.orders = {
                    type: 'move',
                    to: {
                      x: unit.x,
                      y: unit.y - 3
                    }
                  }
                  game.add(unit)
                }
              }
              var hovercraft = this
              var to = this.orders.from
              this.orders = {
                type: 'waitforreturn',
                to: to,
                timer: 25
              }
            } else {
              this.moveTo(this.orders.to)
            }
            break
          case 'waitforreturn':
            if (this.orders.timer > 0) {
              this.orders.timer--
            } else {
              this.orders.type = 'return'
            }
            break
          case 'return':
            if (Math.abs(this.x - this.orders.to.x) < 0.5 && Math.abs(this.y - this.orders.to.y) < 0.5) {
              game.remove(this)
            } else {
              this.moveTo(this.orders.to)
            }
            break
        }
      },
      moveTo: function (destination) {
        var start = this
        var end = destination
        if (Math.abs(start.x - end.x) > 0.5 || Math.abs(this.y - this.orders.to.y) > 0.5) {
          if (start.x < end.x) {
            newDirection = 3
          } else if (start.x > end.x) {
            newDirection = 1
          } else if (start.y < end.y) {
            newDirection = 2
          } else if (start.y > end.y) {
            newDirection = 0
          }
          if (this.direction != newDirection) {
            this.direction = newDirection
          } else {
            var movement = this.speed / game.gridSize / game.speedAdjustmentFactor
            this.lastMovementX = this.direction === 1 ? -movement : this.direction === 3 ? movement : 0
            this.lastMovementY = this.direction === 0 ? -movement : this.direction === 2 ? movement : 0
            this.x = this.x + this.lastMovementX
            this.y = this.y + this.lastMovementY
          }
        } else {
          console.log('Reached close to destination', start, end)
        }
      }
    }
  },
  defaults: {
    z: 0,
    lastMovementX: 0,
    lastMovementY: 0,
    direction: 0,
    selected: false,
    path: undefined,
    spriteSheet: undefined,
    canAttackEnemy: canAttackEnemy,
    aimTo: function (toDirection) {
      if (toDirection > this.turretDirection && toDirection - this.turretDirection < this.turretDirections / 2 || toDirection < this.turretDirection && this.turretDirection - toDirection > this.turretDirections / 2) {
        this.turretDirection += this.turnSpeed / 20
      } else {
        this.turretDirection -= this.turnSpeed / 20
      }
      if (this.turretDirection > this.turretDirections - 1) {
        this.turretDirection -= this.turretDirections - 1
      } else if (this.turretDirection < 0) {
        this.turretDirection += this.turretDirections - 1
      }
    },
    turnTo: function (toDirection) {
      if (toDirection > this.direction && toDirection - this.direction < this.directions / 2 || toDirection < this.direction && this.direction - toDirection > this.directions / 2) {
        this.direction = this.direction + this.turnSpeed / 10
      } else {
        this.direction = this.direction - this.turnSpeed / 10
      }
      if (this.direction > this.directions - 1) {
        this.direction -= this.directions - 1
      } else if (this.direction < 0) {
        this.direction += this.directions - 1
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
    } else {
      item.life = item.hitPoints
    }
    $.extend(item, details)
    item.weapon = weapons.add({
      name: item.primaryWeapon
    })
    return item
  },
  load: function (name) {
    var item = this.list[name]
    console.log('Loading', name, '...')
    item.spriteCanvas = document.createElement('canvas')
    item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function (image) {
      createSpriteSheetCanvas(image, item.spriteCanvas, 'colormap')
    })
    item.spriteArray = []
    item.spriteCount = 0
    if (name == 'gunboat') {
      item.wakeSpriteSheet = loader.loadImage('images/' + this.type + '/gunboat-wake-sprite-sheet.png')
      item.wakeSpriteArray = {
        'wake-0': {
          name: 'wake-0',
          count: 6,
          offset: 0
        },
        'wake-1': {
          name: 'wake-1',
          count: 6,
          offset: 6
        }
      }
      item.selectImage = loader.loadImage('images/' + 'sidebar/select-2-1.png')
    }
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
