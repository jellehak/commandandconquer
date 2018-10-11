var sounds = {
  list: {
    building_in_progress: ['voice/building_in_progress'],
    insufficient_funds: ['voice/insufficient_funds'],
    building: ['voice/building'],
    on_hold: ['voice/on_hold'],
    cancelled: ['voice/cancelled'],
    cannot_deploy_here: ['voice/cannot_deploy_here'],
    new_construction_options: ['voice/new_construction_options'],
    construction_complete: ['voice/construction_complete'],
    not_ready: ['voice/not_ready'],
    reinforcements_have_arrived: ['voice/reinforcements_have_arrived'],
    low_power: ['voice/low_power'],
    unit_ready: ['voice/unit_ready'],
    gdi_selected: ['voice/gdi_selected'],
    nod_selected: ['voice/nod_selected'],
    battle_control_terminated: ['voice/battle_control_terminated'],
    gdi_building_captured: ['voice/gdi_building_captured'],
    nod_building_captured: ['voice/nod_building_captured'],
    mission_accomplished: ['voice/mission_accomplished'],
    mission_failure: ['voice/mission_failure'],
    construction: ['sounds/construction'],
    crumble: ['sounds/crumble'],
    sell: ['sounds/sell'],
    button: ['sounds/button'],
    scold: ['sounds/scold1'],
    vehicles_select: ['talk/ready_and_waiting', 'talk/vehicle_reporting', 'talk/awaiting_orders'],
    vehicles_move: ['talk/affirmative', 'talk/moving_out', 'talk/acknowledged', 'talk/over_and_out'],
    rocket2: ['sounds/rocket2'],
    rocket1: ['sounds/rocket1'],
    tnkfire6: ['sounds/tnkfire6'],
    tnkfire2: ['sounds/tnkfire2'],
    mgun2: ['sounds/mgun2'],
    mgun11: ['sounds/mgun11'],
    gun18: ['sounds/gun18'],
    gun8: ['sounds/gun8'],
    ramgun2: ['sounds/ramgun2'],
    commando_select: ['talk/yeah1', 'talk/yes1', 'talk/yo1'],
    commando_move: ['talk/gotit1', 'talk/onit1', 'talk/rokroll1'],
    commando_bomb: ['talk/bombit1'],
    commando_killed: ['talk/keepem1', 'talk/laugh1', 'talk/lefty1', 'talk/tuffguy1'],
    commando_die: ['talk/ramyell1'],
    'stealth-tank-appear': ['sounds/trans1'],
    'stealth-tank-disappear': ['sounds/trans1'],
    flamer2: ['sounds/flamer2'],
    obelray1: ['sounds/obelray1'],
    obelpowr: ['sounds/obelpowr'],
    nukemisl: ['sounds/nukemisl'],
    nukexplo: ['sounds/nukexplo'],
    ion1: ['sounds/ion1'],
    xplos: ['sounds/xplos'],
    xplode: ['sounds/xplode'],
    xplobig4: ['sounds/xplobig4'],
    xplobig6: ['sounds/xplobig6'],
    xplosml2: ['sounds/xplosml2'],
    sammotr2: ['sounds/sammotr2'],
    toss: ['sounds/toss'],
    infantry_select: ['talk/reporting', 'talk/unit_reporting', 'talk/awaiting_orders'],
    infantry_move: ['talk/affirmative', 'talk/yes_sir', 'talk/acknowledged', 'talk/right_away'],
    infantry_die: ['sounds/nuyell1', 'sounds/nuyell3', 'sounds/nuyell4', 'sounds/nuyell5'],
    infantry_die_fire: ['sounds/yell1'],
    infantry_die_squish: ['sounds/squish2'],
    music: ['ost/aoi', 'ost/befeared', 'ost/target', 'ost/justdoit', 'ost/ccthang'],
    struggle: ['sounds/struggle'],
    chat_message: ['sounds/tone16'],
    lobby_message: ['sounds/tone2'],
    communications_center_enabled: ['sounds/comcntr1'],
    power_down: ['sounds/powrdn1'],
    nuclear_weapon_available: ['voice/nuclear_weapon_available'],
    nuclear_weapon_launched: ['voice/nuclear_weapon_launched'],
    nuclear_warhead_approaching: ['voice/nuclear_warhead_approaching'],
    select_target: ['voice/select_target'],
    ion_cannon_ready: ['voice/ion_cannon_ready'],
    ion_cannon_charging: ['voice/ion_cannon_charging'],
    air_strike_ready: ['voice/airstrike_ready']
  },
  shuffle: false,
  toggleShuffle: function () {
    sounds.shuffle = !sounds.shuffle
  },
  repeat: false,
  toggleRepeat: function () {
    sounds.repeat = !sounds.repeat
  },
  loaded: {},
  audioVolume: 1,
  setAudioVoume: function (volume) {
    sounds.audioVolume = volume
  },
  startStruggle: function () {
    sounds.struggleSound = sounds.loaded['struggle'].audioObjects[0]
    sounds.struggleSound.loop = true
    sounds.struggleSound.volume = sounds.audioVolume / 3
    sounds.struggleSound.play()
  },
  stopStruggle: function () {
    sounds.struggleSound.pause()
  },
  muteAudio: false,
  toggleAudio: function () {
    sounds.muteAudio = !sounds.muteAudio
    $('#muteaudiobutton').val(sounds.muteAudio ? 'Unmute Audio' : 'Mute Audio')
  },
  muteMusic: false,
  toggleMusic: function () {
    sounds.muteMusic = !sounds.muteMusic
    $('#mutemusicbutton').val(sounds.muteMusic ? 'Unmute Music' : 'Mute Music')
    if (sounds.muteMusic) {
      sounds.pauseMusic()
    }
  },
  musicVoume: 1,
  currentMusic: undefined,
  lastMusicTrack: 0,
  setMusicVoume: function (volume) {
    sounds.musicVoume = volume
    if (sounds.currentMusic) {
      sounds.currentMusic.volume = sounds.musicVoume
    }
  },
  playMusic: function (songId) {
    if (sounds.muteMusic) {
      return
    }
    sounds.stopMusic()
    if (typeof songId === 'number' && songId > -1) {
      sounds.lastMusicTrack = songId
    }
    var musicList = sounds.loaded['music'].audioObjects
    sounds.currentMusic = musicList[sounds.lastMusicTrack]
    sounds.lastMusicTrack++
    if (sounds.lastMusicTrack >= musicList.length) {
      sounds.lastMusicTrack = 0
    }
    sounds.resumeMusic()
  },
  pauseMusic: function () {
    if (sounds.currentMusic) {
      sounds.currentMusic.pause()
      $(sounds.currentMusic).unbind('ended')
    }
  },
  resumeMusic: function () {
    if (sounds.currentMusic) {
      sounds.currentMusic.volume = sounds.musicVoume
      sounds.currentMusic.play()
      var currentMusic = sounds.currentMusic
      $(currentMusic).bind('ended', function () {
        $(currentMusic).unbind('ended')
        sounds.currentMusic = undefined
        sounds.playMusic()
      })
    }
  },
  stopMusic: function () {
    if (sounds.currentMusic) {
      sounds.currentMusic.pause()
      sounds.currentMusic.currentTime = 0
      $(sounds.currentMusic).unbind('ended')
      sounds.currentMusic = undefined
    }
  },
  load: function () {
    $('#muteaudiobutton').click(sounds.toggleAudio)
    $('#mutemusicbutton').click(sounds.toggleMusic)
    for (var soundName in this.list) {
      var sound = {}
      sound.audioObjects = []
      for (var i = 0; i < this.list[soundName].length; i++) {
        sound.audioObjects.push(loader.loadSound('audio/' + this.list[soundName][i]))
      }
      this.loaded[soundName] = sound
    }
  },
  play: function (soundName) {
    if (sounds.muteAudio) {
      return
    }
    var sound = sounds.loaded[soundName]
    if (sound && sound.audioObjects && sound.audioObjects.length > 0) {
      if (!sound.counter || sound.counter >= sound.audioObjects.length) {
        sound.counter = 0
      }
      var audioObject = sound.audioObjects[sound.counter]
      sound.counter++
      audioObject.currentTime = 0
      audioObject.volume = sounds.audioVolume
      audioObject.play()
      return audioObject
    }
  }
}
