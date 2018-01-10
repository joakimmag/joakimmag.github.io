var al = {};
al.base = {};
al.base.x = 0;
al.base.y = 0;
al.element = document.getElementById("antenna-left");
al.containerElement = document.getElementById("antenna-left-container");
al.rect = null;

var ar = {};
ar.base = {};
ar.base.x = 0;
ar.base.y = 0;
ar.element = document.getElementById("antenna-right");
ar.containerElement = document.getElementById("antenna-right-container");
ar.rect = null;

window.onmousedown = function(event) {
  if (event.target.id == "antenna-left") {
    initRotation(al);
  }
  else if (event.target.id == "antenna-right") {
    initRotation(ar);
  }
};

function initRotation(antenna) {
  document.getElementById("adjustable").style.opacity = "0";
  antenna.rect = antenna.containerElement.getBoundingClientRect();
  antenna.base.x = antenna.rect.left + antenna.rect.width / 2;
  antenna.base.y = antenna.rect.bottom;

  window.onmousemove = function(event) {
    var rotation = calcRotation(antenna.base.x, antenna.base.y, event.pageX,
      event.pageY);
    rotation = 90 - rotation;
    if (rotation <= 70 && rotation >= -70) {
      antenna.element.style.transform = "rotate(" + rotation + "deg)";
    }
  };

  window.onmouseup = function() {
    window.onmouseup = null;
    window.onmousemove = null;
  };
}

function calcRotation(antennaX, antennaY, mouseX, mouseY) {
  var x = mouseX - antennaX;
  var y = antennaY - mouseY;
  return Math.atan2(y, x) * 180 / Math.PI;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
