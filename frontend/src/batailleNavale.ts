// Définition des couleurs en fonction des valeurs
const colors:{[key:number]:string} = {
    0: 'white',
    1: 'black',
    2: 'green',
    3: 'red',
    4:'pink',
    // Ajoutez d'autres couleurs et valeurs au besoin
};

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
            // Change la valeur au clic et met à jour la couleur
            gridValues[i][j] = 1;
            cell.textContent = gridValues[i][j].toString();
            cell.style.backgroundColor = colors[gridValues[i][j]];
        });
        cell.addEventListener('mouseenter',()=>{
            if(gridValues[i][j] == 0){
                gridValues[i][j] = 4;
                cell.textContent = gridValues[i][j].toString();
                cell.style.backgroundColor = colors[gridValues[i][j]];
                console.log(gridValues[i][j]);
                console.log('truc')
                cell.addEventListener('mouseleave',()=>{
                    if(gridValues[i][j] != 1){
                        gridValues[i][j] = 0;
                        cell.textContent = gridValues[i][j].toString();
                        cell.style.backgroundColor = colors[gridValues[i][j]];
                        console.log(gridValues[i][j]);
                        console.log('truc')
                    }

            })
            }

        })
        
        gridContainer.appendChild(cell);
    }
    gridValues.push(row);
}