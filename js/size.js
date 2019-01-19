const $size = (function(window, document) {
    let cell;
    let width;
    let height;
    let padding;

    function init(c=10) {
        setCell(c);
        return getGridSize();
    }

    function setCell(c) {
        const [w,h] = getSizeWindow();
        cell = c + Math.min( w/c/(Math.floor(w/c)) , h/c/(Math.floor(h/c)) )
    }

    function getGridSize () {
        const [w, h] = getSizeWindow();
        if(!cell) cell=10;
        width = Math.floor(w/cell);
        height = Math.floor(h/cell);
        return [width, height]
    }

    function getSizeWindow() {
        const w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        const h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        return [w, h-6]
    }

    //object.addEventListener("resize", myScript);
    return {
        getCell: function() {return cell},
        init: init,
        getWindiw: getSizeWindow,
        getGridSize: getGridSize,
        setPadding: function (a) {padding=a},
        getPadding: function () {return padding}
    }
})(window, document);