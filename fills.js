function InitFills(){
  var box = document.getElementById("funcsBox");

  //заполнения поля агаром (квадратами 2х2)
  var btn = document.createElement("button");
  btn.className = "fillBtn";
  btn.onclick = function(){
    hand = figures.point;
    clearInterval(intrvl);
    fillAgar();
  };
  btn.appendChild(document.createTextNode("агар"));
  box.appendChild(btn);

  //заполнения поля случайно
  btn = document.createElement("button");
  btn.className = "fillBtn";
  btn.onclick = function(){
    hand = figures.point;
    clearInterval(intrvl);
    FillMapRandomly(2);
  };
  btn.appendChild(document.createTextNode("случайно (плотно)"));
  box.appendChild(btn);

  //заполнения поля случайно
  btn = document.createElement("button");
  btn.className = "fillBtn";
  btn.onclick = function(){
    hand = figures.point;
    clearInterval(intrvl);
    FillMapRandomly(8);
  };
  btn.appendChild(document.createTextNode("случайно (редко)"));
  box.appendChild(btn);
}

function fillAgar(){
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width-1; x++) {
    for (var y = 0; y < canvas.width-1; y++) {
      var i = (x + y * canvas.width) * 4;
      pixels.data[i + 0] = 0;
      pixels.data[i + 1] = 0;
      pixels.data[i + 2] = 0;
      if (x % 3 == 0 || y % 3 == 0)
        pixels.data[i + 3] = 0;
      else
        pixels.data[i + 3] = 255;
    }
  }
  context.putImageData(pixels, 0, 0);
}

function FillMapRandomly(k){
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.width; y++) {
      var rnd = getRandomBool(k);
      var i = (x + y * canvas.width) * 4;
      pixels.data[i + 3] = 255 * rnd;
    }
  }
   context.putImageData(pixels, 0, 0);
}

function getRandomBool(k) {
  var result = Math.floor(Math.random() * Math.floor(k));
  if (result != 0) result = 0
  else result = 1;
  return result;
}
