var videos = {
    loaded: {},
    currentVideo: undefined,
    musicPlaying: false,
    running: false,
    init: function () {
      videos.context = $('.videocanvas')[0].getContext('2d')
      videos.context.fillStyle = 'black'
      videos.context.scale(2, 2)
    },
    play: function (videoName, onFinishHandler) {
      mouse.setCursor()
      menus.hide()
      videos.musicPlaying = sounds.currentMusic && !sounds.currentMusic.paused && !sounds.currentMusic.ended
      if (videos.musicPlaying) {
        sounds.pauseMusic()
      }
      this.onFinishHandler = onFinishHandler
      var videoObject = this.loaded[videoName]
      this.currentVideo = videoObject
      videoObject.volume = sounds.audioVolume
      videos.running = true
      videoObject.play()
      videos.context.fillRect(0, 0, game.canvasWidth, game.canvasHeight)
      requestAnimationFrame(videos.draw)
    },
    draw: function () {
      if (videos.running && videos.currentVideo && !videos.currentVideo.paused && !videos.currentVideo.ended) {
        videos.context.drawImage(videos.currentVideo, 0, 0, videos.currentVideo.videoWidth, videos.currentVideo.videoWidth, 0, 55, 320, 312)
        requestAnimationFrame(videos.draw)
      }
    },
    stop: function () {
      if (videos.currentVideo && videos.running) {
        videos.currentVideo.pause()
        videos.currentVideo.currentTime = 0
      }
      videos.ended()
    },
    ended: function () {
      videos.running = false
      videos.context.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
      if (this.onFinishHandler) {
        this.onFinishHandler()
      }
      if (videos.musicPlaying) {
        sounds.resumeMusic()
      }
    },
    load: function (videoName) {
      if (!(videoName in videos.loaded)) {
        videos.loaded[videoName] = loader.loadVideo('videos/' + videoName)
        videos.loaded[videoName].addEventListener('ended', function () {
          videos.ended()
        })
      }
    }
  }