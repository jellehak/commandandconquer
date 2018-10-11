var weapons = {
    list: {
      sniper: {
        name: 'sniper',
        damage: 125,
        projectile: 'invisiblesniper',
        rateOfFire: 40,
        range: 5.5,
        sound: 'ramgun2'
      },
      chaingun: {
        name: 'chaingun',
        projectile: 'invisibleheavy',
        damage: 25,
        rateOfFire: 50,
        range: 4,
        sound: 'gun8',
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            targetDistance: this.range,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      pistol: {
        name: 'pistol',
        damage: 1,
        rateOfFire: 7,
        range: 1.75,
        sound: 'gun18',
        muzzleFlash: undefined,
        projectile: 'invisible'
      },
      m16: {
        name: 'm16',
        damage: 8,
        projectile: 'invisible',
        rateOfFire: 20,
        range: 2,
        sound: 'mgun2',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      rocket: {
        name: 'rocket',
        projectile: 'heatseeker',
        damage: 30,
        rateOfFire: 60,
        secondaryRateOfFire: 10,
        range: 4,
        sound: 'rocket',
        muzzleFlash: undefined,
        canAttackAir: true,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          var directionConverted = from.name == 'bazooka' ? direction * 4 : direction
          var height = from.name == 'orca' ? 3 / 4 : 1 / 4
          var weapon = this
          var turretXOffset = 0
          var turretYOffset = 0
          game.add({
            type: 'bullets',
            targetDistance: weapon.range,
            name: weapon.projectile,
            x: from.x + turretXOffset,
            y: from.y + turretYOffset,
            z: height,
            direction: directionConverted,
            target: target,
            weapon: weapon,
            from: from.player,
            delay: 5
          })
          sounds.play(weapon.sound)
        }
      },
      infantryflamer: {
        name: 'infantryflamer',
        projectile: 'flameburst',
        damage: 35,
        rateOfFire: 50,
        range: 2,
        sound: 'flamer2',
        muzzleFlash: 'flame',
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            targetDistance: this.range,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          if (this.muzzleFlash) {
            game.add({
              type: 'effects',
              name: this.muzzleFlash,
              direction: direction,
              x: from.x,
              y: from.y,
              z: 0,
              weapon: this
            })
          }
          sounds.play(this.sound)
        }
      },
      tankflamer: {
        name: 'tankflamer',
        projectile: 'flameburst',
        damage: 50,
        rateOfFire: 50,
        secondaryRateOfFire: 10,
        range: 2,
        sound: 'flamer2',
        muzzleFlash: 'flame',
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            targetDistance: this.range,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          if (this.muzzleFlash) {
            game.add({
              type: 'effects',
              name: this.muzzleFlash,
              direction: wrapDirection(Math.round(direction / 4), 8),
              x: from.x,
              y: from.y,
              z: -1 / 8,
              weapon: this
            })
          }
          sounds.play(this.sound)
        }
      },
      chemspray: {
        name: 'chemspray',
        projectile: 'chemburst',
        damage: 80,
        rateOfFire: 70,
        range: 2,
        sound: 'flamer2',
        muzzleFlash: 'chem',
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            targetDistance: this.range,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          if (this.muzzleFlash) {
            game.add({
              type: 'effects',
              name: this.muzzleFlash,
              direction: direction,
              x: from.x,
              y: from.y,
              z: 0,
              weapon: this
            })
          }
          sounds.play(this.sound)
        }
      },
      grenade: {
        name: 'grenade',
        projectile: 'bomb',
        damage: 50,
        rateOfFire: 60,
        range: 3.25,
        sound: 'toss',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          var fireDirection = findAngle(target, from, 32)
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          var weapon = this
          var turretXOffset = 0
          var turretYOffset = 0
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            peakDistance: fireDistance / 2,
            name: weapon.projectile,
            x: from.x + turretXOffset,
            y: from.y + turretYOffset,
            direction: fireDirection,
            target: target,
            weapon: weapon,
            from: from.player
          })
          sounds.play(weapon.sound)
        }
      },
      lightcannon: {
        name: 'lightcannon',
        projectile: 'cannon',
        damage: 25,
        rateOfFire: 60,
        range: 4,
        sound: 'tnkfire3',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          this.cooldown = this.rateOfFire
          from.firing = true
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          if (fireDistance > this.range) {
            fireDistance = this.range
          }
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            name: this.projectile,
            x: from.x,
            y: from.y,
            direction: direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      mediumcannon: {
        name: 'mediumcannon',
        projectile: 'cannon',
        damage: 30,
        rateOfFire: 50,
        range: 4.75,
        sound: 'tnkfire4',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          this.cooldown = this.rateOfFire
          from.firing = true
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          if (fireDistance > this.range) {
            fireDistance = this.range
          }
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            name: this.projectile,
            x: from.x,
            y: from.y,
            direction: direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      heavycannon: {
        name: 'heavycannon',
        projectile: 'cannon',
        damage: 40,
        rateOfFire: 80,
        secondaryRateOfFire: 5,
        range: 4.75,
        sound: 'tnkfire6',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          if (fireDistance > this.range) {
            fireDistance = this.range
          }
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            name: this.projectile,
            x: from.x,
            y: from.y,
            direction: direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      turretcannon: {
        name: 'turretcannon',
        projectile: 'cannon',
        damage: 40,
        rateOfFire: 60,
        range: 6,
        sound: 'tnkfire6',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          this.cooldown = this.rateOfFire
          from.firing = true
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          if (fireDistance > this.range) {
            fireDistance = this.range
          }
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            name: this.projectile,
            x: from.x + 0.5,
            y: from.y + 0.5,
            direction: direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      mammothtusk: {
        name: 'mammothtusk',
        projectile: 'heatseeker2',
        damage: 75,
        rateOfFire: 80,
        secondaryRateOfFire: 5,
        canAttackAir: true,
        range: 6,
        sound: 'rocket1',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          var weapon = this
          var turretXOffset = 0
          var turretYOffset = 0
          game.add({
            type: 'bullets',
            targetDistance: weapon.range,
            name: weapon.projectile,
            x: from.x + turretXOffset,
            y: from.y + turretYOffset,
            z: 1 / 2,
            direction: from.turretDirection,
            target: target,
            weapon: weapon,
            from: from.player
          })
          sounds.play(weapon.sound)
        }
      },
      mrlsmissile: {
        name: 'mrlsmissile',
        projectile: 'heatseeker3',
        damage: 75,
        rateOfFire: 80,
        secondaryRateOfFire: 10,
        range: 6,
        sound: 'rocket1',
        canAttackAir: true,
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          var weapon = this
          var turretXOffset = 0
          var turretYOffset = 0
          game.add({
            type: 'bullets',
            targetDistance: weapon.range,
            name: weapon.projectile,
            x: from.x + turretXOffset,
            y: from.y + turretYOffset,
            direction: from.turretDirection,
            target: target,
            weapon: weapon,
            from: from.player
          })
          sounds.play(weapon.sound)
        }
      },
      artilleryshell: {
        name: 'artilleryshell',
        projectile: 'ballistic',
        damage: 150,
        rateOfFire: 65,
        range: 6,
        sound: 'tnkfire2',
        muzzleFlash: undefined,
        fire: function (from, direction, target) {
          this.cooldown = this.rateOfFire
          from.firing = true
          var fireDistance = Math.sqrt(Math.pow((target.cgX || target.x) - from.x, 2) + Math.pow((target.cgY || target.y) - from.y, 2))
          if (fireDistance > this.range) {
            fireDistance = this.range
          }
          game.add({
            type: 'bullets',
            targetDistance: fireDistance,
            peakDistance: fireDistance / 2,
            name: this.projectile,
            x: from.x,
            y: from.y,
            direction: direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      machinegun: {
        name: 'machinegun',
        damage: 15,
        rateOfFire: 30,
        range: 4,
        sound: 'mgun11',
        muzzleFlash: undefined,
        projectile: 'invisible'
      },
      boatmissile: {
        name: 'boatmissile',
        projectile: 'heatseeker2',
        damage: 60,
        rateOfFire: 35,
        secondaryRateOfFire: 5,
        range: 7.5,
        sound: 'rocket2',
        muzzleFlash: undefined,
        fire: function (from, direction, target, firstShot) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          var weapon = this
          var turretXOffset = ((from.pixelWidth - 20) * from.direction + 10 + from.pixelOffsetX) / game.gridSize
          var turretYOffset = from.pixelOffsetY / game.gridSize
          game.add({
            type: 'bullets',
            targetDistance: weapon.range,
            name: weapon.projectile,
            x: from.x + turretXOffset,
            y: from.y + turretYOffset,
            direction: from.turretDirection,
            target: target,
            weapon: weapon,
            from: from.player
          })
          sounds.play(weapon.sound)
        }
      },
      agtmissile: {
        name: 'agtmissile',
        projectile: 'heatseeker2',
        damage: 60,
        rateOfFire: 40,
        secondaryRateOfFire: 5,
        range: 6.5,
        sound: 'rocket2',
        muzzleFlash: undefined,
        canAttackAir: true,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          game.add({
            type: 'bullets',
            targetDistance: this.range,
            name: this.projectile,
            x: from.x + 0.5,
            y: from.y + 2,
            z: 0.5,
            delay: 0,
            direction: from.direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      napalm: {
        name: 'napalm',
        projectile: 'bomblet',
        damage: 100,
        rateOfFire: 20,
        secondaryRateOfFire: 2,
        range: 4.5,
        fire: function (from) {
          from.firing = true
          if (from.ammunition === 0) {
            from.salvos--
            this.cooldown = this.rateOfFire
            from.firing = false
            if (from.salvos) {
              from.ammunition = from.maxAmmunition
            }
          } else {
            this.cooldown = this.secondaryRateOfFire
          }
          game.add({
            type: 'bullets',
            name: this.projectile,
            x: from.x,
            y: from.y,
            z: 0.9,
            weapon: this
          })
        }
      },
      laser: {
        name: 'laser',
        damage: 200,
        rateOfFire: 90,
        range: 7.5,
        sound: 'obelray1',
        muzzleFlash: undefined,
        projectile: 'lasershot',
        fire: function (from, direction, target) {
          from.firing = true
          this.cooldown = this.rateOfFire
          game.add({
            type: 'bullets',
            name: this.projectile,
            targetDistance: this.range,
            x: from.x,
            y: from.y,
            direction: direction,
            directions: from.directions,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      },
      sammissile: {
        name: 'sammissile',
        projectile: 'bigheatseeker',
        damage: 50,
        rateOfFire: 50,
        secondaryRateOfFire: 10,
        range: 7.5,
        sound: 'rocket2',
        muzzleFlash: 'sam-fire',
        canAttackAir: true,
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          game.add({
            type: 'bullets',
            targetDistance: this.range,
            name: this.projectile,
            x: from.x + 1,
            y: from.y + 0.5,
            z: 0.5,
            delay: 0,
            direction: from.direction,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
          if (this.muzzleFlash) {
            game.add({
              type: 'effects',
              name: this.muzzleFlash,
              direction: Math.round(direction / 4),
              x: from.x,
              y: from.y,
              weapon: this
            })
          }
        }
      },
      honestjohn: {
        name: 'honestjohn',
        projectile: 'flamemissile',
        damage: 100,
        rateOfFire: 200,
        secondaryRateOfFire: 100,
        range: 10,
        sound: 'rocket1',
        fire: function (from, direction, target) {
          from.firing = true
          if (from.firesTwice) {
            if (!this.firstSalvo) {
              this.firstSalvo = true
              this.cooldown = this.secondaryRateOfFire
            } else {
              this.firstSalvo = false
              this.cooldown = this.rateOfFire
            }
          } else {
            this.cooldown = this.rateOfFire
          }
          game.add({
            type: 'bullets',
            targetDistance: this.range,
            name: this.projectile,
            x: from.x,
            y: from.y,
            z: 0.5,
            delay: 0,
            direction: from.turretDirection,
            target: target,
            weapon: this,
            from: from.player
          })
          sounds.play(this.sound)
        }
      }
    },
    defaults: {
      cooldown: 0,
      fire: function (from, direction, target) {
        from.firing = true
        this.cooldown = this.rateOfFire
        game.add({
          type: 'bullets',
          name: this.projectile,
          targetDistance: this.range,
          x: from.x,
          y: from.y,
          direction: direction,
          directions: from.directions,
          target: target,
          weapon: this,
          from: from.player
        })
        if (this.muzzleFlash) {
          game.add({
            type: 'effects',
            name: this.muzzleFlash,
            direction: direction,
            x: from.x,
            y: from.y,
            weapon: this
          })
        }
        sounds.play(this.sound)
      }
    },
    add: function (details) {
      var item = {}
      var name = details.name
      $.extend(item, this.defaults)
      $.extend(item, this.list[name])
      $.extend(item, details)
      return item
    }
  }