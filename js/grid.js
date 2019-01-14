const $grid = (function(window, document) {
    let range = [];
    let curent = [];
    let items = [];

    function init (random, rows, cols) {
        items = getGrid(random, rows, cols)
    }

    function newItem() {
        [items] = [newState(items)]
        return  items
    }

    function changeCurentCell(a, active) {
        try {
            let x=a[1];
            let y=a[0];
            if (active) return items[x][y] = 1;
            items[x][y] = !!items[x][y] ? 0 : 1; 
        }
        catch {}
    }

    function getGrid(random, rows, cols) {
        return random ? 
            forEachCellCreate([], rows, cols, () => Math.round(Math.random())) :
            forEachCellCreate([], rows, cols, () => 0);
    }

    function newState(items) {
        return forEachCellCreate(items, items.length, items[0].length, 
            function (items, i, j){
                let count = countAround(items, i, j);
                let num = 0;
                if ( (count == 2 || count == 3) && items[i][j]) num = 1
                else if ( count <= 1 && items[i][j]) num = 0
                else if ( count >= 4 && items[i][j]) num = 0
                else if ( count == 3 && !items[i][j]) num = 1;
                else num = items[i][j];
                return num;
            }
        );
    }

    function countAround(items, i, j) {
        let num=0;
        let a = [[i-1, j-1],[i-1,j],[i-1,j+1],[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]];
        for (let k = 0; k < a.length; k++) {
            let p=a[k][0];
            let n=a[k][1]; 
            try { if(items[p][n]===1) num++} catch {};
        }
        return num;
    }

    function forEachCellCreate(items, rows, cols, fn) {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = fn(items, i, j);
            }
        }
        return grid
    }
    function addRange(a) {
        if(!range.some(c => c[0]==a[0] && c[1]==a[1]))
            range.push([a[0],a[1]]);
        return range
    }

    return {
        getItems: function (){return items},
        getNewItems: newItem,
        init:init,
        getCurent: function(){return curent},
        setCurent: function(a) {[curent] = [a]; return curent},
        addRange: addRange,
        setRange: function(a) {[range] = [a]; return range},
        getRange: function(a) {return range},
        changeCurentCell: changeCurentCell
    }

})(window, document);