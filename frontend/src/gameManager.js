"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGame = void 0;
var components_ts_1 = require("./components.ts");
var colors = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4: 'pink',
};
var gridValues = [];
function StartGame() {
    var gridContainer = (0, components_ts_1.CreateGrid)();
    var _loop_1 = function (i) {
        var row = [];
        var _loop_2 = function (j) {
            var value = 0;
            row.push(value);
            var cell = document.createElement('div');
            cell.id = "cell-".concat(i, "-").concat(j);
            cell.textContent = value.toString();
            cell.style.width = '50px';
            cell.style.height = '50px';
            cell.style.border = '1px solid black';
            cell.style.textAlign = 'center';
            cell.style.cursor = 'pointer';
            cell.style.backgroundColor = colors[value];
            cell.addEventListener('click', function () {
            });
            cell.addEventListener('mouseenter', function () {
                if (gridValues[i][j] == 0) {
                    // let colorValue = 4;
                }
            });
            cell.addEventListener('mouseleave', function () {
                if (gridValues[i][j] != 1) {
                    // let colorValue = 0;
                }
            });
            gridContainer.appendChild(cell);
        };
        for (var j = 0; j < 10; j++) {
            _loop_2(j);
        }
        gridValues.push(row);
    };
    for (var i = 0; i < 10; i++) {
        _loop_1(i);
    }
}
exports.StartGame = StartGame;
