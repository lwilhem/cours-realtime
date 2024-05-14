"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGame = void 0;
var components_1 = require("./components");
var batailleNavaleManager_1 = require("./batailleNavaleManager");
var colors = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4: 'pink',
};
function resetGame() {
    var shipsArray = [
        { size: 5, startX: 0, startY: 0, direction: 'horizontal', selected: false },
        { size: 4, startX: 0, startY: 0, direction: 'horizontal', selected: false },
        { size: 3, startX: 0, startY: 0, direction: 'horizontal', selected: false },
        { size: 3, startX: 0, startY: 0, direction: 'horizontal', selected: false },
        { size: 2, startX: 0, startY: 0, direction: 'horizontal', selected: false },
    ];
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = document.getElementById("cell-".concat(i, "-").concat(j));
            console.log(cell);
            if (cell) {
                cell.textContent = "0";
                cell.style.backgroundColor = colors[0];
            }
        }
    }
    (0, batailleNavaleManager_1.clearShipContainer)();
    shipsArray.forEach(function (ship) { return (0, components_1.displayShip)(ship); });
}
exports.resetGame = resetGame;
