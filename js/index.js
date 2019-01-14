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