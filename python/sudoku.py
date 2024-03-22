import random

def rangeList(start, end):
  return list(range(start, end))

def shuffle(list):
  return sorted(list, key=lambda x: random.random())

def createEmptyBoard():
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
  ]

def checkRow(row, value):
  return value in row

def checkColumn(grid, column, value):
  found = False
  for row in grid:
    if (value == row[column]):
      found = True
  return found

def checkSubgrid(grid, row, column, value):
  startIndex = lambda index: index - (index % 3)
  endIndex = lambda index: startIndex(index) + 3
  found = False

  for rowIndex in rangeList(startIndex(row), endIndex(row)):
    for colIndex in rangeList(startIndex(column), endIndex(column)):
      if grid[rowIndex][colIndex] == value:
        found = True

  return found

def canPlaceItem(grid, row, column, value):
  if (grid[row][column] != 0): 
    return False
  
  InTheRow = checkRow(grid[row], value)
  InTheCol = checkColumn(grid, column, value)
  InSubgrid = checkSubgrid(grid, row, column, value)
  return not InTheRow and not InTheCol and not InSubgrid

def processBoard(grid=createEmptyBoard(), row=0, column=0):
  if row >= 9: return grid
  if column >= 9: return processBoard(grid=grid, row=row + 1, column=0)
  if grid[row][column] != 0: return processBoard(grid=grid, row=row, column=column + 1)

  for value in shuffle(rangeList(1,10)):
    if canPlaceItem(grid=grid, row=row, column=column, value=value):
      grid[row][column] = value
      if processBoard(grid=grid, row=row, column=column + 1):
        return grid
      
      grid[row][column] = 0

  return None


print(processBoard())