//drawSymbol.init(true,50,50);
//drawSymbol.draw();
//drawSymbol.start();


canvasDraw.init(true, 720/20, 1280/20, 20, 0.5);
canvasDraw.draw();
eventsListener.addEvent(canvasDraw.getCanv(), life.getCell());
canvasDraw.start();