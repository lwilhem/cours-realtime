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
}

let actualBoat: Ship | null = null;

const shipsArray: Ship[] = [
    { size: 5,startX:0,startY:0,direction:'horizontal'},
    { size: 4,startX:0,startY:0,direction:'horizontal'},
    { size: 3,startX:0,startY:0,direction:'horizontal'},
    { size: 3,startX:0,startY:0,direction:'horizontal'}, 
    { size: 2,startX:0,startY:0,direction:'horizontal'}, 
];

// Création de la grille
const gridContainer = document.createElement('div');
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)';
gridContainer.style.gridTemplateRows = 'repeat(10, 50px)';
document.body.appendChild(gridContainer);

const gridValues: number[][] = []; // Tableau pour stocker les valeurs de la grille

// Initialisation de la grille avec des valeurs aléatoires
for (let i = 0; i < 10; i++) {
    const row: number[] = [];
    for (let j = 0; j < 10; j++) {
        const value = 0; // Valeur aléatoire entre 0 et 2
        row.push(value);
        const cell = document.createElement('div');
        cell.textContent = value.toString();
        cell.style.width = '50px';
        cell.style.height = '50px';
        cell.style.border = '1px solid black';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.backgroundColor = colors[value];
        cell.addEventListener('click', () => {
            if(actualBoat != null){
                gridValues[i][j] = 1;
                cell.textContent = gridValues[i][j].toString();
                cell.style.backgroundColor = colors[gridValues[i][j]];
            }
        });
        cell.addEventListener('mouseenter',()=>{
            
            if(gridValues[i][j] == 0 && actualBoat != null){
                gridValues[i][j] = 4;
                cell.textContent = gridValues[i][j].toString();
                cell.style.backgroundColor = colors[gridValues[i][j]];
                console.log(gridValues[i][j]);
                console.log('truc') 
            }
        })
        cell.addEventListener('mouseleave',()=>{
            if(gridValues[i][j] != 1 && actualBoat != null){
                gridValues[i][j] = 0;
                cell.textContent = gridValues[i][j].toString();
                cell.style.backgroundColor = colors[gridValues[i][j]];
                console.log(gridValues[i][j]);
                console.log('truc')
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
shipContainer.style.gap = '20px'; // Ajouter un espace entre la grille et les bateaux
document.body.appendChild(shipContainer);

// Fonction pour afficher un bateau
function displayShip(ship: Ship): void {
    const shipElement = document.createElement('div');
    if(ship.direction == 'vertical'){
        shipElement.style.width = `50px`; // Taille du bateau en pixels
        shipElement.style.height = `${ship.size * 50}px`; // Taille du bateau en pixels
    }
    else{
        shipElement.style.width = `${ship.size * 50}px`; // Taille du bateau en pixels
        shipElement.style.height = `50px`; // Taille du bateau en pixels
    }
    shipElement.style.backgroundColor = 'black'; // Couleur du bateau, ajustez selon vos préférences
    shipElement.style.cursor = 'pointer';
    shipElement.addEventListener('click', () => {
        const shipElements = shipContainer.querySelectorAll('div');
        shipElements.forEach(shipElement => {
            shipElement.style.backgroundColor = 'black';
        });
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