const boardSize = 4;
const exampleSolvedMatrix = [
    [2,1,4,3], 
    [3,4,1,2], 
    [4,2,3,1], 
    [1,3,2,4]];

const initialMatrixTemplate = [
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]], 
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
];

const initialMatrixForced = [
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
    [[1, 3, 4],  3, [1, 2, 3, 4],  [4]],
    [[1, 3, 4], [1, 4], [1, 2, 3, 4],  [2, 3, 4]],
    [[1, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
];

const initialMatrix = generateInitialMatrix(boardSize);

console.log('Original Matrix:');
console.log(JSON.parse(JSON.stringify(initialMatrixForced)));

console.log('Current state of the matrix: ');
console.log(initialMatrixForced);

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        let cell = initialMatrixForced[i][j];

        console.log('CURRENTLY ANALYZING CELL ' + i + ' ' + j);
        console.log('Type of current cell: ' + typeof cell);
        console.log(cell);

        if (typeof cell === 'number') {
            console.log('Skipped because already filled');
            continue;
        }

        initialMatrixForced[i][j] = analyzeCell(initialMatrixForced, i, j);
    }
}


// Creates a matrix based on board size filled with all candidates in every cell
function generateInitialMatrix(size) {
    console.log('Matrix generated. Size = ' + boardSize);
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

function transposeMatrix(matrix, size) {
    const transposedArray = [];
    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) { 
            column.push(matrix[j][i]);            
        }
        transposedArray.push(column);
    }
    return transposedArray;
}

function eliminateCandidate(cell, candidate) {
    console.log(cell.splice(cell.indexOf(candidate)));
}

function analyzeCell(board, rowIndex, columnIndex) {
    let cell = board[rowIndex][columnIndex];

    const row = board[rowIndex];
    const column = transposeMatrix(board, boardSize)[columnIndex];

    return fillByUniqueCandidateForCell(cell.filter((candidate) => !row.includes(candidate)).filter((candidate) => !column.includes(candidate)));
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

function checkUniqueCellForCandidate(candidate, line, analyzedCellIndex) {
    for (let i = 0; i < boardSize; i++) {
        const currentCell = line[i];

        if (typeof currentCell === "number") {
            return;
        }        

        if(currentCell.includes(candidate) && i !== analyzedCellIndex) {
            return false;
        }
    }
    console.log('Found unique! Candidate ' + candidate);
    return true;
}
