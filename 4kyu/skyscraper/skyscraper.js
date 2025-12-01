const tableSize = 4
const exampleMatrix = [[1,2,3,4], [2,3,4,1], [3,4,1,2], [4,1,2,3]]

function compareTwoMatrixes(matrix1, matrix2)
{
    console.log('compared matrixes');
    return;
}

function transposeMatrix(matrix)
{
    const transposedMatrix = [];

    for (let line = 0; line < matrix.length; line++) 
    {
       console.log(line);
    }

    console.log(exampleMatrix);
    console.log(transposedMatrix);
    return;
}

function eliminateCandidate(cell, candidate)
{
    console.log('candidates eliminated');
    return;
}

compareTwoMatrixes();
transposeMatrix(exampleMatrix);
eliminateCandidate();