/** @type {HTMLCanvasElement} */

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var devicePixelRatio = window.devicePixelRatio || 1
var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1
var ratio = devicePixelRatio / backingStoreRatio
var canvasWeight = 200
var canvasHeight = 200
// canvas.width = canvasWeight
// canvas.height = canvasHeight
canvas.width = canvasWeight * ratio
canvas.height = canvasHeight * ratio

canvas.style.width = canvasWeight + 'px'
canvas.style.height = canvasHeight + 'px'

context.scale(ratio, ratio)
var image = new Image()

function imageOnload (imgurl) {
  // image.crossOrigin="anonymous"
  image.src = imgurl
  image.onload = function () {
    // console.log(image)
    $('#avatar').attr('src', image.src)
    initCanvas()
  }
}
function initCanvas () {
  context.clearRect(0, 0, canvasWeight, canvasHeight)
  draw(image)
}
function draw () {
  // context.save()
  context.drawImage(image, 0, 0, canvasWeight, canvasHeight)
  // context.restore()
}
// 保存成png格式的图片
function saveAsPNG () {
  return canvas.toDataURL('image/png')
}
// 下载
function downLoad (url) {
  var oA = document.createElement('a')
  oA.download = ''// 设置下载的文件名，默认是'下载'
  oA.href = url
  document.body.appendChild(oA)
  oA.click()
  oA.remove() // 下载之后把创建的元素删除
}

$(function () {
  $.get('/api/wx/userinfo').then(function (res) {
    console.log(res)
    if (res.code === -1) {
      // 未登录
      window.location.href = 'http://www.wangjiayang.cn/api/wx/authorize?backurl=' + encodeURIComponent(window.location.href)
    } else if (res.code === 0) {
      var avatar = res.data.headimgurl + 'wangjiayang'
      avatar = avatar.replace('/46wangjiayang', '/0')
      avatar = avatar.replace('/64wangjiayang', '/0')
      avatar = avatar.replace('/96wangjiayang', '/0')
      avatar = avatar.replace('/132wangjiayang', '/0')
      imageOnload(avatar)
    }
  })
  $('#headfixed').on('click', function () {
    initCanvas()
    context.drawImage(this, 0, 0, canvasWeight, canvasHeight)
    $('#avatar').attr('src', saveAsPNG())
  })

  $('#headfixed2').on('click', function () {
    initCanvas()
    context.drawImage(this, 0, 0, canvasWeight, canvasHeight)
    $('#avatar').attr('src', saveAsPNG())
  })

  $('#saveimg').on('click', function () {
    downLoad(saveAsPNG(canvas))
  })
})
