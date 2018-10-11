
export function findEnemyInRange () {
  if (!this.primaryWeapon) {
    console.log('why am i looking for enemy if i cant do anything??', this.name, this.orders.type)
    return
  }
  if (this.name === 'commando') {
    return
  }
  var sightBonus = 0
  if (this.type === 'vehicles' || this.type === 'infantry') {
    sightBonus = 1
  }
  if (this.orders && this.orders.type === 'guard') {
    sightBonus = 2
  }
  if (this.orders && this.orders.type === 'area guard') {
    sightBonus = 3
  }
  if (this.orders && this.orders.type === 'hunt') {
    sightBonus = 50
  }
  var range = this.weapon ? this.weapon.range : this.sight
  var rangeSquared = Math.pow(range + sightBonus, 2)
  var lastDistance
  var lastItem = undefined
  var allies = maps.currentMapData.allies ? maps.currentMapData.allies[this.player] : 'None'
  for (var i = 0; i < game.attackableItems.length; i++) {
    var item = game.attackableItems[i]
    if (item.player != this.player && item.player != 'Neutral' && item.player != allies && item.player !== undefined && item.type != 'trees' && item.type != 'walls' && this.canAttackEnemy(item)) {
      var distance = Math.pow((item.cgX || item.x) - this.x, 2) + Math.pow((item.cgY || item.y) - this.y, 2)
      if (distance <= rangeSquared && (!lastItem || lastDistance > distance)) {
        lastDistance = distance
        lastItem = item
      }
    }
  }
  return lastItem
}