const eventsListener = (function(window, document) {
    
    function eventListen() {
        const canvas = $canv.get();
        canvas.addEventListener ("mousemove", mouseMoveSetCurent );
        canvas.addEventListener("mouseout", function() {
            $grid.setRange([]);
            $grid.setCurent([]);
            window.requestAnimationFrame(canvasDraw.draw);
        });
        canvas.addEventListener("mousedown", mouseDownSelectRange);
    }
    

    function mouseDownSelectRange(event) {
        canvas = $canv.get();
        canvas.removeEventListener("mousemove", mouseMoveSetCurent)
        mouseMoveRange(event);
        canvas.addEventListener ("mousemove", mouseMoveRange )
        canvas.addEventListener("mouseup", mouseMouseupSelectRange)
    }

    function mouseMoveRange (event) {
        const [oldCurent] = [$grid.getCurent()];
        const [newCurent] = [getCell(event, oldCurent)];
        if(isEqual(oldCurent, newCurent) && $grid.getRange()>0) return;
        $grid.setCurent(newCurent);
        $grid.addRange(newCurent);
        window.requestAnimationFrame(() => canvasDraw.drawCurent(oldCurent, newCurent)); 
    }

    function mouseMouseupSelectRange(event) {
        const r = $grid.getRange();
        if (r.length>1) {
            for (let i = 0; i < r.length; i++)
                $grid.changeCurentCell(r[i], true);
        } 
        else {
            $grid.changeCurentCell($grid.getCurent());
        };
        $grid.setRange([]);
        canvas.removeEventListener("mousemove", mouseMoveRange);
        canvas.addEventListener ("mousemove", mouseMoveSetCurent);
        
        window.requestAnimationFrame(canvasDraw.draw);
        canvas.removeEventListener("mouseup", mouseMouseupSelectRange)
    }

    function mouseMoveSetCurent (event) {
        [oldCurent] = [$grid.getCurent()];
        [newCurent] = [getCell(event, oldCurent)];
        if(isEqual(oldCurent, newCurent) || $grid.getRange()>1) return;
        $grid.setCurent(newCurent);
        window.requestAnimationFrame(() => canvasDraw.drawCurent(oldCurent, newCurent));  
    }

    function getCell(event, old) {
        const cell=$size.getCell();
        const newX=event.offsetX;
        const newY=event.offsetY;
        const x = Math.floor(newX/cell);
        const y = Math.floor(newY/cell);
        if(old.length!=2) return [x, y];

        const oldX=(old[0]+1)*cell-cell/2;
        const oldY=(old[1]+1)*cell-cell/2;
        const oldX1=oldX-cell*0.8;
        const oldX2=oldX+cell*0.8;
        const oldY1=oldY-cell*0.8;
        const oldY2=oldY+cell*0.8;
        const xx = newX<oldX1 || newX>oldX2;
        const yy = newY<oldY1 || newY>oldY2;

        return (xx || yy) ? [x, y] : [old[0], old[1]]
    }

    function isEqual(a1, a2) {
        return a1.toString() == a2.toString()
    }

    return {
        addEvent: eventListen
    }
})(window, document);