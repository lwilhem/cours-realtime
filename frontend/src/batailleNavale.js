// Définition des couleurs en fonction des valeurs
var colors = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4: 'pink',
    // Ajoutez d'autres couleurs et valeurs au besoin
};
var actualBoat = null;
var shipsArray = [
    { size: 5, startX: 0, startY: 0, direction: 'horizontal', selected: false },
    { size: 4, startX: 0, startY: 0, direction: 'horizontal', selected: false },
    { size: 3, startX: 0, startY: 0, direction: 'horizontal', selected: false },
    { size: 3, startX: 0, startY: 0, direction: 'horizontal', selected: false },
    { size: 2, startX: 0, startY: 0, direction: 'horizontal', selected: false },
];
// Création de la grille
var gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)';
gridContainer.style.gridTemplateRows = 'repeat(10, 50px)';
document.body.appendChild(gridContainer);
var gridValues = []; // Tableau pour stocker les valeurs de la grille
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
            if (actualBoat !== null) {
                var colorValue = 1;
                affectAdjacentCells(gridValues, i, j, actualBoat.size, actualBoat.direction, colorValue);
            }
        });
        cell.addEventListener('mouseenter', function () {
            if (gridValues[i][j] == 0 && actualBoat !== null) {
                var colorValue = 4;
                affectAdjacentCells(gridValues, i, j, actualBoat.size, actualBoat.direction, colorValue);
            }
        });
        cell.addEventListener('mouseleave', function () {
            if (gridValues[i][j] != 1 && actualBoat !== null) {
                console.log(gridValues);
                var colorValue = 0;
                affectAdjacentCells(gridValues, i, j, actualBoat.size, actualBoat.direction, colorValue);
            }
        });
        gridContainer.appendChild(cell);
    };
    for (var j = 0; j < 10; j++) {
        _loop_2(j);
    }
    gridValues.push(row);
};
// Initialisation de la grille
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
// Créer un conteneur pour les bateaux
var shipContainer = document.createElement('div');
shipContainer.style.display = 'flex';
shipContainer.style.flexDirection = 'column';
shipContainer.style.alignItems = 'center';
shipContainer.style.gap = '20px';
document.body.appendChild(shipContainer);
// Fonction pour afficher un bateau
function displayShip(ship) {
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
    shipElement.addEventListener('click', function () {
        var shipElements = shipContainer.querySelectorAll('div');
        shipsArray.forEach(function (ship) { return ship.selected = false; });
        shipElements.forEach(function (shipElement) {
            shipElement.style.backgroundColor = 'black';
        });
        console.log(shipElements);
        ship.selected = true;
        actualBoat = ship;
        shipElement.style.backgroundColor = 'blue';
        console.log('Bateau cliqué:', ship);
    });
    shipContainer.appendChild(shipElement);
}
// Exemple d'utilisation de la fonction displayShip
shipsArray.forEach(function (ship) { return displayShip(ship); });
var changeDirectionButton = document.createElement('button');
changeDirectionButton.textContent = 'Changer la direction';
document.body.appendChild(changeDirectionButton);
changeDirectionButton.addEventListener('click', function () {
    if (actualBoat) {
        // Vérifier si la direction actuelle est 'horizontal' et la changer en 'vertical', et vice versa
        actualBoat.direction = actualBoat.direction === 'horizontal' ? 'vertical' : 'horizontal';
        console.log('Direction du bateau changée en', actualBoat.direction);
        clearShipContainer();
        // Redessiner tous les bateaux avec leurs nouvelles directions
        shipsArray.forEach(function (ship) { return displayShip(ship); });
    }
    else {
        console.log('Aucun bateau sélectionné.');
    }
});
function clearShipContainer() {
    while (shipContainer.firstChild) {
        shipContainer.removeChild(shipContainer.firstChild);
    }
}
function affectAdjacentCells(gridValues, i, j, boatSize, direction, colorValue) {
    var adjacentIndices = [];
    console.log(colorValue);
    switch (direction) {
        case 'horizontal':
            for (var k = 1; k <= boatSize - 1; k++) {
                if (j < 5) {
                    if (j - k >= 0)
                        adjacentIndices.push([i, j - k]);
                }
                if (j >= 5) {
                    if (j + k < 10)
                        adjacentIndices.push([i, j + k]);
                }
            }
            break;
        case 'vertical':
            for (var k = 1; k <= boatSize; k++) {
                if (i < 5) {
                    if (i - k >= 0)
                        adjacentIndices.push([i - k, j]);
                }
                if (i >= 5) {
                    if (i + k < 10)
                        adjacentIndices.push([i + k, j]);
                }
            }
            break;
    }
    adjacentIndices.push([i, j]);
    console.log(adjacentIndices);
    adjacentIndices.forEach(function (_a) {
        var x = _a[0], y = _a[1];
        console.log(colorValue);
        gridValues[x][y] = colorValue; // Utilisez colorValue pour définir la valeur de la case
        var adjacentCell = document.getElementById("cell-".concat(x, "-").concat(y));
        if (adjacentCell) {
            adjacentCell.textContent = gridValues[x][y].toString();
            adjacentCell.style.backgroundColor = colors[colorValue];
        }
    });
    console.log(gridValues[i][j]);
    console.log('affected');
}
