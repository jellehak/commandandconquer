var buildings = {
  type: 'buildings',
  list: {
    helipad: {
      z: -1,
      name: 'helipad',
      label: 'Helipad',
      cost: 1500,
      powerOut: 10,
      powerIn: 0,
      sight: 3,
      hasBib: true,
      hitPoints: 800,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'barracks|hand-of-nod'],
      owner: 'both',
      spriteImages: [{
        name: 'healthy-reload-ammo',
        count: 7
      }, {
        name: 'damaged-reload-ammo',
        count: 7
      }, {
        name: 'ultra-damaged',
        count: 1
      }, {
        name: 'build',
        count: 20
      }, {
        name: 'healthy',
        count: 1,
        spriteCount: 0
      }, {
        name: 'damaged',
        count: 1,
        spriteCount: 7
      }],
      gridShape: [
        [1, 1],
        [1, 1]
      ],
      pixelWidth: 48,
      pixelHeight: 48,
      gridBuild: [
        [1, 1],
        [1, 1],
        [1, 1]
      ],
      orders: {
        type: 'auto-load'
      }
    },
    'power-plant': {
      name: 'power-plant',
      label: 'Power Plant',
      cost: 300,
      powerOut: 100,
      powerIn: 0,
      sight: 2,
      hasBib: true,
      hitPoints: 400,
      armor: 1,
      dependency: ['construction-yard'],
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 4
      }, {
        name: 'healthy',
        count: 4
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      gridShape: [
        [1, 0],
        [1, 1]
      ],
      pixelWidth: 48,
      pixelHeight: 48,
      gridBuild: [
        [1, 0],
        [1, 1],
        [1, 1]
      ]
    },
    'advanced-power-plant': {
      name: 'advanced-power-plant',
      label: 'Advanced Power Plant',
      cost: 700,
      powerOut: 200,
      powerIn: 0,
      sight: 2,
      hasBib: true,
      hitPoints: 600,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant'],
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 4
      }, {
        name: 'healthy',
        count: 4
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      gridShape: [
        [1, 0],
        [1, 1]
      ],
      pixelWidth: 48,
      pixelHeight: 48,
      gridBuild: [
        [1, 0],
        [1, 1],
        [1, 1]
      ]
    },
    'construction-yard': {
      name: 'construction-yard',
      label: 'Construction Yard',
      powerIn: 15,
      powerOut: 30,
      cost: 5e3,
      sight: 3,
      hitPoints: 800,
      dependency: undefined,
      hasBib: true,
      armor: 1,
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 32
      }, {
        name: 'damaged',
        count: 4
      }, {
        name: 'damaged-construct',
        count: 20
      }, {
        name: 'healthy',
        count: 4
      }, {
        name: 'healthy-construct',
        count: 20
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      gridShape: [
        [1, 1, 1],
        [1, 1, 1]
      ],
      pixelWidth: 72,
      pixelHeight: 48,
      gridBuild: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
    },
    barracks: {
      name: 'barracks',
      label: 'Barracks',
      powerIn: 20,
      cost: 300,
      sight: 3,
      hasBib: true,
      hitPoints: 800,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant'],
      owner: 'gdi',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 10
      }, {
        name: 'healthy',
        count: 10
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [1, 1],
        [0, 0]
      ],
      gridBuild: [
        [1, 1],
        [1, 1],
        [1, 1]
      ]
    },
    'repair-facility': {
      name: 'repair-facility',
      label: 'Repair Facility',
      powerIn: 30,
      cost: 1200,
      sight: 3,
      hasBib: true,
      z: -1,
      armor: 1,
      tiberiumStorage: 1500,
      orders: {
        type: 'auto-repair'
      },
      hitPoints: 800,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant'],
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'repair-healthy',
        count: 7
      }, {
        name: 'repair-damaged',
        count: 7
      }, {
        name: 'healthy',
        count: 1,
        spriteCount: 20
      }, {
        name: 'damaged',
        count: 1,
        spriteCount: 27
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 72,
      pixelHeight: 72,
      gridShape: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      gridBuild: [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
    },
    'communications-center': {
      name: 'communications-center',
      label: 'Communications Center',
      powerIn: 40,
      cost: 1e3,
      sight: 3,
      hasBib: true,
      hitPoints: 1e3,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'refinery'],
      owner: 'both',
      spriteImages: [{
        name: 'healthy',
        count: 16
      }, {
        name: 'damaged',
        count: 16
      }, {
        name: 'ultra-damaged',
        count: 1
      }, {
        name: 'build',
        count: 20
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [1, 1],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1],
        [1, 1]
      ]
    },
    'advanced-communications-tower': {
      name: 'advanced-communications-tower',
      label: 'Advanced Communications Tower',
      powerIn: 200,
      cost: 2800,
      sight: 10,
      hasBib: true,
      hitPoints: 1e3,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'refinery', 'communications-center'],
      owner: 'gdi',
      spriteImages: [{
        name: 'healthy',
        count: 16
      }, {
        name: 'damaged',
        count: 16
      }, {
        name: 'ultra-damaged',
        count: 1
      }, {
        name: 'build',
        count: 20
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [1, 1],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1],
        [1, 1]
      ]
    },
    'temple-of-nod': {
      name: 'temple-of-nod',
      label: 'Temple of Nod',
      powerIn: 200,
      cost: 2800,
      sight: 10,
      hasBib: true,
      hitPoints: 1e3,
      armor: 2,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'refinery', 'communications-center'],
      owner: 'nod',
      spriteImages: [{
        name: 'healthy-launch',
        count: 5
      }, {
        name: 'damaged-launch',
        count: 5
      }, {
        name: 'ultra-damaged',
        count: 1
      }, {
        name: 'build',
        count: 36
      }, {
        name: 'healthy',
        count: 1,
        spriteCount: 0
      }, {
        name: 'damaged',
        count: 1,
        spriteCount: 5
      }],
      pixelWidth: 72,
      pixelHeight: 72,
      gridShape: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 1, 1]
      ],
      gridBuild: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
    },
    'tiberium-silo': {
      name: 'tiberium-silo',
      label: 'Tiberium Silo',
      powerIn: 10,
      cost: 150,
      sight: 2,
      hasBib: true,
      tiberiumStorage: 1500,
      armor: 1,
      hitPoints: 150,
      dependency: ['construction-yard', 'refinery'],
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 5
      }, {
        name: 'healthy',
        count: 5
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 24,
      gridShape: [
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    refinery: {
      name: 'refinery',
      label: 'Tiberium Refinery',
      powerIn: 40,
      powerOut: 10,
      cost: 2e3,
      sight: 3,
      hasBib: true,
      tiberiumStorage: 1e3,
      armor: 1,
      hitPoints: 800,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant'],
      owner: 'both',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 12
      }, {
        name: 'damaged-docking',
        count: 7
      }, {
        name: 'damaged-loading',
        count: 5
      }, {
        name: 'damaged-undocking',
        count: 6
      }, {
        name: 'healthy',
        count: 12
      }, {
        name: 'healthy-docking',
        count: 7
      }, {
        name: 'healthy-loading',
        count: 5
      }, {
        name: 'healthy-undocking',
        count: 6
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 72,
      pixelHeight: 72,
      z: -0.5,
      gridShape: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      gridBuild: [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
    },
    'hand-of-nod': {
      name: 'hand-of-nod',
      label: 'Hand of Nod',
      powerIn: 20,
      cost: 300,
      sight: 3,
      hasBib: true,
      hitPoints: 800,
      armor: 1,
      dependency: ['construction-yard', 'power-plant|advanced-power-plant'],
      owner: 'nod',
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'healthy',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 72,
      gridShape: [
        [0, 0],
        [1, 1],
        [0, 1]
      ],
      gridBuild: [
        [0, 0],
        [1, 1],
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-01': {
      name: 'civilian-building-01',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 1,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-02': {
      name: 'civilian-building-02',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-03': {
      name: 'civilian-building-03',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 1],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-04': {
      name: 'civilian-building-04',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-05': {
      name: 'civilian-building-05',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 24,
      gridShape: [
        [1, 1]
      ],
      gridBuild: [
        [1, 1]
      ]
    },
    'civilian-building-06': {
      name: 'civilian-building-06',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 24,
      gridShape: [
        [1, 1]
      ],
      gridBuild: [
        [1, 1]
      ]
    },
    'civilian-building-07': {
      name: 'civilian-building-07',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 24,
      gridShape: [
        [1, 1]
      ],
      gridBuild: [
        [1, 1]
      ]
    },
    'civilian-building-08': {
      name: 'civilian-building-08',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 24,
      pixelHeight: 24,
      gridShape: [
        [1]
      ],
      gridBuild: [
        [1]
      ]
    },
    'civilian-building-09': {
      name: 'civilian-building-09',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 24,
      pixelHeight: 24,
      gridShape: [
        [1]
      ],
      gridBuild: [
        [1]
      ]
    },
    'civilian-building-10': {
      name: 'civilian-building-10',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 24,
      pixelHeight: 24,
      gridShape: [
        [1]
      ],
      gridBuild: [
        [1]
      ]
    },
    'civilian-building-11': {
      name: 'civilian-building-11',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 24,
      pixelHeight: 24,
      gridShape: [
        [1]
      ],
      gridBuild: [
        [1]
      ]
    },
    'civilian-building-20': {
      name: 'civilian-building-20',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 3
      }, {
        name: 'damaged',
        count: 3
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-21': {
      name: 'civilian-building-21',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 3
      }, {
        name: 'damaged',
        count: 3
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-22': {
      name: 'civilian-building-22',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 3
      }, {
        name: 'damaged',
        count: 3
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-23': {
      name: 'civilian-building-23',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-24': {
      name: 'civilian-building-24',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-25': {
      name: 'civilian-building-25',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 5,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-26': {
      name: 'civilian-building-26',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 1
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 24,
      gridShape: [
        [1, 1]
      ],
      gridBuild: [
        [1, 1]
      ]
    },
    'civilian-building-27': {
      name: 'civilian-building-27',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 3
      }, {
        name: 'damaged',
        count: 3
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'civilian-building-30': {
      name: 'civilian-building-30',
      label: 'Civilian Building',
      powerIn: 0,
      powerOut: 20,
      cost: 0,
      sight: 2,
      hitPoints: 200,
      dependency: undefined,
      owner: 'none',
      action: 'stand',
      hasBib: false,
      spriteImages: [{
        name: 'healthy',
        count: 3
      }, {
        name: 'damaged',
        count: 3
      }, {
        name: 'ultra-damaged',
        count: 1
      }],
      pixelWidth: 48,
      pixelHeight: 48,
      gridShape: [
        [0, 0],
        [1, 1]
      ],
      gridBuild: [
        [1, 1],
        [1, 1]
      ]
    },
    'weapons-factory': {
      name: 'weapons-factory',
      label: 'Weapons Factory',
      powerIn: 30,
      powerOut: 0,
      cost: 2e3,
      sight: 3,
      owner: 'gdi',
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'refinery'],
      armor: 2,
      hitPoints: 200,
      hasBib: true,
      spriteImages: [{
        name: 'build',
        count: 20
      }, {
        name: 'damaged',
        count: 1
      }, {
        name: 'damaged-base',
        count: 1
      }, {
        name: 'damaged-construct',
        count: 9
      }, {
        name: 'healthy',
        count: 1
      }, {
        name: 'healthy-base',
        count: 1
      }, {
        name: 'healthy-construct',
        count: 9
      }, {
        name: 'ultra-damaged',
        count: 0
      }, {
        name: 'ultra-damaged-base',
        count: 1
      }],
      pixelWidth: 72,
      pixelHeight: 72,
      gridShape: [
        [1, 1, 1],
        [1, 1, 1]
      ],
      gridBuild: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
    },
    airstrip: {
      name: 'airstrip',
      label: 'Air Strip',
      powerIn: 30,
      powerOut: 0,
      cost: 2e3,
      sight: 5,
      owner: 'nod',
      dependency: ['construction-yard', 'power-plant|advanced-power-plant', 'refinery'],
      armor: 3,
      hitPoints: 500,
      hasBib: true,
      spriteImages: [{
        name: 'healthy',
        count: 16
      }, {
        name: 'damaged',
        count: 16
      }, {
        name: 'ultra-damaged',
        count: 1
      }, {
        name: 'build',
        count: 14
      }],
      pixelWidth: 96,
      pixelHeight: 48,
      gridShape: [
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ],
      gridBuild: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]
    }
  },
  defaults: {
    action: 'stand',
    type: 'buildings',
    armor: 1,
    z: 0,
    powerOut: 0,
    powerIn: 0,
    orders: {
      type: 'stand'
    },
    animationIndex: 0,
    selected: false,
    processOrders: function () {
      if (this.timeBomb) {
        this.timeBomb--
        if (this.timeBomb == 0) {
          this.life = 0
        }
      }
      this.lifeCode = getLifeCode(this)
      if (this.lifeCode == 'dead') {
        if (!this.exploding) {
          this.exploding = true
          var removeItem = this
          game.remove(removeItem)
          game.add({
            type: 'effects',
            name: 'fball1',
            x: this.cgX,
            y: this.cgY,
            background: this
          })
          sounds.play('crumble')
          if (this.attackedBy) {
            game.kills[this.attackedBy]++
            game.deaths[this.player]++
          }
        }
        return
      }
      if (this.action == 'build' || this.action == 'sell') {
        return
      }
      switch (this.orders.type) {
        case 'auto-load':
          if (this.action == 'build' || this.action == 'sell') {
            return
          }
          if (!this.docked || this.lifeCode == 'ultra-damaged') {
            this.action = 'stand'
          } else if (this.docked && this.docked.ammunition == this.docked.maxAmmunition) {
            this.action = 'stand'
          } else if (this.docked && this.action != 'reload-ammo' && this.action != 'build' && this.action != 'sell' && this.docked.z == 0) {
            this.action = 'reload-ammo'
            this.animationIndex = 0
          }
          break
        case 'auto-repair':
          if (this.lifeCode == 'ultra-damaged' || this.lifeCode == 'dead') {
            return
          }
          this.orders.repairTargets = []
          for (var i = game.vehicles.length - 1; i >= 0; i--) {
            var vehicle = game.vehicles[i]
            if (vehicle.team == this.team && vehicle.player == this.player && vehicle.life < vehicle.hitPoints && vehicle.lifeCode !== 'dead' && vehicle.x >= this.x + 0.5 && vehicle.y >= this.y + 0.5 && vehicle.x <= this.x + 2.5 && vehicle.y <= this.y + 2.5) {
              this.orders.repairTargets.push(vehicle)
            }
          }
          if (this.orders.repairTargets.length > 0) {
            this.action = 'repair-vehicle'
            for (var i = this.orders.repairTargets.length - 1; i >= 0; i--) {
              var item = this.orders.repairTargets[i]
              var cashSpent = 0.5
              if (game.cash[this.player] > cashSpent) {
                game.cash[this.player] -= cashSpent
                item.life += cashSpent * 2 * item.hitPoints / item.cost
                if (item.life > item.hitPoints) {
                  item.life = item.hitPoints
                }
              }
            }
          } else {
            this.action = 'stand'
          }
          break
        case 'sell':
          if (this.animationIndex === 0) {
            sounds.play('sell')
          }
          this.repairing = false
          this.action = 'sell'
          break
        case 'repair':
          this.orders = {
            type: 'stand'
          }
          this.repairing = true
          sounds.play('button')
          break
        case 'stop-repair':
          this.orders = {
            type: 'stand'
          }
          this.repairing = false
          sounds.play('button')
          break
        case 'harvest':
          if (this.action == 'stand') {
            this.animationIndex = 0
            this.action = 'docking'
          }
          break
      }
    },
    drawSelection: function () {
      var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
      var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
      game.foregroundContext.drawImage(this.selectImage, x, y)
      var selectBarHeight = 4
      game.foregroundContext.beginPath()
      game.foregroundContext.rect(x, y - selectBarHeight - 3, this.pixelWidth * this.life / this.hitPoints, selectBarHeight)
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
      game.foregroundContext.rect(x, y - selectBarHeight - 3, this.pixelWidth, selectBarHeight)
      game.foregroundContext.stroke()
    },
    draw: function () {
      var x = Math.round(this.x * game.gridSize) - game.viewportX + game.viewportLeft
      var y = Math.round(this.y * game.gridSize) - game.viewportY + game.viewportTop
      if (x < -this.pixelWidth || y < -this.pixelHeight - (this.hasBib ? 24 : 0) || x > game.viewportWidth || y > game.viewportHeight) {
        return
      }
      if (this.hasBib) {
        game.foregroundContext.drawImage(this.bibSpriteSheet, this.bibOffsetX, this.bibOffsetY, this.pixelWidth, 48, x, y + this.pixelHeight - 24, this.pixelWidth, 48)
      }
      if (this.baseImage && this.action != 'build' && this.action != 'sell') {
        game.foregroundContext.drawImage(this.spriteCanvas, this.baseImage.offset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
      }
      game.foregroundContext.drawImage(this.spriteCanvas, this.imageOffset * this.pixelWidth, this.spriteColorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight)
      if (this.selected) {
        this.drawSelection()
      }
      if (this.repairing) {
        game.foregroundContext.globalAlpha = sidebar.textBrightness
        game.foregroundContext.drawImage(sidebar.repairImageBig, x + (this.pixelWidth - sidebar.repairImageBig.width) / 2, y + (this.pixelHeight - sidebar.repairImageBig.height) / 2)
        game.foregroundContext.globalAlpha = 1
      }
    },
    releaseHarvester: function () {
      this.action = 'stand'
      this.animationIndex = 0
      this.orders.harvester.orders.type = 'harvest'
      this.orders.harvester.player = this.player
      this.orders.harvester.team = this.team
      this.orders.harvester.percentLife = this.orders.harvester.life / this.orders.harvester.hitPoints
      game.add(this.orders.harvester)
      if (this.nextHarvester) {
        this.nextHarvester = undefined
      }
      this.orders = {
        type: 'stand'
      }
    },
    animate: function () {
      if (this.lifeCode == 'dead') {
        this.imageList = this.spriteArray['ultra-damaged']
        this.imageOffset = this.imageList.offset
        return
      }
      this.spriteColorOffset = game.colorHash[this.player].index * this.pixelHeight
      if (this.nextHarvester && this.orders.harvester != this.nextHarvester && this.nextHarvester.lifeCode == 'dead') {
        this.nextHarvester = undefined
      }
      this.baseImage = this.spriteArray[this.lifeCode + '-base']
      switch (this.action) {
        case 'stand':
          if (this.name == 'tiberium-silo') {
            this.imageList = this.spriteArray[this.lifeCode]
            this.imageOffset = this.imageList.offset + 0
          } else {
            this.imageList = this.spriteArray[this.lifeCode]
            this.imageOffset = this.imageList.offset + this.animationIndex
            this.animationIndex++
            if (this.animationIndex >= this.imageList.count) {
              this.animationIndex = 0
            }
          }
          break
        case 'repair-vehicle':
          this.imageList = this.spriteArray['repair-' + this.lifeCode]
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
          }
          break
        case 'reload-ammo':
          this.imageList = this.spriteArray[this.lifeCode + '-reload-ammo']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.docked.ammunition++
            if (this.docked.ammunition == this.docked.maxAmmunition) {
              this.action = 'stand'
            }
          }
          break
        case 'build':
          this.imageList = this.spriteArray['build']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.action = 'stand'
            if (this.name == 'refinery') {
              game.add({
                name: 'harvester',
                orders: {
                  type: 'harvest'
                },
                type: 'vehicles',
                team: this.team,
                player: this.player,
                direction: 14,
                x: this.x + 0.5,
                y: this.y + 2.5
              })
            } else if (this.name == 'helipad') {
              var unitName = this.team == 'gdi' ? 'orca' : 'apache'
              this.docked = game.add({
                name: unitName,
                type: 'aircraft',
                player: this.player,
                team: this.team,
                x: this.x + 1,
                y: this.y + 1,
                direction: 24,
                helipad: this,
                orders: {
                  type: 'dock'
                }
              })
            }
          }
          break
        case 'docking':
          if (this.lifeCode == 'ultra-damaged' || this.lifeCode == 'dead') {
            this.releaseHarvester()
            break
          }
          this.imageList = this.spriteArray[this.lifeCode + '-docking']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.action = 'loading'
          }
          break
        case 'loading':
          if (this.lifeCode == 'ultra-damaged') {
            this.releaseHarvester()
            break
          }
          this.imageList = this.spriteArray[this.lifeCode + '-loading']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.orders.harvester.tiberium--
            game.cash[this.player] += 50
            if (this.orders.harvester.tiberium <= 0) {
              this.action = 'undocking'
            }
          }
          break
        case 'undocking':
          if (this.lifeCode == 'ultra-damaged') {
            this.releaseHarvester()
            break
          }
          this.imageList = this.spriteArray[this.lifeCode + '-undocking']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.releaseHarvester()
          }
          break
        case 'construct':
          this.imageList = this.spriteArray[this.lifeCode + '-construct']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.action = 'stand'
          }
          break
        case 'launch':
          this.imageList = this.spriteArray[this.lifeCode + '-launch']
          this.imageOffset = this.imageList.offset + this.animationIndex
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            this.action = 'stand'
          }
          break
        case 'sell':
          this.imageList = this.spriteArray['build']
          this.imageOffset = this.imageList.offset + (this.imageList.count - this.animationIndex - 1)
          this.animationIndex++
          if (this.animationIndex >= this.imageList.count) {
            this.animationIndex = 0
            game.remove(this)
            game.cash[this.player] += this.cost / 2
            this.action = 'stand'
          }
          break
      }
      if (this.repairing) {
        if (this.life >= this.hitPoints) {
          this.repairing = false
          this.life = this.hitPoints
        } else {
          var cashSpent = 0.5
          if (game.cash[this.player] > cashSpent) {
            game.cash[this.player] -= cashSpent
            this.life += cashSpent * 2 * this.hitPoints / this.cost
          }
        }
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
    item.cgX = item.x + item.pixelWidth / 2 / game.gridSize
    item.cgY = item.y + item.gridShape.length / 2
    item.softCollisionRadius = item.pixelWidth / 2
    item.hardCollisionRadius = item.pixelWidth / 4
    return item
  },
  load: function (name) {
    var item = this.list[name]
    console.log('Loading', name, '...')
    item.type = this.type
    item.spriteCanvas = document.createElement('canvas')
    item.spriteSheet = loader.loadImage('images/' + this.type + '/' + name + '-sprite-sheet.png', function (image) {
      createSpriteSheetCanvas(image, item.spriteCanvas, 'colormap')
    })
    item.selectImage = loader.loadImage('images/' + 'sidebar/select-' + item.pixelWidth / game.gridSize + '-' + item.pixelHeight / game.gridSize + '.png')
    item.spriteArray = []
    item.spriteCount = 0
    item.bibSpriteSheet = loader.loadImage('images/' + this.type + '/bib-sprite-sheet.png')
    item.bibOffsetX = item.pixelWidth == 72 ? 48 : item.pixelWidth == 96 ? 119 : 0
    item.bibOffsetY = maps.currentMapData.theater == 'desert' ? 48 : 0
    item.gridWidth = item.gridShape[0].length
    item.gridHeight = item.gridShape.length
    for (var i = 0; i < item.spriteImages.length; i++) {
      var constructImageCount = item.spriteImages[i].count
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
