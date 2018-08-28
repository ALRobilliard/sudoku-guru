let presets = {
  easy: [
    3,
    0,
    6,
    5,
    0,
    8,
    4,
    0,
    0,
    5,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    8,
    7,
    0,
    0,
    0,
    0,
    3,
    1,
    0,
    0,
    3,
    0,
    1,
    0,
    0,
    8,
    0,
    9,
    0,
    0,
    8,
    6,
    3,
    0,
    0,
    5,
    0,
    5,
    0,
    0,
    9,
    0,
    6,
    0,
    0,
    1,
    3,
    0,
    0,
    0,
    0,
    2,
    5,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    7,
    4,
    0,
    0,
    5,
    2,
    0,
    6,
    3,
    0,
    0
  ],
  medium: [
    0,
    0,
    0,
    1,
    5,
    4,
    0,
    0,
    8,
    0,
    0,
    1,
    0,
    0,
    0,
    7,
    0,
    9,
    8,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    7,
    0,
    0,
    8,
    2,
    0,
    2,
    3,
    0,
    0,
    0,
    5,
    4,
    0,
    7,
    4,
    0,
    0,
    9,
    0,
    0,
    0,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    6,
    1,
    0,
    9,
    0,
    0,
    0,
    3,
    0,
    0,
    3,
    0,
    0,
    9,
    8,
    2,
    0,
    0,
    0
  ],
  hard: [
    0,
    2,
    0,
    0,
    0,
    9,
    3,
    0,
    0,
    0,
    0,
    3,
    6,
    0,
    0,
    4,
    0,
    0,
    0,
    8,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    6,
    0,
    0,
    5,
    1,
    0,
    0,
    9,
    4,
    0,
    0,
    3,
    0,
    0,
    5,
    6,
    0,
    0,
    1,
    8,
    0,
    0,
    7,
    0,
    0,
    0,
    0,
    0,
    0,
    8,
    0,
    0,
    1,
    0,
    0,
    0,
    4,
    0,
    0,
    3,
    5,
    0,
    0,
    0,
    0,
    2,
    4,
    0,
    0,
    0,
    9,
    0
  ]
};

function initGame() {
  let grid = readInput();

  // TODO: convert to method. Check for conflicts in input as well as number of values.
  var valueCount = 0;
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      if (grid[y][x] > 0) valueCount++;
    }
  }

  if (valueCount > 16) {
    hideError();
    new sudokuGame(grid);
  } else {
    showError(
      'Invalid input. A unique solution requires at least 17 non-null values.'
    );
  }
}

function fillInput(): void {
  var strArr = (<HTMLInputElement>(
    document.getElementById('csv-input')
  )).value.split(' ');
  var numArr = strArr.map(x => parseInt(x));
  fillInputGrid(numArr);
}

function fillPreset(): void {
  var selectVal = (<HTMLSelectElement>document.getElementById('presetSelect'))
    .value;
  switch (selectVal) {
    case 'Easy':
      fillInputGrid(presets.easy);
      break;
    case 'Medium':
      fillInputGrid(presets.medium);
      break;
    case 'Hard':
      fillInputGrid(presets.hard);
      break;
  }
}

function fillInputGrid(nums: number[]): void {
  var yCount = 0;
  var xCount = 0;
  for (var num of nums) {
    var val = num != 0 ? num : '';
    (<HTMLInputElement>(
      document.getElementById(`grid${yCount + 1}${xCount + 1}`)
    )).value = val.toString();
    xCount++;
    if (xCount === 9) {
      xCount = 0;
      yCount++;
    }
  }
}

function fillOutputGrid(squares: square[]): void {
  var yCount = 0;
  var xCount = 0;
  for (var square of squares) {
    var val = square.value != 0 ? square.value : '';
    (<HTMLInputElement>(
      document.getElementById(`grid_filled_${yCount + 1}${xCount + 1}`)
    )).value = val.toString();
    if (square.original) {
      document
        .getElementById(`grid_filled_${yCount + 1}${xCount + 1}`)
        .classList.add('original');
    } else {
      document
        .getElementById(`grid_filled_${yCount + 1}${xCount + 1}`)
        .classList.remove('original');
    }
    xCount++;
    if (xCount === 9) {
      xCount = 0;
      yCount++;
    }
  }
}

function readInput(): number[][] {
  var puzzleArr: number[][] = [];
  for (var y = 0; y < 9; y++) {
    puzzleArr.push([]);
    for (var x = 0; x < 9; x++) {
      var value = parseInt(
        (<HTMLInputElement>document.getElementById(`grid${y + 1}${x + 1}`))
          .value
      );
      value = value || 0;
      puzzleArr[y].push(value);
    }
  }
  return puzzleArr;
}

function clearGrid(): void {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      (<HTMLInputElement>(
        document.getElementById(`grid${y + 1}${x + 1}`)
      )).value = '';
      (<HTMLInputElement>(
        document.getElementById(`grid_filled_${y + 1}${x + 1}`)
      )).value = '';
    }
  }
}

function showError(msg: string): void {
  document.getElementById('error-message').innerText = msg;
  document.getElementById('error-message').style.display = 'block';
}

function hideError(): void {
  document.getElementById('error-message').innerText = '';
  document.getElementById('error-message').style.display = 'none';
}

class square {
  xPos: number;
  yPos: number;
  value: number;
  original: boolean;

  constructor(yPos: number, xPos: number, val: number) {
    this.yPos = yPos;
    this.xPos = xPos;
    this.value = val;
    if (this.value !== 0) {
      this.original = true;
    }
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
      this.outputGrid();
      hideError();
    } else {
      showError('No solution to this puzzle exists.');
    }
  }

  outputGrid(): void {
    var squares: square[] = [];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        let val = this.squares[y][x];
        squares.push(val);
      }
    }
    fillOutputGrid(squares);
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
