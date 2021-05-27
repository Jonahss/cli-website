const LOGO_TYPE =
` _____                                 
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
    _loadArt(c, 0.5, 1.0);
  }

  _loadArt("rootvc-square", 1.0, term.cols >= 60 ? 0.5 : 1.0);
  const people = Object.keys(team);
  for (p of people) {
    _loadArt(p, 1.0, term.cols >= 60 ? 0.5 : 1.0);
  }
}

// TODO: Here is where we should insert alternatives to ASCII as text
function _loadArt(id, ratio, scale, callback) {
  const NICE_CHARSET = aalib.charset.SIMPLE_CHARSET + " ";
  const parentDiv = document.getElementById("aa-all");
  const width = Math.floor(term.cols * scale);
  const height = Math.floor(width / 2 * ratio);
  var filename = `/images/${id}.png`;

  var div = document.getElementById(id);
  
  if (!div) {
    div = document.createElement("div");
    div.id = id;
    parentDiv.appendChild(div);
  }

  if (term.cols >= 40) {
    aalib.read.image.fromURL(filename)
      .map(aalib.aa({ width: width, height: height }))
      .map(aalib.render.html({
        el: div,
        charset: NICE_CHARSET,
      }))
      .subscribe(callback);
  } else {
    div.innerText = `[ Photo: ${document.location.href}images/${id}.png ]`;
  }
}

function getArt(id) {
  const div = document.getElementById(id);
  return div.innerText.replaceAll("\n", "\n\r");
}