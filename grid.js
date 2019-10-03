const create2dArray = (x, y, init = 0) => {
  const array = []
  for (let i = 0; i < x; i++) {
    array[i] = []
    for (let j = 0; j < y; j++) {
      array[i][j] = init
    }
  }
  return array
}

function Grid (width, height) {
  this.width = width
  this.height = height
  this._grid = create2dArray(width, height)

  this.getCell = (x, y) => {
    return this._grid[x][y]
  }

  this.setCell = (x, y, val) => {
    this._grid[x][y] = val
  }

  this.toggleCell = (x, y) => {
      if (this._grid[x][y] === 0) this._grid[x][y] = 1
      else this._grid[x][y] = 0
  }

  this.display = () => {
    let string = ''
    for (let y = height - 1; y >= 0; y--) {
        let line = ''
        for (let x = 0; x < width; x++) {
            line += this._grid[x][y] === 1 ? '*  ' : '-  '
        }
        string += line + '\n'
    }
    console.log(string)
  }

  this.output = () => {
    let output = []
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        output.push({ x: i, y: j, value: this._grid[i][j]})
      }
    }
    return output
  }

  this.countNeighbors = (x, y) => {
    let minX = x <= 0 ? 0 : x - 1
    let maxX = x >= width - 1 ? width - 1 : x + 1
    let minY = y <= 0 ? 0 : y - 1
    let maxY = y >= height - 1 ? height - 1 : y + 1
    let sum = 0
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (i === x && j === y) {}
        else {
          // console.log(`adding (${i}, ${j}), which is ${this._grid[x][y]} to the sum`)
          sum += this._grid[i][j]
        }
      }
    }
    return sum
  }

  this.step = () => {
    let nextGrid = create2dArray(this.width, this.height)
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let liveNeighbors = this.countNeighbors(i, j)
        // if the cell is alive and it has 2 or 3 live neighbors, stay alive
        if (this.getCell(i, j) === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) nextGrid[i][j] = 1
        // if the cell is dead and has 3 live neighbors, it becomes alive
        if (this.getCell(i, j) === 0 && liveNeighbors === 3) nextGrid[i][j] = 1
      }
    }
    this._grid = nextGrid
  }
}

/*
const grid = new Grid(10, 9)
grid.setCell(2, 1, 1)
grid.setCell(2, 2, 1)
grid.setCell(2, 3, 1)
*/
