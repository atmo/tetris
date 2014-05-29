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
	board = new Board(width, height);
	board.init();
	figure = new Figure();

	setInterval(update, 400);
	setInterval(redraw, 1000 / 60);
}

function update() {
	figure.drop();
}

function redraw() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	figure.draw();
	board.draw();
}


function drawPixel(x, y) {
	context.fillStyle = "black";
	context.strokeStyle = "white";
	context.fillRect(x * pixel, y * pixel, pixel, pixel);
	context.strokeRect(x * pixel, y * pixel, pixel, pixel);
}

function onKeyPressed(event) {
	switch (event.keyCode) {
		case 37: // left
			if (!figure.checkBound(-1) && !board.checkOccupied(-1, 0))
				figure.moveLeft();
			break;
		case 39: // right
			if (!figure.checkBound(1) && !board.checkOccupied(1, 0))
				figure.moveRight();
			break;
		case 38: // up
			figure.rotate();
			if (figure.checkBound(0) || board.checkOccupied(0, 0))
				figure.rotate(true);
			break;
		case 40: //down
			while (!board.checkOccupied(0, 1))
				figure.drop();
			break;
	}
}



function Board(width, height) {
	var field = [];
	this.init = function() {
		field = new Array(height);
		for (var i = 0; i < height; ++i) {
			field[i] = new Array(width);
			for (var j = 0; j < width; ++j)
				field[i][j] = 0;
		}
	}

	this.checkOccupied = function(dx, dy) {
		for (var i = 0; i < 4; ++i) {
			var pos = figure.getBody(i);
			if (field[pos[0] + dx][pos[1] + dy] || pos[1] + dy > height)
				return true;
		}
		return false;
	}

	this.draw = function() {
		for (var i = 0; i < height; ++i) {
			for (var j = 0; j < width; ++j) {
				if (field[j][i])
					drawPixel(j, i);
			}
		}
	}
}

function Figure() {
	var id = Math.floor(Math.random() * figuresCount);
	var x = width / 2,
		y = 0;
	var back = false;
	var pixel = pixel;
	var bodies = [
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
	var body = bodies[id];

	this.draw = function() {
		for (var i = 0; i < body.length; ++i) {
			drawPixel(x + body[i][0], y + body[i][1]);
		}
	}

	this.checkBound = function(shift) {
		for (var i = 0; i < body.length; ++i) {
			if (x + body[i][0] + shift < 0 || x + body[i][0] + shift >= width)
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

	this.rotate = function(b) {
		back = back || b;
		for (var i = 0; i < body.length; ++i) {
			body[i] = back ? [-body[i][1], body[i][0]] : [body[i][1], -body[i][0]];
		}
		if (id == 3 || id == 4 || id == 5)
			back = !back;
	}

	this.getBody = function(index) {
		return [x + body[index][0], y + body[index][1]];
	}

	this.drop = function() {
		++y;
	}
}