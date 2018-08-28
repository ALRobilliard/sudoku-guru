var presets = {
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
    var grid = readInput();
    var valueCount = 0;
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (grid[y][x] > 0)
                valueCount++;
        }
    }
    if (valueCount > 16) {
        hideError();
        new sudokuGame(grid);
    }
    else {
        showError('Invalid input. A unique solution requires at least 17 non-null values.');
    }
}
function fillInput() {
    var strArr = (document.getElementById('csv-input')).value.split(' ');
    var numArr = strArr.map(function (x) { return parseInt(x); });
    fillInputGrid(numArr);
}
function fillPreset() {
    var selectVal = document.getElementById('presetSelect')
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
function fillInputGrid(nums) {
    var yCount = 0;
    var xCount = 0;
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var num = nums_1[_i];
        var val = num != 0 ? num : '';
        (document.getElementById("grid" + (yCount + 1) + (xCount + 1))).value = val.toString();
        xCount++;
        if (xCount === 9) {
            xCount = 0;
            yCount++;
        }
    }
}
function fillOutputGrid(squares) {
    var yCount = 0;
    var xCount = 0;
    for (var _i = 0, squares_1 = squares; _i < squares_1.length; _i++) {
        var square = squares_1[_i];
        var val = square.value != 0 ? square.value : '';
        (document.getElementById("grid_filled_" + (yCount + 1) + (xCount + 1))).value = val.toString();
        if (square.original) {
            document
                .getElementById("grid_filled_" + (yCount + 1) + (xCount + 1))
                .classList.add('original');
        }
        else {
            document
                .getElementById("grid_filled_" + (yCount + 1) + (xCount + 1))
                .classList.remove('original');
        }
        xCount++;
        if (xCount === 9) {
            xCount = 0;
            yCount++;
        }
    }
}
function readInput() {
    var puzzleArr = [];
    for (var y = 0; y < 9; y++) {
        puzzleArr.push([]);
        for (var x = 0; x < 9; x++) {
            var value = parseInt(document.getElementById("grid" + (y + 1) + (x + 1))
                .value);
            value = value || 0;
            puzzleArr[y].push(value);
        }
    }
    return puzzleArr;
}
function clearGrid() {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            (document.getElementById("grid" + (y + 1) + (x + 1))).value = '';
            (document.getElementById("grid_filled_" + (y + 1) + (x + 1))).value = '';
        }
    }
}
function showError(msg) {
    document.getElementById('error-message').innerText = msg;
    document.getElementById('error-message').style.display = 'block';
}
function hideError() {
    document.getElementById('error-message').innerText = '';
    document.getElementById('error-message').style.display = 'none';
}
var square = /** @class */ (function () {
    function square(yPos, xPos, val) {
        this.yPos = yPos;
        this.xPos = xPos;
        this.value = val;
        if (this.value !== 0) {
            this.original = true;
        }
    }
    // Checks whether another position in the same row contains the value.
    square.prototype.usedInRow = function (puzzle, num) {
        for (var col = 0; col < 9; col++) {
            if (puzzle[col][this.xPos].value == num) {
                return true;
            }
        }
        return false;
    };
    // Checks whether another position in the same column contains the value.
    square.prototype.usedInCol = function (puzzle, num) {
        for (var row = 0; row < 9; row++) {
            if (puzzle[this.yPos][row].value == num) {
                return true;
            }
        }
        return false;
    };
    // Checks whether another postion in the same 3x3 sub-grid contains the value.
    square.prototype.usedInBox = function (puzzle, num) {
        var yMin = this.yPos - (this.yPos % 3);
        var yMax = this.yPos + ((this.yPos + 1) % 3);
        var xMin = this.xPos - (this.xPos % 3);
        var xMax = this.xPos + ((this.xPos + 1) % 3);
        for (var y = yMin; y < yMax; y++) {
            for (var x = xMin; x < xMax; x++) {
                if (puzzle[y][x].value == num) {
                    return true;
                }
            }
        }
        return false;
    };
    // Checks whether the number conflicts with any relevant existing squares.
    square.prototype.locationIsSafe = function (puzzle, num) {
        return (!this.usedInCol(puzzle, num) &&
            !this.usedInRow(puzzle, num) &&
            !this.usedInBox(puzzle, num));
    };
    return square;
}());
var sudokuGame = /** @class */ (function () {
    function sudokuGame(puzzle) {
        this.squares = [];
        this.possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var y = 0; y < 9; y++) {
            var row = [];
            for (var x = 0; x < 9; x++) {
                row.push(new square(y, x, puzzle[y][x]));
            }
            this.squares.push(row);
        }
        if (this.solve()) {
            this.outputGrid();
            hideError();
        }
        else {
            showError('No solution to this puzzle exists.');
        }
    }
    sudokuGame.prototype.outputGrid = function () {
        var squares = [];
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var val = this.squares[y][x];
                squares.push(val);
            }
        }
        fillOutputGrid(squares);
    };
    sudokuGame.prototype.findEmpty = function () {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                if (this.squares[y][x].value == 0) {
                    this.backtrackIndex[0] = y;
                    this.backtrackIndex[1] = x;
                    return true;
                }
            }
        }
        return false;
    };
    sudokuGame.prototype.solve = function () {
        this.backtrackIndex = [0, 0];
        // If no empty squares exist then the puzzle is solved.
        if (!this.findEmpty()) {
            return true;
        }
        var col = this.backtrackIndex[0];
        var row = this.backtrackIndex[1];
        for (var _i = 0, _a = this.possibilities; _i < _a.length; _i++) {
            var number = _a[_i];
            if (this.squares[col][row].locationIsSafe(this.squares, number)) {
                this.squares[col][row].value = number;
                if (this.solve()) {
                    return true;
                }
                this.squares[col][row].value = 0;
            }
        }
        return false;
    };
    return sudokuGame;
}());
