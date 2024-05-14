import { displayShip } from './components.ts';
import {clearShipContainer,resetShipsArray}from './batailleNavaleManager.ts'

const colors:{[key:number]:string} = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4:'pink',
};


export function resetGame():void{
    let shipsArray = resetShipsArray();

    for (let i = 0; i < 10; i++) {
        const row: number[] = [];
        for (let j = 0; j < 10; j++) {
                let value = 0
                const cell = document.getElementById(`cell-${i}-${j}`);
                console.log(cell);
                if (cell) {
                    console.log("row"+i+j+"="+value);    
                    row.push(value); 
                    cell.textContent = value.toString();
                    cell.style.backgroundColor = colors[value];
                }
        }
    }

    clearShipContainer();
    shipsArray.forEach(ship => displayShip(ship));
}
