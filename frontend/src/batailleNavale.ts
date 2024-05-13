// Définition des couleurs en fonction des valeurs
const colors:{[key:number]:string} = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4:'pink',
    // Ajoutez d'autres couleurs et valeurs au besoin
};

interface Ship {
    size: number;
    startX: number;
    startY: number;
    direction: 'horizontal' | 'vertical';
    selected: boolean; 

}

let actualBoat: Ship | null = null;

const shipsArray: Ship[] = [
    { size: 5,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 4,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false}, 
    { size: 2,startX:0,startY:0,direction:'horizontal',selected:false}, 
];

// Création de la grille
const gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)';
gridContainer.style.gridTemplateRows = 'repeat(10, 50px)';
document.body.appendChild(gridContainer);

const gridValues: number[][] = []; // Tableau pour stocker les valeurs de la grille

// Initialisation de la grille
for (let i = 0; i < 10; i++) {
    const row: number[] = [];
    for (let j = 0; j < 10; j++) {
        const value = 0;
        row.push(value);
        const cell = document.createElement('div');
        cell.id = `cell-${i}-${j}`;
        cell.textContent = value.toString();
        cell.style.width = '50px';
        cell.style.height = '50px';
        cell.style.border = '1px solid black';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.backgroundColor = colors[value];
        cell.addEventListener('click', () => {
            if(actualBoat !== null){
                let colorValue = 1;
                affectAdjacentCells(gridValues,i, j, actualBoat.size, actualBoat.direction,colorValue);
                
            }
        });
        cell.addEventListener('mouseenter',()=>{
            
            if(gridValues[i][j] == 0 && actualBoat !==null){
                let colorValue = 4;
                affectAdjacentCells(gridValues,i, j, actualBoat.size, actualBoat.direction,colorValue);
            }
        })
        cell.addEventListener('mouseleave',()=>{
            if(gridValues[i][j] != 1 && actualBoat !== null){
                console.log(gridValues);
                let colorValue = 0;
                affectAdjacentCells(gridValues,i, j, actualBoat.size, actualBoat.direction,colorValue);

            }
        })
        
        gridContainer.appendChild(cell);
    }
    gridValues.push(row);
}


// Créer un conteneur pour les bateaux
const shipContainer = document.createElement('div');
shipContainer.style.display = 'flex';
shipContainer.style.flexDirection = 'column';
shipContainer.style.alignItems = 'center';
shipContainer.style.gap = '20px'; 
document.body.appendChild(shipContainer);

// Fonction pour afficher un bateau
function displayShip(ship: Ship): void {
    const shipElement = document.createElement('div');
    if(ship.direction == 'vertical'){
        shipElement.style.width = `50px`;
        shipElement.style.height = `${ship.size * 50}px`; 
    }
    else{
        shipElement.style.width = `${ship.size * 50}px`; 
        shipElement.style.height = `50px`;
    }
    shipElement.style.backgroundColor = ship.selected? 'blue' : 'black';
    shipElement.style.cursor = 'pointer';
    shipElement.addEventListener('click', () => {
        const shipElements = shipContainer.querySelectorAll('div');
        shipsArray.forEach(ship => ship.selected = false);

        shipElements.forEach(shipElement => {
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
shipsArray.forEach(ship => displayShip(ship));






const changeDirectionButton = document.createElement('button');
changeDirectionButton.textContent = 'Changer la direction';
document.body.appendChild(changeDirectionButton);

changeDirectionButton.addEventListener('click', () => {
    if (actualBoat) {
        // Vérifier si la direction actuelle est 'horizontal' et la changer en 'vertical', et vice versa
        actualBoat.direction = actualBoat.direction === 'horizontal'? 'vertical' : 'horizontal';
        console.log('Direction du bateau changée en', actualBoat.direction);
        clearShipContainer();

        // Redessiner tous les bateaux avec leurs nouvelles directions
        shipsArray.forEach(ship => displayShip(ship));
    } else {
        console.log('Aucun bateau sélectionné.');
    }
});

function clearShipContainer(): void {
    while (shipContainer.firstChild) {
        shipContainer.removeChild(shipContainer.firstChild);
    }
}











function affectAdjacentCells(gridValues: number[][], i: number, j: number, boatSize: number, direction: 'horizontal' | 'vertical', colorValue: number) {
    let adjacentIndices = [];
    console.log(colorValue);

    switch (direction) {
        case 'horizontal':
            for (let k = 1; k <= boatSize-1; k++) {
                if(j<5){
                    if (j - k >= 0) adjacentIndices.push([i, j - k]);
                }
                if(j>=5){
                    if (j + k < 10) adjacentIndices.push([i, j + k]);
                }
            }
            break;
        case 'vertical':
            for (let k = 1; k <= boatSize; k++) {
                if(i<5){
                    if (i - k >= 0) adjacentIndices.push([i - k, j]); 
                }
                if(i>=5){
                    if (i + k < 10) adjacentIndices.push([i + k, j]);
                }
                
            }
            break;
    }
    adjacentIndices.push([i,j]);
    console.log(adjacentIndices);
    adjacentIndices.forEach(([x, y]) => {
        console.log(colorValue);
        gridValues[x][y] = colorValue; 
        const adjacentCell = document.getElementById(`cell-${x}-${y}`);
        if (adjacentCell) {
            adjacentCell.textContent = gridValues[x][y].toString();
            adjacentCell.style.backgroundColor = colors[colorValue];
        }
    });

    console.log(gridValues[i][j]);
    console.log('affected');
}