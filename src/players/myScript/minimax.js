import { COLUMNS } from './consts.js'
import Game from './Game.js'

export const calcMinimize = (board, depth, alpha, beta) => {
  const score = board.score()

  if (board.isFinished(depth, score)) return [undefined, score]

  let min = [undefined, 99999]

  for (let column = 0; column < COLUMNS; column++) {
    const newBoard = board.copy()

    if (newBoard.place(column)) {
      Game.iterations++

      const nextMove = calcMaximize(newBoard, depth - 1, alpha, beta)

      if (min[0] === undefined || nextMove[1] < min[1]) {
        min[0] = column
        min[1] = nextMove[1]
        beta = nextMove[1]
      }

      if (alpha >= beta) return min
    }
  }
  return min
}

export const calcMaximize = (board, depth, alpha, beta) => {
  const score = board.score()

  if (board.isFinished(depth, score)) return [undefined, score]

  let max = [undefined, -99999]

  for (let column = 0; column < COLUMNS; column++) {
    const newBoard = board.copy()

    if (newBoard.place(column)) {
      Game.iterations++

      const nextMove = calcMinimize(newBoard, depth - 1, alpha, beta)

      if (max[0] === undefined || nextMove[1] > max[1]) {
        max[0] = column
        max[1] = nextMove[1]
        alpha = nextMove[1]
      }

      if (alpha >= beta) return max
    }
  }

  return max
}
