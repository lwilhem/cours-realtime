import { displayShip } from './components.ts';
import {clearShipContainer,resetShipsArray,clearGridValues}from './batailleNavaleManager.ts'


export function resetGame():void{
    let shipsArray = resetShipsArray();

    clearGridValues();
    

    clearShipContainer();
    shipsArray.forEach(ship => displayShip(ship));
}
