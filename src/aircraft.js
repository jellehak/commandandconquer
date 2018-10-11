const aircraft = {
  type: 'aircraft',
  list: {
    orca: {
      name: 'orca',
      label: 'Orca Assault Craft',
      speed: 40,
      turnSpeed: 8,
      armor: 3,
      primaryWeapon: 'rocket',
      cost: 1200,
      sight: 0,
      maxAmmunition: 6,
      ammunition: 6,
      dependency: ['helipad'],
      constructedIn: ['helipad'],
      owner: 'gdi',
      hitPoints: 125,
      directions: 32,
      deathAnimation: 'frag1',
      spriteImages: [{
        name: 'stand',
        count: 32
      }, {
        name: 'attack',
        count: 32
      }],
      pixelOffsetX: -12,
      pixelOffsetY: -18,
      selectOffsetX: -7,
      selectOffsetY: -16,
      pixelHeight: 25,
      pixelWidth: 36,
      firesTwice: true,
      softCollisionRadius: 8,
      hardCollisionRadius: 5
    },
    c17: {
      name: 'orca',
      label: 'Orca Assault Craft',
      speed: 40,
      turnSpeed: 5,
      armor: 2,
      cannotTurnSharp: true,
      primaryWeapon: 'napalm',
      cost: 800,
      sight: 0,
      salvos: 2,
      z: 1,
      maxAmmunition: 5,
      ammunition: 5,
      owner: 'both',
      hitPoints: 25,
      directions: 32,
      deathAnimation: 'frag1',
      spriteImages: [{
        name: 'stand',
        count: 32
      }],
      action: 'stand',
      pixelOffsetX: -24,
      pixelOffsetY: -24,
      selectOffsetX: -7,
      selectOffsetY: -16,
      pixelHeight: 48,
      pixelWidth: 48,
      firesTwice: false,
      softCollisionRadius: 7,
      hardCollisionRadius: 10,
      processOrders: function () {
        this.lifeCode = getLifeCode(this)
        if (this.lifeCode == 'dead') {
          game.remove(this)
          game.add({
            type: 'effects',
            name: this.deathAnimation,
            x: this.x,
            y: this.y - this.z
          })
          sounds.play('xplosml2')
          game.kills[this.attackedBy]++
          game.deaths[this.player]++
          return
        }
        this.sight = this.z == 0 ? 1 : 0
        this.lastMovementX = 0
        this.lastMovementY = 0
        if (this.weapon && this.weapon.cooldown > 0) {
          this.weapon.cooldown--
        }
        switch (this.orders.type) {
          case 'bomb':
            this.moveTo(this.orders.to)
            if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 3) {
              if (this.ammunition > 0 && this.weapon.cooldown <= 0) {
                this.ammunition--
                this.weapon.fire(this)
              } else if (this.ammunition === 0 && this.salvos === 0) {
                this.orders = {
                  type: 'exit',
                  to: this.orders.from
                }
              }
            } else {
              this.moveTo(this.orders.to)
            }
            break
          case 'exit':
            if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.2) {
              game.remove(this)
            } else {
              this.moveTo(this.orders.to)
            }
            break
        }
      }
    },
    apache: {
      name: 'apache',
      label: 'Apache Attack Helicopter',
      speed: 40,
      turnSpeed: 4,
      armor: 3,
      primaryWeapon: 'chaingun',
      cost: 1200,
      sight: 0,
      maxAmmunition: 6,
      ammunition: 6,
      dependency: ['helipad'],
      constructedIn: ['helipad'],
      owner: 'nod',
      hitPoints: 125,
      directions: 32,
      deathAnimation: 'frag1',
      spriteImages: [{
        name: 'stand',
        count: 32
      }],
      pixelOffsetX: -23,
      pixelOffsetY: -20,
      selectOffsetX: -13,
      selectOffsetY: -16,
      pixelHeight: 29,
      pixelWidth: 46,
      softCollisionRadius: 8,
      hardCollisionRadius: 5
    },
    chinook: {
      name: 'chinook',
      label: 'Chinook Assault Craft',
      speed: 30,
      turnSpeed: 5,
      armor: 2,
      cost: 1500,
      sight: 0,
      maxCargo: 5,
      z: 1,
      dependency: ['helipad'],
      constructedIn: ['helipad'],
      owner: 'both',
      hitPoints: 90,
      directions: 32,
      deathAnimation: 'frag1',
      spriteImages: [{
        name: 'stand',
        count: 32
      }, {
        name: 'load',
        count: 4
      }],
      pixelOffsetX: -24,
      pixelOffsetY: -24,
      selectOffsetX: -12,
      selectOffsetY: -12,
      pixelHeight: 48,
      pixelWidth: 48,
      softCollisionRadius: 10,
      hardCollisionRadius: 8,
      animate: function () {
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        if (this.action == 'load') {
          this.imageList = this.spriteArray['load']
          this.imageOffset = this.imageList.offset + this.animationIndex
          if (this.animationIndex < this.imageList.count - 1) {
            this.animationIndex++
          }
        } else if (this.action == 'close') {
          this.imageList = this.spriteArray['load']
          this.imageOffset = this.imageList.offset + this.imageList.count - 1 - this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.action = 'move'
            this.animationIndex = 0
          }
        } else {
          this.imageList = this.spriteArray['stand']
          this.imageOffset = this.imageList.offset + Math.floor(this.direction)
        }
      }
    }
  },
  defaults: {
    action: 'stand',
    z: 0,
    orders: {
      type: 'stand'
    },
    direction: 32,
    animationIndex: 0,
    selected: false,
    path: undefined,
    lastMovementX: 0,
    lastMovementY: 0,
    spriteSheet: undefined,
    findEnemyInRange: findEnemyInRange,
    checkCollision: checkCollision,
    moveTo: function (goal) {
      if (this.helipad) {
        if (this.helipad.docked == this) {
          this.helipad.docked = undefined
        }
        this.helipad = undefined
      }
      this.lastMovementX = 0
      this.lastMovementY = 0
      var destination = {
        x: goal.x,
        y: goal.y,
        type: goal.type
      }
      if (destination.type == 'buildings') {
        destination.y = goal.cgY
        destination.x = goal.cgX
      }
      if (this.z < 1) {
        this.z += 1 / 16
      }
      var newDirection = findAngle(destination, this, this.directions)
      var turnAmount = Math.abs(angleDiff(this.direction, newDirection, this.directions))
      if (turnAmount >= 1 && !(this.firing && this.name == 'c17')) {
        this.turnTo(newDirection)
      }
      var movement, angleRadians
      this.colliding = false
      if (this.z >= 1 && (this.cannotTurnSharp || Math.abs(angleDiff(newDirection, this.direction, this.directions)) < this.directions / 4)) {
        var distance = Math.sqrt(Math.pow(destination.x - this.x, 2) + Math.pow(destination.y - this.y, 2))
        movement = this.speed / game.gridSize / game.speedAdjustmentFactor
        if (distance < movement) {
          distance = movement
        }
        angleRadians = this.direction / this.directions * 2 * Math.PI
        this.lastMovementX = -roundFloating(movement * Math.sin(angleRadians))
        this.lastMovementY = -roundFloating(movement * Math.cos(angleRadians))
        this.x = this.x + this.lastMovementX
        this.y = this.y + this.lastMovementY
      }
      return true
    },
    processOrders: function () {
      this.lifeCode = getLifeCode(this)
      if (this.lifeCode == 'dead') {
        game.remove(this)
        game.add({
          type: 'effects',
          name: this.deathAnimation,
          x: this.x,
          y: this.y - this.z
        })
        sounds.play('xplosml2')
        game.kills[this.attackedBy]++
        return
      }
      this.sight = this.z == 0 ? 1 : 0
      var enemy
      this.lastMovementX = 0
      this.lastMovementY = 0
      this.firing = false
      if (this.weapon && this.weapon.cooldown > 0) {
        this.weapon.cooldown--
      }
      switch (this.orders.type) {
        case 'stand':
          if (this.z === 0) {
            break
          }
          if (!isEmptySpot(this)) {
            this.orders = {
              type: 'move',
              to: findClosestEmptySpot({
                x: Math.floor(this.x) + 0.5,
                y: Math.floor(this.y) + 0.5
              })
            }
            break
          }
          if (this.name === 'chinook' && this.direction != 0) {
            this.turnTo(0)
            break
          }
          if (this.z > 0) {
            this.z -= 1 / 16
          }
          break
        case 'load':
          if (this.z > 0) {
            this.orders.type = 'stand'
            break
          }
          if (this.cargo.length == this.maxCargo) {
            this.orders.type == 'stand'
            this.action = 'close'
            break
          }
          if (this.action != 'load') {
            this.action = 'load'
            this.animationIndex = 0
          }
          this.orders.type = 'stand'
          break
        case 'finish-load':
          if (this.orders.counter == undefined) {
            this.orders.counter = 50
          }
          if (this.orders.counter) {
            this.orders.counter--
          } else {
            this.action = 'close'
            this.animationIndex = 0
            this.orders.type = 'stand'
          }
          break
        case 'unload':
          if (this.cargo.length === 0) {
            this.orders.type = 'stand'
            break
          }
          if (this.action !== 'load') {
            this.action = 'load'
            this.animationIndex = 0
          } else {
            if (this.animationIndex == this.imageList.count - 1) {
              var emptySpot = findClosestEmptySpot(this)
              var x = emptySpot.x - 0.5
              var y = emptySpot.y
              var toggle = false
              while (this.cargo.length) {
                var soldier = this.cargo.pop()
                soldier.x = x
                soldier.y = y + (toggle ? 0.25 : 0)
                toggle = !toggle
                x = x + 0.25
                game.add(soldier)
              }
              this.orders = {
                type: 'finish-load'
              }
            }
          }
          break
        case 'hunt':
        case 'guard':
          enemy = this.findEnemyInRange()
          if (this.primaryWeapon && enemy) {
            this.orders = {
              type: 'attack',
              to: enemy,
              lastOrder: this.orders
            }
          }
          break
        case 'patrol':
          if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.2) {
            this.orders = {
              type: 'patrol',
              from: this.orders.to,
              to: this.orders.from
            }
          } else {
            this.moveTo(this.orders.to)
          }
          enemy = this.findEnemyInRange()
          break
        case 'move':
          this.action = 'stand'
          if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.2) {
            this.orders = {
              type: 'stand'
            }
          } else {
            this.moveTo(this.orders.to)
          }
          break
        case 'return':
          this.action = 'stand'
          if (!this.orders.helipad) {
            this.orders.helipad = this.findHelipadInRange(false) || this.findHelipadInRange(true)
            if (!this.orders.helipad) {
              this.orders = {
                type: 'stand'
              }
              break
            }
          }
          if (Math.pow(this.orders.helipad.cgX - this.x, 2) + Math.pow(this.orders.helipad.cgY - this.y, 2) < 0.1) {
            this.helipad = this.orders.helipad
            this.x = this.orders.helipad.cgX
            this.y = this.orders.helipad.cgY
            this.orders = {
              type: 'dock'
            }
          } else {
            if (Math.sqrt(Math.pow(this.orders.helipad.cgX - this.x, 2) + Math.pow(this.orders.helipad.cgY - this.y, 2)) < 3) {
              if (!this.orders.helipad.docked) {
                this.orders.helipad.docked = this
              }
              if (this.orders.helipad.docked != this) {
                this.orders.helipad = this.findHelipadInRange(false)
                if (!this.orders.helipad) {
                  this.orders = {
                    type: 'stand'
                  }
                  break
                }
              }
            }
            this.moveTo(this.orders.helipad)
          }
          break
        case 'dock':
          this.action = 'stand'
          if (this.z > 0) {
            this.z -= 1 / 16
          }
          break
        case 'attack':
          if (!this.orders.to || !this.canAttackEnemy(this.orders.to) || !this.ammunition) {
            this.orders = {
              type: 'return'
            }
            return
          }
          this.action = 'stand'
          if (this.z < 1) {
            this.z += 1 / 16
            return
          }
          if (Math.pow(this.orders.to.cgX - this.x, 2) + Math.pow(this.orders.to.cgY - this.y, 2) < Math.pow(this.weapon.range - 1, 2)) {
            this.action = 'attack'
            var newDirection = findAngle(this.orders.to, this, this.directions)
            var turnAmount = Math.abs(angleDiff(this.direction, newDirection, this.directions))
            if (turnAmount > 2) {
              this.turnTo(newDirection)
            } else {
              if (this.weapon.cooldown <= 0 && this.ammunition) {
                this.weapon.fire(this, this.direction, this.orders.to)
                this.ammunition--
              }
            }
          } else {
            this.moveTo(this.orders.to)
          }
          break
      }
      this.cgX = this.x
      this.cgY = this.y
    },
    findHelipadInRange: function (docked) {
      var lastDistance
      var lastItem
      if (!docked) {
        for (var i = 0; i < game.buildings.length; i++) {
          var item = game.buildings[i]
          if (item.name == 'helipad' && item.player == this.player && !item.docked) {
            var distance = Math.pow(item.cgX - this.x, 2) + Math.pow(item.y - this.y, 2)
            if (!lastItem || lastDistance > distance) {
              lastDistance = distance
              lastItem = item
            }
          }
        }
      } else {
        for (var i = 0; i < game.buildings.length; i++) {
          var item = game.buildings[i]
          if (item.name == 'helipad' && item.player == this.player) {
            var distance = Math.pow(item.cgX - this.x, 2) + Math.pow(item.y - this.y, 2)
            if (!lastItem || lastDistance > distance) {
              lastDistance = distance
              lastItem = item
            }
          }
        }
      }
      return lastItem
    },
    canAttackEnemy: canAttackEnemy,
    drawSelection: function () {
      var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft + this.selectOffsetX
      var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop + this.selectOffsetY
      game.foregroundContext.drawImage(this.selectImage, x, y)
      var selectBarHeight = 4
      var selectBarWidth = this.selectImage.width
      game.foregroundContext.beginPath()
      game.foregroundContext.rect(x, y - selectBarHeight - 3, selectBarWidth * this.life / this.hitPoints, selectBarHeight)
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
      game.foregroundContext.rect(x, y - selectBarHeight - 3, selectBarWidth, selectBarHeight)
      game.foregroundContext.stroke()
      if (this.name == 'orca') {
        game.foregroundContext.beginPath()
        game.foregroundContext.fillStyle = 'lightyellow'
        game.foregroundContext.strokeStyle = 'black'
        for (var i = 0; i < this.maxAmmunition; i++) {
          game.foregroundContext.rect(x + 3 + i * 3.5, y + 18, 3, 3)
          if (i < this.ammunition) {
            game.foregroundContext.fill()
          }
          game.foregroundContext.stroke()
        }
      } else if (this.name == 'chinook') {
        game.foregroundContext.beginPath()
        game.foregroundContext.fillStyle = 'red'
        game.foregroundContext.strokeStyle = 'black'
        for (var i = 0; i < this.maxCargo; i++) {
          game.foregroundContext.rect(x + 2 + i * 4, y + 18, 4, 4)
          if (i < this.cargo.length) {
            game.foregroundContext.fill()
          }
          game.foregroundContext.stroke()
        }
      }
      if (game.debugMode) {
        game.foregroundContext.fillText(this.orders.type, x + 9, y)
      }
    },
    draw: function () {
      this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
      this.interpolatedY = this.y - this.z + game.movementInterpolationFactor * this.lastMovementY
      var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
      var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
      if (x < -this.pixelWidth + this.pixelOffsetX || y < -this.pixelHeight + this.pixelOffsetY || x > game.viewportWidth + this.pixelWidth - this.pixelOffsetX || y > game.viewportHeight + this.pixelHeight - this.pixelOffsetY) {
        return
      }
      game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
      if (this.selected) {
        this.drawSelection()
      }
    },
    animate: function () {
      this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
      this.imageList = this.spriteArray[this.name == 'orca' ? this.action : 'stand']
      this.imageOffset = this.imageList.offset + Math.floor(this.direction)
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
    if (name == 'chinook') {
      item.cargo = []
    }
    $.extend(item, this.defaults)
    $.extend(item, this.list[name])
    $.extend(item, details)
    item.weapon = weapons.add({
      name: item.primaryWeapon
    })
    if (item.percentLife) {
      item.life = item.hitPoints * item.percentLife
      delete item.percentLife
    } else {
      item.life = item.hitPoints
    }
    return item
  },
  load: function (name) {
    var item = this.list[name]
    console.log('Loading', name, '...')
    item.spriteCanvas = document.createElement('canvas')
    item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function (image) {
      createSpriteSheetCanvas(image, item.spriteCanvas, name == 'harvester' || name == 'mcv' ? 'colormap' : 'grayscale')
    })
    item.spriteArray = []
    item.spriteCount = 0
    item.selectImage = loader.loadImage('images/sidebar/select-1-1.png')
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
