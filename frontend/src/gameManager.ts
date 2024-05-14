import { CreateGrid } from './components.ts';



const colors:{[key:number]:string} = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4:'pink',
};
const gridValues: number[][] = []; 

export function StartGame():void{
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
                
            });
            cell.addEventListener('mouseenter',()=>{
                
                if(gridValues[i][j] == 0){
                    // let colorValue = 4;
                    
                }
            })
            cell.addEventListener('mouseleave',()=>{
                if(gridValues[i][j] != 1){
                    // let colorValue = 0;
                }
            })
            
            gridContainer.appendChild(cell);
        }
        gridValues.push(row);
    }
}