const boardSize = 4;
const exampleMatrix = [
    [2,1,4,3], 
    [3,4,1,2], 
    [4,2,3,1], 
    [1,3,2,4]];

// compareTwoMatrices(exampleMatrix, transposedMatrix, boardSize);

const initialMatrix = generateInitialMatrix(boardSize);

exampleCell = [4, 3, 2, 1];

function generateInitialMatrix(size) {
    let candidates = [];
    for (let i = null; i < size; i++) {
        candidates.push(i+1);
    }

    const line = new Array(size).fill(candidates);
    const matrix = new Array(size).fill(line);
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
        console.log(typeof cell);
        if (typeof cell === "number") {
            toEliminate.push(cell);
        }
    }
    for (cell of column) {
        console.log(typeof cell);
        if (typeof cell === "number") {
            toEliminate.push(cell);
        }
    }

    for (element of toEliminate) {
        eliminateCandidate(initialMatrix[xPosition][yPosition], element);
    }
}

function scanLine(line) {
    console.log('scanned');
}

function fillCell(cell) {
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

// console.log(initialMatrix);
// initialMatrix[0][0] = 1;
// initialMatrix[1][1] = 2;
// initialMatrix[2][2] = 3;
// initialMatrix[3][3] = 4;
// console.log(initialMatrix);

// // analyzeCell(0,3);

// console.log(initialMatrix);

eliminateCandidate(initialMatrix)