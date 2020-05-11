function InitFigures(){
  point = {name: "point", data: [[1]]};
  glider = {name: "glider", data: [[0,0,1],[1,0,1],[0,1,1]]};
  hand = point;
}

var pause = true;

function InitButtons(){

  //onclick для кнопки "сбросить";
  var btn = document.getElementById("reset");
  btn.onclick= function(){
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},400);
    FillMapBLack();
  }

  //onclick для кнопки "пауза";
  btn = document.getElementById("pause");
  btn.onclick= function(){
    if (pause){
      clearInterval(intrvl);
      intrvl = setInterval(function(){Play()},400);
    } else{
      clearInterval(intrvl);
      intrvl = setInterval(function(){Pause()},400);
    }
    pause = !pause;
  }

  //onclick для кнопки "скорость x1";
  btn = document.getElementById("x1");
  btn.onclick= function(){
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},400);
  }

  //onclick для кнопки "скорость x2";
  btn = document.getElementById("x2");
  btn.onclick= function(){
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},200);
  }

  //onclick для кнопки "скорость x4";
  btn = document.getElementById("x4");
  btn.onclick= function(){
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},100);
  }

  //onclick для кнопки "большой размер поля";
  btn = document.getElementById("large");
  btn.onclick= function(){
    context.canvas.width  = canvas.offsetWidth/4;
    context.canvas.height = canvas.offsetHeight/4;
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},400);
    FillMapBLack();
  }

  //onclick для кнопки "обычный размер поля";
  btn = document.getElementById("small");
  btn.onclick= function(){
    context.canvas.width  = canvas.offsetWidth/8;
    context.canvas.height = canvas.offsetHeight/8;
    clearInterval(intrvl);
    intrvl = setInterval(function(){Play()},400);
    FillMapBLack();
  }

  var controlBox = document.getElementById("controlsBox");

  //для каждой фигуры создаём кнопку
  for (var key in figures) {
    var btn = document.createElement("button");
    btn.id = key;
    btn.className = "figureBtn";
    btn.onclick = function(){
      hand = figures[this.id];
    };
    btn.appendChild(document.createTextNode(figures[key].name));
    controlBox.appendChild(btn);
  }
}

var figures = {
  point: {name: "точка", data: [[1]]},
  earser: {name: "ластик", data: [[0]]},
  glider: {name: "планер", data: [[0,0,1],[1,0,1],[0,1,1]]},
  ship: {name: "корабль", data: [[0,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]]},
  square: {name: "квадрат", data: [[1,1,1],[1,0,1],[1,1,1]]},
  cross: {name: "крест", data: [[0,1,0],[1,1,1],[0,1,0],[0,1,0]]},
  gershel: {name: "гершел", data: [[1,0,0],[1,1,1],[1,0,1],[0,0,1]]},
  letterH: {name: "H", data: [[1,0,1],[1,1,1],[1,0,1]]},
  letterT: {name: "T", data: [[1,1,1],[0,1,0],[0,1,0]]},
  letterL: {name: "L", data: [[1,0,0],[1,0,0],[1,1,1]]},
  letterR: {name: "r", data: [[0,1,1],[1,1,0],[0,1,0]]},
  table: {name: "стол", data: [[1,1,1,1],[1,0,0,1]]},
  hundred: {name: "столетие", data: [[0,0,1,1],[1,1,1,0],[0,1,0,0]]},
  letterZ: {name: "Z", data: [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]]},
  bipol: {name: "биполь", data: [[1,1,0,0,0],[1,0,1,0,0],[0,0,0,0,0],[0,0,1,0,1],[0,0,0,1,1]]},
  glaider12: {name: "дюжина", data: [[1,1,0,0,1],[1,0,0,0,1],[1,0,0,1,1]]},
  eight: {name: "8", data: [[1,1,1,0,0,0],[1,1,1,0,0,0],[1,1,1,0,0,0],[0,0,0,1,1,1],[0,0,0,1,1,1],[0,0,0,1,1,1]]},
  heart: {name: "сердце", data: [[0,1,1,0,1,1,0],[1,0,0,1,0,0,1],[1,0,0,0,0,0,1],[0,1,0,0,0,1,0],[0,0,1,0,1,0,0],[0,0,0,1,0,0,0]]},
  pentadecalton: {name: "пентадекатлон", data: [[1,0,0,1,0,1,1,0,1,0,0,1],[1,1,1,1,0,1,1,0,1,1,1,1],[1,0,0,1,0,1,1,0,1,0,0,1]]},
  agar4: {name: "агар 4х4", data: [[1,1,0,1,1,0,1,1,0,1,1],[1,1,0,1,1,0,1,1,0,1,1],[0,0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,0,1,1,0,1,1],[1,1,0,1,1,0,1,1,0,1,1],[0,0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,0,1,1,0,1,1],[1,1,0,1,1,0,1,1,0,1,1],[0,0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,0,1,1,0,1,1],[1,1,0,1,1,0,1,1,0,1,1]]},
  cat: {name: "кот", data: [[0,1,0,0,1,0],[0,1,1,1,1,0],[1,0,0,0,0,1],[1,0,1,1,0,1],[1,0,0,0,0,1],[0,1,1,1,1,0]]},
  pulsar: {name: "СР 48-56-72", data: [[0,0,1,1,1,0,0,0,1,1,1,0,0],
                                      [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [0,0,1,1,1,0,0,0,1,1,1,0,0],
                                      [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                      [0,0,1,1,1,0,0,0,1,1,1,0,0],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [1,0,0,0,0,1,0,1,0,0,0,0,1],
                                      [0,0,0,0,0,0,0,0,0,0,0,0,0],
                                      [0,0,1,1,1,0,0,0,1,1,1,0,0]]},
  shipc5: {name: "корабль с5", data: [[0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0],
                                   [0,0,0,1,1,0,1,1,1,1,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,1,0,0,0],
                                   [0,1,0,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0],
                                   [1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,1,0,0,0,1],
                                   [0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0],
                                   [0,1,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1,0],
                                   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]]}


};
var point;
var glider;
