import { Ship } from './types.ts';
import { StartButton,ResetButton,CreateGrid,displayShip } from './components.ts';


// global Variables
const colors:{[key:number]:string} = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4:'pink',
};

let actualBoat: Ship | null = null;



let shipsArray: Ship[] = [
    { size: 5,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 4,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false}, 
    { size: 2,startX:0,startY:0,direction:'horizontal',selected:false}, 
];

export function resetShipsArray(){
    shipsArray = [
    { size: 5,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 4,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false},
    { size: 3,startX:0,startY:0,direction:'horizontal',selected:false}, 
    { size: 2,startX:0,startY:0,direction:'horizontal',selected:false}, 
];
return shipsArray
}




const gridValues: number[][] = []; 

// Initialisation de la grille
function InitGame():void{
    let gridContainer = CreateGrid();
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
                    if(affectAdjacentCells(gridValues,i, j, actualBoat.size, actualBoat.direction,colorValue)){
                        const boatToRemove = shipsArray.find(ship => ship.startX === actualBoat?.startX && ship.startY === actualBoat.startY && ship.direction === actualBoat.direction && ship.size === actualBoat.size);
                        if (boatToRemove) {
                            // Supprimer le bateau de shipsArray
                            const index = shipsArray.indexOf(boatToRemove);
                            if (index > -1) {
                                shipsArray.splice(index, 1);
                            }
                
                            // Réinitialiser le bateau actuel
                            actualBoat = null;
                        clearShipContainer();
                        shipsArray.forEach(ship => displayShip(ship));
                        checkShipsArrayEmpty();
                    }
                    
                    }                
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
}
InitGame();






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

export function clearShipContainer(): void {
    let shipContainer = Array.from(document.getElementsByClassName('shipContainer'));
    shipContainer.forEach(ship => {
        ship.remove();
    });
}











function affectAdjacentCells(gridValues: number[][], i: number, j: number, boatSize: number, direction: 'horizontal' | 'vertical', colorValue: number):boolean {
    let adjacentIndices = [];
    console.log(colorValue);
    console.log("i"+i)
    console.log("j"+j)
    
    let n:number=1;
    let adjacent:boolean = false;
    switch (direction) {
        case 'horizontal':
            for (let k = 1; k <= boatSize-1; k++) {
                

                if(j<5){
                    j = j<Math.floor(boatSize/2)? Math.floor(boatSize/2):j;
                    if(adjacent === false){
                        adjacentIndices.push([i, j - n]);
                        adjacent = true
                    }else{
                        adjacentIndices.push([i, j + n]);
                        adjacent = false
                        n++
                    }
                }
                if(j>=5){
                    j = j>=10-Math.floor(boatSize/2)? 9-Math.floor(boatSize/2):j;
                    if(adjacent === false){
                        adjacentIndices.push([i, j +  n]);
                        adjacent = true
                    }else{
                        adjacentIndices.push([i, j - n]);
                        adjacent = false
                        n++
                    }
                }
            }
            break;
        case 'vertical':
            for (let k = 1; k <= boatSize-1; k++) {
                if(i<5){
                    i = i<Math.floor(boatSize/2)? Math.floor(boatSize/2):i;
                    if(adjacent === false){
                        adjacentIndices.push([i - n, j]); 
                        adjacent = true
                    }else{
                        adjacentIndices.push([i + n, j]); 
                        adjacent = false
                        n++

                    }
                }
                if(i>=5){
                    i = i>=10-Math.floor(boatSize/2)? 9-Math.floor(boatSize/2):i;
                    if(adjacent === false){
                        adjacentIndices.push([i + n, j]);
                        adjacent = true
                    }else{
                        adjacentIndices.push([i - n, j]);
                        adjacent = false
                        n++
                    }
                    
                }
                
            }
            break;
    }
    console.log('i after '+i);
    console.log('j after '+j)
    adjacentIndices.push([i,j]);
    console.log(adjacentIndices);
    let isValid = true
    adjacentIndices.forEach(([x, y]) =>{
        isValid = gridValues[x][y] == 1? false:isValid;
    });
    if(isValid == true){
        adjacentIndices.forEach(([x, y]) => {
            if(gridValues[x][y] !== 1){
                console.log(colorValue);
                gridValues[x][y] = colorValue; 
                const adjacentCell = document.getElementById(`cell-${x}-${y}`);
                console.log(adjacentCell);
                if (adjacentCell) {
                    adjacentCell.textContent = gridValues[x][y].toString();
                    adjacentCell.style.backgroundColor = colors[colorValue];
                }
            }
        });
    }
    return isValid;
}
export function selectBoat(shipContainer:HTMLElement,ship: Ship,shipElement:HTMLElement){
    {
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
    };
}

function checkShipsArrayEmpty():void{
    
    if(shipsArray.length == 0){
        StartButton();
    }
}
ResetButton();



