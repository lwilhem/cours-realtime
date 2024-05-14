"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayShip = exports.CreateGrid = exports.StartButton = exports.ResetButton = void 0;
var utils_ts_1 = require("./utils.ts");
var batailleNavaleManager_ts_1 = require("./batailleNavaleManager.ts");
var gameManager_ts_1 = require("./gameManager.ts");
// Create the Reset Game button
function ResetButton() {
    var resetGameButton = document.createElement('button');
    resetGameButton.textContent = 'Reset Game';
    resetGameButton.style.position = 'fixed';
    resetGameButton.style.bottom = '20px';
    resetGameButton.style.right = '20px';
    resetGameButton.style.zIndex = '1000';
    resetGameButton.addEventListener('click', utils_ts_1.resetGame);
    // Append the button to the document body
    document.body.appendChild(resetGameButton);
}
exports.ResetButton = ResetButton;
// Create the Start Game button
function StartButton() {
    var startGameButton = document.createElement('button');
    startGameButton.textContent = 'Start Game';
    startGameButton.addEventListener('click', function () { return (0, gameManager_ts_1.StartGame)(); });
    // Append the button to the document body
    document.body.appendChild(startGameButton);
}
exports.StartButton = StartButton;
// Create Grid
function CreateGrid() {
    var gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)';
    gridContainer.style.gridTemplateRows = 'repeat(10, 50px)';
    // Append the grid to the document body
    document.body.appendChild(gridContainer);
    return gridContainer;
}
exports.CreateGrid = CreateGrid;
// Fonction pour afficher un bateau
function displayShip(ship) {
    // Créer un conteneur pour les bateaux
    var shipContainer = document.createElement('div');
    shipContainer.classList.add("shipContainer");
    shipContainer.style.display = 'flex';
    shipContainer.style.flexDirection = 'column';
    shipContainer.style.alignItems = 'center';
    shipContainer.style.gap = '20px';
    document.body.appendChild(shipContainer);
    var shipElement = document.createElement('div');
    if (ship.direction == 'vertical') {
        shipElement.style.width = "50px";
        shipElement.style.height = "".concat(ship.size * 50, "px");
    }
    else {
        shipElement.style.width = "".concat(ship.size * 50, "px");
        shipElement.style.height = "50px";
    }
    shipElement.style.backgroundColor = ship.selected ? 'blue' : 'black';
    shipElement.style.cursor = 'pointer';
    shipElement.addEventListener('click', function () { return (0, batailleNavaleManager_ts_1.selectBoat)(shipContainer, ship, shipElement); });
    shipContainer.appendChild(shipElement);
}
exports.displayShip = displayShip;
