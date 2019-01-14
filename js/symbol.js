const drawSymbol = (function(window, document) {
    const shapes = ["&#9632;","&#9635;","&#9638;","&#9654;","&#9664;","&#9673;","&#9724;"];
    const miscSymbols = ["&#9728;", "&#9733;", "&#9748;", "&#9751;", "&#9752;","&#9762;",	"&#9763;", "&#9787;","&#9818;",	"&#9819;","&#9821;",	"&#9822;",	"&#9823;",	"&#9824;", "&#9827;","&#9829;","&#9851;","&#9864;",	"&#9865;","&#9873;"];
    const _о = () => "&#9673;";//shapes[Math.floor((Math.random() * (shapes.length)))] ;
    const _i = () => "&#8199;";
    const CONTAINER = document.querySelector(".container");

    function init(random, rows, cols, padding) {
        life.init(random, rows, cols, padding);
    }

    function doDraw(){
        CONTAINER.innerHTML = draw(life.getItems(), _о, _i);
    }

    function start() {  
        setInterval(() => 
            CONTAINER.innerHTML = draw(life.getNewItems(), _о, _i)
        , 100);
    }

    function draw(items, _о, _i) {
        let str = "";
        for (let i = 0; i < items.length; i++)
            str += items[i].toString().replace(/,/g, "").replace(/1/g, _о()).replace(/0/g, _i()) + "<br/>";
        return str
    }

    return {
        init: init,
        draw: doDraw,
        start: start
    }
})(window, document);