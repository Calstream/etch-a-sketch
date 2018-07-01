let penColor = "#000000";
let randomColor = false;
let gradual = true;
let intensity = 0.1; //percent;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function int_to_hex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
}

function blendColors(color1, color2, percentage)
{
    if (color2.length == 4)
        color2 = color2[1] + color2[1] +
        color2[2] + color2[2] +
        color2[3] + color2[3];
    else
        color2 = color2.substring(1);

    console.log('valid: c1 => ' + color1 + ', c2 => ' + color2);
    color1 = color1.split("(")[1].split(")")[0].split(",");
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

    console.log('hex -> rgba: c1 => [' + color1.join(', ') + '], c2 => [' + color2.join(', ') + ']');

    // 4: blend
    var color3 = [
        (1 - percentage) * color1[0] + percentage * color2[0],
        (1 - percentage) * color1[1] + percentage * color2[1],
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];

    console.log('c3 => [' + color3.join(', ') + ']');

    // 5: convert to hex
    color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

    console.log("result: " + color3);

    return color3;
}

function getCellColor(div)
{
  if (gradual)
  {
    let cellColor = div.style.backgroundColor;
    if (!randomColor)
      return blendColors(cellColor, penColor, intensity);
    else
      return blendColors(cellColor, getRandomColor(), intensity);
  }
  else if (randomColor)
    return getRandomColor();
  else
    return penColor;
}

let colorPicker = document.querySelector("#pen-color");
let colorPickerWrapper = document.querySelector("#pen-color-wrapper");
colorPicker.offsetWidth = colorPickerWrapper.offsetWidth + "px";
console.log("cpw: " + colorPickerWrapper.offsetWidth);
console.log("cph: " + colorPickerWrapper.offsetHeight);
colorPicker.offsetHeight = colorPickerWrapper.offsetHeight + "px";
colorPickerWrapper.style.backgroundColor = colorPicker.value;
colorPicker.onchange = function(){
  colorPickerWrapper.style.backgroundColor = colorPicker.value;
}

let grid = document.querySelector("#grid");
grid.style.backgroundColor = "#fff";
let gridHeight = grid.offsetHeight;
let gridWidth = grid.offsetWidth;
//let cellSize = (grid.offsetWidth - 2) / 10;
let cellSize = 50;

let i = 0;
let max = gridWidth * gridHeight / (cellSize ** 2);
console.log(gridWidth + " " + gridHeight + " " + max);

for (i = 0; i < 608; i++)
  {
    //grid.style.width = 3*cellSize + "px";
    //grid.style.height = 3*cellSize + "px";
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = getRandomColor();
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    cell.onmouseover = function() {
      this.style.backgroundColor = getCellColor(this); }
    grid.appendChild(cell);
  }
