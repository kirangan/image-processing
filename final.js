var imageOri = null;
var imageGray = null;
var imageRed = null;
var imageRain = null;
var imageBlur = null;
var canvas = null;
var imgFile = null;
//var output = null;


function loadImage(){
  imgFile = document.getElementById("imgFile");
  canvas = document.getElementById("can");
  
  imageOri = new SimpleImage(imgFile);
  imageGray = new SimpleImage(imgFile);
  imageRed = new SimpleImage(imgFile);
  imageRain = new SimpleImage(imgFile);
  //imageBlur = new SimpleImage(imgFile);
 
  imageOri.drawTo(canvas);
}

function imageIsLoaded(image){
  if (image != null ||  image.complete()){
    return true;
  }
}

function filterGray(){
  for (var pixel of imageGray.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doGray(){
  if(imageIsLoaded(imageGray)){
    filterGray();
    imageGray.drawTo(canvas);
  }
}

function doReset(){
  if(imageIsLoaded(imageOri)){
   // canvas = document.getElementById("can");
    imageOri.drawTo(canvas);

    imageGray = new SimpleImage(imgFile);
    imageRed = new SimpleImage(imgFile);
    imageRain = new SimpleImage(imgFile);
   // imageBlur = new SimpleImage(imgFile);
    imageBlur = null;

    
  }
}

function filterRed(){
  for (var pixel of imageRed.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if (avg < 128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else{
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);
    }
  }
}

function doRed(){
  if(imageIsLoaded(imageRed)){
    filterRed();
    imageRed.drawTo(canvas);
  }
}

function filterRainbow(){
  var imgby7 = (imageRain.getHeight())/7 ;
  for (var pixel of imageRain.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    var y = pixel.getY();

    if ( y < imgby7 * 1){
      if (avg < 128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
      }
      else {
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);
      }
    }

    else if (y < imgby7 * 2){
      if (avg < 128){
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0)
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(1.2*avg - 51);
        pixel.setBlue(2*avg - 255);
      }
    }

    else if (y < imgby7 * 3) {
      if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg - 255);
      }
    }

    else if (y < imgby7 * 4){
      if (avg < 128){
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }
      else{
        pixel.setRed(2*avg -255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg - 255);
      }
    }

    else if ( y < imgby7 * 5){
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }
      else {
        pixel.setRed(2*avg - 255);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(255);
      }
    }

    else if ( y < imgby7 * 6){
      if (avg < 128){
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      }
      else {
        pixel.setRed(1.2*avg - 51);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(255);
      }
    }

    else {
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      }
      else {
        pixel.setRed(0.4*avg + 153);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }

  }
}

function doRainbow(){
  if(imageIsLoaded(imageRain)){
    filterRainbow();
    imageRain.drawTo(canvas);
  }
}

/*

function filterBlur(){
  var imgWidth = imageBlur.getWidth();
  var imgHeight = imageBlur.getHeight();
  output = new SimpleImage(imgWidth, imgHeight);
  var blurInput = 10;

  for (var pixel of imageBlur.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var ran01 = Math.random();

    if (ran01 < 0.5){
      output.setPixel(x, y, pixel);
    }

    else{

      if ( (x < blurInput ) && ((x + blurInput ) <= imgWidth)) {

        if ((y < blurInput) && ((y + blurInput) <= imgHeight)){
          var outPixel = imageBlur.getPixel((Math.floor(Math.random() * ( x + blurInput))),  (Math.floor(Math.random() * (y + blurInput))));
          output.setPixel(x, y, outPixel);
        }
        else{
          var outPixel = imageBlur.getPixel((Math.floor(Math.random() * ( x + blurInput))),  (Math.floor(Math.random() * (imgHeight - (y - blurInput))) + (y - blurInput)));
          output.setPixel(x, y, outPixel);
        }
        
      }
      else{

        if ((y < blurInput) && ((y + blurInput) <= imgHeight)) {
          var outPixel = imageBlur.getPixel((Math.floor(Math.random()* (imgWidth - (x - blurInput))) + (x- blurInput)), (Math.floor(Math.random() * (y + blurInput))));
          output.setPixel(x, y, outPixel);

        }

        else {
          var outPixel = imageBlur.getPixel((Math.floor(Math.random()* (imgWidth - (x - blurInput))) + (x- blurInput)), (Math.floor(Math.random() * (imgHeight - (y - blurInput))) + (y - blurInput)));
          output.setPixel(x, y, outPixel);
        }
      }

  }
}
} */


/* Based on http://www.dukelearntoprogram.com/course1/algorithms2/*/
function ensureInImage(coordinate,size){
  if (coordinate < 0) {
    return 0;
  }

  if (coordinate >= size) {
    return size - 1;
  }
  return coordinate;
}

function getPixelNearby(image, x, y, diameter){
  var dx = Math.random() * diameter - diameter / 2;
  var dy = Math.random() * diameter - diameter / 2;
  var nx = ensureInImage(x + dx, image.getWidth());
  var ny = ensureInImage(y + dy, image.getHeight());
  return image.getPixel(nx, ny);
}

function filterBlur(){
  imageBlur =  new SimpleImage(imageOri.getWidth(), imageOri.getHeight());

  for (var pixel of imageOri.values()){
    var x = pixel.getX();
    var y = pixel.getY();

    if(Math.random() > 0.5){
      var other= getPixelNearby(imageOri, x, y, 10);
      imageBlur.setPixel(x,y,other);
    }
    else{
      imageBlur.setPixel(x, y, pixel);
    }
  }

}

function doBlur(){
  if(imageIsLoaded(imageOri)){
    filterBlur();
    imageBlur.drawTo(canvas);
  }
}