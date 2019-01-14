const canvasDraw = (function(window, document) {
    let rows;
    let cols;
    let canv;
    let ctx;
    let cell

    function init(random, rs, cs, cl, padding) {
        rows=rs;
        cols=cs;
        life.setCell(cl)
        cell=life.getCell();
        life.init(random, rows, cols, padding);
        canv = document.createElement('canvas');
        ctx = canv.getContext("2d");
        canv.setAttribute("id", "canvasID");
        document.querySelector(".container").appendChild(canv);
        canv.setAttribute("width", cols*cell+"px");
        canv.setAttribute("height", rows*cell+"px")
    }

    function doDraw(){
        draw(life.getItems(), cell);
    }

    function start() {
        setInterval(() => 
            draw(life.getNewItems(), cell)
        , 100);
    }


    function draw(items, cell) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canv.width, canv.height);
        //ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "#00ff11";
        let p=life.getPadding();
        let size = cell-p*2;
        for (let i = 0; i < items.length; i++)
            for (let j = 0; j < items[i].length; j++)
                if (items[i][j]) ctx.fillRect(j*cell+p, i*cell+p, size, size);
        ctx.fillStyle = "#e5ff00";
        let c = life.getCurent();
        let r = life.getRange();
        if(c.length)
            ctx.fillRect(c[0]*cell+p, c[1]*cell+p, size, size)
        if(r.length)
            for (let i = 0; i < r.length; i++)
                ctx.fillRect(r[i][0]*cell+p, r[i][1]*cell+p, size, size)
    }

    function drawCurent(oldCurent, newCurent) {
        try{
            let y0, x0, y1, x1, items = life.getItems(), cell=life.getCell();
            if(oldCurent.length==2)[y0, x0]=oldCurent;
            [y1, x1]=newCurent;
            let p=life.getPadding();
            let size = cell-p*2;
            if(oldCurent.length == 2) drawCurentOld(items[x][y], x0, y0, cell, p, size);
            drawCurentNew(x1, y1, cell, p, size);
            const r = life.getRange();
            if(r.length>0)
                for (let i = 0; i < r.length; i++)
                    drawCurentNew(r[i][0], r[i][1], cell, p, size);
        }
        catch {
            doDraw()
        }
    }

    function drawCurentOld(item, x, y, cell, p, size) {
        ctx.fillStyle = "#00ff11";
        if (item === 1)
            ctx.fillRect(y * cell + p, x * cell + p, size, size);
        else
            ctx.clearRect(y * cell + p, x * cell + p, size, size);
    }

    function drawCurentNew(x, y, cell, p, size) {
        ctx.fillStyle = "#e5ff00";
        ctx.fillRect(y * cell + p, x * cell + p, size, size);
    }

    return {
        init: init,
        draw: doDraw,
        start: start,
        drawCurent:drawCurent,
        getCanv: function(){return canv},
        getCtx: function(){return ctx}
    }   
})(window, document);

