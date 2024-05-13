export interface IGameStatusUpdate {
  player: string
  coordinate: {
    x: number
    y: number
  }
}

export interface IGameRoom {
  room_name: string
  player1: string
  player2: string
  player1_board: string[][]
  player2_board: string[][]
  player1_ships: number
  player2_ships: number
  player1_turn: boolean
  player2_turn: boolean
  player1_ready: boolean
  player2_ready: boolean
  player1_win: boolean
  player2_win: boolean
  player1_lose: boolean
  player2_lose: boolean
  player1_ships_coordinates: number[][]
  player2_ships_coordinates: number[][]
}