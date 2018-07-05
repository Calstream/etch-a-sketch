let penColor = "#BADA55";
let randomColor = false;
let gradual = false;
let intensity = 0.3;
let cellSize = 50;
let cellSize_prev = 50;
function getRandomColor()
{
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

function colorPickerInit()
{
  let colorPicker = document.querySelector("#pen-color");
  let colorPickerWrapper = document.querySelector("#pen-color-wrapper");
  colorPicker.style.width = colorPickerWrapper.offsetWidth + "px";
  colorPicker.style.height = colorPickerWrapper.offsetHeight + "px";
  let rect = colorPickerWrapper.getBoundingClientRect();
  colorPicker.style.top = rect.top + "px";
  colorPicker.style.left = rect.left + "px";
  colorPickerWrapper.style.backgroundColor = colorPicker.value;
  let hexTxt = document.querySelector("#hex-txt");
  colorPicker.onchange = function(){
    colorPickerWrapper.style.backgroundColor = colorPicker.value;
    hexTxt.textContent = colorPicker.value.toUpperCase();
    penColor = colorPicker.value.toUpperCase();
  }
}

function createGrid(_cellSize)
{
  let grid = document.querySelector("#grid");
  grid.innerHTML = '';
  //grid.style.backgroundColor = "#fff";
  let gridHeight = grid.getBoundingClientRect().height;
  let gridWidth = grid.offsetWidth;
  //let cellSize = (grid.offsetWidth - 2) / 10;

  let i = 0;
  let max = gridWidth * gridHeight / (_cellSize ** 2);
  console.log("w: "+gridWidth + " h: " + gridHeight + " max: " + max);

  for (i = 0; i < max; i++)
    {
      //grid.style.width = 3*cellSize + "px";
      //grid.style.height = 3*cellSize + "px";
      let cell = document.createElement("div");
      cell.className = "cell";
      //cell.style.backgroundColor = getRandomColor();
      //cell.style.backgroundColor = "#fff";
      cell.style.width = _cellSize + "px";
      cell.style.height = _cellSize + "px";
      cell.onmouseover = function() {
        this.style.backgroundColor = getCellColor(this); }
      grid.appendChild(cell);
    }
}

function settingsInit()
{
    let intensityVal = document.querySelector("#intensity-form");
    intensityVal.onchange = function(){
      intensity = intensityVal.value / 100;
    }

    let cellSizeVal = document.querySelector("#square-size-cb");
    cellSizeVal.onchange = function(){
      cellSize_prev = cellSize;
      cellSize = cellSizeVal.value;
      console.log("die");
    }
}

function buttonsInit()
{
  let newB = document.querySelector("#new");
  let clearB = document.querySelector("#clear");
   newB.onclick = function(){
     createGrid(cellSize);
     cellSize_prev = cellSize;
     console.log("newb"); }

   clearB.onclick = function(){
     createGrid(cellSize_prev);
     console.log("clear"); }
}

function randomCB()
{
  let randColor = document.querySelector("#randomCB");
  if (randColor.checked)
    randomColor = true;
  else randomColor = false;
}

function intensityCB()
{
  let transparent = document.querySelector("#intensityCB");
  if (transparent.checked)
    gradual = true;
  else gradual = false;
}

settingsInit();
colorPickerInit();
buttonsInit();
//createGrid(cellS);
