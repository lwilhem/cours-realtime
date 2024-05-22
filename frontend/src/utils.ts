import { displayShip } from './components.ts'
import { clearGridValues, clearShipContainer, resetShipsArray } from './batailleNavaleManager.ts'

export function resetGame(): void {
  const shipsArray = resetShipsArray()

  clearGridValues()
  const cells = document.querySelectorAll('[id^="cell-"]') as NodeListOf<HTMLElement>
  cells.forEach((cell) => {
    cell.style.backgroundColor = 'white'
  })

  clearShipContainer()
  shipsArray.forEach(ship => displayShip(ship))
}
