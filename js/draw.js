const canvasDraw = (function(window, document) {

    function init(random) {
        const [cols,rows]= $size.getGridSize()
        $grid.init(random, rows, cols);
        $canv.init();
    }

    function doDraw(){
        draw($grid.getItems(), $size.getCell());
    }

    function doDrawNew(){
        draw($grid.getNewItems(), $size.getCell());
    }

    function start() {
        setInterval(() => window.requestAnimationFrame(doDrawNew), 100);
    }


    function draw(items, cell) {
        const c = $grid.getCurent();
        const r = $grid.getRange();
        const p=$size.getPadding();
        const size = cell-p*2;

        $canv.clear();
        $canv.setFill();

        for (let i = 0; i < items.length; i++)
            for (let j = 0; j < items[i].length; j++)
                if (items[i][j])
                    $canv.draw(j*cell+p, i*cell+p, size);

        $canv.fillSellect(); //#e5ff00
        if(c.length)
            $canv.draw(c[0]*cell, c[1]*cell);
        if(r.length)
            for (let i = 0; i < r.length; i++)
                $canv.draw(r[i][0]*cell, r[i][1]*cell)
    }

    function drawCurent(oldCurent, newCurent) {
        try{
            let y0, x0, y1, x1, items = $grid.getItems(), cell=$size.getCell();
            if(oldCurent.length==2)[y0, x0]=oldCurent;
            [y1, x1]=newCurent;
            let p=$grid.getPadding();
            let size = cell-p*2;
            if(oldCurent.length == 2) drawCurentOld(items[x][y], x0, y0, cell, p, size);
            drawCurentNew(x1, y1, cell, p, size);
            const r = $grid.getRange();
            if(r.length>0)
                for (let i = 0; i < r.length; i++)
                    drawCurentNew(r[i][0], r[i][1], cell, p, size);
        }
        catch {
            doDraw()
        }
    }

    function drawCurentOld(item, x, y, cell, p, size) {
        $canv.setFill();
        if (item === 1)
            $canv.draw(y * cell, x * cell);
        else
            $canv.draw(y * cell, x * cell);
    }

    function drawCurentNew(x, y, cell, p, size) {
        $canv.fillSellect(); //#e5ff00
        $canv.draw(y * cell, x * cell);
    }

    return {
        init: init,
        draw: doDraw,
        start: start,
        drawCurent:drawCurent
    }   
})(window, document);