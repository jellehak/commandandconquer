var vehicles = {
    type: 'vehicles',
    list: {
      'flame-tank': {
        name: 'flame-tank',
        label: 'Flame Tank',
        speed: 18,
        turnSpeed: 5,
        armor: 3,
        primaryWeapon: 'tankflamer',
        cost: 800,
        sight: 4,
        dependency: ['weapons-factory|airstrip', 'communications-center'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        hitPoints: 300,
        crusher: true,
        directions: 32,
        firesTwice: true,
        deathAnimation: 'napalm3',
        spriteImages: [{
          name: 'move',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -14,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'stealth-tank': {
        name: 'stealth-tank',
        label: 'Stealth Tank',
        speed: 30,
        turnSpeed: 5,
        armor: 2,
        primaryWeapon: 'rocket',
        alpha: 1,
        cloaked: false,
        cloakTimeout: 0,
        cost: 900,
        sight: 4,
        dependency: ['weapons-factory|airstrip', 'communications-center'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        hitPoints: 110,
        crusher: true,
        directions: 32,
        firesTwice: true,
        deathAnimation: 'frag3',
        spriteImages: [{
          name: 'move',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -14,
        selectOffsetY: -10,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4,
        draw: function () {
          this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
          this.interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
          var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
          var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
          if (x < -this.pixelWidth + this.pixelOffsetX || y < -this.pixelHeight + this.pixelOffsetY || x > game.viewportWidth + this.pixelWidth - this.pixelOffsetX || y > game.viewportHeight + this.pixelHeight - this.pixelOffsetY) {
            return
          }
          if (this.player == game.player) {
            game.foregroundContext.globalAlpha = 0.5 + this.alpha / 2
            game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
            game.foregroundContext.globalAlpha = 1
            if (this.selected) {
              this.drawSelection()
            }
          } else {
            if (this.cloaked) {} else {
              game.foregroundContext.globalAlpha = this.alpha
              game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
              game.foregroundContext.globalAlpha = 1
              if (this.selected) {
                this.drawSelection()
              }
            }
          }
        }
      },
      'recon-bike': {
        name: 'recon-bike',
        label: 'Recon Bike',
        speed: 40,
        turnSpeed: 10,
        armor: 1,
        primaryWeapon: 'rocket',
        cost: 500,
        sight: 2,
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        hitPoints: 160,
        directions: 32,
        deathAnimation: 'frag1',
        spriteImages: [{
          name: 'move',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      buggy: {
        name: 'buggy',
        label: 'Nod Buggy',
        speed: 30,
        turnSpeed: 10,
        armor: 2,
        primaryWeapon: 'machinegun',
        cost: 300,
        sight: 2,
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        hitPoints: 140,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      jeep: {
        name: 'jeep',
        label: 'Hum-vee',
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'gdi',
        speed: 30,
        turnSpeed: 10,
        armor: 2,
        primaryWeapon: 'machinegun',
        cost: 400,
        sight: 2,
        hitPoints: 150,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      apc: {
        name: 'apc',
        label: 'Armored Personnel Carrier',
        dependency: ['weapons-factory|airstrip', 'barracks|hand-of-nod'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'both',
        speed: 30,
        turnSpeed: 10,
        armor: 2,
        primaryWeapon: 'machinegun',
        cost: 700,
        sight: 4,
        hitPoints: 200,
        directions: 32,
        crusher: true,
        isTransport: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag3',
        maxCargo: 5,
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'load-left',
          count: 3
        }, {
          name: 'load-right',
          count: 3
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -10,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        animationIndex: 0,
        hardCollisionRadius: 4,
        animate: function () {
          this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
          if (this.action == 'load') {
            this.imageList = this.spriteArray['load-' + (this.direction < 16 ? 'right' : 'left')]
            this.imageOffset = this.imageList.offset
            this.animationIndex = 0
          } else if (this.action == 'close') {
            this.imageList = this.spriteArray['load-' + (this.direction < 16 ? 'right' : 'left')]
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.action = 'move'
            }
          } else {
            this.imageList = this.spriteArray['move']
            this.imageOffset = this.imageList.offset + Math.floor(this.direction)
          }
          this.damageSmoke()
        }
      },
      'mobile-hq': {
        name: 'mobile-hq',
        label: 'Mobile HQ',
        dependency: undefined,
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'both',
        speed: 18,
        turnSpeed: 5,
        armor: 2,
        cost: 600,
        sight: 5,
        hitPoints: 110,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        turretDirection: 0,
        autoRotatingTurret: true,
        deathAnimation: 'frag3',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'ssm-launcher': {
        name: 'ssm-launcher',
        label: 'SSM Launcher',
        dependency: ['weapons-factory|airstrip', 'obelisk'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        speed: 18,
        turnSpeed: 5,
        primaryWeapon: 'honestjohn',
        armor: 2,
        cost: 750,
        sight: 4,
        ammunition: 2,
        maxAmmunition: 2,
        hitPoints: 120,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag3',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret-2',
          count: 32
        }, {
          name: 'turret-1',
          count: 32
        }, {
          name: 'turret-0',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      artillery: {
        name: 'artillery',
        label: 'Artillery',
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        speed: 18,
        turnSpeed: 2.5,
        primaryWeapon: 'artilleryshell',
        armor: 2,
        cost: 450,
        sight: 4,
        hitPoints: 75,
        directions: 32,
        deathAnimation: 'art-exp1',
        spriteImages: [{
          name: 'move',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'mobile-rocket-launch-system': {
        name: 'mobile-rocket-launch-system',
        label: 'Mobile Rocket Launch System',
        dependency: ['weapons-factory|airstrip', 'advanced-communications-tower|temple-of-nod'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'both',
        speed: 18,
        turnSpeed: 2.5,
        firesTwice: true,
        primaryWeapon: 'mrlsmissile',
        armor: 2,
        cost: 450,
        sight: 4,
        hitPoints: 75,
        directions: 32,
        deathAnimation: 'art-exp1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret-low',
          count: 32
        }, {
          name: 'turret-high',
          count: 32
        }],
        hasTurret: true,
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -12,
        selectOffsetY: -12,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'light-tank': {
        name: 'light-tank',
        label: 'Light Tank',
        speed: 18,
        turnSpeed: 5,
        armor: 3,
        primaryWeapon: 'lightcannon',
        cost: 600,
        sight: 3,
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'nod',
        hitPoints: 300,
        crusher: true,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -12,
        pixelOffsetY: -12,
        selectOffsetX: -14,
        selectOffsetY: -10,
        pixelHeight: 24,
        pixelWidth: 24,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'medium-tank': {
        name: 'medium-tank',
        label: 'Medium Tank',
        speed: 18,
        turnSpeed: 5,
        armor: 3,
        primaryWeapon: 'mediumcannon',
        cost: 800,
        sight: 3,
        dependency: ['weapons-factory|airstrip'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'gdi',
        hitPoints: 400,
        crusher: true,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'frag1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -18,
        pixelOffsetY: -18,
        selectOffsetX: -14,
        selectOffsetY: -10,
        pixelHeight: 36,
        pixelWidth: 36,
        softCollisionRadius: 7,
        hardCollisionRadius: 4
      },
      'mammoth-tank': {
        name: 'mammoth-tank',
        label: 'Mammoth Tank',
        speed: 12,
        turnSpeed: 5,
        armor: 3,
        primaryWeapon: 'heavycannon',
        secondaryWeapon: 'mammothtusk',
        cost: 1500,
        sight: 4,
        firesTwice: true,
        dependency: ['weapons-factory|airstrip', 'repair-facility'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'gdi',
        hitPoints: 600,
        crusher: true,
        directions: 32,
        hasTurret: true,
        turretPixelOffsetX: 0,
        turretPixelOffsetY: 0,
        deathAnimation: 'art-exp1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'turret',
          count: 32
        }],
        pixelOffsetX: -24,
        pixelOffsetY: -24,
        selectOffsetX: -12,
        selectOffsetY: -18,
        pixelHeight: 48,
        pixelWidth: 48,
        softCollisionRadius: 12,
        hardCollisionRadius: 8
      },
      harvester: {
        name: 'harvester',
        label: 'Tiberium Harvester',
        dependency: ['weapons-factory|airstrip', 'refinery'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'both',
        turnSpeed: 5,
        speed: 12,
        armor: 2,
        cost: 1400,
        hitPoints: 600,
        sight: 2,
        directions: 32,
        crusher: true,
        tiberium: 0,
        deathAnimation: 'fball1',
        spriteImages: [{
          name: 'move',
          count: 32
        }, {
          name: 'harvest-0',
          count: 4
        }, {
          name: 'harvest-4',
          count: 4
        }, {
          name: 'harvest-8',
          count: 4
        }, {
          name: 'harvest-12',
          count: 4
        }, {
          name: 'harvest-16',
          count: 4
        }, {
          name: 'harvest-20',
          count: 4
        }, {
          name: 'harvest-24',
          count: 4
        }, {
          name: 'harvest-28',
          count: 4
        }],
        pixelOffsetX: -24,
        pixelOffsetY: -24,
        selectOffsetX: -12,
        selectOffsetY: -14,
        pixelHeight: 48,
        pixelWidth: 48,
        softCollisionRadius: 8,
        hardCollisionRadius: 4,
        processOrders: function () {
          this.lifeCode = getLifeCode(this)
          if (this.lifeCode == 'dead') {
            game.remove(this)
            game.add({
              type: 'effects',
              name: this.deathAnimation,
              x: this.x,
              y: this.y
            })
            if (explosionSound[this.deathAnimation]) {
              sounds.play(explosionSound[this.deathAnimation])
            }
            game.kills[this.attackedBy]++
            game.deaths[this.player]++
            return
          }
          this.lastMovementX = 0
          this.lastMovementY = 0
          switch (this.orders.type) {
            case 'stand':
              this.action = 'move'
              break
            case 'move':
              this.action = 'move'
              if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.2) {
                this.orders = {
                  type: 'stand'
                }
              } else {
                this.moveTo(this.orders.to)
              }
              break
            case 'harvest':
              this.action = 'move'
              if (!this.orders.tiberium || this.orders.tiberium.stage <= 0) {
                this.orders.tiberium = this.findTiberiumInRange()
              }
              if (!this.orders.tiberium) {
                console.log('could not find any tiberium')
              }
              if (this.tiberium >= 10 || !this.orders.tiberium) {
                this.orders.type = 'harvest-return'
              }
              if (this.orders.tiberium) {
                if (Math.sqrt(Math.pow(this.orders.tiberium.cgX - this.x, 2) + Math.pow(this.orders.tiberium.cgY - this.y, 2)) < 1) {
                  var newDirection = findAngle({
                    x: this.orders.tiberium.cgX,
                    y: this.orders.tiberium.cgY
                  }, this, this.directions)
                  var harvestDirection = Math.floor(newDirection / 4) * 4 % this.directions
                  if (this.direction != harvestDirection) {
                    this.turnTo(harvestDirection)
                  } else {
                    this.action = 'harvest-' + harvestDirection
                  }
                } else {
                  var moved = this.moveTo({
                    x: this.orders.tiberium.cgX,
                    y: this.orders.tiberium.cgY
                  })
                  if (!moved) {
                    this.orders.tiberium = undefined
                    console.log('could not reach the tiberium')
                  }
                }
              }
              break
            case 'harvest-return':
              this.action = 'move'
              if (!this.orders.refinery || this.orders.refinery.player != this.player || this.orders.refinery.lifeCode == 'dead' || this.orders.refinery.lifeCode == 'ultra-damaged') {
                this.orders.refinery = this.findRefineryInRange()
              }
              if (this.orders.refinery && this.orders.refinery.lifeCode != 'ultra-damaged' && this.orders.refinery.lifeCode != 'dead' && this.orders.refinery.player == this.player) {
                var busy = this.orders.refinery.nextHarvester && this.orders.refinery.nextHarvester !== this
                var destination = {
                  x: this.orders.refinery.x + 0.5 + (busy ? 2 : 0),
                  y: this.orders.refinery.y + 2.5
                }
                if (this.tiberium > 0 && Math.sqrt(Math.pow(destination.x - this.x, 2) + Math.pow(destination.y - this.y, 2)) < 4 && !busy) {
                  if (!this.orders.refinery.nextHarvester) {
                    this.orders.refinery.nextHarvester = this
                  }
                }
                if (this.tiberium > 0 && Math.sqrt(Math.pow(destination.x - this.x, 2) + Math.pow(destination.y - this.y, 2)) < 1 && !busy) {
                  this.x = destination.x
                  this.y = destination.y
                  if (this.direction != 14) {
                    this.turnTo(14)
                  } else {
                    this.orders.refinery.orders = {
                      type: 'harvest',
                      harvester: this
                    }
                    game.remove(this)
                  }
                } else {
                  this.moveTo(destination)
                }
              } else {
                this.orders.refinery = undefined
              }
              break
          }
          this.cgX = this.x
          this.cgY = this.y
        },
        findRefineryInRange: function () {
          var lastDistance
          var lastItem
          for (var i = 0; i < game.buildings.length; i++) {
            var item = game.buildings[i]
            if (item.name == 'refinery' && item.player == this.player && item.lifeCode != 'ultra-damaged' && item.lifeCode != 'dead') {
              var distance = Math.pow(item.cgX - this.x, 2) + Math.pow(item.y - this.y, 2)
              if (!lastItem || lastDistance > distance) {
                lastDistance = distance
                lastItem = item
              }
            }
          }
          return lastItem
        },
        findTiberiumInRange: function () {
          var lastDistance
          var lastItem
          for (var i = 0; i < game.tiberium.length; i++) {
            var item = game.tiberium[i]
            var distance = Math.pow(item.cgX - this.x, 2) + Math.pow(item.cgY - this.y, 2)
            if (!lastItem || lastDistance > distance) {
              lastDistance = distance
              lastItem = item
            }
          }
          return lastItem
        },
        animate: function () {
          if (this.lifeCode !== 'dead') {
            this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
            this.imageList = this.spriteArray[this.action]
            if (this.action == 'move') {
              this.imageOffset = this.imageList.offset + wrapDirection(Math.round(this.direction), this.directions)
            } else {
              if (!this.imageList) {
                console.log(this)
              }
              this.imageOffset = this.imageList.offset + this.animationIndex
              this.animationIndex++
              if (this.animationIndex >= this.imageList.count) {
                this.animationIndex = 0
                this.orders.tiberium.stage--
                this.tiberium++
                if (this.orders.tiberium.stage <= 0) {
                  this.orders.tiberium = undefined
                }
              }
            }
          }
          this.damageSmoke()
        }
      },
      mcv: {
        name: 'mcv',
        label: 'Mobile Construction Vehicle',
        dependency: ['weapons-factory|airstrip', 'advanced-communications-tower|temple-of-nod'],
        constructedIn: ['weapons-factory', 'airstrip'],
        owner: 'both',
        speed: 12,
        turnSpeed: 5,
        armor: 2,
        cost: 5e3,
        crusher: true,
        deathAnimation: 'frag3',
        sight: 2,
        hitPoints: 600,
        directions: 32,
        spriteImages: [{
          name: 'move',
          count: 32
        }],
        pixelOffsetX: -24,
        pixelOffsetY: -24,
        selectOffsetX: -12,
        selectOffsetY: -14,
        pixelHeight: 48,
        pixelWidth: 48,
        softCollisionRadius: 12,
        hardCollisionRadius: 8,
        animate: function () {
          this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
          this.imageList = this.spriteArray['move']
          this.imageOffset = this.imageList.offset + wrapDirection(Math.round(this.direction), this.directions)
          this.damageSmoke()
        }
      }
    },
    defaults: {
      action: 'move',
      orders: {
        type: 'stand'
      },
      direction: 4,
      turretDirection: 4,
      animationIndex: 0,
      selected: false,
      path: undefined,
      lastMovementX: 0,
      lastMovementY: 0,
      spriteSheet: undefined,
      findEnemyInRange: findEnemyInRange,
      canAttackEnemy: canAttackEnemy,
      checkCollision: checkCollision,
      moveTo: moveTo,
      z: 0,
      damageSmoke: function () {
        if (this.name == 'stealth-tank') {
          return
        }
        if (this.lifeCode == 'damaged' || this.lifeCode == 'ultra-damaged') {
          if (!this.smoke || this.smoke.lifeCode == 'dead') {
            this.smoke = game.add({
              name: 'smoke',
              type: 'effects',
              x: this.x,
              y: this.y,
              loop: 60
            })
          }
          this.smoke.x = this.x
          this.smoke.y = this.y
          this.smoke.lastMovementX = this.lastMovementX
          this.smoke.lastMovementY = this.lastMovementY
        } else {
          if (this.smoke) {
            game.remove(this.smoke)
          }
        }
      },
      stealthCloak: function () {
        if (!this.cloaked) {
          if (this.cloakTimeout > 0) {
            this.cloakTimeout--
          } else {
            this.action = 'cloak'
            this.cloakTimeout = 20
          }
        }
      },
      stealthUncloak: function () {
        this.action = 'uncloak'
        this.cloakTimeout = 20
      },
      processOrders: function () {
        this.lifeCode = getLifeCode(this)
        if (this.lifeCode == 'dead') {
          game.remove(this)
          game.add({
            type: 'effects',
            name: this.deathAnimation,
            x: this.x,
            y: this.y
          })
          if (explosionSound[this.deathAnimation]) {
            sounds.play(explosionSound[this.deathAnimation])
          }
          game.kills[this.attackedBy]++
          return
        }
        if (this.attacked) {
          this.attacked = false
          if (this.name == 'stealth-tank') {
            this.stealthUncloak()
          }
        }
        var enemy
        this.lastMovementX = 0
        this.lastMovementY = 0
        this.firing = false
        if (this.name == 'mcv') {
          this.canBuildHere = true
          if (this.selected && this.player == game.player && this === mouse.objectUnderMouse) {
            var buildingType = buildings.list['construction-yard']
            var grid = buildingType.gridBuild
            var thisy = Math.floor(this.y) - 1
            var thisx = Math.floor(this.x) - 1
            for (var y = 0; y < grid.length; y++) {
              for (var x = 0; x < grid[y].length; x++) {
                if (grid[y][x] == 1) {
                  if (!this.canBuildHere) {
                    break
                  }
                  if (thisy + y < 0 || thisy + y >= game.foggedBuildableGrid.length || thisx + x < 0 || thisx + x >= game.foggedBuildableGrid[thisy + y].length || game.foggedBuildableGrid[thisy + y][thisx + x] !== 0) {
                    this.canBuildHere = false
                    break
                  }
                }
              }
            }
          }
        }
        if (this.weapon && this.weapon.cooldown > 0) {
          this.weapon.cooldown--
          if (this.name == 'ssm-launcher') {
            if (this.ammunition == 0 && this.weapon.cooldown == 0) {
              this.ammunition = 2
              this.weapon.cooldown = this.weapon.rateOfFire
            }
          }
        }
        if (this.weapon2 && this.weapon2.cooldown > 0) {
          this.weapon2.cooldown--
        }
        if (this.name == 'mobile-rocket-launch-system') {
          this.action = 'move'
        }
        switch (this.orders.type) {
          case 'guard':
          case 'hunt':
            if (this.name == 'apc') {
              this.action = 'move'
            }
          case 'stand':
            if (this.primaryWeapon) {
              enemy = this.findEnemyInRange()
              if (enemy) {
                this.orders = {
                  type: 'attack',
                  to: enemy,
                  lastOrder: this.orders
                }
              }
              if (this.name == 'stealth-tank') {
                this.stealthCloak()
              }
            }
            break
          case 'patrol':
            if (this.name == 'apc') {
              this.action = 'move'
            }
            if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.2) {
              this.orders = {
                type: 'patrol',
                from: this.orders.to,
                to: this.orders.from
              }
            } else {
              this.moveTo(this.orders.to)
            }
            if (this.primaryWeapon) {
              enemy = this.findEnemyInRange()
              if (enemy) {
                this.orders = {
                  type: 'attack',
                  to: enemy,
                  lastOrder: this.orders
                }
              }
              if (this.name == 'stealth-tank') {
                this.stealthCloak()
              }
            }
            this.orders = {
              type: 'attack',
              to: enemy,
              lastOrder: this.orders
            }
            break
          case 'move':
            if (this.name == 'apc') {
              this.action = 'move'
            } else if (this.name == 'stealth-tank') {
              this.stealthCloak()
            }
            if (Math.sqrt(Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2)) < 0.2) {
              this.orders = {
                type: 'stand'
              }
            } else {
              var moved = this.moveTo(this.orders.to)
              if (!this.autoRotatingTurret && this.turretDirection != Math.floor(this.direction)) {
                this.aimTo(Math.floor(this.direction))
              }
              if (!moved) {
                this.orders = {
                  type: 'stand'
                }
              }
            }
            break
          case 'attack':
            if (this.name == 'apc') {
              this.action = 'move'
            } else if (this.name == 'stealth-tank') {
              this.stealthCloak()
            }
            if (!this.orders.to || this.orders.to.lifeCode == 'dead' || this.orders.to.player == this.player || !this.canAttackEnemy(this.orders.to)) {
              if (this.orders.lastOrder) {
                this.orders = this.orders.lastOrder
              } else {
                this.orders = {
                  type: 'guard'
                }
              }
              return
            }
            var newDirection = findAngle(this.orders.to, this, this.directions)
            if (this.hasTurret) {
              if (newDirection != this.turretDirection) {
                this.aimTo(newDirection)
              }
            }
            if (Math.pow(this.orders.to.cgX - this.x, 2) + Math.pow(this.orders.to.cgY - this.y, 2) < Math.pow(this.weapon.range + this.orders.to.hardCollisionRadius / game.gridSize - 1, 2)) {
              if (this.hasTurret) {
                if (newDirection != this.turretDirection) {
                  this.aimTo(newDirection)
                } else {
                  if (this.name == 'mobile-rocket-launch-system') {
                    this.action = 'attack'
                  }
                  if (this.name == 'mammoth-tank') {
                    if (this.orders.to.type == 'infantry' || this.orders.to.type == 'aircraft') {
                      if (this.weapon2.cooldown <= 0) {
                        this.weapon2.fire(this, Math.floor(this.turretDirection), this.orders.to)
                      }
                    } else {
                      if (this.weapon.cooldown <= 0) {
                        this.weapon.fire(this, Math.floor(this.turretDirection), this.orders.to)
                      }
                    }
                  } else {
                    if (this.weapon.cooldown <= 0) {
                      if (this.name == 'ssm-launcher') {
                        if (this.ammunition > 0) {
                          this.ammunition--
                          this.weapon.fire(this, Math.floor(this.turretDirection), this.orders.to)
                        }
                      } else {
                        this.weapon.fire(this, Math.floor(this.turretDirection), this.orders.to)
                      }
                    }
                  }
                }
              } else {
                if (newDirection != this.direction) {
                  this.turnTo(newDirection)
                } else {
                  if (this.name == 'stealth-tank') {
                    this.stealthUncloak()
                    if (this.alpha == 1 && this.weapon.cooldown <= 0) {
                      this.weapon.fire(this, Math.floor(this.direction), this.orders.to)
                    }
                  } else {
                    if (this.weapon.cooldown <= 0) {
                      this.weapon.fire(this, Math.floor(this.direction), this.orders.to)
                    }
                  }
                }
              }
            } else {
              this.moveTo(this.orders.to)
            }
            break
          case 'load':
            if (this.cargo.length == this.maxCargo) {
              this.orders.type == 'stand'
              this.action = 'close'
              break
            }
            var newDirection
            if (Math.abs(angleDiff(28, this.direction, this.directions)) < Math.abs(angleDiff(4, this.direction, this.directions))) {
              newDirection = 28
            } else {
              newDirection = 4
            }
            if (this.direction != newDirection) {
              this.turnTo(newDirection)
            } else {
              this.action = 'load'
              this.orders.type = 'stand'
            }
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
            var newDirection
            if (Math.abs(angleDiff(28, this.direction, this.directions)) < Math.abs(angleDiff(4, this.direction, this.directions))) {
              newDirection = 28
            } else {
              newDirection = 4
            }
            if (this.direction != newDirection) {
              this.turnTo(newDirection)
            } else {
              this.action = 'load'
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
            break
          case 'deploy':
            if (this.direction != 14) {
              this.turnTo(14)
            } else {
              if (!this.canBuildHere) {
                if (game.player === this.player) {
                  sounds.play('cannot_deploy_here')
                }
                this.orders = {
                  type: 'stand'
                }
                return
              }
              game.remove(this)
              game.add({
                name: 'construction-yard',
                type: 'buildings',
                x: Math.floor(this.x) - 1,
                y: Math.floor(this.y) - 1,
                action: 'build',
                team: this.team,
                player: this.player,
                percentLife: this.life / this.hitPoints
              })
              if (game.player === this.player) {
                sounds.play('construction')
              }
            }
            break
        }
        this.cgX = this.x
        this.cgY = this.y
      },
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
        if (this.name == 'apc') {
          game.foregroundContext.beginPath()
          game.foregroundContext.fillStyle = 'lightyellow'
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
        this.interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
        var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth + this.pixelOffsetX || y < -this.pixelHeight + this.pixelOffsetY || x > game.viewportWidth + this.pixelWidth - this.pixelOffsetX || y > game.viewportHeight + this.pixelHeight - this.pixelOffsetY) {
          return
        }
        game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY, this.pixelWidth, this.pixelHeight)
        if (this.hasTurret) {
          game.foregroundContext.drawImage(this.spriteCanvas, this.turretImageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x + this.pixelOffsetX, y + this.pixelOffsetY - 3, this.pixelWidth, this.pixelHeight)
        }
        if (this.selected) {
          this.drawSelection()
        }
      },
      animate: function () {
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        this.imageList = this.spriteArray['move']
        this.imageOffset = this.imageList.offset + Math.floor(this.direction)
        if (this.name == 'stealth-tank') {
          if (this.action == 'cloak') {
            if (this.alpha == 1) {
              sounds.play('stealth-tank-disappear')
            }
            if (this.alpha > 0) {
              this.alpha -= 1 / 8
            } else {
              this.cloaked = true
            }
          } else if (this.action == 'uncloak') {
            if (this.alpha <= 0) {
              sounds.play('stealth-tank-appear')
            }
            this.cloaked = false
            if (this.alpha < 1) {
              this.alpha += 1 / 8
            }
          }
        }
        if (this.hasTurret) {
          if (this.autoRotatingTurret) {
            this.turretDirection = wrapDirection(this.turretDirection + 1, this.directions)
          }
          if (this.name == 'ssm-launcher') {
            this.turretImageList = this.spriteArray['turret-' + this.ammunition]
          } else if (this.name == 'mobile-rocket-launch-system') {
            if (this.action == 'attack') {
              this.turretImageList = this.spriteArray['turret-high']
            } else {
              this.turretImageList = this.spriteArray['turret-low']
            }
          } else {
            this.turretImageList = this.spriteArray['turret']
          }
          this.turretImageOffset = this.turretImageList.offset + Math.floor(this.turretDirection)
        }
        this.damageSmoke()
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
      },
      aimTo: function (toDirection) {
        if (toDirection > this.turretDirection && toDirection - this.turretDirection < this.directions / 2 || toDirection < this.turretDirection && this.turretDirection - toDirection > this.directions / 2) {
          this.turretDirection++
        } else {
          this.turretDirection--
        }
        if (this.turretDirection > this.directions - 1) {
          this.turretDirection = 0
        } else if (this.turretDirection < 0) {
          this.turretDirection = this.directions - 1
        }
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      if (name == 'apc') {
        item.cargo = []
      }
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      $.extend(item, details)
      if (item.primaryWeapon) {
        item.weapon = weapons.add({
          name: item.primaryWeapon
        })
      }
      if (item.secondaryWeapon) {
        item.weapon2 = weapons.add({
          name: item.secondaryWeapon
        })
      }
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
      item.selectImage = loader.loadImage('images/' + 'sidebar/select-1-1.png')
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