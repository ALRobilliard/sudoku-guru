let _grid = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

class square {
  xPos: number;
  yPos: number;
  value: number;
  isSolved: boolean = false;
  possibleValues: number[];

  constructor(yPos: number, xPos: number, val: number) {
    this.yPos = yPos;
    this.xPos = xPos;
    if (val > 0) {
      this.value = val;
      this.isSolved = true;
      this.possibleValues = [];
    }
  }

  usedInRow(puzzle: number[][], num: number): boolean {
    for (let col = 0; col < puzzle.length; col++) {
      if (puzzle[col][this.xPos] == num) {
        return true;
      }
    }
    return false;
  }

  usedInCol(puzzle: number[][], num: number): boolean {
    for (let row = 0; row < puzzle[this.yPos].length; row++) {
      if (puzzle[this.yPos][row] == num) {
        return true;
      }
    }
    return false;
  }

  usedInBox(puzzle: number[][], num: number): boolean {
    for (let y = 0; y < Math.floor(Math.sqrt(puzzle.length)); y++) {
      for (let x = 0; x < Math.floor(Math.sqrt(puzzle[y].length)); x++) {
        if (puzzle[this.yPos + y][this.xPos + x] == num) {
          return true;
        }
      }
    }
    return false;
  }

  locationIsSafe(puzzle: number[][], num: number): boolean {
    return !(
      this.usedInCol(puzzle, num) &&
      this.usedInRow(puzzle, num) &&
      this.usedInBox(puzzle, num)
    );
  }
}

class sudokuGame {
  squares: square[][] = [];

  constructor(puzzle: number[][]) {
    for (let y = 0; y < puzzle.length; y++) {
      let row: square[] = [];
      for (let x = 0; x < puzzle[y].length; x++) {
        row.push(new square(y, x, puzzle[y][x]));
      }
      this.squares.push(row);
    }
  }

  printGrid() {
    for (let y = 0; y < this.squares.length; y++) {
      let line = '';
      for (let x = 0; x < this.squares[y].length; x++) {
        let val = this.squares[y][x].value;
        line += val != null ? val + ' ' : '  ';
      }
      console.log(line);
    }
  }
}
