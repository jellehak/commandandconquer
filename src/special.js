var special = {
  type: 'special',
  list: {
    'nuclear-strike': {
      name: 'nuclear-strike',
      label: 'Nuclear Strike',
      dependency: ['temple-of-nod', 'power-plant|advanced-power-plant'],
      constructedIn: ['temple-of-nod'],
      owner: 'nod',
      cost: 5e3,
      needsPower: true,
      readySound: 'nuclear_weapon_available',
      firedSound: 'nuclear_weapon_launched',
      arrivedSound: 'nuclear_warhead_approaching'
    },
    'ion-cannon': {
      name: 'ion-cannon',
      label: 'Ion Cannon',
      dependency: ['advanced-communications-tower', 'power-plant|advanced-power-plant'],
      constructedIn: ['advanced-communications-tower'],
      owner: 'gdi',
      cost: 5e3,
      needsPower: true,
      readySound: 'ion_cannon_ready',
      firedSound: 'ion_cannon_charging'
    },
    'air-strike': {
      name: 'air-strike',
      label: 'Air Strike',
      readySound: 'air_strike_ready',
      dependency: ['advanced-communications-tower|air-strike-available', 'power-plant|advanced-power-plant|air-strike-available'],
      constructedIn: ['advanced-communications-tower', 'construction-yard'],
      owner: 'gdi',
      cost: 3e3
    }
  },
  load: function (name) {
    var item = this.list[name]
    console.log('Loading', name, '...')
    item.type = this.type
  }
}