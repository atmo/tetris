var pixel = 40;
var canvas, context;

var figure;
var width = 10,
	height = 15;
var width, height;

var figuresCount = 7;

window.onload = init();


function init() {
	canvas = document.getElementById("canvas");
	canvas.width = width * pixel;
	canvas.height = height * pixel;

	document.addEventListener("keydown", onKeyPressed);

	context = canvas.getContext('2d');
	figure = new Figure(Math.floor(Math.random() * figuresCount), 1, -2, pixel);

	setInterval(run, 400);
}

function run() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);

	figure.draw(context);
	figure.drop();
}

function onKeyPressed(event) {
	switch (event.keyCode) {
		case 37: // left
			figure.moveLeft();
			if (figure.checkBound(width))
				figure.moveRight();
			break;
		case 39: // right
			figure.moveRight();
			if (figure.checkBound(width))
				figure.moveLeft();
			break;
		case 38: // up
			figure.rotate();
			if (figure.checkBound(width))
				figure.rotate(true);
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
	this.body = this.bodies[this.id];


	this.draw = function(context) {
		context.fillStyle = "black";
		context.strokeStyle = "white";
		for (var i = 0; i < this.body.length; ++i) {
			context.fillRect((x + this.body[i][0]) * pixel, (y + this.body[i][1]) * pixel, pixel, pixel);
			context.strokeRect((x + this.body[i][0]) * pixel, (y + this.body[i][1]) * pixel, pixel, pixel);
		}
	}

	this.checkBound = function(width) {
		for (var i = 0; i < this.body.length; ++i) {
			if (x + this.body[i][0] < 0 || x + this.body[i][0] >= width)
				return true;
		}
		return false;
	}

	this.moveLeft = function() {
		--x;
	}

	this.moveRight = function() {
		++x;
	}

	this.rotate = function(back) {
		back = this.back || back;
		for (var i = 0; i < this.body.length; ++i) {
			this.body[i] = back ? [-this.body[i][1], this.body[i][0]] : [this.body[i][1], -this.body[i][0]];
		}
		if (this.id == 3 || this.id == 4 || this.id == 5)
			this.back = !this.back;
	}

	this.drop = function() {
		++y;
	}
}