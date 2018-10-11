var warheads = {
    smallarms: {
      name: 'smallarms',
      spread: 2,
      wood: false,
      walls: false,
      infantryDeath: 'die-normal',
      damageVersusArmor: [100, 50, 56.25, 25, 25, 0]
    },
    highexplosive: {
      name: 'highexplosive',
      spread: 6,
      wood: true,
      walls: true,
      infantryDeath: 'die-frag',
      damageVersusArmor: [87.5, 75, 56.25, 25, 100, 0]
    },
    armorpiercing: {
      name: 'armorpiercing',
      spread: 6,
      wood: true,
      walls: true,
      infantryDeath: 'die-explode-far',
      damageVersusArmor: [25, 75, 75, 100, 50, 0]
    },
    fire: {
      name: 'fire',
      spread: 8,
      wood: true,
      walls: false,
      infantryDeath: 'die-fire',
      damageVersusArmor: [87.5, 100, 68.75, 25, 50, 0]
    },
    'super': {
      name: 'super',
      spread: 4,
      wood: false,
      walls: false,
      infantryDeath: 'die-fire',
      damageVersusArmor: [100, 100, 100, 100, 100, 0]
    },
    ioncannon: {
      spread: 7,
      wood: true,
      walls: true,
      infantryDeath: 'die-fire',
      damageVersusArmor: [100, 100, 75, 75, 75, 0]
    },
    hollowpoint: {
      name: 'hollowpoint',
      spread: 4,
      wood: false,
      walls: false,
      infantryDeath: 'die-normal',
      damageVersusArmor: [100, 3.125, 3.125, 3.125, 3.125, 0]
    },
    nuke: {
      name: 'nuke',
      spread: 8,
      wood: true,
      walls: false,
      infantryDeath: 'die-fire',
      damageVersusArmor: [87.5, 100, 68.75, 25, 50, 0]
    }
  }