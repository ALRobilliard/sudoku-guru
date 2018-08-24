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

function initGame() {
  let vals: number[] = [];
  let grid: number[][] = [];
  new sudokuGame(grid);
}

class square {
  xPos: number;
  yPos: number;
  value: number;

  constructor(yPos: number, xPos: number, val: number) {
    this.yPos = yPos;
    this.xPos = xPos;
    this.value = val;
  }

  // Checks whether another position in the same row contains the value.
  usedInRow(puzzle: square[][], num: number): boolean {
    for (let col = 0; col < 9; col++) {
      if (puzzle[col][this.xPos].value == num) {
        return true;
      }
    }
    return false;
  }

  // Checks whether another position in the same column contains the value.
  usedInCol(puzzle: square[][], num: number): boolean {
    for (let row = 0; row < 9; row++) {
      if (puzzle[this.yPos][row].value == num) {
        return true;
      }
    }
    return false;
  }

  // Checks whether another postion in the same 3x3 sub-grid contains the value.
  usedInBox(puzzle: square[][], num: number): boolean {
    let yMin = this.yPos - (this.yPos % 3);
    let yMax = this.yPos + ((this.yPos + 1) % 3);
    let xMin = this.xPos - (this.xPos % 3);
    let xMax = this.xPos + ((this.xPos + 1) % 3);
    for (let y = yMin; y < yMax; y++) {
      for (let x = xMin; x < xMax; x++) {
        if (puzzle[y][x].value == num) {
          return true;
        }
      }
    }
    return false;
  }

  // Checks whether the number conflicts with any relevant existing squares.
  locationIsSafe(puzzle: square[][], num: number): boolean {
    return (
      !this.usedInCol(puzzle, num) &&
      !this.usedInRow(puzzle, num) &&
      !this.usedInBox(puzzle, num)
    );
  }
}

class sudokuGame {
  squares: square[][] = [];
  backtrackIndex: number[];
  possibilities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(puzzle: number[][]) {
    for (let y = 0; y < 9; y++) {
      let row: square[] = [];
      for (let x = 0; x < 9; x++) {
        row.push(new square(y, x, puzzle[y][x]));
      }
      this.squares.push(row);
    }

    if (this.solve()) {
      this.printGrid();
    } else {
      console.log('No solution to this puzzle exits.');
    }
  }

  printGrid(): void {
    for (let y = 0; y < 9; y++) {
      let line = '';
      for (let x = 0; x < 9; x++) {
        let val = this.squares[y][x].value;
        line += val != null ? val + ' ' : '  ';
      }
      console.log(line);
    }
  }

  findEmpty(): boolean {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (this.squares[y][x].value == 0) {
          this.backtrackIndex[0] = y;
          this.backtrackIndex[1] = x;
          return true;
        }
      }
    }
    return false;
  }

  solve(): boolean {
    this.backtrackIndex = [0, 0];

    // If no empty squares exist then the puzzle is solved.
    if (!this.findEmpty()) {
      return true;
    }

    let col = this.backtrackIndex[0];
    let row = this.backtrackIndex[1];
    for (let number of this.possibilities) {
      if (this.squares[col][row].locationIsSafe(this.squares, number)) {
        this.squares[col][row].value = number;

        if (this.solve()) {
          return true;
        }

        this.squares[col][row].value = 0;
      }
    }
    return false;
  }
}
