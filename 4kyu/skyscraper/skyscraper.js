const tableSize = 4
const exampleMatrix = [[2,1,4,3], [3,4,1,2], [4,2,3,1], [1,3,2,4]];

function compareTwoMatrixes(matrix1, matrix2) {
    console.log('compared matrixes');
    return;
}

const newArray = [];

function transposeMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const column = [];
        for (let j = 0; j < matrix.length; j++) { 
            column.push(matrix[j][i]);            
        }
        newArray.push(column);
    }
    return;
}
module.exports = transposeMatrix;

function eliminateCandidate(cell, candidate) {
    console.log('candidates eliminated');
    return;
}

transposeMatrix(exampleMatrix);
console.log(newArray);