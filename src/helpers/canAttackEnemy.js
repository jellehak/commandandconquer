
 function canAttackEnemy (item) {
  if (item === this) {
    return false
  }
  if (item.cloaked) {
    if (this.type === 'infantry' || this.type === 'turrets' || this.type === 'vehicles') {
      var distance = Math.pow((item.cgX || item.x) - this.cgX, 2) + Math.pow((item.cgY || item.y) - this.cgY, 2)
      if (distance > 2.5) {
        return false
      }
    } else {
      return false
    }
  }
  if (item.lifeCode === 'dead') {
    return false
  }
  if (item.type === 'walls' && !warheads[bullets[item.weapon.projectile]].walls) {
    return false
  }
  if (item.type === 'trees' && !warheads[bullets[item.weapon.projectile]].wood) {
    return false
  }
  if (item.type === 'ships' && this.type != 'turrets') {
    return false
  }
  if (item.type === 'aircraft' && item.z > 0 && !this.weapon.canAttackAir) {
    return false
  }
  if ((item.type != 'aircraft' || item.z <= 0) && this.name === 'sam-site') {
    return false
  }
  return true
}
