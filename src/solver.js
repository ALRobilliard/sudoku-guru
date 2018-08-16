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
var square = /** @class */ (function () {
    function square(yPos, xPos, val) {
        this.isSolved = false;
        this.yPos = yPos;
        this.xPos = xPos;
        if (val > 0) {
            this.value = val;
            this.isSolved = true;
            this.possibleValues = [];
        }
    }
    square.prototype.usedInRow = function (puzzle, num) {
        for (var col = 0; col < puzzle.length; col++) {
            if (puzzle[col][this.xPos] == num) {
                return true;
            }
        }
        return false;
    };
    square.prototype.usedInCol = function (puzzle, num) {
        for (var row = 0; row < puzzle[this.yPos].length; row++) {
            if (puzzle[this.yPos][row] == num) {
                return true;
            }
        }
        return false;
    };
    square.prototype.usedInBox = function (puzzle, num) {
        for (var y = 0; y < Math.floor(Math.sqrt(puzzle.length)); y++) {
            for (var x = 0; x < Math.floor(Math.sqrt(puzzle[y].length)); x++) {
                if (puzzle[this.yPos + y][this.xPos + x] == num) {
                    return true;
                }
            }
        }
        return false;
    };
    square.prototype.locationIsSafe = function (puzzle, num) {
        return !(this.usedInCol(puzzle, num) &&
            this.usedInRow(puzzle, num) &&
            this.usedInBox(puzzle, num));
    };
    return square;
}());
var sudokuGame = /** @class */ (function () {
    function sudokuGame(puzzle) {
        this.squares = [];
        for (var y = 0; y < puzzle.length; y++) {
            var row = [];
            for (var x = 0; x < puzzle[y].length; x++) {
                row.push(new square(y, x, puzzle[y][x]));
            }
            this.squares.push(row);
        }
    }
    sudokuGame.prototype.printGrid = function () {
        for (var y = 0; y < this.squares.length; y++) {
            var line = '';
            for (var x = 0; x < this.squares[y].length; x++) {
                var val = this.squares[y][x].value;
                line += val != null ? val + ' ' : '  ';
            }
            console.log(line);
        }
    };
    return sudokuGame;
}());
