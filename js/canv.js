$canv = (function(window, document) {
    let canv, ctx,
        basaColor = "#00ff11",
        selectColor = "rgba(255, 255, 255, 0.6)";

    function init(){
        canv = document.createElement('canvas');
        ctx = canv.getContext("2d");
        const cell = $size.getCell();
        const [w,h] = $size.getGridSize();
        canv.setAttribute("id", "canvasID");
        document.querySelector(".container").appendChild(canv);
        canv.setAttribute("width", w*cell+"px");
        canv.setAttribute("height", h*cell+"px")
        return [canv, ctx]
    }

    function draw( x, y, size=$size.getCell()) {
        ctx.fillRect(x, y, size, size);
    }

    function fill(color=basaColor) {
        ctx.fillStyle = color;
    }

    function fillSellect(color=selectColor) {
        ctx.fillStyle = color;
    }

    function clear(){
        //ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        //ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.strokeStyle = selectColor;
        ctx.rect(0, 0, canv.width, canv.height);
        ctx.stroke();
    }

    return {
        init: init,
        get: function () {return canv},
        getCtx: function () {return ctx},
        clear: clear,
        draw: draw,
        setFill: fill,
        fillSellect: fillSellect,
        setBaseColor: function (c) {basaColor = c}
    }
})(window, document);