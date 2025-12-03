const boardSize = 4;
const exampleSolvedMatrix = [
    [2,1,4,3], 
    [3,4,1,2], 
    [4,2,3,1], 
    [1,3,2,4]];

// compareTwoMatrices(exampleSolvedMatrix, transposedMatrix, boardSize);

const initialMatrix = generateInitialMatrix(boardSize);
console.log(initialMatrix);

initialMatrix[0][0] = 1;
initialMatrix[1][1] = 2;
initialMatrix[2][2] = 3;
initialMatrix[3][3] = 4;
console.log(initialMatrix);

analyzeCell(0,3);

console.log(initialMatrix);


exampleCell = [4, 3, 2, 1];

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
    const row = initialMatrix[xPosition];

    const column = transposeMatrix(initialMatrix, boardSize)[yPosition];

    const toEliminate = [];
    
    for (cell of row) {
        if (typeof cell === "number") {
            toEliminate.push(cell);
        } else {
            for (candidate of cell) {
                const isUnique = checkForUniqueCellForCandidate(candidate, row, indexOf(cell));
                cell = isUnique ? candidate : cell;
            }
        }
    }
    for (cell of column) {
        if (typeof cell === "number") {
            toEliminate.push(cell);
        } else {
            for (candidate of cell) {
                const isUnique = checkForUniqueCellForCandidate(candidate, column, indexOf(cell));
                cell = isUnique ? candidate : cell;
        }
    }

    for (element of toEliminate) {
        eliminateCandidate(initialMatrix[xPosition][yPosition], element);
    }
}

function scanLine(line) {
    console.log('scanned');
}

function fillByUniqueCandidateForCell(cell) {
    let answer = null;
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
        if(line[i].includes(candidate) && i !== index) {
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