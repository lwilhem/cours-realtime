import { Ship } from './types.ts';
import {resetGame} from './utils.ts';
import {selectBoat} from './batailleNavaleManager.ts'



// Create the Reset Game button
export function ResetButton():void{
    const resetGameButton = document.createElement('button');
    resetGameButton.textContent = 'Reset Game';
    resetGameButton.style.position = 'fixed'; 
    resetGameButton.style.bottom = '20px';
    resetGameButton.style.right = '20px';
    resetGameButton.style.zIndex = '1000'; 
    resetGameButton.addEventListener('click', resetGame);

    // Append the button to the document body
    document.body.appendChild(resetGameButton);
}

// Create the Start Game button
export function StartButton():void{
    const startGameButton = document.createElement('button');
    startGameButton.textContent = 'Start Game';
    startGameButton.addEventListener('click', () => {
        console.log('Game started!');
    });
    // Append the button to the document body
    document.body.appendChild(startGameButton);
}



// Create Grid
export function CreateGrid():HTMLElement {
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(10, 50px)';
    gridContainer.style.gridTemplateRows = 'repeat(10, 50px)';

    // Append the grid to the document body
    document.body.appendChild(gridContainer);

    return gridContainer
}


// Fonction pour afficher un bateau
export function displayShip(ship: Ship): void {
    // Créer un conteneur pour les bateaux
    const shipContainer = document.createElement('div');
    shipContainer.classList.add("shipContainer");

    shipContainer.style.display = 'flex';
    shipContainer.style.flexDirection = 'column';
    shipContainer.style.alignItems = 'center';
    shipContainer.style.gap = '20px'; 
    document.body.appendChild(shipContainer);

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
    shipElement.addEventListener('click', () => selectBoat(shipContainer,ship,shipElement))
    shipContainer.appendChild(shipElement);
}