const tableSize = 4
const exampleMatrix = [
    [2,1,4,3], 
    [3,4,1,2], 
    [4,2,3,1], 
    [1,3,2,4]];

function compareTwoMatrixes(matrix1, matrix2) {
    for (let i = 0; i < tableSize; i++) {
        for (let j = 0; j < tableSize; j++) {
            matrix1[i][j] === matrix2[i][j] ? console.log('equal') : console.log('different');
        }
    }
    return;
}

function transposeMatrix(matrix) {
    const newArray = [];
    for (let i = 0; i < tableSize; i++) {
        const column = [];
        for (let j = 0; j < tableSize; j++) { 
            column.push(matrix[j][i]);            
        }
        newArray.push(column);
    }
    return newArray;
}

function eliminateCandidate(cell, candidate) {
    console.log('candidates eliminated');
    return;
}

console.log(transposeMatrix(exampleMatrix));
console.log(compareTwoMatrixes(exampleMatrix, transposeMatrix(exampleMatrix)));