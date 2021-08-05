import Board from './Board.js'
import { COLUMNS, ROWS } from './consts.js'
import Game from './Game.js'
import { calcMaximize } from './minimax.js'

const BrunoScript = (scenery, myMove) => {
  console.log(scenery)

  let isFirst = true
  for (let i = 0; i < COLUMNS; i++) {
    if (isFirst && scenery[i][ROWS - 1] !== undefined) {
      isFirst = false
    }
  }
  if (isFirst) {
    const firstMoves = [3, 4]
    return firstMoves[Math.floor(Math.random() * 2)]
  }

  return generateBotPlay(new Board(scenery, myMove))
}

const generateBotPlay = board => {
  if (
    board.score() !== Game.fullScore &&
    board.score() !== -Game.fullScore &&
    !board.isFull()
  ) {
    Game.iterations = 0

    const botMove = calcMaximize(board, Game.depth)

    return botMove[0]
  }
}

//retornar um número entre 0 e 7

export default BrunoScript
