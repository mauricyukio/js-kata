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

solvePuzzle(clues);

function solvePuzzle(clues) {
    const boardSize = Math.sqrt(clues.length);
    const board = generateInitialBoard(boardSize);
    const transposedBoard = transposeMatrix(board);
    const allLines = normalizeBoard(board, transposedBoard);

    console.log('starting analysis');
    analyzeClues(allLines, clues);
    analyzeBoard(board, transposedBoard, boardSize); 

    // do {
    //     analyzeClues(allLines, clues);
    //     analyzeBoard(board, transposedBoard, boardSize);    
    // } while (!isSolved(board));
}

function isSolved(board) {
    for (let cell of board) {
        if (typeof cell === 'object') {
            return false;
        }
    }

    return true;
}

function normalizeBoard(board, transposedBoard) {
    const boardCopy = JSON.parse(JSON.stringify(board));
    const boardSecondCopy = JSON.parse(JSON.stringify(board));
    const transposedBoardCopy = JSON.parse(JSON.stringify(transposedBoard));
    const transposedBoardSecondCopy = JSON.parse(JSON.stringify(transposedBoard));

    const topClues = transposedBoardSecondCopy;
    const rightClues = boardCopy.map((row) => row.reverse());
    const bottomClues = transposedBoardCopy.map((column) => column.reverse()).reverse();
    const leftClues = boardSecondCopy.reverse();

    return topClues.concat(rightClues, bottomClues, leftClues);
}

function analyzeClues (lines, clues) {
    console.log(JSON.parse(JSON.stringify(lines)))
    const size = Math.sqrt(clues.length);
    for (let i = 0; i < clues.length; i++) {
        const currentClue = clues[i];
        const currentLine = lines[i];

        switch (currentClue) {
            case 0:
                console.log('case 0');
                break;
            case 1:
                console.log('case 1'); 
                currentLine[0] = size;
                break;
            case size:
                console.log('case size');
                for (let j = 0; j < size; j++) {
                    currentLine[j] = j + 1;
                }
                break;
            default:
                console.log('default');
                for (let j = 0; j < currentClue - 1; j++) {
                    eliminateCandidate(currentLine[j], size);
                }
                break;
        }
    }
}

function analyzeBoard(board, transposedBoard, boardSize) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = board[i][j];

            console.log('CURRENTLY ANALYZING CELL ' + i + ' ' + j);
            console.log('Type of current cell: ' + typeof cell);
            console.log(cell);

            if (typeof cell === 'number') {
                console.log('Skipped because already filled');
                continue;
            }

            board[i][j] = analyzeCell(board, transposedBoard, i, j);
        }
    }
}

// Creates a matrix based on board size filled with all possible candidates in every cell
function generateInitialBoard(size) {
    console.log('Board generated. Size = ' + size);
    let candidates = [];
    for (let i = 0; i < size; i++) {
        candidates.push(i+1);
    }

    const line = [];
    for (let j = 0; j < size; j++) {
        const newCell = candidates.slice();
        line.push(newCell);
    }

    const matrix = [];
    for (let k = 0; k < size; k++) {
        const newLine = line.slice();
        matrix.push(newLine);
    }

    return matrix;
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

function eliminateCandidate(cell, candidate) {
    cell.splice(cell.indexOf(candidate));
}

function analyzeCell(board, transposedBoard, rowIndex, columnIndex) {
    const row = board[rowIndex];
    const column = transposedBoard[columnIndex];

    return fillByUniqueCandidateForCell(board[rowIndex][columnIndex]
        .filter((candidate) => !row.includes(candidate))
        .filter((candidate) => !column.includes(candidate)));
}

// Runs over the array of candidates and checks number of candidates
function fillByUniqueCandidateForCell(cell) {
    if (cell.length === 1) {
        console.log('Filled current cell (It was the only candidate)');
        return cell.pop();  
    } else {
        return cell;
    }
}
