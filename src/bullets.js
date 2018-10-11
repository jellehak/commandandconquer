var bullets = {
    type: 'bullets',
    list: {
      invisiblesniper: {
        name: 'invisiblesniper',
        explosion: 'piff',
        warhead: 'hollowpoint'
      },
      invisible: {
        name: 'invisible',
        explosion: 'piff',
        warhead: 'smallarms'
      },
      cannon: {
        name: 'cannon',
        explosion: 'vehhit3',
        warhead: 'armorpiercing',
        rotationSpeed: 0,
        bulletSpeed: 100,
        count: 1,
        innacurate: false,
        smokeTrail: false,
        image: '120mm',
        directions: 32,
        pixelWidth: 24,
        pixelHeight: 24
      },
      ballistic: {
        name: 'ballistic',
        explosion: 'art-exp1',
        warhead: 'highexplosive',
        ballisticCurve: true,
        rotationSpeed: 0,
        bulletSpeed: 30,
        count: 1,
        delay: 6,
        innacurate: true,
        smokeTrail: false,
        image: '120mm',
        directions: 32,
        pixelWidth: 24,
        pixelHeight: 24
      },
      heatseeker2: {
        name: 'heatseeker2',
        explosion: 'frag1',
        rotationSpeed: 5,
        bulletSpeed: 60,
        inaccurate: true,
        smokeTrail: true,
        image: 'dragon',
        directions: 32,
        count: 1,
        warhead: 'highexplosive',
        pixelWidth: 15,
        pixelHeight: 15
      },
      heatseeker3: {
        name: 'heatseeker3',
        explosion: 'frag1',
        rotationSpeed: 7,
        bulletSpeed: 60,
        inaccurate: true,
        smokeTrail: true,
        image: 'dragon',
        directions: 32,
        count: 1,
        warhead: 'highexplosive',
        pixelWidth: 15,
        pixelHeight: 15
      },
      bigheatseeker: {
        name: 'bigheatseeker',
        explosion: 'vehhit1',
        rotationSpeed: 10,
        bulletSpeed: 100,
        inaccurate: false,
        smokeTrail: true,
        image: 'missile',
        directions: 32,
        count: 32,
        warhead: 'armorpiercing',
        pixelWidth: 15,
        pixelHeight: 15
      },
      flameburst: {
        name: 'flameburst',
        warhead: 'fire',
        bulletSpeed: 40
      },
      chemburst: {
        name: 'chemburst',
        warhead: 'highexplosive',
        bulletSpeed: 40
      },
      bomblet: {
        name: 'bomblet',
        explosion: 'napalm2',
        warhead: 'fire',
        bulletSpeed: 12,
        count: 7,
        innacurate: false,
        smokeTrail: false,
        image: 'bomblet',
        pixelWidth: 7,
        pixelHeight: 7,
        lastMovementX: 0,
        lastMovementY: 0,
        animate: function () {
          if (this.delay) {
            this.delay--
          }
          var x, y
          if (this.count) {
            this.offsetIndex++
            if (this.offsetIndex >= this.count) {
              this.offsetIndex = 0
            }
          } else {
            this.offsetIndex = 0
          }
          this.z -= 1 / 16
          if (this.z <= 0) {
            for (var i = game.attackableItems.length - 1; i >= 0; i--) {
              var item = game.attackableItems[i]
              if (item.indestructible) {
                continue
              }
              var itemX = item.cgX
              var itemY = item.cgY
              if (Math.floor(itemX - this.x) < 3 && Math.floor(itemY - this.y) < 3) {
                var leastDistance = Math.pow(Math.pow(itemX - this.x, 2) + Math.pow(itemY - this.y, 2), 0.5) * game.gridSize
                if (leastDistance > item.softCollisionRadius) {
                  leastDistance -= item.softCollisionRadius
                }
                var damage = this.weapon.damage * warheads[this.warhead].damageVersusArmor[item.armor] / 100
                var damageFactor = Math.pow(0.5, Math.floor(leastDistance / warheads[this.warhead].spread))
                if (damageFactor > 0.125) {
                  item.life -= item.prone ? damage * damageFactor / 2 : damage * damageFactor
                  if (item.life <= 0) {
                    item.life = 0
                  }
                  item.attacked = true
                  game.attackedPlayers[item.player] = true
                  item.attackedBy = this.from
                  if (item.type == 'infantry') {
                    item.infantryDeath = warheads[this.warhead].infantryDeath
                  }
                }
              }
            }
            game.remove(this)
            if (this.explosion) {
              game.add({
                type: 'effects',
                name: this.explosion,
                x: this.x,
                y: this.y - this.z
              })
            }
            if (explosionSound[this.explosion]) {
              sounds.play(explosionSound[this.explosion])
            }
          }
        }
      },
      bomb: {
        name: 'bomb',
        explosion: 'vehhit2',
        warhead: 'highexplosive',
        bulletSpeed: 20,
        ballisticCurve: true,
        image: 'bomb',
        count: 8,
        directions: 32,
        inaccurate: true,
        smokeTrail: false,
        pixelWidth: 8,
        pixelHeight: 8
      },
      heatseeker: {
        name: 'heatseeker',
        explosion: 'vehhit2',
        rotationSpeed: 5,
        bulletSpeed: 60,
        inaccurate: false,
        smokeTrail: true,
        image: 'dragon',
        directions: 32,
        count: 32,
        warhead: 'armorpiercing',
        pixelWidth: 15,
        pixelHeight: 15
      },
      flamemissile: {
        name: 'flamemissile',
        explosion: 'napalm3',
        rotationSpeed: 10,
        bulletSpeed: 40,
        inaccurate: false,
        smokeTrail: true,
        image: 'missile',
        directions: 32,
        count: 32,
        warhead: 'fire',
        pixelWidth: 15,
        pixelHeight: 15
      },
      invisibleheavy: {
        name: 'invisibleheavy',
        explosion: 'piffpiff',
        warhead: 'highexplosive'
      },
      atombomb: {
        name: 'atombomb',
        warhead: 'nuke',
        image: 'atombomb',
        explosion: 'atomsfx',
        bulletSpeed: 100,
        animationIndex: 0,
        animationCount: 4,
        pixelWidth: 48,
        pixelHeight: 48,
        direction: 1,
        animate: function () {
          this.animationIndex++
          if (this.animationIndex >= this.animationCount) {
            this.animationIndex = 0
          }
          var movement = this.bulletSpeed / game.gridSize / game.speedAdjustmentFactor
          this.lastMovementX = 0
          if (this.direction == 1) {
            this.offsetIndex = this.animationCount + this.animationIndex
            this.z += movement
            this.lastMovementY = -movement
            if (this.z > 40) {
              this.direction = -1
              this.x = this.target.x
              this.y = this.target.y
              sounds.play('nuclear_warhead_approaching')
            }
          } else {
            this.offsetIndex = this.animationIndex
            this.z -= movement
            this.lastMovementY = movement
            if (this.z <= 0) {
              for (var i = game.attackableItems.length - 1; i >= 0; i--) {
                var item = game.attackableItems[i]
                if (item.indestructible) {
                  continue
                }
                var itemX = item.cgX
                var itemY = item.cgY
                if (Math.floor(itemX - this.x) < 3 && Math.floor(itemY - this.y) < 3) {
                  var leastDistance = Math.sqrt(Math.pow(itemX - this.x, 2) + Math.pow(itemY - this.y, 2)) * game.gridSize
                  if (leastDistance > item.softCollisionRadius) {
                    leastDistance -= item.softCollisionRadius
                  }
                  var damage = 1e3 * warheads[this.warhead].damageVersusArmor[item.armor] / 100
                  var damageFactor = Math.pow(0.5, Math.floor(leastDistance / warheads[this.warhead].spread))
                  if (damageFactor > 0.125) {
                    item.life -= item.prone ? damage * damageFactor / 2 : damage * damageFactor
                    if (item.life < 0) {
                      item.life = 0
                    }
                    item.attacked = true
                    game.attackedPlayers[item.player] = true
                    item.attackedBy = this.from
                    if (item.type == 'infantry') {
                      item.infantryDeath = warheads[this.warhead].infantryDeath
                    }
                  }
                }
              }
              if (explosionSound[this.explosion]) {
                sounds.play(explosionSound[this.explosion])
              }
              game.remove(this)
              var bomb = this
              game.add({
                type: 'effects',
                name: this.explosion,
                x: this.x,
                y: this.y,
                oncomplete: function () {}
              })
            }
          }
        },
        draw: function () {
          this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
          this.interpolatedY = this.y - this.z + game.movementInterpolationFactor * this.lastMovementY
          var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft - this.pixelWidth / 2
          var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop - this.pixelHeight / 2
          if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth + this.pixelHeight || y > game.viewportHeight + this.pixelHeight) {
            return
          }
          game.foregroundContext.drawImage(this.spriteSheet, this.offsetIndex * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        }
      },
      lasershot: {
        name: 'lasershot',
        explosion: undefined,
        warhead: 'super',
        rotationSpeed: 0,
        bulletSpeed: undefined,
        inaccurate: false,
        smokeTrail: false,
        animate: function () {
          if (this.delay) {
            this.delay--
          }
          var thisX = this.x
          var thisY = this.y
          var targetX = this.target.cgX
          var targetY = this.target.cgY
          this.x = targetX
          this.y = targetY
          for (var i = game.attackableItems.length - 1; i >= 0; i--) {
            var item = game.attackableItems[i]
            if (item.indestructible) {
              continue
            }
            var itemX = item.cgX
            var itemY = item.cgY
            if (Math.floor(itemX - this.x) < 3 && Math.floor(itemY - this.y) < 3) {
              var leastDistance = Math.pow(Math.pow(itemX - this.x, 2) + Math.pow(itemY - this.y, 2), 0.5) * game.gridSize
              if (leastDistance > item.softCollisionRadius) {
                leastDistance -= item.softCollisionRadius
              }
              var damage = this.weapon.damage * warheads[this.warhead].damageVersusArmor[item.armor] / 100
              var damageFactor = Math.pow(0.5, Math.floor(leastDistance / warheads[this.warhead].spread))
              if (damageFactor > 0.125) {
                item.life -= item.prone ? damage * damageFactor / 2 : damage * damageFactor
                item.attacked = true
                game.attackedPlayers[item.player] = true
                item.attackedBy = this.from
                if (item.life < 0) {
                  item.life = 0
                }
                if (item.type == 'infantry') {
                  item.infantryDeath = warheads[this.warhead].infantryDeath
                }
              }
            }
          }
          game.remove(this)
          game.add({
            type: 'effects',
            name: 'laser-fire',
            x: thisX + 0.4,
            y: thisY + 0.4,
            targetX: targetX,
            targetY: targetY
          })
        }
      },
      ioncannon: {
        name: 'ioncannon',
        warhead: 'ioncannon',
        animate: function () {
          if (this.delay) {
            this.delay--
          }
          for (var i = game.attackableItems.length - 1; i >= 0; i--) {
            var item = game.attackableItems[i]
            if (item.indestructible) {
              continue
            }
            var itemX = item.cgX
            var itemY = item.cgY
            if (Math.floor(itemX - this.x) < 3 && Math.floor(itemY - this.y) < 3) {
              var leastDistance = Math.pow(Math.pow(itemX - this.x, 2) + Math.pow(itemY - this.y, 2), 0.5) * game.gridSize
              if (leastDistance > item.softCollisionRadius) {
                leastDistance -= item.softCollisionRadius
              }
              var damage = 750 * warheads[this.warhead].damageVersusArmor[item.armor] / 100
              var damageFactor = Math.pow(0.5, Math.floor(leastDistance / warheads[this.warhead].spread))
              if (damageFactor > 0.125) {
                item.life -= item.prone ? damage * damageFactor / 2 : damage * damageFactor
                if (item.life < 0) {
                  item.life = 0
                }
                item.attacked = true
                game.attackedPlayers[item.player] = true
                item.attackedBy = this.from
                if (item.type == 'infantry') {
                  item.infantryDeath = warheads[this.warhead].infantryDeath
                }
              }
            }
          }
          game.remove(this)
        }
      }
    },
    defaults: {
      direction: 0,
      distanceTravelled: 0,
      z: 0,
      delay: 2,
      offsetIndex: 0,
      animate: function () {
        if (this.delay) {
          this.delay--
        }
        var x, y
        x = this.target.cgX || this.target.x
        y = this.target.cgY || this.target.y
        this.lastMovementY = 0
        this.lastMovementX = 0
        if (this.rotationSpeed) {
          newDirection = findAngle({
            x: x,
            y: y
          }, this, this.directions)
          var turnDirection = angleDiff(this.direction, newDirection, this.directions)
          if (turnDirection) {
            var turnAmount = turnDirection / Math.abs(turnDirection) * this.rotationSpeed / 10
            this.direction = wrapDirection(this.direction + turnAmount, this.directions)
          }
          this.offsetIndex = Math.floor(this.direction)
        } else {
          if (this.count) {
            this.offsetIndex++
            if (this.offsetIndex >= this.count) {
              this.offsetIndex = 0
            }
          } else {
            this.offsetIndex = 0
          }
        }
        var bulletHasReached = false
        if (!this.bulletSpeed) {
          bulletHasReached = true
          this.x = x
          this.y = y
        } else {
          if (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) < 0.4 && this.z == this.target.z) {
            bulletHasReached = true
          }
        }
        if (this.bulletSpeed && !bulletHasReached) {
          var movement = this.bulletSpeed / game.gridSize / game.speedAdjustmentFactor
          var angleRadians = this.direction / this.directions * 2 * Math.PI
          var deltaZ = 0
          if (this.ballisticCurve) {
            var time = this.distanceTravelled / movement
            var g = movement * movement / this.peakDistance
            var v = movement
            deltaZ = v - g * time
          } else if (this.target.z > this.z) {
            deltaZ = 1 / 8
          } else if (this.target.z < this.z) {
            deltaZ = -1 / 8
          }
          this.z += deltaZ
          this.lastMovementX = -movement * Math.sin(angleRadians)
          this.lastMovementY = -movement * Math.cos(angleRadians)
          var newX = this.x + this.lastMovementX
          var newY = this.y + this.lastMovementY
          this.lastMovementY -= deltaZ
          this.distanceTravelled += movement
          this.targetDistance -= movement
          if (this.smokeTrail && !this.delay) {
            game.add({
              type: 'effects',
              name: 'smokey',
              x: this.x,
              y: this.y - this.z
            })
          }
          this.x = newX
          this.y = newY
        }
        if (bulletHasReached || this.targetDistance < 0) {
          for (var i = game.attackableItems.length - 1; i >= 0; i--) {
            var item = game.attackableItems[i]
            if (item.indestructible) {
              continue
            }
            var itemX = item.cgX
            var itemY = item.cgY
            if (Math.floor(itemX - this.x) < 3 && Math.floor(itemY - this.y) < 3) {
              var leastDistance = Math.pow(Math.pow(itemX - this.x, 2) + Math.pow(itemY - this.y, 2), 0.5) * game.gridSize
              if (leastDistance > item.softCollisionRadius) {
                leastDistance -= item.softCollisionRadius
              }
              var damage = this.weapon.damage * warheads[this.warhead].damageVersusArmor[item.armor] / 100
              var damageFactor = Math.pow(0.5, Math.floor(leastDistance / warheads[this.warhead].spread))
              if (damageFactor > 0.125) {
                item.life -= item.prone ? damage * damageFactor / 2 : damage * damageFactor
                if (item.life <= 0) {
                  item.life = 0
                  if (this.name == 'invisiblesniper' && this.from == game.player && item.type == 'infantry') {
                    setTimeout(function () {
                      sounds.play('commando_killed')
                    }, 600)
                  }
                }
                item.attacked = true
                game.attackedPlayers[item.player] = true
                item.attackedBy = this.from
                if (item.type == 'infantry') {
                  item.infantryDeath = warheads[this.warhead].infantryDeath
                }
              }
            }
          }
          game.remove(this)
          if (this.explosion) {
            game.add({
              type: 'effects',
              name: this.explosion,
              x: this.x,
              y: this.y - this.z
            })
          }
          if (explosionSound[this.explosion]) {
            sounds.play(explosionSound[this.explosion])
          }
        }
      },
      draw: function () {
        if (this.delay) {
          return
        }
        if (this.image) {
          this.interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
          this.interpolatedY = this.y - this.z + game.movementInterpolationFactor * this.lastMovementY
          var x = Math.round(this.interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft - this.pixelWidth / 2
          var y = Math.round(this.interpolatedY * game.gridSize) - game.viewportY + game.viewportTop - this.pixelHeight / 2
          if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth + this.pixelWidth || y > game.viewportHeight + this.pixelHeight) {
            return
          }
          game.foregroundContext.drawImage(this.spriteSheet, this.offsetIndex * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        }
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      $.extend(item, details)
      if (details.target) {
        var target = details.target
        var targetEnemy = Math.pow(Math.pow(item.x - target.cgX, 2) + Math.pow(item.y - target.cgY, 2), 0.5) + 1
        item.target = target
        if (!item.targetDistance || targetEnemy < item.targetDistance) {
          item.targetDistance = targetEnemy
        }
      }
      return item
    },
    load: function (name) {
      var item = this.list[name]
      if (item.spriteSheet) {
        return
      }
      item.name = name
      item.type = this.type
      if (item.image) {
        item.spriteSheet = loader.loadImage('images/' + this.type + '/' + item.image + '-sprite-sheet.png')
      }
    },
    loadAll: function () {
      var names = Object.keys(this.list).sort()
      for (var i = names.length - 1; i >= 0; i--) {
        this.load(names[i])
      }
    }
  }