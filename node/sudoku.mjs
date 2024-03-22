function range(start, end) {
  return Array.from({ length: end - start }, (_, k) => k + start);
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor((Math.random() % 2) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createEmptyBoard() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

function checkRow(row, value) {
  return row.some((col) => col === value);
}

function checkColumn(grid, column, value) {
  return range(0, 9).some((index) => grid[index][column] === value);
}

function checkSubgrid(grid, row, column, value) {
  const startIndex = (index) => index - (index % 3);
  const endIndex = (index) => startIndex(index) + 3;

  return range(startIndex(row), endIndex(row)).some((rowIndex) =>
    range(startIndex(column), endIndex(column)).some(
      (colIndex) => grid[rowIndex][colIndex] === value
    )
  );
}

function canPlaceItem(grid, row, column, value) {
  if (grid[row][column] != 0) return false;
  const InTheRow = checkRow(grid[row], value);
  const InTheCol = checkColumn(grid, column, value);
  const InSubgrid = checkSubgrid(grid, row, column, value);

  return !InTheRow && !InTheCol && !InSubgrid;
}

function processBoard(grid = createEmptyBoard(), row = 0, column = 0) {
  if (row >= 9) return grid; // Se já passou por todas as linhas encerra e retorna a solucao
  if (column >= 9) return processBoard(grid, row + 1, 0); // Se terminou as colunas, passa pra proxima linha
  if (grid[row][column] !== 0) return processBoard(grid, row, column + 1); // Se o valor está preenchido, passa para próxima coluna

  for (let value of shuffle(range(1, 10))) {
    // Para cada valor entre 0 - 9 Verifica se o valor a ser preenchido é valido
    if (canPlaceItem(grid, row, column, value)) {
      grid[row][column] = value; // Se sim atribui o valor a celula
      // Executa novamente a função passando para a próxima coluna e verifica se está completo
      if (processBoard(grid, row, column + 1)) {
        return grid; // Se temrinou de solunicionar retorna o grid.
      }

      // Caso o valor não tenha sido suficiente pra solução, retornamos o valor para 0 e esperamos a proxima tentativa
      grid[row][column] = 0;
    }
  }

  return null;
}

console.log(processBoard());
