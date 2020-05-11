document.addEventListener("DOMContentLoaded", function() {
  Init();
  InitImages();
  InitAnimations();
  InitFigures();
  InitButtons();
  InitFills();
});

var canvas;
var context;
var anim;
var intrvl;

function Init() {
    //canvas
	  canvas = document.getElementById('myCanvas');
    context = canvas.getContext("2d");

    context.canvas.width  = canvas.offsetWidth/8;
    context.canvas.height = canvas.offsetHeight/8;


    delayedInterval = new DelayedFunc(60,function(){
      clearInterval(intrvl);
    });

    window.onresize = function(){
      context.canvas.width  = canvas.offsetWidth/8;
      context.canvas.height = canvas.offsetHeight/8;
    }

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.offsetWidth / canvas.width;
      var scaleY = canvas.offsetHeight / canvas.height;
      return {
          x: Math.trunc((evt.clientX - rect.left)/scaleX),
          y: Math.trunc((evt.clientY - rect.top)/scaleY)
        }
    };

    canvas.onclick = function(e) {
        var x = getMousePos(canvas, e).x
        var y = getMousePos(canvas, e).y;
        console.log("Clicked ("+x+"; "+y+")");
        drawFigure(x,y,hand);
        //map = context.getImageData(x, y, 1, 1);
        //map.data[3] = 255;
        //context.putImageData(map, x, y);
    };

    intrvl = setInterval(function(){Start()},100);

}

function Start(){
  //anim_celleye.play();
  delayedInterval.wait();
}

function Pause(){
}

var map;
var hand;

var notset = true;

function Play(){
  map = context.getImageData(0, 0, canvas.width, canvas.height);
  PlayLife();
  context.putImageData(map, 0, 0);
}

function PlayLife(){
  var newmap = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.width; y++) {
      //посчитаем кол-во соседей вокруг клетки
      var neighbours = GetNeighboursCount(map,x,y);
      var i = (x + y * canvas.width) * 4 + 3;
      var alife = map.data[i];
      if (alife != 0 && alife != 255) alife = 0;
      //определяем, будет ли клетка жить дальше
      if (neighbours == 3 || (alife && neighbours==2))
        newmap.data[i]=255;
      else
        newmap.data[i]=0;
    }
  }
  map = newmap;
}

function drawFigure(dx,dy, figure){
  var width =figure.data[0].length;
  var height = figure.data.length;

  var mapPart = context.getImageData(dx,dy,width,height);

  for (var x = 0; x < width; x++)
    for (var y = 0; y < height; y++) {
      var i = (x + y * width) * 4 + 3;
      mapPart.data[i] = 255 * figure.data[y][x];
  }

  context.putImageData(mapPart,dx,dy);
}

function GetNeighboursCount(map,x,y){
  var neighbours = 0;
  for (var xn = -1; xn < 2; xn++) {
    for (var yn = -1; yn < 2; yn++) {
      //при подсчёте соседей не учитываем саму клетку
      if (xn == 0 && yn==0)
        continue;
      //байт данных, отвечающий за прозрачность клетки
      i = (x-xn + (y-yn) * canvas.width) * 4 + 3;
      if (map.data[i]) //если клетка прозрачная
        neighbours++;
    }
  }
  return neighbours;
}

function FillMapBLack(){
  map = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.width; y++) {
      var rnd = getRandomBool();
      var i = (x + y * canvas.width) * 4;
      map.data[i + 0] = 255;
      map.data[i + 1] = 255;
      map.data[i + 2] = 255;
      map.data[i + 3] = 0;
    }
  }
   context.putImageData(map, 0, 0);
}

var delayedInterval;
