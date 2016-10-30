


var imgSrc = [
 ]


var imgs = {}
var imgLoadedCounter = 0
loadImages = function() {
  for (var i = 0; i < imgSrc.length; i++) {
    imgs[imgSrc[i]['name']] = new Image()
    imgs[imgSrc[i]['name']].addEventListener('load', function() {
      imgLoadedCounter++
    })
    imgs[imgSrc[i]['name']].src = imgSrc[i]['src']
  }
}
loadImages()