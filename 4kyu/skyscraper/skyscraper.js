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
]

const initialMatrixForced = [
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
    [[1, 2, 3, 4], 3, [1, 2, 3, 4], 4,],
    [[1, 2, 3, 4], [1, 4], [1, 2, 3, 4], [3, 4]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
]

// compareTwoMatrices(exampleSolvedMatrix, transposedMatrix, boardSize);

const initialMatrix = generateInitialMatrix(boardSize);
console.log(initialMatrixForced);

analyzeCell(0,3);

console.log(initialMatrixForced);


exampleCell = [4, 3, 2, 1];

// Creates a matrix based on board size filled with all candidates in every cell
function generateInitialMatrix(size) {
    let candidates = [];
    for (let i = null; i < size; i++) {
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
    cell[candidate - 1] = null;
}

function analyzeCell(xPosition, yPosition) {
    if(typeof fillByUniqueCandidateForCell(initialMatrix[xPosition][yPosition]) === "number") {
        return;
    }

    const row = initialMatrixForced[xPosition];

    const column = transposeMatrix(initialMatrixForced, boardSize)[yPosition];

    const toEliminate = [];
    
    for (cell of row) {
        if (typeof cell === "number") {
            toEliminate.push(cell);
        } else {
            for (candidate of cell) {
                const isUnique = checkForUniqueCellForCandidate(candidate, row, cell.indexOf(candidate));
                cell = isUnique ? candidate : cell;
            }
        }
    }
    for (cell of column) {
        if (typeof cell === "number") {
            toEliminate.push(cell);
        } else {
            for (candidate of cell) {
                const isUnique = checkForUniqueCellForCandidate(candidate, column, cell.indexOf(candidate));
                cell = isUnique ? candidate : cell;
            }
        }
    }

    for (element of toEliminate) {
        eliminateCandidate(initialMatrix[xPosition][yPosition], element);
    }
}

function scanLine(line) {
    console.log('scanned');
}

// Runs over the array of candidates and checks number of candidates
function fillByUniqueCandidateForCell(cell) {
    if (typeof cell === "number") {
        return;
    }
    let answer = null;
    console.log(cell);
    for (value of cell) {
        if (value !== null) {
            if (answer !== null) {
                return cell;
            } else {
                answer = value;
            }
        }
    }
    return answer;
}

function checkForUniqueCellForCandidate(candidate, line, index) {
    for (let i = 0; i < boardSize; i++) {
        if(line.includes(candidate) && i !== index) {
            return false;
        }
    }
    return true;
}

// console.log(initialMatrix);

// initialMatrix[0][0] = initialMatrix[0][0].reduce((a, b) => a + b, 0);

// console.log(initialMatrix);

// analyzeCell(0,3);

// console.log(initialMatrix);

// eliminateCandidate(initialMatrix)