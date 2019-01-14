const eventsListener = (function(window, document) {
    let cell;
    function eventListen(canvas, c) {
        cell=c;
        oldCurent=[]
        newCurent=[]
        canvas.addEventListener ("mousemove", mouseMoveSetCurent );
        canvas.addEventListener("mouseout", function() {
            life.setRange([]);
            life.setCurent([]);
            canvasDraw.draw();
        });
        canvas.addEventListener("mousedown", mouseDownSelectRange);
    }
    

    function mouseDownSelectRange(event) {
        canvas = canvasDraw.getCanv();
        canvas.removeEventListener("mousemove", mouseMoveSetCurent)

        mouseMoveRange(event);
        canvas.addEventListener ("mousemove", mouseMoveRange )
        canvas.addEventListener("mouseup", mouseMouseupSelectRange)
    }

    function mouseMoveRange (event) {
        const [oldCurent] = [life.getCurent()];
        const [newCurent] = [getCell(event, oldCurent)];
        if(isEqual(oldCurent, newCurent) && life.getRange()>0) return;
        life.setCurent(newCurent);
        life.addRange(newCurent);
        canvasDraw.drawCurent(oldCurent, newCurent);  
    }

    function mouseMouseupSelectRange(event) {
        const r = life.getRange();
        if (r.length>1) {
            for (let i = 0; i < r.length; i++)
                life.changeCurentCell(r[i], true);
        } 
        else {
            life.changeCurentCell(life.getCurent());
        };
        life.setRange([]);
        canvas.removeEventListener("mousemove", mouseMoveRange);
        canvas.addEventListener ("mousemove", mouseMoveSetCurent);
        canvasDraw.draw();
        canvas.removeEventListener("mouseup", mouseMouseupSelectRange)
    }

    function mouseMoveSetCurent (event) {
        [oldCurent] = [life.getCurent()];
        [newCurent] = [getCell(event, oldCurent)];
        if(isEqual(oldCurent, newCurent) || life.getRange()>1) return;
        life.setCurent(newCurent);
        canvasDraw.drawCurent(oldCurent, newCurent);  
    }

    function getCell(event, old) {
        const newX=event.offsetX;
        const newY=event.offsetY;
        const x = Math.floor(newX/cell);
        const y = Math.floor(newY/cell);
        if(old.length!=2) return [x, y];

        const oldX=(old[0]+1)*cell-cell/2;
        const oldY=(old[1]+1)*cell-cell/2;
        const oldX1=oldX-cell*0.85;
        const oldX2=oldX+cell*0.85;
        const oldY1=oldY-cell*0.85;
        const oldY2=oldY+cell*0.85;
        const xx = newX<oldX1 || newX>oldX2;
        const yy = newY<oldY1 || newY>oldY2;

        return (xx || yy) ? [x, y] : [old[0], old[1]]
    }

    function isEqual(a1, a2) {
        b = a1.length && a2.length ? true : false;
        try {
            for (let i = 0; i < a1.length; i++)
                b = a1[i] == a2[i] && b ? true : false;
        } catch {
            b = false
        }
        return b
    }

    return {
        addEvent: eventListen
    }
})(window, document);