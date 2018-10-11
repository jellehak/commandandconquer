// import { aircraft } from './aircraft.js'
// import { buildings } from './buildings.js'

// import { colors } from './colors.js'
// import { palettes } from './palettes.js'

// import './game.js'

!(function () {
  var lastTime = 0
  var vendors = ['ms', ';', 'webkit', 'o']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = (new Date()).getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())
if (!Array.prototype.remove) {
  Array.prototype.remove = function (e) {
    var t, _ref
    if ((t = this.indexOf(e)) > -1) {
      return [].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref
    }
  }
}

function createSpriteSheetCanvas (image, canvas, type) {
  var colorCount = 2
  if (game.type == 'multiplayer') {
    colorCount = multiplayer.players.length
  }
  canvas.width = image.width
  canvas.height = image.height * colorCount
  var context = canvas.getContext('2d')
  for (var i = 0; i < colorCount; i++) {
    context.drawImage(image, 0, image.height * i)
  }
  var imgData = context.getImageData(0, 0, canvas.width, canvas.height)
  var imgDataArray = imgData.data
  var size = imgDataArray.length / 4
  var rThreshold = 25
  var gThreshold = 25
  var bThreshold = 25
  var paletteOriginal = palettes['yellow']
  if (game.type == 'singleplayer') {
    var paletteFinal
    if (type == 'colormap') {
      paletteFinal = palettes['red']
    } else {
      paletteFinal = palettes['gray']
    }
    for (var p = size / 2; p < size; p++) {
      var r = imgDataArray[p * 4]
      var g = imgDataArray[p * 4 + 1]
      var b = imgDataArray[p * 4 + 2]
      var a = imgDataArray[p * 4 + 2]
      for (var i = 16 - 1; i >= 0; i--) {
        var colorOriginal = colors[paletteOriginal[i]]
        var colorFinal = colors[paletteFinal[i]]
        if (Math.abs(r - colorOriginal[0]) < rThreshold && Math.abs(g - colorOriginal[1]) < gThreshold && Math.abs(b - colorOriginal[2]) < bThreshold) {
          imgDataArray[p * 4 + 0] = colorFinal[0]
          imgDataArray[p * 4 + 1] = colorFinal[1]
          imgDataArray[p * 4 + 2] = colorFinal[2]
          break
        }
      }
    }
  } else {
    for (var j = 0; j < colorCount; j++) {
      var paletteFinal = palettes[multiplayer.players[j].color]
      for (var p = size * j / colorCount; p < size * (j + 1) / colorCount; p++) {
        var r = imgDataArray[p * 4]
        var g = imgDataArray[p * 4 + 1]
        var b = imgDataArray[p * 4 + 2]
        var a = imgDataArray[p * 4 + 2]
        for (var i = 16 - 1; i >= 0; i--) {
          var colorOriginal = colors[paletteOriginal[i]]
          var colorFinal = colors[paletteFinal[i]]
          if (Math.abs(r - colorOriginal[0]) < rThreshold && Math.abs(g - colorOriginal[1]) < gThreshold && Math.abs(b - colorOriginal[2]) < bThreshold) {
            imgDataArray[p * 4 + 0] = colorFinal[0]
            imgDataArray[p * 4 + 1] = colorFinal[1]
            imgDataArray[p * 4 + 2] = colorFinal[2]
            break
          }
        }
      }
    }
  }
  context.putImageData(imgData, 0, 0)
  return canvas
}

function getLifeCode (object) {
  var lifePercent = roundFloating(object.life / object.hitPoints)
  var lifeCode
  if (lifePercent > 0.5) {
    lifeCode = 'healthy'
  } else if (lifePercent > 0.25) {
    lifeCode = 'damaged'
  } else if (lifePercent > 0.05) {
    lifeCode = 'ultra-damaged'
  } else {
    lifeCode = 'dead'
  }
  return lifeCode
}

function roundFloating (number) {
  return Math.round(number * 1e4) / 1e4
}
var explosionSound = {
  frag1: 'xplobig4',
  frag3: 'xplobig6',
  vehhit1: 'xplos',
  vehhit2: 'xplos',
  vehhit3: 'xplos',
  atomsfx: 'nukexplo',
  fball1: 'xplos',
  'art-exp1': 'xplosml2',
  napalm1: 'flamer2',
  napalm2: 'flamer2',
  napalm3: 'flamer2'
}


$(window).ready(function () {
  if (window !== top) {
    top.location.replace(document.location)
  }
  game.init()
})

!(function ($) {
  $.fn.noUiSlider = function (method, options) {
    function neg (a) {
      return a < 0
    }

    function abs (a) {
      return Math.abs(a)
    }

    function roundTo (a, b) {
      return Math.round(a / b) * b
    }

    function dup (a) {
      return jQuery.extend(true, {}, a)
    }
    var defaults, methods, helpers, options = options || [],
      functions, touch = 'ontouchstart' in document.documentElement
    defaults = {
      handles: 2,
      connect: true,
      scale: [0, 100],
      start: [25, 75],
      to: 0,
      handle: 0,
      change: '',
      end: '',
      step: false,
      save: false,
      click: true
    }
    helpers = {
      scale: function (a, b, c) {
        var d = b[0],
          e = b[1]
        if (neg(d)) {
          a = a + abs(d)
          e = e + abs(d)
        } else {
          a = a - d
          e = e - d
        }
        return a * c / e
      },
      deScale: function (a, b, c) {
        var d = b[0],
          e = b[1]
        e = neg(d) ? e + abs(d) : e - d
        return a * e / c + d
      },
      connect: function (api) {
        if (api.connect) {
          if (api.handles.length > 1) {
            api.connect.css({
              left: api.low.left(),
              right: api.slider.innerWidth() - api.up.left()
            })
          } else {
            api.low ? api.connect.css({
              left: api.low.left(),
              right: 0
            }) : api.connect.css({
              left: 0,
              right: api.slider.innerWidth() - api.up.left()
            })
          }
        }
      },
      left: function () {
        return parseFloat($(this).css('left'))
      },
      call: function (f, t, n) {
        if (typeof f === 'function') {
          f.call(t, n)
        }
      },
      bounce: function (api, n, c, handle) {
        var go = false
        if (handle.is(api.up)) {
          if (api.low && n < api.low.left()) {
            n = api.low.left()
            go = true
          }
        } else {
          if (api.up && n > api.up.left()) {
            n = api.up.left()
            go = true
          }
        }
        if (n > api.slider.innerWidth()) {
          n = api.slider.innerWidth()
          go = true
        } else if (n < 0) {
          n = 0
          go = true
        }
        return [n, go]
      }
    }
    methods = {
      init: function () {
        return this.each(function () {
          var s, slider, api
          slider = $(this).css('position', 'relative')
          api = new Object()
          api.options = $.extend(defaults, options)
          s = api.options
          typeof s.start === 'object' ? 1 : s.start = [s.start]
          api.slider = slider
          api.low = $('<div class="noUi-handle noUi-lowerHandle"><div></div></div>')
          api.up = $('<div class="noUi-handle noUi-upperHandle"><div></div></div>')
          api.connect = $('<div class="noUi-midBar"></div>')
          s.connect ? api.connect.appendTo(api.slider) : api.connect = false
          if (s.knobs) {
            s.handles = s.knobs
          }
          if (s.handles === 1) {
            if (s.connect === true || s.connect === 'lower') {
              api.low = false
              api.up = api.up.appendTo(api.slider)
              api.handles = [api.up]
            } else if (s.connect === 'upper' || !s.connect) {
              api.low = api.low.prependTo(api.slider)
              api.up = false
              api.handles = [api.low]
            }
          } else {
            api.low = api.low.prependTo(api.slider)
            api.up = api.up.appendTo(api.slider)
            api.handles = [api.low, api.up]
          }
          if (api.low) {
            api.low.left = helpers.left
          }
          if (api.up) {
            api.up.left = helpers.left
          }
          api.slider.children().css('position', 'absolute')
          $.each(api.handles, function (index) {
            $(this).css({
              left: helpers.scale(s.start[index], api.options.scale, api.slider.innerWidth()),
              zIndex: index + 1
            }).children().bind(touch ? 'touchstart.noUi' : 'mousedown.noUi', functions.start)
          })
          if (s.click) {
            api.slider.click(functions.click).find('*:not(.noUi-midBar)').click(functions.flse)
          }
          helpers.connect(api)
          api.options = s
          api.slider.data('api', api)
        })
      },
      move: function () {
        var api, bounce, to, handle, scale
        api = dup($(this).data('api'))
        api.options = $.extend(api.options, options)
        if (api.options.knob) {
          api.options.handle = api.options.knob
        }
        handle = api.options.handle
        handle = api.handles[handle == 'lower' || handle == 0 || typeof handle === 'undefined' ? 0 : 1]
        bounce = helpers.bounce(api, helpers.scale(api.options.to, api.options.scale, api.slider.innerWidth()), handle.left(), handle)
        handle.css('left', bounce[0])
        if (handle.is(api.up) && handle.left() == 0 || handle.is(api.low) && handle.left() == api.slider.innerWidth()) {
          handle.css('zIndex', parseInt(handle.css('zIndex')) + 2)
        }
        if (options.save === true) {
          api.options.scale = options.scale
          $(this).data('api', api)
        }
        helpers.connect(api)
        helpers.call(api.options.change, api.slider, 'move')
        helpers.call(api.options.end, api.slider, 'move')
      },
      value: function () {
        var val1, val2, api
        api = dup($(this).data('api'))
        api.options = $.extend(api.options, options)
        val1 = api.low ? Math.round(helpers.deScale(api.low.left(), api.options.scale, api.slider.innerWidth())) : false
        val2 = api.up ? Math.round(helpers.deScale(api.up.left(), api.options.scale, api.slider.innerWidth())) : false
        if (options.save) {
          api.options.scale = options.scale
          $(this).data('api', api)
        }
        return [val1, val2]
      },
      api: function () {
        return $(this).data('api')
      },
      disable: function () {
        return this.each(function () {
          $(this).addClass('disabled')
        })
      },
      enable: function () {
        return this.each(function () {
          $(this).removeClass('disabled')
        })
      }
    }, functions = {
      start: function (e) {
        if (!$(this).parent().parent().hasClass('disabled')) {
          e.preventDefault()
          $('body').bind('selectstart.noUi', functions.flse)
          $(this).addClass('noUi-activeHandle')
          $(document).bind(touch ? 'touchmove.noUi' : 'mousemove.noUi', functions.move)
          touch ? $(this).bind('touchend.noUi', functions.end) : $(document).bind('mouseup.noUi', functions.end)
        }
      },
      move: function (e) {
        var a, b, h, api, go = false,
          handle, bounce
        h = $('.noUi-activeHandle')
        api = h.parent().parent().data('api')
        handle = h.parent().is(api.low) ? api.low : api.up
        a = e.pageX - Math.round(api.slider.offset().left)
        if (isNaN(a)) {
          a = e.originalEvent.touches[0].pageX - Math.round(api.slider.offset().left)
        }
        b = handle.left()
        bounce = helpers.bounce(api, a, b, handle)
        a = bounce[0]
        go = bounce[1]
        if (api.options.step && !go) {
          var v1 = api.options.scale[0],
            v2 = api.options.scale[1]
          if (neg(v2)) {
            v2 = abs(v1 - v2)
            v1 = 0
          }
          v2 = v2 + -1 * v1
          var con = helpers.scale(api.options.step, [0, v2], api.slider.innerWidth())
          if (Math.abs(b - a) >= con) {
            a = a < b ? b - con : b + con
            go = true
          }
        } else {
          go = true
        }
        if (a === b) {
          go = false
        }
        if (go) {
          handle.css('left', a)
          if (handle.is(api.up) && handle.left() == 0 || handle.is(api.low) && handle.left() == api.slider.innerWidth()) {
            handle.css('zIndex', parseInt(handle.css('zIndex')) + 2)
          }
          helpers.connect(api)
          helpers.call(api.options.change, api.slider, 'slide')
        }
      },
      end: function () {
        var handle, api
        handle = $('.noUi-activeHandle')
        api = handle.parent().parent().data('api')
        $(document).add('body').add(handle.removeClass('noUi-activeHandle').parent()).unbind('.noUi')
        helpers.call(api.options.end, api.slider, 'slide')
      },
      click: function (e) {
        if (!$(this).hasClass('disabled')) {
          var api = $(this).data('api')
          var s = api.options
          var c = e.pageX - api.slider.offset().left
          c = s.step ? roundTo(c, helpers.scale(s.step, s.scale, api.slider.innerWidth())) : c
          if (api.low && api.up) {
            c < (api.low.left() + api.up.left()) / 2 ? api.low.css('left', c) : api.up.css('left', c)
          } else {
            api.handles[0].css('left', c)
          }
          helpers.connect(api)
          helpers.call(s.change, api.slider, 'click')
          helpers.call(s.end, api.slider, 'click')
        }
      },
      flse: function () {
        return false
      }
    }
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('No such method: ' + method)
    }
  }
}(jQuery))
var mouse = {
  cursors: [],
  cursorCount: 0,
  load: function () {
    mouse.canvas = $('.mousecanvas')[0]
    mouse.context = mouse.canvas.getContext('2d')
    mouse.spriteImage = loader.loadImage('images/mouse.png')
    mouse.blankCursor = loader.loadImage('images/blank.gif')
    mouse.defaultCursor = loader.loadImage('images/default-cursor.gif')
    mouse.loadCursor('default')
    mouse.loadCursor('pan_top', 15, 0)
    mouse.loadCursor('pan_top_right', 30, 0)
    mouse.loadCursor('pan_right', 30, 12)
    mouse.loadCursor('pan_bottom_right', 30, 24)
    mouse.loadCursor('pan_bottom', 15, 24)
    mouse.loadCursor('pan_bottom_left', 0, 24)
    mouse.loadCursor('pan_left', 0, 12)
    mouse.loadCursor('pan_top_left', 0, 0)
    mouse.loadCursor('no_default')
    mouse.loadCursor('move', 15, 12)
    mouse.loadCursor('no_move', 15, 12)
    mouse.loadCursor('select', 15, 12, 6)
    mouse.loadCursor('attack', 15, 12, 8)
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('repair', 15, 0, 24)
    mouse.loadCursor('build_command', 15, 12, 9)
    mouse.loadCursor('sell', 15, 12, 24)
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('blue_attack', 15, 12, 8)
    mouse.loadCursor('nuke_attack', 15, 12, 7)
    mouse.loadCursor('green_attack', 15, 12, 16)
    mouse.loadCursor('load', 15, 12, 3, 2)
    mouse.loadCursor('detonate', 15, 12, 3)
    mouse.loadCursor('no_sell', 15, 12)
    mouse.loadCursor('no_repair', 15, 0)
    mouse.loadCursor('little_detonate', 15, 12, 3)
    mouse.loadCursor('no_pan_top', 15, 0)
    mouse.loadCursor('no_pan_top_right', 30, 0)
    mouse.loadCursor('no_pan_right', 30, 12)
    mouse.loadCursor('no_pan_bottom_right', 30, 24)
    mouse.loadCursor('no_pan_bottom', 15, 24)
    mouse.loadCursor('no_pan_bottom_left', 0, 24)
    mouse.loadCursor('no_pan_left', 0, 12)
    mouse.loadCursor('no_pan_top_left', 0, 0)
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('another_attack', 15, 12, 8)
    mouse.loadCursor('another_load', 15, 12, 3, 2)
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('unknown')
    mouse.loadCursor('another_sell', 15, 12, 24)
    mouse.cursor = mouse.cursors['default']
    mouse.listenEvents()
  },
  loadCursor: function (name, x, y, imageCount, cursorSpeed) {
    if (!x && !y) {
      x = 0
      y = 0
    }
    if (!cursorSpeed) {
      cursorSpeed = 1
    }
    if (!imageCount) {
      imageCount = 1
    }
    this.cursors[name] = {
      x: x,
      y: y,
      name: name,
      count: imageCount,
      spriteOffset: this.cursorCount,
      cursorSpeed: cursorSpeed
    }
    this.cursorCount += imageCount
  },
  click: function (ev, rightClick) {
    if (!game.running) {
      return
    }
    if (mouse.y <= game.viewportTop && mouse.y > game.viewportTop - 15) {
      if (mouse.x >= 0 && mouse.x < 160) {
        if (game.replay) {} else {
          if (game.type == 'singleplayer') {
            singleplayer.gameOptions()
          } else {
            multiplayer.gameOptions()
          }
        }
      } else if (mouse.x >= 320 && mouse.x < 480) {} else if (mouse.x >= 480 && mouse.x < 640) {
        sidebar.visible = !sidebar.visible
        game.refreshBackground = true
      }
    } else if (mouse.y >= game.viewportTop && mouse.y <= game.viewportTop + game.viewportHeight) {
      if (sidebar.visible && mouse.x > sidebar.left) {
        sidebar.click(ev, rightClick)
      } else {
        game.click(ev, rightClick)
      }
    }
  },
  listenEvents: function () {
    var $mouseCanvas = $('.mousecanvas')
    $mouseCanvas.mousemove(function (ev) {
      var offset = $mouseCanvas.offset()
      mouse.x = Math.round((ev.pageX - offset.left) * game.scaleFactor)
      mouse.y = Math.round((ev.pageY - offset.top) * game.scaleFactor)
      mouse.gameX = mouse.x - game.viewportAdjustX
      mouse.gameY = mouse.y - game.viewportAdjustY
      mouse.gridX = Math.floor(mouse.gameX / game.gridSize)
      mouse.gridY = Math.floor(mouse.gameY / game.gridSize)
      if (mouse.buttonPressed) {
        if (game.running && (Math.abs(mouse.dragX - mouse.gameX) > 4 || Math.abs(mouse.dragY - mouse.gameY) > 4)) {
          mouse.dragSelect = true
        }
      } else {
        mouse.dragSelect = false
      }
      mouse.draw()
    })
    $mouseCanvas.click(function (ev) {
      mouse.click(ev, false)
      mouse.dragSelect = false
      return false
    })
    $mouseCanvas.mousedown(function (ev) {
      if (ev.which == 1) {
        mouse.buttonPressed = true
        mouse.dragX = mouse.gameX
        mouse.dragY = mouse.gameY
        ev.preventDefault()
      }
      return false
    })
    $mouseCanvas.bind('contextmenu', function (ev) {
      mouse.click(ev, true)
      return false
    })
    $mouseCanvas.mouseup(function (ev) {
      if (ev.which == 1) {
        if (mouse.dragSelect && !game.showMessage) {
          if (!ev.shiftKey) {
            game.clearSelection()
          }
          var x1 = Math.min(mouse.gameX, mouse.dragX)
          var y1 = Math.min(mouse.gameY, mouse.dragY)
          var x2 = Math.max(mouse.gameX, mouse.dragX)
          var y2 = Math.max(mouse.gameY, mouse.dragY)
          var lastUnit
          for (var i = game.items.length - 1; i >= 0; i--) {
            var unit = game.items[i]
            if (unit.type != 'buildings' && unit.type != 'turrets' && !unit.unselectable && unit.player == game.player && x1 <= unit.x * game.gridSize && x2 >= unit.x * game.gridSize && y1 <= (unit.y - unit.z) * game.gridSize && y2 >= (unit.y - unit.z) * game.gridSize) {
              game.selectItem(unit, ev.shiftKey, true)
              lastUnit = unit
            }
          }
          if (lastUnit && !game.replay) {
            if (game.selectedCommandos.length > 0) {
              sounds.play('commando_select')
            } else {
              sounds.play(lastUnit.type + '_select')
            }
          }
        }
        mouse.buttonPressed = false
      }
      return false
    })
    $mouseCanvas.mouseleave(function (ev) {
      mouse.insideCanvas = false
      mouse.draw()
    })
    $mouseCanvas.mouseenter(function (ev) {
      mouse.buttonPressed = false
      mouse.insideCanvas = true
    })
    $(document).keydown(function (ev) {
      game.keyPressed(ev)
    })
    $(document).keyup(function (ev) {
      game.keyReleased(ev)
    })
  },
  cursorLoop: 0,
  underMouse: function () {
    if (mouse.y < game.viewportTop || mouse.y > game.viewportTop + game.viewportHeight || fog.isPointOverFog(mouse.gameX, mouse.gameY)) {
      return false
    }
    var selection = false
    for (var i = game.items.length - 1; i >= 0; i--) {
      var item = game.items[i]
      if (item.type == 'buildings' || item.type == 'turrets' || item.type == 'walls' || item.type == 'tiberium') {
        if (item.x <= mouse.gameX / game.gridSize && item.x >= (mouse.gameX - item.pixelWidth) / game.gridSize && item.y <= mouse.gameY / game.gridSize && item.y >= (mouse.gameY - item.pixelHeight) / game.gridSize) {
          if (item.z > -1) {
            return item
          } else {
            selection = item
          }
        }
      } else {
        if (item.lifeCode != 'dead' && item.type != 'trees' && Math.pow(item.x - mouse.gameX / game.gridSize, 2) + Math.pow(item.y - item.z - mouse.gameY / game.gridSize, 2) < Math.pow((item.softCollisionRadius + 4) / game.gridSize, 2)) {
          if (!item.cloaked || item.player == game.player) {
            return item
          }
        }
      }
    }
    return selection
  },
  setCursor: function () {
    mouse.cursor = mouse.cursors['default']
    mouse.tooltip = undefined
    this.objectUnderMouse = undefined
    if (!game.running) {
      return
    }
    if (mouse.y < game.viewportTop) {
      mouse.cursor = mouse.cursors['default']
    } else if (mouse.y >= game.viewportTop && mouse.y <= game.viewportTop + game.viewportHeight) {
      this.objectUnderMouse = mouse.underMouse()
      if (mouse.panDirection && mouse.panDirection !== '') {
        mouse.cursor = mouse.cursors[mouse.panDirection]
      } else if (sidebar.visible && mouse.x > sidebar.left) {
        mouse.cursor = mouse.cursors['default']
        var button = sidebar.hoveredButton()
        if (game.running && button) {
          var tooltipName = button.label
          var tooltipCost = '$' + button.cost
          mouse.tooltip = button.type != 'special' ? [tooltipName, tooltipCost] : [tooltipName]
        }
      } else if (sidebar.deployMode) {
        if (sidebar.deploySpecial) {
          switch (sidebar.deploySpecial.name) {
            case 'nuclear-strike':
              mouse.cursor = mouse.cursors['nuke_attack']
              break
            case 'ion-cannon':
              mouse.cursor = mouse.cursors['green_attack']
              break
            case 'air-strike':
              mouse.cursor = mouse.cursors['blue_attack']
              break
          }
        }
      } else if (sidebar.repairMode) {
        if (this.objectUnderMouse && this.objectUnderMouse.player == game.player && (this.objectUnderMouse.type === 'buildings' || this.objectUnderMouse.type === 'turrets') && this.objectUnderMouse.life < this.objectUnderMouse.hitPoints) {
          mouse.cursor = mouse.cursors['repair']
        } else {
          mouse.cursor = mouse.cursors['no_repair']
        }
      } else if (sidebar.sellMode) {
        if (this.objectUnderMouse && this.objectUnderMouse.player == game.player && (this.objectUnderMouse.type == 'buildings' || this.objectUnderMouse.type == 'turrets')) {
          this.cursor = this.cursors['sell']
        } else {
          this.cursor = this.cursors['no_sell']
        }
      } else {
        if (this.objectUnderMouse && game.selectedUnits.length == 1 && this.objectUnderMouse.selected && this.objectUnderMouse.name == 'mcv' && this.objectUnderMouse.player == game.player && !game.replay) {
          if (this.objectUnderMouse.canBuildHere) {
            mouse.cursor = mouse.cursors['build_command']
          } else {
            mouse.cursor = mouse.cursors['default']
          }
        } else if (this.objectUnderMouse && game.selectedUnits.length == 1 && this.objectUnderMouse.selected && this.objectUnderMouse.name == 'apc' && this.objectUnderMouse.player == game.player && !game.replay) {
          if (this.objectUnderMouse.cargo.length > 0) {
            mouse.cursor = mouse.cursors['build_command']
          } else {
            mouse.cursor = mouse.cursors['default']
          }
        } else if (this.objectUnderMouse && game.selectedUnits.length == 1 && this.objectUnderMouse.selected && this.objectUnderMouse.name == 'chinook' && this.objectUnderMouse.player == game.player && !game.replay) {
          if (this.objectUnderMouse.cargo.length > 0 && this.objectUnderMouse.z == 0) {
            mouse.cursor = mouse.cursors['build_command']
          } else {
            mouse.cursor = mouse.cursors['default']
          }
        } else if (this.objectUnderMouse && game.selectedInfantry.length > 0 && this.objectUnderMouse.player == game.player && this.objectUnderMouse.name == 'apc' && this.objectUnderMouse.cargo.length < this.objectUnderMouse.maxCargo && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedInfantry.length > 0 && this.objectUnderMouse.player == game.player && this.objectUnderMouse.name == 'chinook' && this.objectUnderMouse.cargo.length < this.objectUnderMouse.maxCargo && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedAircraft.length > 0 && this.objectUnderMouse.player == game.player && this.objectUnderMouse.name == 'helipad' && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedHarvesters.length > 0 && this.objectUnderMouse.name == 'tiberium' && !game.replay) {
          mouse.cursor = mouse.cursors['attack']
        } else if (this.objectUnderMouse && game.selectedHarvesters.length > 0 && this.objectUnderMouse.player == game.player && this.objectUnderMouse.name == 'refinery' && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedVehicles.length > 0 && this.objectUnderMouse.player == game.player && this.objectUnderMouse.name == 'repair-facility' && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedCommandos.length > 0 && (this.objectUnderMouse.type == 'buildings' || this.objectUnderMouse.type == 'turrets') && this.objectUnderMouse.player != game.player && !game.replay) {
          mouse.cursor = mouse.cursors['detonate']
        } else if (this.objectUnderMouse && game.selectedEngineers.length > 0 && this.objectUnderMouse.type == 'buildings' && this.objectUnderMouse.player != game.player && !game.replay) {
          mouse.cursor = mouse.cursors['load']
        } else if (this.objectUnderMouse && game.selectedAttackers.length > 0 && this.objectUnderMouse.player != game.player && !this.objectUnderMouse.unattackable && !game.replay) {
          mouse.cursor = mouse.cursors['attack']
        } else if (this.objectUnderMouse && !this.objectUnderMouse.unselectable && !this.objectUnderMouse.selected) {
          mouse.cursor = mouse.cursors['select']
        } else if (fog.isPointOverFog(mouse.gameX, mouse.gameY) && game.selectedAircraft.length > 0) {
          mouse.cursor = mouse.cursors['no_move']
        } else if (game.selectedUnits.length > 0 && !game.replay) {
          try {
            if (!game.foggedObstructionGrid[game.player][Math.floor(mouse.gridY)][Math.floor(mouse.gridX)]) {
              mouse.cursor = mouse.cursors['move']
            } else {
              mouse.cursor = mouse.cursors['no_move']
            }
          } catch (x) {
            mouse.cursor = mouse.cursors['no_move']
          }
        } else {
          mouse.cursor = mouse.cursors['default']
        }
      }
    }
    mouse.cursorLoop++
    if (mouse.cursorLoop >= mouse.cursor.cursorSpeed * mouse.cursor.count) {
      mouse.cursorLoop = 0
    }
    mouse.draw()
  },
  draw: function () {
    mouse.context.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
    if (mouse.insideCanvas) {
      var imageNumber = mouse.cursor.spriteOffset + Math.floor(mouse.cursorLoop / mouse.cursor.cursorSpeed)
      mouse.context.drawImage(mouse.spriteImage, 30 * imageNumber, 0, 30, 24, mouse.x - mouse.cursor.x, mouse.y - mouse.cursor.y, 30, 24)
      if (this.dragSelect) {
        var x = Math.min(this.gameX, this.dragX)
        var y = Math.min(this.gameY, this.dragY)
        var width = Math.abs(this.gameX - this.dragX)
        var height = Math.abs(this.gameY - this.dragY)
        mouse.context.strokeStyle = 'white'
        mouse.context.strokeRect(x + game.viewportAdjustX, y + game.viewportAdjustY, width, height)
      }
      if (this.tooltip) {
        var tooltipHeight = 14 * this.tooltip.length + 3
        var tooltipWidth = this.tooltip[0].length * 6
        var x = Math.round(this.x)
        if (x + tooltipWidth > sidebar.left + sidebar.width) {
          x = sidebar.width + sidebar.left - tooltipWidth
        }
        var y = Math.round(this.y + 16)
        mouse.context.fillStyle = 'black'
        mouse.context.fillRect(x, y, tooltipWidth, tooltipHeight)
        mouse.context.strokeStyle = 'darkgreen'
        mouse.context.strokeRect(x, y, tooltipWidth, tooltipHeight)
        mouse.context.fillStyle = 'darkgreen'
        mouse.context.font = '12px Command'
        for (var i = 0; i < this.tooltip.length; i++) {
          mouse.context.fillText(this.tooltip[i], x + 4, y + 14 + i * 14)
        }
      }
    }
  },
  panDirection: '',
  panningThreshold: 24,
  panningVelocity: 12,
  handlePanning: function () {
    var panDirection = ''
    game.viewportDeltaX = 0
    game.viewportDeltaY = 0
    if (mouse.insideCanvas || game.upKeyPressed || game.downKeyPressed || game.leftKeyPressed || game.rightKeyPressed) {
      if (game.upKeyPressed || mouse.y <= game.viewportTop + mouse.panningThreshold && mouse.y >= game.viewportTop) {
        game.viewportDeltaY = -mouse.panningVelocity * game.scrollSpeed
        panDirection += '_top'
      } else if (game.downKeyPressed || mouse.y >= game.viewportTop + game.viewportHeight - mouse.panningThreshold && mouse.y <= game.viewportTop + game.viewportHeight && !(sidebar.visible && mouse.x >= 500 && mouse.x <= 632 && mouse.y - sidebar.top >= 455 && mouse.y - sidebar.top <= 480)) {
        game.viewportDeltaY = mouse.panningVelocity * game.scrollSpeed
        panDirection += '_bottom'
      } else {
        game.viewportDeltaY = 0
        panDirection += ''
      }
      if (game.leftKeyPressed || mouse.x < mouse.panningThreshold && mouse.y >= game.viewportTop && mouse.y <= game.viewportTop + game.viewportHeight) {
        game.viewportDeltaX = -mouse.panningVelocity * game.scrollSpeed
        panDirection += '_left'
      } else if (game.rightKeyPressed || mouse.x > game.screenWidth - mouse.panningThreshold && mouse.y >= game.viewportTop && mouse.y <= game.viewportTop + game.viewportHeight) {
        game.viewportDeltaX = mouse.panningVelocity * game.scrollSpeed
        panDirection += '_right'
      } else {
        game.viewportDeltaX = 0
        panDirection += ''
      }
    }
    if (game.viewportX + game.viewportDeltaX < 0 || game.viewportX + game.viewportDeltaX + game.screenWidth + (sidebar.visible ? -sidebar.width : 0) > maps.currentMapImage.width) {
      game.viewportDeltaX = 0
    }
    if (!sidebar.visible && game.viewportX + game.screenWidth > maps.currentMapImage.width) {
      game.viewportX = maps.currentMapImage.width - game.screenWidth
      game.viewportDeltaX = 0
    }
    if (game.viewportY + game.viewportDeltaY < 0 || game.viewportY + game.viewportDeltaY + game.viewportHeight > maps.currentMapImage.height) {
      game.viewportDeltaY = 0
    }
    if (panDirection !== '') {
      if (game.viewportDeltaX === 0 && game.viewportDeltaY === 0) {
        panDirection = 'no_pan' + panDirection
      } else {
        panDirection = 'pan' + panDirection
      }
    }
    mouse.panDirection = panDirection
    game.viewportX += game.viewportDeltaX
    game.viewportY += game.viewportDeltaY
    if (game.viewportDeltaX || game.viewportDeltaY) {
      game.refreshBackground = true
    }
    game.viewportAdjustX = game.viewportLeft - game.viewportX
    game.viewportAdjustY = game.viewportTop - game.viewportY
  }
}
var AStar = (function () {
  function diagonalSuccessors ($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
    if ($N) {
      $E && !grid[N][E] && (result[i++] = {
        x: E,
        y: N
      })
      $W && !grid[N][W] && (result[i++] = {
        x: W,
        y: N
      })
    }
    if ($S) {
      $E && !grid[S][E] && (result[i++] = {
        x: E,
        y: S
      })
      $W && !grid[S][W] && (result[i++] = {
        x: W,
        y: S
      })
    }
    return result
  }

  function diagonalSuccessorsFree ($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
    $N = N > -1
    $S = S < rows
    $E = E < cols
    $W = W > -1
    if ($E) {
      $N && !grid[N][E] && (result[i++] = {
        x: E,
        y: N
      })
      $S && !grid[S][E] && (result[i++] = {
        x: E,
        y: S
      })
    }
    if ($W) {
      $N && !grid[N][W] && (result[i++] = {
        x: W,
        y: N
      })
      $S && !grid[S][W] && (result[i++] = {
        x: W,
        y: S
      })
    }
    return result
  }

  function nothingToDo ($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
    return result
  }

  function successors (find, x, y, grid, rows, cols) {
    var N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      $N = N > -1 && !grid[N][x],
      $S = S < rows && !grid[S][x],
      $E = E < cols && !grid[y][E],
      $W = W > -1 && !grid[y][W],
      result = [],
      i = 0
    $N && (result[i++] = {
      x: x,
      y: N
    })
    $E && (result[i++] = {
      x: E,
      y: y
    })
    $S && (result[i++] = {
      x: x,
      y: S
    })
    $W && (result[i++] = {
      x: W,
      y: y
    })
    return find($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i)
  }

  function diagonal (start, end, f1, f2) {
    return f2(f1(start.x - end.x), f1(start.y - end.y))
  }

  function euclidean (start, end, f1, f2) {
    var x = start.x - end.x,
      y = start.y - end.y
    return f2(x * x + y * y)
  }

  function manhattan (start, end, f1, f2) {
    return f1(start.x - end.x) + f1(start.y - end.y)
  }

  function AStar (grid, start, end, f) {
    var cols = grid[0].length,
      rows = grid.length,
      limit = cols * rows,
      f1 = Math.abs,
      f2 = Math.max,
      list = {},
      result = [],
      open = [{
        x: start[0],
        y: start[1],
        f: 0,
        g: 0,
        v: start[0] + start[1] * cols
      }],
      length = 1,
      adj, distance, find, i, j, max, min, current, next
    end = {
      x: end[0],
      y: end[1],
      v: end[0] + end[1] * cols
    }
    switch (f) {
      case 'Diagonal':
        find = diagonalSuccessors
      case 'DiagonalFree':
        distance = diagonal
        break
      case 'Euclidean':
        find = diagonalSuccessors
      case 'EuclideanFree':
        f2 = Math.sqrt
        distance = euclidean
        break
      default:
        distance = manhattan
        find = nothingToDo
        break
    }
    find || (find = diagonalSuccessorsFree)
    do {
      max = limit
      min = 0
      for (i = 0; i < length; ++i) {
        if ((f = open[i].f) < max) {
          max = f
          min = i
        }
      }
      current = open.splice(min, 1)[0]
      if (current.v != end.v) {
        --length
        next = successors(find, current.x, current.y, grid, rows, cols)
        for (i = 0, j = next.length; i < j; ++i) {
          (adj = next[i]).p = current
          adj.f = adj.g = 0
          adj.v = adj.x + adj.y * cols
          if (!(adj.v in list)) {
            adj.f = (adj.g = current.g + distance(adj, current, f1, f2)) + distance(adj, end, f1, f2)
            open[length++] = adj
            list[adj.v] = 1
          }
        }
      } else {
        i = length = 0
        do {
          result[i++] = {
            x: current.x,
            y: current.y
          }
        } while (current = current.p)
        result.reverse()
      }
    } while (length)
    return result
  }
  return AStar
}())

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


function findClosestEmptySpot (point, opt) {
  var options = opt || {}
  var x = point.x
  var y = point.y
  for (var radius = options.minimumRadius || 1; radius < 10; radius++) {
    for (var i = -radius; i <= radius; i++) {
      for (var j = radius; j >= -radius; j--) {
        if (Math.abs(i) > radius - 1 && Math.abs(j) > radius - 1 && isEmptySpot({
          x: x + i,
          y: y + j
        })) {
          return {
            x: x + i,
            y: y + j
          }
        }
      }
    }
  }
}

function isEmptySpot (point) {
  if (!(point.x >= 0 && point.x <= game.obstructionGrid[0].length - 1 && point.y >= 0 && point.y <= game.obstructionGrid.length - 1 && !game.obstructionGrid[Math.floor(point.y)][Math.floor(point.x)])) {
    return false
  }
  for (var i = game.vehicles.length - 1; i >= 0; i--) {
    var item = game.vehicles[i]
    if (item != point && Math.abs(point.x - item.x) < 1 && Math.abs(point.y - item.y) < 1) {
      return false
    }
  }
  for (var i = game.infantry.length - 1; i >= 0; i--) {
    var item = game.infantry[i]
    if (item != point && Math.abs(point.x - item.x) < 1 && Math.abs(point.y - item.y) < 1) {
      return false
    }
  }
  for (var i = game.aircraft.length - 1; i >= 0; i--) {
    var item = game.aircraft[i]
    if (item != point && item.z < 1 / 8 && Math.abs(point.x - item.x) < 1 && Math.abs(point.y - item.y) < 1) {
      return false
    }
  }
  return true
}

function moveTo (goal) {
  this.lastMovementX = 0
  this.lastMovementY = 0
  var destination = {
    x: goal.x,
    y: goal.y,
    type: goal.type
  }
  if (destination.type == 'buildings' || destination.type == 'turrets') {
    if (this.name == 'engineer' || this.name == 'commando') {
      destination.y = goal.y + goal.gridShape.length - 0.5
      if (goal.gridShape[0].length == 2) {
        if (this.x < goal.cgX) {
          destination.x = goal.x + 0.5
        } else {
          destination.x = goal.x + 1.5
        }
      } else {
        destination.x = goal.cgX
      }
    } else {
      if (this.y < goal.cgY) {
        destination.y = goal.y + 0.5
      } else {
        destination.y = goal.y + goal.gridShape.length - 0.5
      }
      if (this.x < goal.cgX) {
        destination.x = goal.x + 0.5
      } else {
        destination.x = goal.x + goal.gridShape[0].length - 0.5
      }
    }
  }
  var start = [Math.floor(this.x), Math.floor(this.y)]
  var end = [Math.floor(destination.x), Math.floor(destination.y)]
  if (this.start && this.start.x === start.x && this.start.y === start.y && this.destination && this.destination.x === destination.x && this.destination.y === destination.y && this.path && !game.buildingLandscapeChanged) {} else {
    var grid
    if (game.type == 'singleplayer') {
      if (this.player === game.player) {
        grid = $.extend(true, [], game.foggedObstructionGrid[this.player])
      } else {
        grid = $.extend(true, [], game.obstructionGrid)
      }
    } else {
      grid = $.extend(true, [], game.foggedObstructionGrid[this.player])
    }
    if (destination.type == 'turrets' || destination.type == 'buildings') {
      grid[Math.floor(destination.y)][Math.floor(destination.x)] = 0
    }
    var newDirection
    if (start[1] < 0 || start[1] >= grid.length || start[0] < 0 || start[0] > grid[0].length) {
      this.path = []
      newDirection = findAngle(destination, this, this.directions)
    } else {
      this.path = AStar(grid, start, end, 'Euclidean')
      this.start = start
      this.end = end
      if (this.path.length > 1) {
        newDirection = findAngle(this.path[1], this.path[0], this.directions)
      } else if (start == end && !grid[start[1]][start[0]]) {
        newDirection = findAngle(destination, this, this.directions)
      } else {
        return false
      }
    }
  }
  var collisionObjects = this.checkCollision()
  var movement, angleRadians
  if (collisionObjects.length > 0) {
    this.colliding = true
    if (this.path.length > 0) {
      collisionObjects.push({
        collisionType: 'attraction',
        withItem: {
          x: this.path[1].x + 0.5,
          y: this.path[1].y + 0.5
        }
      })
    }
    var forceVector = {
      x: 0,
      y: 0
    }
    var hardCollision = false
    var softHardCollision = false
    for (var i = collisionObjects.length - 1; i >= 0; i--) {
      var collObject = collisionObjects[i]
      var objectAngleRadians = findAngle(collObject.withItem, this, this.directions) * 2 * Math.PI / this.directions
      var forceMagnitude = 0
      switch (collObject.collisionType) {
        case 'ultra-hard':
          forceMagnitude = 8
          hardCollision = true
          break
        case 'hard':
          forceMagnitude = 3
          hardCollision = true
          break
        case 'soft-hard':
          forceMagnitude = 2
          break
        case 'soft':
          forceMagnitude = 1
          break
        case 'attraction':
          forceMagnitude = -0.25
          break
      }
      forceVector.x += roundFloating(forceMagnitude * Math.sin(objectAngleRadians))
      forceVector.y += roundFloating(forceMagnitude * Math.cos(objectAngleRadians))
    }
    newDirection = findAngle(forceVector, {
      x: 0,
      y: 0
    }, this.directions)
    if (!hardCollision) {
      movement = this.speed / game.gridSize / game.speedAdjustmentFactor
      angleRadians = this.direction / this.directions * 2 * Math.PI
      this.lastMovementX = -roundFloating(movement * Math.sin(angleRadians))
      this.lastMovementY = -roundFloating(movement * Math.cos(angleRadians))
      var newX = this.x + this.lastMovementX
      var newY = this.y + this.lastMovementY
      this.x = newX
      this.y = newY
      this.turnTo(newDirection)
    } else {
      this.turnTo(newDirection)
    }
  } else {
    this.colliding = false
    if (Math.abs(angleDiff(newDirection, this.direction)) < this.directions / 4) {
      movement = this.speed / game.gridSize / game.speedAdjustmentFactor
      if (this.prone) {
        movement = movement / 2
      }
      angleRadians = this.direction / this.directions * 2 * Math.PI
      this.lastMovementX = -roundFloating(movement * Math.sin(angleRadians))
      this.lastMovementY = -roundFloating(movement * Math.cos(angleRadians))
      this.x = this.x + this.lastMovementX
      this.y = this.y + this.lastMovementY
    }
    if (this.direction != newDirection) {
      this.turnTo(newDirection)
    }
  }
  return true
}

function findEnemyInRange () {
  if (!this.primaryWeapon) {
    console.log('why am i looking for enemy if i cant do anything??', this.name, this.orders.type)
    return
  }
  if (this.name == 'commando') {
    return
  }
  var sightBonus = 0
  if (this.type == 'vehicles' || this.type == 'infantry') {
    sightBonus = 1
  }
  if (this.orders && this.orders.type == 'guard') {
    sightBonus = 2
  }
  if (this.orders && this.orders.type == 'area guard') {
    sightBonus = 3
  }
  if (this.orders && this.orders.type == 'hunt') {
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

function canAttackEnemy (item) {
  if (item == this) {
    return false
  }
  if (item.cloaked) {
    if (this.type == 'infantry' || this.type == 'turrets' || this.type == 'vehicles') {
      var distance = Math.pow((item.cgX || item.x) - this.cgX, 2) + Math.pow((item.cgY || item.y) - this.cgY, 2)
      if (distance > 2.5) {
        return false
      }
    } else {
      return false
    }
  }
  if (item.lifeCode == 'dead') {
    return false
  }
  if (item.type == 'walls' && !warheads[bullets[item.weapon.projectile]].walls) {
    return false
  }
  if (item.type == 'trees' && !warheads[bullets[item.weapon.projectile]].wood) {
    return false
  }
  if (item.type == 'ships' && this.type != 'turrets') {
    return false
  }
  if (item.type == 'aircraft' && item.z > 0 && !this.weapon.canAttackAir) {
    return false
  }
  if ((item.type != 'aircraft' || item.z <= 0) && this.name == 'sam-site') {
    return false
  }
  return true
}

function findAngle (object, unit, directions) {
  var dy = (object.cgY || object.y) - (unit.cgY || unit.y)
  var dx = (object.cgX || object.x) - (unit.cgX || unit.x)
  var angle = wrapDirection(directions / 2 + Math.round(Math.atan2(dx, dy) * directions / (2 * Math.PI)), directions)
  return angle
}

function wrapDirection (direction, directions) {
  if (direction < 0) {
    direction += directions
  }
  if (direction >= directions) {
    direction -= directions
  }
  return direction
}

function addAngle (angle, increment, base) {
  angle = angle + increment
  if (angle > base - 1) {
    angle -= base
  }
  if (angle < 0) {
    angle += base
  }
  return angle
}

function angleDiff (angle1, angle2, directions) {
  if (angle1 >= directions / 2) {
    angle1 = angle1 - directions
  }
  if (angle2 >= directions / 2) {
    angle2 = angle2 - directions
  }
  diff = angle2 - angle1
  if (diff < -directions / 2) {
    diff += directions
  }
  if (diff > directions / 2) {
    diff -= directions
  }
  return diff
}















