class Game {
  constructor() {}

  static fullScore = 100000
  static iterations = 0
  static depth = 8

  static switchRound(round) {
    return round === 1 ? 0 : 1
  }
}

export default Game
