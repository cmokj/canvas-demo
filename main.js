
function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.stroke();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = 4;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

var press = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lastPoint = { x: undefined, y: undefined }
var newPoint = { x: undefined, y: undefined }

var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth;
canvas.height = pageHeight;
window.onresize = function () {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

var eraserOn = false;

eraser.onclick = function () {
    eraserOn = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
}
brush.onclick = function () {
    eraserOn = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
red.onclick = function(){
    context.strokeStyle = "red";
    red.classList.add('active');
    black.classList.remove('active');
    blue.classList.remove('active');
}
black.onclick = function(){
    context.strokeStyle = "black";
    black.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}
blue.onclick = function(){
    context.strokeStyle = "blue";
    blue.classList.add('active');
    red.classList.remove('active');
    black.classList.remove('active');
}
clear.onclick = function() {
    context.clearRect(0,0,canvas.width,canvas.height);
}
download.onclick = function() {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画板';
    a.click();
}
document.body.ontouchstart !== undefined ? extcuteTouch() : executeMouse()
function extcuteTouch() {
    canvas.ontouchstart = function (xyz) {
        var x = xyz.touches[0].clientX;
        var y = xyz.touches[0].clientY;
        press = true;
        if (eraserOn) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            lastPoint = { x: x, y: y }
        }
    }
    canvas.ontouchmove = function (xyz) {
        var x = xyz.touches[0].clientX;
        var y = xyz.touches[0].clientY;
        if (!press) {
            return;
        }
        if (eraserOn) {
            context.clearRect(x - 5, y - 5, 10, 10);
        }
        else {
            newPoint = { x: x, y: y }
            drawLine(lastPoint.x, lastPoint.y, x, y);
            lastPoint = newPoint;
        }
    }
    canvas.onmouseup = function (xyz) {
        press = false;
    }
}
function executeMouse() {
    canvas.onmousedown = function (xyz) {
        var x = xyz.clientX;
        var y = xyz.clientY;
        press = true;
        if (eraserOn) {
            context.clearRect(x - 10, y - 10, 20, 20);
        }
        else {
            lastPoint = { x: x, y: y }
        }
    }
    canvas.onmousemove = function (xyz) {
        var x = xyz.clientX;
        var y = xyz.clientY;
        if (!press) {
            return;
        }
        if (eraserOn) {
            context.clearRect(x - 5, y - 5, 10, 10);
        }
        else {
            newPoint = { x: x, y: y }
            drawLine(lastPoint.x, lastPoint.y, x, y);
            lastPoint = newPoint;
        }
    
    }
    canvas.onmouseup = function (xyz) {
        press = false;
    }
}
