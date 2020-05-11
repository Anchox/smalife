function Animation(tfin, func){
  //анимаця, которая зависит от времени t
  var frame = func;
  var t = 0;

  //проигрывание анимации
  this.play = function(){
    func(t); //вызов функции
    //изменение времени
    if (t++ == tfin){
      t = 0;
    }
  };
}

function DelayedFunc(tfin, func){
  var t = 0;

  //ожидание
  this.wait = function(){
    if (t++ == tfin){
      func();
    }
  };
}

//далее все анимации
var anim_celleye;

function InitAnimations(){
  //анимаця клетки
  anim_celleye = new Animation(6,function(t){
    context.drawImage(images.celleye, t*24, 0, 24, 36, 0,0,48,72);
  });
}
