var loader = {
  loaded: true,
  loadedCount: 0,
  totalCount: 0,
  init: function () {
    var mp3Support, oggSupport
    var audio = document.createElement('audio')
    if (audio.canPlayType) {
      mp3Support = audio.canPlayType('audio/mpeg') !== ''
      oggSupport = audio.canPlayType('audio/ogg; codecs="vorbis"') !== ''
    } else {
      mp3Support = false
      oggSupport = false
    }
    loader.soundFileExtn = oggSupport ? '.ogg' : mp3Support ? '.mp3' : undefined
    var webMSupport, h264Support
    var video = document.createElement('video')
    if (video.canPlayType) {
      h264Support = (video.canPlayType('video/mp4; codecs="avc1.42E01E"') || video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) !== ''
      webMSupport = video.canPlayType('video/webm; codecs="vp8, vorbis"') !== ''
    } else {
      h264Support = false
      webMSupport = false
    }
    loader.videoFileExtn = webMSupport ? '.webm' : h264Support ? '.mp4' : undefined
  },
  loadImage: function (url, callback) {
    this.totalCount++
    loader.updateStatus()
    this.loaded = false
    $('#loadingscreen').show()
    var image = new Image()
    image.src = url
    image.onload = function (ev) {
      loader.itemLoaded(ev)
      if (callback) {
        callback(image)
      }
    }
    return image
  },
  soundFileExtn: '.ogg',
  loadSound: function (url) {
    var audio = new Audio()
    if (!loader.soundFileExtn) {
      return audio
    }
    this.totalCount++
    loader.updateStatus()
    this.loaded = false
    $('#loadingscreen').show()
    audio.addEventListener('canplaythrough', loader.itemLoaded, false)
    audio.preload = 'auto'
    audio.src = url + loader.soundFileExtn
    audio.load()
    return audio
  },
  loadVideo: function (url) {
    var videoObject = document.createElement('video')
    if (!loader.videoFileExtn) {
      return videoObject
    }
    this.totalCount++
    loader.updateStatus()
    this.loaded = false
    $('#loadingscreen').show()
    videoObject.addEventListener('canplaythrough', loader.itemLoaded, false)
    videoObject.preload = 'auto'
    videoObject.src = url + loader.videoFileExtn
    videoObject.load()
    return videoObject
  },
  itemLoaded: function (e) {
    e.target.removeEventListener('canplaythrough', loader.itemLoaded, false)
    e.target.removeEventListener('canplay', loader.itemLoaded, false)
    e.target.removeEventListener('loadeddata', loader.itemLoaded, false)
    loader.loadedCount++
    loader.updateStatus()
    if (loader.loadedCount === loader.totalCount || loader.loadedCount === 167) { // || loader.loadedCount === 167
      loader.loaded = true
      loader.loadedCount = 0
      loader.totalCount = 0
      $('#loadingscreen').hide()
      if (loader.onload) {
        loader.onload()
        loader.onload = undefined
      }
    }
  },
  updateStatus: function () {
    $('#loadingmessage').html('Loading ' + loader.loadedCount + ' of ' + loader.totalCount + '...')
    var progress = loader.totalCount ? Math.round(100 * loader.loadedCount / loader.totalCount) : 100
    $('#progressbar')[0].value = progress
  }
}