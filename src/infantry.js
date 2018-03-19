var infantry = {
    type: 'infantry',
    list: {
      minigunner: {
        name: 'minigunner',
        label: 'Minigunner',
        speed: 8,
        primaryWeapon: 'm16',
        cost: 100,
        sight: 1,
        hitPoints: 50,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 8,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 8,
          totalCount: 8,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'idle-2',
          count: 16
        }, {
          name: 'fist-combat-left',
          count: 47
        }, {
          name: 'fist-combat-right',
          count: 47
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'wave',
          count: 3,
          direction: true
        }, {
          name: 'greet',
          count: 3,
          direction: true
        }, {
          name: 'salute',
          count: 3,
          direction: true
        }, {
          name: 'bow',
          count: 3,
          direction: true
        }, {
          name: 'prone',
          count: 1,
          totalCount: 4,
          direction: true,
          spriteCount: 144
        }]
      },
      grenadier: {
        name: 'grenadier',
        label: 'Grenadier',
        speed: 10,
        primaryWeapon: 'grenade',
        cost: 160,
        sight: 1,
        hitPoints: 50,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'gdi',
        proneFireIndex: 6,
        fireIndex: 14,
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 20,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 8,
          totalCount: 12,
          direction: true
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'wave',
          count: 3,
          direction: true
        }, {
          name: 'greet',
          count: 3,
          direction: true
        }, {
          name: 'salute',
          count: 3,
          direction: true
        }, {
          name: 'bow',
          count: 3,
          direction: true
        }, {
          name: 'prone',
          count: 1,
          totalCount: 4,
          direction: true,
          spriteCount: 144
        }]
      },
      bazooka: {
        name: 'bazooka',
        label: 'Bazooka',
        speed: 8,
        primaryWeapon: 'rocket',
        cost: 300,
        sight: 2,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 8,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 10,
          totalCount: 10,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'idle-2',
          count: 16
        }, {
          name: 'fist-combat-left',
          count: 47
        }, {
          name: 'fist-combat-right',
          count: 47
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'wave',
          count: 3,
          direction: true
        }, {
          name: 'greet',
          count: 3,
          direction: true
        }, {
          name: 'salute',
          count: 3,
          direction: true
        }, {
          name: 'bow',
          count: 3,
          direction: true
        }, {
          name: 'prone',
          count: 1,
          totalCount: 4,
          direction: true,
          spriteCount: 144
        }]
      },
      'flame-thrower': {
        name: 'flame-thrower',
        label: 'Flame Thrower',
        speed: 10,
        primaryWeapon: 'infantryflamer',
        cost: 200,
        sight: 1,
        hitPoints: 70,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'nod',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 16,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 16,
          totalCount: 16,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'idle-2',
          count: 16
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'prone',
          count: 1,
          totalCount: 16,
          direction: true,
          spriteCount: 256
        }]
      },
      'chem-warrior': {
        name: 'chem-warrior',
        label: 'Chem Warrior',
        speed: 8,
        primaryWeapon: 'chemspray',
        cost: 300,
        sight: 1,
        hitPoints: 70,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod', 'communications-center'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'nod',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 16,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 16,
          totalCount: 16,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'idle-2',
          count: 16
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'prone',
          count: 1,
          totalCount: 16,
          direction: true,
          spriteCount: 256
        }]
      },
      commando: {
        name: 'commando',
        label: 'Commando',
        speed: 10,
        primaryWeapon: 'sniper',
        cost: 1e3,
        sight: 5,
        hitPoints: 80,
        spriteSheet: undefined,
        directions: 8,
        canInfiltrate: true,
        dependency: ['barracks|hand-of-nod', 'communications-center'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          totalCount: 4,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'idle-2',
          count: 16
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'prone',
          count: 1,
          totalCount: 4,
          direction: true,
          spriteCount: 160
        }]
      },
      engineer: {
        name: 'engineer',
        label: 'Engineer',
        speed: 8,
        cost: 500,
        sight: 2,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        dependency: ['barracks|hand-of-nod'],
        constructedIn: ['barracks', 'hand-of-nod'],
        owner: 'both',
        canInfiltrate: true,
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'down',
          count: 2,
          direction: true
        }, {
          name: 'prone-move',
          count: 4,
          direction: true
        }, {
          name: 'up',
          count: 2,
          direction: true
        }, {
          name: 'idle-1',
          count: 16
        }, {
          name: 'die-normal',
          count: 8
        }, {
          name: 'die-frag',
          count: 8
        }, {
          name: 'die-explode-close',
          count: 8
        }, {
          name: 'die-explode-far',
          count: 12
        }, {
          name: 'die-fire',
          count: 18
        }, {
          name: 'wave',
          count: 3,
          direction: true
        }, {
          name: 'greet',
          count: 3,
          direction: true
        }, {
          name: 'salute',
          count: 3,
          direction: true
        }, {
          name: 'prone',
          count: 1,
          totalCount: 4,
          spriteCount: 66,
          direction: true
        }]
      },
      'civilian-1': {
        name: 'civilian-1',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: 'pistol',
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-2': {
        name: 'civilian-2',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-3': {
        name: 'civilian-3',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-4': {
        name: 'civilian-4',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-5': {
        name: 'civilian-5',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-6': {
        name: 'civilian-6',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-7': {
        name: 'civilian-7',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: 'pistol',
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-8': {
        name: 'civilian-9',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 25,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-9': {
        name: 'civilian-9',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: 'pistol',
        hitPoints: 5,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      },
      'civilian-10': {
        name: 'civilian-10',
        label: 'Civilian',
        speed: 10,
        cost: 10,
        sight: 0,
        primaryWeapon: undefined,
        hitPoints: 50,
        spriteSheet: undefined,
        directions: 8,
        constructedIn: [],
        owner: 'both',
        spriteImages: [{
          name: 'stand',
          count: 8
        }, {
          name: 'guard',
          count: 8,
          spriteCount: 0
        }, {
          name: 'prone',
          count: 1,
          totalCount: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'prone-move',
          count: 6,
          direction: true,
          spriteCount: 8
        }, {
          name: 'run',
          count: 6,
          direction: true
        }, {
          name: 'fist-combat-left',
          count: 43
        }, {
          name: 'fist-combat-right',
          count: 42
        }, {
          name: 'idle-1',
          count: 10
        }, {
          name: 'idle-2',
          count: 6
        }, {
          name: 'fire',
          count: 4,
          direction: true
        }, {
          name: 'prone-fire',
          count: 4,
          direction: true,
          spriteCount: 205
        }, {
          name: 'executed',
          count: 6,
          spriteCount: 277
        }, {
          name: 'die-normal',
          count: 8,
          spriteCount: 329
        }, {
          name: 'die-frag',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-close',
          count: 8,
          spriteCount: 337
        }, {
          name: 'die-explode-far',
          count: 12,
          spriteCount: 345
        }, {
          name: 'die-fire',
          count: 18,
          spriteCount: 357
        }]
      }
    },
    defaults: {
      action: 'stand',
      z: 0,
      orders: {
        type: 'stand'
      },
      direction: 4,
      armor: 0,
      animationIndex: 0,
      fireIndex: 0,
      proneFireIndex: 0,
      selected: false,
      lastMovementX: 0,
      lastMovementY: 0,
      nearCount: 0,
      crushable: true,
      pixelOffsetX: -26,
      pixelOffsetY: -16,
      selectOffsetX: -16,
      selectOffsetY: -10,
      pixelHeight: 39,
      pixelWidth: 50,
      softCollisionRadius: 4,
      hardCollisionRadius: 2,
      path: undefined,
      turnTo: function (toDirection) {
        var turnDirection = angleDiff(this.direction, toDirection, this.directions)
        if (turnDirection) {
          var turnAmount = turnDirection / Math.abs(turnDirection)
          this.direction = wrapDirection(this.direction + turnAmount, this.directions)
        }
      },
      checkCollision: checkCollision,
      moveTo: moveTo,
      canAttackEnemy: canAttackEnemy,
      findEnemyInRange: findEnemyInRange,
      hasReached: function () {
        if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 9) {
          if (this.colliding) {
            this.nearCount++
          }
        } else {
          this.nearCount = 0
        }
        if (Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 0.25 || Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 1 && this.nearCount > 10 || Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 4 && this.nearCount > 20 || Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2) < 9 && this.nearCount > 30) {
          this.nearCount = 0
          return true
        }
        return false
      },
      processOrders: function () {
        this.lifeCode = getLifeCode(this)
        if (this.lifeCode == 'dead' && this.orders.type != 'die') {
          this.unselectable = true
          if (this.selected) {
            game.selectItem(this, true)
          }
          this.orders = {
            type: 'die'
          }
          this.action = this.infantryDeath
          this.animationIndex = 0
          switch (this.infantryDeath) {
            case 'die-normal':
            case 'die-frag':
            case 'die-explode-close':
            case 'die-explode-far':
              sounds.play('infantry_die')
              break
            case 'die-fire':
              sounds.play('infantry_die_fire')
              break
            case 'die-squish':
              this.action = 'die-normal'
              sounds.play('infantry_die_squish')
              break
          }
        }
        this.lastMovementX = 0
        this.lastMovementY = 0
        this.firing = false
        if (this.weapon && this.weapon.cooldown > 0) {
          this.weapon.cooldown--
        }
        if (this.attacked) {
          this.attacked = false
          this.prone = true
          this.attackedCycles = 50
        }
        if (this.prone) {
          this.attackedCycles--
          if (this.attackedCycles <= 0) {
            this.prone = false
          }
        }
        var newDirection
        var nearestEnemy
        switch (this.orders.type) {
          case 'stand':
            if (this.prone) {
              this.action = 'prone'
            } else {
              this.action = 'stand'
            }
            this.moving = false
            if (this.weapon) {
              var enemy = this.findEnemyInRange()
              if (enemy) {
                this.orders = {
                  type: 'attack',
                  to: enemy,
                  lastOrder: {
                    type: this.orders.type
                  }
                }
              }
            }
            break
          case 'move':
            this.moving = true
            if (this.hasReached()) {
              if (this.orders.lastOrder) {
                this.orders = this.orders.lastOrder
              } else {
                this.orders = {
                  type: 'stand'
                }
              }
            } else {
              if (this.prone) {
                this.action = 'prone-move'
              } else {
                this.action = 'run'
              }
              if (!this.moveTo(this.orders.to)) {
                this.orders = {
                  type: 'stand'
                }
              }
            }
            break
          case 'attack':
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
            if (Math.pow(this.orders.to.cgX - this.x, 2) + Math.pow(this.orders.to.cgY - this.y, 2) < Math.pow(this.weapon.range - 1 + this.orders.to.hardCollisionRadius / game.gridSize, 2)) {
              this.moving = false
              if (this.action == 'prone-move' || this.action == 'run') {
                this.animationIndex = 0
                if (this.prone) {
                  this.action = 'prone'
                } else {
                  this.action = 'stand'
                }
              }
              newDirection = findAngle(this.orders.to, this, this.directions)
              if (newDirection != this.direction) {
                if (this.prone) {
                  this.action = 'prone'
                } else {
                  this.action = 'guard'
                }
                this.turnTo(newDirection)
              } else {
                if (this.weapon.cooldown <= 0) {
                  if (this.action != 'prone-fire' && this.action != 'fire') {
                    this.animationIndex = 0
                  }
                  if (this.prone) {
                    this.action = 'prone-fire'
                    if (this.proneFireIndex == this.animationIndex) {
                      this.weapon.fire(this, this.direction, this.orders.to)
                    }
                  } else {
                    this.action = 'fire'
                    if (this.fireIndex == this.animationIndex) {
                      this.weapon.fire(this, this.direction, this.orders.to)
                    }
                  }
                }
              }
            } else {
              this.moving = true
              if (this.prone) {
                this.action = 'prone-move'
              } else {
                this.action = 'run'
              }
              if (!this.moveTo(this.orders.to)) {
                if (this.orders.lastOrder) {
                  this.orders = this.orders.lastOrder
                } else {
                  this.orders = {
                    type: 'guard'
                  }
                }
              }
            }
            break
          case 'area guard':
            if (!this.orders.to) {
              this.orders.to = {
                x: this.x,
                y: this.y
              }
            }
            if (this.weapon) {
              nearestEnemy = this.findEnemyInRange()
              if (nearestEnemy) {
                this.orders = {
                  type: 'attack',
                  lastOrder: this.orders,
                  to: nearestEnemy
                }
                return
              }
            } else {
              this.orders = {
                type: 'panic'
              }
            }
            if (this.orders.to && !this.hasReached() && this.moveTo(this.orders.to)) {
              this.moving = true
              if (this.prone) {
                this.action = 'prone-move'
              } else {
                this.action = 'run'
              }
            } else {
              if (this.prone) {
                this.action = 'prone'
              } else {
                this.action = 'guard'
              }
              this.moving = false
            }
            break
          case 'guard':
          case 'hunt':
            if (this.weapon) {
              nearestEnemy = this.findEnemyInRange()
              if (nearestEnemy) {
                this.orders = {
                  type: 'attack',
                  lastOrder: this.orders,
                  to: nearestEnemy
                }
              } else {
                if (this.prone) {
                  this.action = 'prone'
                } else {
                  this.action = 'guard'
                }
                this.moving = false
              }
            } else {
              this.orders = {
                type: 'panic'
              }
            }
            break
          case 'die':
            break
          case 'sticky':
            if (this.prone) {
              if (this.weapon) {} else {
                this.orders = {
                  type: 'panic'
                }
              }
            }
            break
          case 'panic':
            this.prone = true
            this.action = 'prone-move'
            if (!this.orders.to || this.hasReached() || !this.moveTo(this.orders.to)) {
              this.orders.to = {
                x: this.x + game.gameTick % 5 - 2,
                y: this.y + game.gameTick % 3 - 1
              }
            }
            break
          case 'load':
            if (!this.orders.to || this.orders.to.lifeCode == 'dead' || this.orders.to.cargo.length >= this.orders.to.maxCargo) {
              this.orders = {
                type: 'stand'
              }
              break
            }
            var target = {
              x: this.orders.to.cgX,
              y: this.orders.to.cgY + 0.4
            }
            var distanceFromTarget = Math.sqrt(Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2))
            this.distanceFromTarget = distanceFromTarget
            if (distanceFromTarget < 3) {
              this.orders.to.orders = {
                type: 'load'
              }
            }
            if (distanceFromTarget < 1.3) {
              this.moving = false
              newDirection = findAngle(this.orders.to, this, this.directions)
              if (newDirection != this.direction) {
                if (this.prone) {
                  this.action = 'prone-move'
                } else {
                  this.action = 'run'
                }
                this.turnTo(newDirection)
              } else {
                if (this.orders.to.action == 'load') {
                  this.orders.to.cargo.push(this)
                  this.orders.to.orders = {
                    type: 'finish-load'
                  }
                  this.orders = {
                    type: 'stand'
                  }
                  game.remove(this)
                } else {
                  this.orders.to.orders = {
                    type: 'load'
                  }
                }
              }
            } else {
              this.moving = true
              if (this.prone) {
                this.action = 'prone-move'
              } else {
                this.action = 'run'
              }
              if (!this.moveTo(target)) {
                this.orders = {
                  type: 'stand'
                }
              }
            }
            break
          case 'infiltrate':
            if (!this.orders.to || this.orders.to.lifeCode == 'dead' || this.orders.to.player == this.player) {
              this.orders = {
                type: 'stand'
              }
              break
            }
            var destination = {}
            destination.y = this.orders.to.y + this.orders.to.gridShape.length - 0.5
            destination.cgX = this.orders.to.cgX
            if (this.x < this.orders.to.cgX) {
              destination.x = this.orders.to.x + 0.5
            } else {
              destination.x = this.orders.to.x + this.orders.to.gridShape[0].length - 0.5
            }
            var distanceCorner = Math.pow(destination.x - this.x, 2) + Math.pow(destination.y - this.y, 2)
            var distanceCG = Math.pow(destination.cgX - this.x, 2) + Math.pow(destination.y - this.y, 2)
            if (this.name == 'engineer') {
              if (distanceCorner < 1 || distanceCG < 1) {
                if (!this.orders.counter) {
                  this.orders.counter = 5
                } else {
                  this.orders.counter--
                  if (this.orders.counter > 1) {
                    this.moveToDestination()
                  } else {
                    if (this.orders.to.team == 'gdi') {
                      sounds.play('gdi_building_captured')
                    } else {
                      sounds.play('nod_building_captured')
                    }
                    this.orders.to.originalteam = this.orders.to.originalteam || this.orders.to.team
                    this.orders.to.player = this.player
                    this.orders.to.team = this.team
                    game.remove(this)
                  }
                }
              } else {
                this.moveToDestination()
              }
            } else {
              if (distanceCorner < 1.5 || distanceCG < 1.5) {
                if (!this.orders.counter) {
                  sounds.play('commando_bomb')
                  this.orders.counter = 25
                } else {
                  this.orders.counter--
                  if (this.orders.counter > 2 && distanceCorner > 1 && distanceCG > 1) {
                    this.moveToDestination()
                  } else if (this.orders.counter > 1) {
                    if (this.prone) {
                      this.action = 'prone'
                    } else {
                      this.action = 'stand'
                    }
                  } else {
                    this.orders.to.timeBomb = 20
                    this.orders = {
                      type: 'move',
                      to: findClosestEmptySpot(this, {
                        minimumRadius: 2
                      })
                    }
                  }
                }
              } else {
                this.moveToDestination()
              }
            }
            break
        }
      },
      moveToDestination: function () {
        this.moving = true
        if (this.prone) {
          this.action = 'prone-move'
        } else {
          this.action = 'run'
        }
        if (!this.moveTo(this.orders.to)) {
          this.moving = 'false'
          newDirection = findAngle(this.orders.to, this, this.directions)
          this.turnTo(newDirection)
          if (this.prone) {
            this.action = 'prone'
          } else {
            this.action = 'stand'
          }
        }
      },
      drawSelection: function () {
        var x = this.selectOffsetX - this.pixelOffsetX
        var y = this.selectOffsetY - this.pixelOffsetY
        this.context.drawImage(this.selectImage, x, y)
        var selectBarHeight = 3
        var selectBarWidth = 12
        this.context.beginPath()
        this.context.rect(x + 9, y - selectBarHeight, selectBarWidth * this.life / this.hitPoints, selectBarHeight)
        if (this.lifeCode == 'healthy') {
          this.context.fillStyle = 'lightgreen'
        } else if (this.lifeCode == 'damaged') {
          this.context.fillStyle = 'yellow'
        } else {
          this.context.fillStyle = 'red'
        }
        this.context.fill()
        this.context.beginPath()
        this.context.strokeStyle = 'black'
        this.context.rect(x + 9, y - selectBarHeight, selectBarWidth, selectBarHeight)
        this.context.stroke()
      },
      preRender: function () {
        var x = 0
        var y = 0
        this.context.clearRect(0, 0, this.pixelWidth, this.pixelHeight)
        this.context.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
        if (this.selected) {
          this.drawSelection()
        }
      },
      draw: function () {
        if (this.action == 'hide') {
          return
        }
        var interpolatedX = this.x + game.movementInterpolationFactor * this.lastMovementX
        var interpolatedY = this.y + game.movementInterpolationFactor * this.lastMovementY
        var x = Math.round(interpolatedX * game.gridSize) - game.viewportX + game.viewportLeft
        var y = Math.round(interpolatedY * game.gridSize) - game.viewportY + game.viewportTop
        if (x < -this.pixelWidth || y < -this.pixelHeight || x > game.viewportWidth + this.pixelWidth || y > game.viewportHeight + this.pixelHeight) {
          return
        }
        game.foregroundContext.drawImage(this.canvas, x + this.pixelOffsetX, y + this.pixelOffsetY)
      },
      animate: function () {
        this.cgX = this.x
        this.cgY = this.y
        this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
        switch (this.action) {
          case 'run':
          case 'fire':
          case 'prone':
          case 'prone-move':
          case 'prone-fire':
          case 'down':
          case 'up':
            this.imageList = this.spriteArray[this.action + '-' + this.direction]
            if (!this.imageList) {
              alert('no action called : ' + this.action)
            }
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
              if (this.action == 'up') {
                this.action = 'stand'
              }
              if (this.action == 'down') {
                this.action = 'prone'
              }
              if (this.action == 'fire') {
                this.action = 'guard'
              }
              if (this.action == 'prone-fire') {
                this.action = 'prone'
              }
            }
            break
          case 'die-normal':
          case 'die-frag':
          case 'die-explode-close':
          case 'die-explode-far':
          case 'die-fire':
            this.imageList = this.spriteArray[this.action]
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              if (!this.deadCount) {
                this.deadCount = 0
              }
              this.deadCount++
              this.animationIndex = this.imageList.count - 1
              if (this.deadCount >= 15) {
                game.remove(this)
                game.kills[this.attackedBy]++
                game.deaths[this.player]++
              }
            }
            break
          case 'guard':
            this.imageList = this.spriteArray['guard']
            if (!this.imageList) {
              alert(this.name)
            }
            this.imageOffset = this.imageList.offset + this.direction
            break
          case 'stand':
            this.imageList = this.spriteArray['stand']
            this.imageOffset = this.imageList.offset + this.direction
            break
          case 'hide':
            break
          default:
            alert('no action called : ' + this.action)
            console.log(this.name)
            break
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
        delete item.percentLife
      } else {
        item.life = item.hitPoints
      }
      $.extend(item, details)
      if (item.primaryWeapon) {
        item.weapon = weapons.add({
          name: item.primaryWeapon
        })
      }
      item.canvas = document.createElement('canvas')
      item.canvas.width = item.pixelWidth
      item.canvas.height = item.pixelHeight
      item.context = item.canvas.getContext('2d')
      return item
    },
    load: function (name) {
      var item = this.list[name]
      console.log('Loading', name, '...')
      item.type = this.type
      item.spriteCanvas = document.createElement('canvas')
      item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function (image) {
        createSpriteSheetCanvas(image, item.spriteCanvas, 'grayscale')
      })
      item.selectImage = sidebar.selectImageSmall
      item.spriteArray = []
      item.spriteCount = 0
      for (var i = 0; i < item.spriteImages.length; i++) {
        var constructImageCount = item.spriteImages[i].count
        var totalImageCount = item.spriteImages[i].totalCount || item.spriteImages[i].count
        var constructImageName = item.spriteImages[i].name
        if (typeof item.spriteImages[i].spriteCount !== 'undefined') {
          item.spriteCount = item.spriteImages[i].spriteCount
        }
        if (item.spriteImages[i].direction) {
          for (var j = 0; j < item.directions; j++) {
            item.spriteArray[constructImageName + '-' + j] = {
              name: constructImageName + '-' + j,
              count: constructImageCount,
              offset: item.spriteCount
            }
            item.spriteCount += totalImageCount
          }
        } else {
          if (typeof item.spriteImages[i].spriteCount !== 'undefined') {
            item.spriteCount = item.spriteImages[i].spriteCount
          }
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