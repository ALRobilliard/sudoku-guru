var _grid = [
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
function initGame(valStr) {
    var valArr = valStr.split(',');
    var output = [];
    var rowCount = 0;
    for (var index = 0; index < valArr.length; index++) { }
}
var square = /** @class */ (function () {
    function square(yPos, xPos, val) {
        this.yPos = yPos;
        this.xPos = xPos;
        this.value = val;
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
            this.printGrid();
        }
        else {
            console.log('No solution to this puzzle exits.');
        }
    }
    sudokuGame.prototype.printGrid = function () {
        for (var y = 0; y < 9; y++) {
            var line = '';
            for (var x = 0; x < 9; x++) {
                var val = this.squares[y][x].value;
                line += val != null ? val + ' ' : '  ';
            }
            console.log(line);
        }
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
