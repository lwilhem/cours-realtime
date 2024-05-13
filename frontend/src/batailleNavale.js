// Définition des couleurs en fonction des valeurs
var colors = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4: 'pink',
    // Ajoutez d'autres couleurs et valeurs au besoin
};
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
        var value = 0; // Valeur aléatoire entre 0 et 2
        row.push(value);
        var cell = document.createElement('div');
        cell.textContent = value.toString();
        cell.style.width = '50px';
        cell.style.height = '50px';
        cell.style.border = '1px solid black';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.backgroundColor = colors[value];
        cell.addEventListener('click', function () {
            // Change la valeur au clic et met à jour la couleur
            gridValues[i][j] = 1;
            cell.textContent = gridValues[i][j].toString();
            cell.style.backgroundColor = colors[gridValues[i][j]];
        });
        cell.addEventListener('mouseenter', function () {
            if (gridValues[i][j] == 0) {
                gridValues[i][j] = 4;
                cell.textContent = gridValues[i][j].toString();
                cell.style.backgroundColor = colors[gridValues[i][j]];
                console.log(gridValues[i][j]);
                console.log('truc');
                cell.addEventListener('mouseleave', function () {
                    if (gridValues[i][j] != 1) {
                        gridValues[i][j] = 0;
                        cell.textContent = gridValues[i][j].toString();
                        cell.style.backgroundColor = colors[gridValues[i][j]];
                        console.log(gridValues[i][j]);
                        console.log('truc');
                    }
                });
            }
        });
        gridContainer.appendChild(cell);
    };
    for (var j = 0; j < 10; j++) {
        _loop_2(j);
    }
    gridValues.push(row);
};
// Initialisation de la grille avec des valeurs aléatoires
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
