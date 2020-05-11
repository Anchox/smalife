var sources =
  {
    celleye:      './tex/cell_eye.png',
  };

var images = {};

function InitImages() {
    for(var name in sources)
    {
      images[name] = new Image();
      images[name].crossOrigin = "anonymous";
      images[name].src = sources[name];      
    }
}
