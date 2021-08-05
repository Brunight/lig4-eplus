import { COLUMNS, ROWS } from './consts.js'
import Game from './Game.js'

class Board {
  constructor(scenery, player) {
    this.scenery = scenery
    this.player = player
    this.opponent = player === 1 ? 0 : 1
  }

  isFinished(depth, score) {
    return (
      depth === 0 ||
      score === Game.fullScore ||
      score === -Game.fullScore ||
      this.isFull()
    )
  }

  place(column) {
    if (
      this.scenery[column][0] === undefined &&
      column >= 0 &&
      column < COLUMNS
    ) {
      for (let y = ROWS - 1; y >= 0; y--) {
        if (this.scenery[column][y] === undefined) {
          this.scenery[column][y] = this.player
          break
        }
      }
      this.player = Game.switchRound(this.player)
      this.opponent = Game.switchRound(this.opponent)
      return true
    } else {
      return false
    }
  }

  scorePosition(row, column, deltaY, deltaX) {
    let playerPoints = 0
    let botPoints = 0

    for (let i = 0; i < 4; i++) {
      if (this.scenery[column][row] === this.opponent) {
        playerPoints++
      } else if (this.scenery[column][row] === this.player) {
        botPoints++
      }

      row += deltaY
      column += deltaX
    }

    if (playerPoints === 4) {
      return -Game.fullScore
    } else if (botPoints === 4) {
      return Game.fullScore
    } else {
      return botPoints
    }
  }

  score() {
    let verticalPoints = 0
    let horizontalPoints = 0
    let diagonal1Points = 0
    let diagonal2Points = 0

    // Total points in columns (vertical)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        const score = this.scorePosition(row, column, 1, 0)
        if (score === Game.fullScore) return Game.fullScore
        if (score === -Game.fullScore) return -Game.fullScore
        verticalPoints += score
      }
    }

    // Total points in rows (horizontal)
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS - 3; column++) {
        const score = this.scorePosition(row, column, 0, 1)
        if (score === Game.fullScore) return Game.fullScore
        if (score === -Game.fullScore) return -Game.fullScore
        horizontalPoints += score
      }
    }

    // Total points on first diagonal
    for (let row = 0; row < ROWS - 3; row++) {
      for (let column = 0; column < COLUMNS - 3; column++) {
        const score = this.scorePosition(row, column, 1, 1)
        if (score === Game.fullScore) return Game.fullScore
        if (score === -Game.fullScore) return -Game.fullScore
        diagonal1Points += score
      }
    }

    // Total points on second diagonal

    for (let row = 3; row < ROWS; row++) {
      for (let column = 0; column <= COLUMNS - 4; column++) {
        const score = this.scorePosition(row, column, -1, +1)
        if (score === Game.fullScore) return Game.fullScore
        if (score === -Game.fullScore) return -Game.fullScore
        diagonal2Points += score
      }
    }

    return verticalPoints + horizontalPoints + diagonal1Points + diagonal2Points
  }

  isFull() {
    for (let i = 0; i < COLUMNS; i++) {
      if (this.scenery[i][0] === undefined) {
        return false
      }
    }
    return true
  }

  copy() {
    const newBoard = []
    for (let i = 0; i < this.scenery.length; i++) {
      newBoard.push(this.scenery[i].slice())
    }
    return new Board(newBoard, this.player)
  }
}

export default Board
