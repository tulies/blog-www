/** @type {HTMLCanvasElement} */

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var  devicePixelRatio = window.devicePixelRatio || 1,   
  backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1, 
  ratio = devicePixelRatio / backingStoreRatio;
var canvasWeight = 200
var canvasHeight = 200
// canvas.width = canvasWeight
// canvas.height = canvasHeight
canvas.width = canvasWeight * ratio; 
canvas.height = canvasHeight * ratio; 

canvas.style.width = canvasWeight + 'px'; 
canvas.style.height = canvasHeight + 'px'; 

context.scale(ratio, ratio);

var image = new Image();
// image.crossOrigin="anonymous"
image.src = 'img/headicon.jpeg'
image.onload = function(){
  initCanvas()
}
function initCanvas(){
  context.clearRect(0, 0, canvasWeight, canvasHeight)
  draw(image)
}
function draw(){
  // context.save()
  context.drawImage(image, 0, 0, canvasWeight, canvasHeight)
  // context.restore()
}

// 保存成png格式的图片
function saveAsPNG() {
  return canvas.toDataURL("image/png");
}
// 下载
function downLoad(url){
  var oA = document.createElement("a");
  oA.download = '';// 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}


document.getElementById('headfixed').onclick =function(){
  console.log(this)
  initCanvas()
  context.drawImage(this, 0, 0, canvasWeight, canvasHeight)
}
document.getElementById('headfixed2').onclick =function(){
  console.log(this)
  initCanvas()
  context.drawImage(this, 0, 0, canvasWeight, canvasHeight)
}


document.getElementById('saveimg').onclick = function(){
  downLoad(saveAsPNG(canvas));
}

