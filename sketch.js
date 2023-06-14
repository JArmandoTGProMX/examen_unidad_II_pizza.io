let cantidadDivisiones = 2; // Variable global para almacenar la cantidad de divisiones

function setup() {
  createCanvas(windowWidth, 600);
}

function draw() {
  background(50);
  drawCircles(cantidadDivisiones);
}

const input = document.getElementById('cantidadCortes');
const button = document.getElementById('corte');

function verificarNumero(event) {
  const numeroIngresado = input.value;
  if (!isNaN(numeroIngresado)) {
    const cantidad = parseInt(numeroIngresado);
    if (cantidad > 1) {
      cantidadDivisiones = cantidad;
      redraw(); // Volver a dibujar el lienzo
    } else {
      alert('Ingrese un número mayor a 1');
    }
  } else {
    alert('El valor ingresado no es un número válido');
  }
}

button.addEventListener('click', verificarNumero);

input.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    verificarNumero(event);
  }
});

function drawCircles(divisiones) {
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 200;

  let spacing = 450;

  drawCircle(centerX - spacing, centerY, radius);

  // Dibujar el primer círculo y su división con PPA
  drawCircle(centerX - spacing, centerY, radius);
  let divisionPoints = divideCirclePPA(centerX - spacing, centerY, radius, divisiones);
  for (let i = 0; i < divisionPoints.length; i++) {
    let { x, y } = divisionPoints[i];
    drawLineToCenter(x, y, centerX - spacing, centerY);
  }
  drawAlgorithmLabel("División con PPA", centerX - spacing, centerY + radius + 20);

  // Dibujar el segundo círculo y su división con DDA
  drawCircle(centerX, centerY, radius);
  let divisionPoints2 = divideCircleDDA(centerX, centerY, radius, divisiones);
  for (let i = 0; i < divisionPoints2.length; i++) {
    let { x, y } = divisionPoints2[i];
    drawLineToCenter(x, y, centerX, centerY);
  }
  drawAlgorithmLabel("División con DDA", centerX, centerY + radius + 20);

  // Dibujar el tercer círculo y su división con Bresenham
  drawCircle(centerX + spacing, centerY, radius);
  let divisionPoints3 = divideCircleBresenham(centerX + spacing, centerY, radius, divisiones);
  for (let i = 0; i < divisionPoints3.length; i++) {
    let { x, y } = divisionPoints3[i];
    drawLineToCenter(x, y, centerX + spacing, centerY);
  }
  drawAlgorithmLabel("División con Bresenham", centerX + spacing, centerY + radius + 20);
}

function drawAlgorithmLabel(algorithm, x, y) {
  let ctx = document.getElementById('defaultCanvas0').getContext('2d');
  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(algorithm, x, y);
}

function drawCircle(centerX, centerY, radius) {
  let ctx = document.getElementById('defaultCanvas0').getContext('2d');

  let x = radius;
  let y = 0;
  let err = 0;

  while (x >= y) {
    ctx.fillRect(centerX + x, centerY + y, 1, 1);
    ctx.fillRect(centerX + y, centerY + x, 1, 1);
    ctx.fillRect(centerX - y, centerY + x, 1, 1);
    ctx.fillRect(centerX - x, centerY + y, 1, 1);
    ctx.fillRect(centerX - x, centerY - y, 1, 1);
    ctx.fillRect(centerX - y, centerY - x, 1, 1);
    ctx.fillRect(centerX + y, centerY - x, 1, 1);
    ctx.fillRect(centerX + x, centerY - y, 1, 1);

    if (err <= 0) {
      y += 1;
      err += 2 * y + 1;
    }

    if (err > 0) {
      x -= 1;
      err -= 2 * x + 1;
    }
  }
}

function divideCirclePPA(centerX, centerY, radius, divisions) {
    let divisionPoints = [];
  
    let angleIncrement = TWO_PI / divisions;
    let angle = 0;
  
    for (let i = 0; i < divisions; i++) {
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;
      divisionPoints.push({ x, y });
  
      angle += angleIncrement;
    }
  
    return divisionPoints;
  }
  
  function divideCircleDDA(centerX, centerY, radius, divisions) {
    let divisionPoints = [];
  
    let angleIncrement = 360 / divisions;
    let angle = 0;
  
    for (let i = 0; i < divisions; i++) {
      let radiansAngle = radians(angle);
      let x = centerX + radius * cos(radiansAngle);
      let y = centerY + radius * sin(radiansAngle);
      divisionPoints.push({ x, y });
  
      angle += angleIncrement;
    }
  
    return divisionPoints;
  }
  
  function divideCircleBresenham(centerX, centerY, radius, divisions) {
    let divisionPoints = [];
  
    let angleIncrement = 360 / divisions;
    let angle = 0;
  
    for (let i = 0; i < divisions; i++) {
      let x = Math.round(centerX + radius * cos(radians(angle)));
      let y = Math.round(centerY + radius * sin(radians(angle)));
      divisionPoints.push({ x, y });
  
      angle += angleIncrement;
    }
  
    return divisionPoints;
  }
  
  

function drawLineToCenter(x, y, centerX, centerY) {
  let ctx = document.getElementById('defaultCanvas0').getContext('2d');
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.strokeStyle = 'white';
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
}
