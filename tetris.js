var pixel = 20;
var canvas, context;

var figure;

var figuresCount = 7;

window.onload = init();


function init() {
	canvas = document.getElementById("canvas");
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	canvas.width = width;
	canvas.height = height;

	document.addEventListener("keydown", onKeyPressed);

	context = canvas.getContext('2d');
	figure = new Figure(Math.floor(Math.random() * figuresCount), canvas.width / 2, -2 * pixel, pixel);



	setInterval(run, 400);
}

function run() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);

	figure.draw(context);
	figure.step();
}

function onKeyPressed(event) {
	switch (event.keyCode) {
		case 37: // left
			figure.moveLeft();
			break;
		case 39: // right
			figure.moveRight();
			break;
		case 38: // up
			figure.rotate();
			break;
		case 40: //down
			figure.drop();
			break;
	}
}

function Figure(id, x, y, pixel) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.back = false;
	this.pixel = pixel;

	this.bodies = [
		[
			[0, -1], // O
			[0, 0], //  O
			[0, 1], //  X
			[0, 2] //   O
		],
		[
			[-1, 1], // OO  
			[0, 1], //  X
			[0, 0], //  O
			[0, -1]
		],
		[
			[1, 1], // OO
			[0, 1], //  X
			[0, 0], //  O
			[0, -1]
		],
		[
			[1, 1], // OO
			[1, 0], // XO
			[0, 1],
			[0, 0]
		],
		[
			[1, 1], //  OO
			[0, 1], // Ox
			[0, 0],
			[-1, 0]
		],
		[
			[-1, 1], // OO    
			[0, 1], //   XO
			[0, 0],
			[1, 0]
		],
		[
			[0, 1], //  O    
			[1, 0], // OXO
			[0, 0],
			[-1, 0]
		],
	];
	this.body = this.bodies[id];


	this.draw = function(context) {
		context.fillStyle = "black";
		for (var i = 0; i < this.body.length; ++i) {
			context.fillRect(x + this.body[i][0] * pixel, y + this.body[i][1] * pixel, pixel, pixel);
		}
	}

	this.step = function(context) {
		y += pixel;
	}

	this.moveLeft = function() {
		x = x > pixel ? x - pixel : 0;
	}

	this.moveRight = function() {
		x = x + pixel < width ? x + pixel : width - pixel;
	}

	this.rotate = function() {
		for (var i = 0; i < this.body.length; ++i) {
			this.body[i] = this.back ? [-this.body[i][1], this.body[i][0]] : [this.body[i][1], -this.body[i][0]];
		}
		if (this.id == 3 || this.id == 4 || this.id == 5)
			this.back = !this.back;
	}

	this.drop = function() {
		y += pixel;
	}
}