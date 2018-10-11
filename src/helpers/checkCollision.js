
 function checkCollision () {
  var collisionObjects = []
  var movement = 1 * this.speed / game.gridSize / game.speedAdjustmentFactor
  var angleRadians = this.direction / this.directions * 2 * Math.PI
  var newX = this.x - roundFloating(movement * Math.sin(angleRadians))
  var newY = this.y - roundFloating(movement * Math.cos(angleRadians))
  for (var i = game.obstructionGrid.length - 1; i >= 0; i--) {
    if (Math.abs(i + 0.5 - newY) < 3) {
      for (var j = game.obstructionGrid[i].length - 1; j >= 0; j--) {
        if (game.obstructionGrid[i][j] && Math.abs(j - newX + 0.5) < 3) {
          if (Math.pow(j + 0.5 - newX, 2) + Math.pow(i + 0.5 - newY, 2) < Math.pow(this.hardCollisionRadius / game.gridSize + 0.5, 2)) {
            collisionObjects.push({
              collisionType: 'ultra-hard',
              withItem: {
                type: 'wall',
                x: j + 0.5,
                y: i + 0.5
              }
            })
          } else if (Math.pow(j + 0.5 - newX, 2) + Math.pow(i + 0.5 - newY, 2) < Math.pow(this.softCollisionRadius / game.gridSize + 0.5, 2)) {
            collisionObjects.push({
              collisionType: 'hard',
              withItem: {
                type: 'wall',
                x: j + 0.5,
                y: i + 0.5
              }
            })
          } else if (Math.pow(j + 0.5 - newX, 2) + Math.pow(i + 0.5 - newY, 2) < Math.pow(this.softCollisionRadius / game.gridSize + 0.7, 2)) {
            collisionObjects.push({
              collisionType: 'soft',
              withItem: {
                type: 'wall',
                x: j + 0.5,
                y: i + 0.5
              }
            })
          }
        }
      }
    }
  }
  for (var i = game.items.length - 1; i >= 0; i--) {
    var item = game.items[i]
    var itemX, itemY
    var crushableEnemy = false
    if (item != this && item.type != 'buildings' && (item.type == 'infantry' || item.type == 'vehicles') && Math.abs(item.x - newX) < 4 && Math.abs(item.y - newY) < 4) {
      var crushableEnemy = this.crusher && this.player !== item.player && item.crushable
      if (false) {
        var itemMovement = item.speed / game.gridSize / game.speedAdjustmentFactor
        var itemAngleRadians = item.direction / item.directions * 2 * Math.PI
        itemX = item.x - roundFloating(itemMovement * Math.sin(itemAngleRadians))
        itemY = item.y - roundFloating(itemMovement * Math.cos(itemAngleRadians))
      } else {
        itemX = item.x
        itemY = item.y
      }
      if (Math.pow(itemX - newX, 2) + Math.pow(itemY - newY, 2) < Math.pow((this.hardCollisionRadius + item.hardCollisionRadius) / game.gridSize, 2)) {
        if (crushableEnemy) {
          item.life = 0
          item.infantryDeath = 'die-squish'
        } else {
          collisionObjects.push({
            collisionType: 'hard',
            withItem: item
          })
        }
      } else if (Math.pow(itemX - newX, 2) + Math.pow(itemY - newY, 2) < Math.pow((this.softCollisionRadius + item.hardCollisionRadius) / game.gridSize, 2)) {
        if (crushableEnemy) {
          item.life = 0
          item.infantryDeath = 'die-squish'
        } else {
          collisionObjects.push({
            collisionType: 'soft-hard',
            withItem: item
          })
        }
      } else if (Math.pow(itemX - newX, 2) + Math.pow(itemY - newY, 2) < Math.pow((this.softCollisionRadius + item.softCollisionRadius) / game.gridSize, 2)) {
        if (crushableEnemy) {} else {
          collisionObjects.push({
            collisionType: 'soft',
            withItem: item
          })
        }
      }
    }
  }
  return collisionObjects
}
