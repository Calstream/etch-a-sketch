function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//let cellSize = prompt("square size?");
let grid = document.querySelector("#grid");
grid.style.backgroundColor = "#fff";
let gridHeight = grid.offsetHeight;
let gridWidth = grid.offsetWidth;
//let cellSize = (grid.offsetWidth - 2) / 10;
let cellSize = 50;

let i = 0;
let max = gridWidth * gridHeight / (cellSize ** 2);
console.log(gridWidth + " " + gridHeight + " " + max);

for (i = 0; i < max; i++)
  {
    //grid.style.width = 3*cellSize + "px";
    //grid.style.height = 3*cellSize + "px";
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = getRandomColor();
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    grid.appendChild(cell);
    console.log(`${i}`);
  }
