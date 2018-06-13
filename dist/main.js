var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillRect(x,y,width,height);
// c.fillStyle = 'rgba(255, 0, 0, 0.2)';
// c.fillRect(100,100,100,100);
// c.fillRect(50,300,100,100);
// c.fillRect(300,100,100,100);
// c.fillRect(400,100,100,100);
// c.fillRect(500,100,100,100);


// Line
//c.moveTo(x,y);
// c.beginPath();
// c.moveTo(100, 200);
// c.lineTo(300, 200);
// c.strokeStyle = "red";
// c.stroke();

// Arc/ Circle
// c.arc(x: Int, y: Int, r: Int, startAngle: Float, endAgnle: Float, drawCounterClockwise: Bool (false));
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for loops
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
  
  

// for (var i =0; i <1000; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random()* window.innerHeight;
//     var rgbr= Math.floor(Math.random() * 255);
//     var rgbg= Math.floor(Math.random() * 255);
//     var rgbb= Math.floor(Math.random() * 255);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle =  ''+getRandomColor()+'';
//     c.stroke();
// }

// console.log(Math.random());
// console.log(Math.random() * 255);
// console.log(getRandomColor());

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 50;
var minRadius = 20;

    var colorArray = [
        '#9D75CB',
        '#A657AE',
        '#8C1A6A',
        '#E35885',
        '#FF3366',
        '#39D891',
        '#17AFEF',
        '#F9BD54',
        '#B5FBBC',
        '#FBF78C',
        '#4BCCFB',
        '#008C8C',
    ];


window.addEventListener('mousemove',
    function(event) {
        mouse.x= event.x;
        mouse.y= event.y;
    })

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx= dx;
    this.dy= dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        // c.stroke();
        c.fill();
    }
    this.update= function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y <50 && mouse.y - this.y >-50) {
            if (this.radius < maxRadius){
                this.radius +=2;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

// var circle = new Circle(200,200, 3, 3, 30);
// circle.update();

function init(){
    circleArray =[];
    for (var i =0;i<600; i++){
        var radius = Math.random() * 10 + 1;
        var x= Math.random() * (innerWidth - (radius * 2)) + radius;
        var y= Math.random() * (innerHeight - (radius * 2)) + radius;
        var dx= (Math.random() - 0.5) * 3;
        var dy= (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (var i =0; i < circleArray.length;i++){
        circleArray[i].update();
    }
}

animate();
init();