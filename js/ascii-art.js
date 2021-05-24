const LOGO_TYPE = `
 _____                                 
|  __ \\            _                   
| |__) |___   ___ | |_                  
|  _  // _ \\ / _ \\| __|                 
| | \\ | (_) | (_) | |_                  
|_|  \\_\\___/ \\___/_\\__|                 
__    __         _
\\ \\  / /__ _ __ | |_ _   _ _ __ ___ ___ 
 \\ \\/ / _ | '_ \\| __| | | | '__/ _ / __|
  \\  |  __| | | | |_| |_| | | |  __\\__ \\
   \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|___/

`.replaceAll("\n", "\r\n");

function preloadASCIIArt() {
  const companies = Object.keys(portfolio);
  for (c of companies) {
    loadArt(c, 0.5, 1.0);
  }

  loadArt("rootvc-square", 1.0, term.cols >= 60 ? 0.5 : 0.9);
  const people = Object.keys(team);
  for (p of people) {
    loadArt(p, 1.0, term.cols >= 60 ? 0.5 : 0.9);
  }
}

function loadArt(id, ratio, scale, callback) {
  const NICE_CHARSET = aalib.charset.SIMPLE_CHARSET + " ";
  const parentDiv = document.getElementById("aa-all");
  const width = Math.floor(term.cols * scale);
  const height = Math.floor(width / 2 * ratio);
  var filename = `/images/${id}.png`;

  var div = document.createElement("div");
  div.id = id;
  parentDiv.appendChild(div);

  aalib.read.image.fromURL(filename)
    .map(aalib.aa({ width: width, height: height }))
    .map(aalib.render.html({
      el: div,
      charset: NICE_CHARSET,
    }))
    .subscribe(callback);
}

function getArt(id) {
  const div = document.getElementById(id);
  return div.innerText.replaceAll("\n", "\n\r");
}