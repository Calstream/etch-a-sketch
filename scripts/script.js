function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let cellSize = prompt("square size?");
let grid = document.querySelector("#grid");
let i, j;
for (i = 0; i < 9; i++)
  {
    grid.style.width = 3*cellSize + "px";
    grid.style.height = 3*cellSize + "px";
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = getRandomColor();
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    grid.appendChild(cell);
    console.log(`${i}, ${j}`);
  }
