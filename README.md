# Sudoku Guru

## Purpose

I've always loved solving Sudoku puzzles in my times of boredom, why not go a step further and build something to solve them for me.

_inspired by [@ASpittel](https://github.com/aspittel/)'s article on Dev.to: [Coming Back to Old Problems: How I Finally Wrote a Sudoku Solving Algorithm](https://dev.to/aspittel/how-i-finally-wrote-a-sudoku-solver-177g) which convinced me to try and right my own._

## Code Style

Run it through **Prettier**, you know the drill.

## Technologies Used

I wanted to have something easy to run and view in the browser. However, the Backtracking Algorithm used also benefits from having a basic OOB structure.
**TypeScript** seemed up to the task.

While TypeScript certainly does the brunt of the work, there is also **HTML** and **CSS** lying around to structure the basic form interface for interacting with the algorithm.

## Install and Run Locally

Make sure you have **TypeScript** installed.

_If you need it and you already have node, it's as easy as:_

```bash
$ npm install -g typescript
```

---

When you've got your TypeScript ready:

```bash
$ git clone https://github.io/alrobilliard/sudoku-guru
$ cd sudoku-guru/src
$ tsc solver
$ cd ../

# For Windows
$ start index.html

# For MacOS X
$ open index.html

# For Linux/Unix
$ xdg-open index.html
```

If the above doesn't work, just launch index.html in your browser once the TypeScript has been compiled.
