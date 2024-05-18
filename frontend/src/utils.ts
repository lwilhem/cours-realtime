import { displayShip } from './components.ts';
import {clearShipContainer,resetShipsArray,clearGridValues}from './batailleNavaleManager.ts'


export function resetGame(): void {
    let shipsArray = resetShipsArray();
    
    clearGridValues();
    const cells = document.querySelectorAll('[id^="cell-"]');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });

    clearShipContainer();
    shipsArray.forEach(ship => displayShip(ship));
}
