// const exampleSolvedMatrix = [
//     [2,1,4,3], 
//     [3,4,1,2], 
//     [4,2,3,1], 
//     [1,3,2,4]];

// const initialBoardTemplate = [
//     [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
//     [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]], 
//     [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
//     [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
// ];

// const initialBoardForced = [
//     [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
//     [[1, 3, 4],  3, [1, 2, 3, 4],  [4]],
//     [[1, 3, 4], [1, 4], [1, 2, 3, 4],  [2, 3, 4]],
//     [[1, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
// ];

// const initialBoard = generateInitialBoard(boardSize);

// console.log('Original Matrix:');
// console.log(JSON.parse(JSON.stringify(initialBoardForced)));

// console.log('Current state of the matrix: ');
// console.log(initialBoardForced);

// console.log(normalizeBoard(initialBoardForced, transposeMatrix(initialBoardForced)));

const clues = [
    2, 2, 1, 3,
    2, 2, 3, 1,
    1, 2, 2, 3,
    3, 2, 1, 3];

const clues2 = [
    0, 0, 1, 2,
    0, 2, 0, 0,
    0, 3, 0, 0,
    0, 1, 0, 0];

class Cell {
    constructor(row, column, candidates) {
        this.row = row;
        this.column = column;
        this.candidates = candidates;
    }

    get isFilled() {
        return typeof this.candidates === 'number';
    }
}

solvePuzzle(clues);

function solvePuzzle(clues) {
    const boardSize = Math.sqrt(clues.length);
    const board = generateInitialBoard(boardSize);
    const transposedBoard = transposeMatrix(board);
    const allLines = normalizeBoard(board, transposedBoard);

    console.log('starting analysis');
    board = updateBoardCandidates(analyzeClues(allLines, clues));
    console.log(board);
    // analyzeBoard(board, transposedBoard, boardSize); 

    // do {
    //     analyzeClues(allLines, clues);
    //     analyzeBoard(board, transposedBoard, boardSize);    
    // } while (!isSolved(board));
}

function isSolved(board) {
    for (let cell of board) {
        if (!cell.isFilled) {
            return false;
        }
    }

    return true;
}

function normalizeBoard(board, transposedBoard) {
    const topClues = JSON.parse(JSON.stringify(transposedBoard));
    const rightClues = JSON.parse(JSON.stringify(board)).map((row) => row.reverse());
    const bottomClues = JSON.parse(JSON.stringify(transposedBoard)).map((column) => column.reverse()).reverse();
    const leftClues = JSON.parse(JSON.stringify(board)).reverse();

    return topClues.concat(rightClues, bottomClues, leftClues);
}

function analyzeClues (lines, clues) {
    const size = Math.sqrt(clues.length);
    for (let i = 0; i < clues.length; i++) {
        const currentClue = clues[i];
        const currentLine = lines[i];

        switch (currentClue) {
            case 0:
                // console.log('case 0');
                break;
            case 1:
                // console.log('case 1'); 
                currentLine[0].candidates = size;
                break;
            case size:
                // console.log('case size');
                for (let j = 0; j < size; j++) {
                    currentLine[j].candidates = j + 1;
                }
                break;
            default:
                // console.log('default');
                for (let j = 0; j < currentClue - 1; j++) {
                    eliminateCandidate(currentLine[j].candidates, size);
                }
                break;
        }
    }
    
    return reorganizeAndCollapse(lines);
}

function updateBoardCandidates(candidatesMatrix, board) {
    const size = Math.sqrt(candidatesMatrix.length);
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            board[rowIndex][columnIndex].candidates = candidatesMatrix[rowIndex][columnIndex];
        }
    }
    return;
}

function reorganizeAndCollapse(lines) {
    const size = Math.sqrt(lines.length);
    const candidatesMatrix = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        const newRow = [];
        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            let newSuperCell = [];
            for (let line of lines) {
                for (let cell of line) {
                    if (cell.row === rowIndex && cell.column === columnIndex) {
                        newSuperCell.push(cell);
                    }
                }
            }

            const finalCandidates = [...Array(size).keys()].map((x) => x + 1);

            newSuperCell = newSuperCell.map((cell) => cell.candidates);

            if (newSuperCell.some((candidate) => typeof candidate === 'number')) {
                newSuperCell = newSuperCell.filter((arrayOfCandidates) => typeof arrayOfCandidates === 'number').pop();
            } else {
                newSuperCell = finalCandidates.filter((candidate) => newSuperCell.every((arrayOfCandidates) => arrayOfCandidates.includes(candidate)));
            }

            newRow.push(newSuperCell);
        }
        candidatesMatrix.push(newRow);
    }
    return candidatesMatrix;
}

function analyzeBoard(board, transposedBoard, boardSize) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = board[i][j];

            console.log('CURRENTLY ANALYZING CELL ' + i + ' ' + j);
            console.log('Type of current cell: ' + typeof cell);
            console.log(cell);

            if (cell.isFilled) {
                console.log('Skipped because already filled');
                continue;
            }

            board[i][j] = analyzeCell(board, transposedBoard, i, j);
        }
    }
}

// Creates a matrix based on board size filled with all possible candidates in every cell
function generateInitialBoard(size) {
    const newBoard = [];
    
    const candidates = [...Array(size).keys()].map((x) => x + 1);
    
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        const newRow = [];

        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            const newCell = new Cell(rowIndex, columnIndex, candidates.slice());
            newRow.push(newCell);
        }

        newBoard.push(newRow);
    }

    console.log('Board generated. Size = ' + size);
    return newBoard;
}

function compareTwoMatrices(matrix1, matrix2, size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix1[i][j] === matrix2[i][j] ? console.log('equal') : console.log('different');
        }
    }
    return;
}

function transposeMatrix(matrix) {
    const transposedArray = [];
    for (let i = 0; i < matrix.length; i++) {
        const column = [];
        for (let j = 0; j < matrix.length; j++) { 
            column.push(matrix[j][i]);            
        }
        transposedArray.push(column);
    }
    return transposedArray;
}

function eliminateCandidate(arrayOfCandidates, candidate) {
    arrayOfCandidates.splice(arrayOfCandidates.indexOf(candidate), 1);
}

function analyzeCell(board, transposedBoard, rowIndex, columnIndex) {
    const row = board[rowIndex];
    const column = transposedBoard[columnIndex];

    return fillByUniqueCandidateForCell(board[rowIndex][columnIndex].candidates
        .filter((candidate) => !row.includes(candidate))
        .filter((candidate) => !column.includes(candidate)));
}

// Runs over the array of candidates and checks number of candidates
function fillByUniqueCandidateForCell(arrayOfCandidates) {
    if (arrayOfCandidates.length === 1) {
        console.log('Filled current cell (It was the only candidate)');
        return arrayOfCandidates.pop();  
    } else {
        return arrayOfCandidates;
    }
}
