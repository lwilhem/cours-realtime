"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGame = void 0;
var components_ts_1 = require("./components.ts");
var batailleNavaleManager_ts_1 = require("./batailleNavaleManager.ts");
function resetGame() {
    var shipsArray = (0, batailleNavaleManager_ts_1.resetShipsArray)();
    (0, batailleNavaleManager_ts_1.clearGridValues)();
    (0, batailleNavaleManager_ts_1.clearShipContainer)();
    shipsArray.forEach(function (ship) { return (0, components_ts_1.displayShip)(ship); });
}
exports.resetGame = resetGame;
