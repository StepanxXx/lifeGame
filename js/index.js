//drawSymbol.init(true,50,50);
//drawSymbol.draw();
//drawSymbol.start();

window.addEventListener("load", function(){
  $size.init(25);
  $size.setPadding(2);
  canvasDraw.init(true);
  window.requestAnimationFrame(canvasDraw.draw);
  eventsListener.addEvent();
  canvasDraw.start();
})

var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  document.getElementById("fullscreen").addEventListener("click", function (event) {
      
    if (event.target.getAttribute("data-fullscreen") == "false") {
        event.target.setAttribute("data-fullscreen","true");
        openFullscreen();
    } else {
        event.target.setAttribute("data-fullscreen","false");
        closeFullscreen();
    }
     
  });
