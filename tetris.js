var pixel = 40;
var canvas, context;

var figure, board;
var width = 10,
	height = 15;

var figuresCount = 7;
var scoreLabel;
var compute;

window.onload = init();


function init() {
	canvas = document.getElementById("canvas");
	canvas.width = width * pixel;
	canvas.height = height * pixel;

	document.addEventListener("keydown", onKeyPressed);
	scoreLabel = document.getElementById("score");

	context = canvas.getContext('2d');
	board = new Board(width, height);
	board.init();
	figure = new Figure();

	compute = setInterval(update, 500);
	setInterval(redraw, 1000 / 60);
}

function update() {
	if (board.checkOccupied(0, 1)) {
		board.merge(figure);
		figure = new Figure();
		if (board.checkOccupied(0, 1)) {
			alert("Game over!");
			window.clearInterval(compute);
		}
		scoreLabel.textContent = parseInt(scoreLabel.textContent, 10) + board.clearLines();
	}
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
		default:
			//console.log(event.keyCode);
	}
}



function Board(width, height) {
	var field = [];
	this.init = function() {
		field = new Array(height);
		for (var y = 0; y < height; ++y) {
			field[y] = new Array(width);
			for (var x = 0; x < width; ++x)
				field[y][x] = 0;
		}
	}

	this.checkOccupied = function(dx, dy) {
		for (var i = 0; i < 4; ++i) {
			var pos = figure.getBody(i);
			if (pos[1] + dy < 0)
				continue;
			if (pos[1] + dy >= height || field[pos[1] + dy][pos[0] + dx])
				return true;
		}
		return false;
	}

	this.merge = function(figure) {
		for (var i = 0; i < 4; ++i) {
			var pos = figure.getBody(i);
			field[pos[1]][pos[0]] = 1
		}
	}

	this.draw = function() {
		for (var y = 0; y < height; ++y) {
			for (var x = 0; x < width; ++x) {
				if (field[y][x])
					drawPixel(x, y);
			}
		}
	}

	this.checkFull = function() {
		for (var y = 0; y < height; ++y) {
			var full = true;
			for (var x = 0; x < width; ++x)
				if (!field[y][x]) {
					full = false;
					break;
				}
			if (full) {
				return y;
			}
		}
		return -1;
	}

	this.clearLines = function() {
		var line;
		var score = 0,
			multiplier = 0;
		while ((line = this.checkFull()) != -1) {
			field.splice(line, 1);
			field.unshift(new Array(width))
			for (var x = 0; x < width; ++x)
				field[0][x] = 0;
			multiplier = multiplier * 2 + 1;
		}
		return 100 * multiplier;
	}
}

function Figure() {
	var id = Math.floor(Math.random() * figuresCount);
	var x = width / 2,
		y = -1;
	var back = false;
	var pixel = pixel;
	var bodies = [
		[
			[0, -2], // O
			[0, -1], // O
			[0, 0], //  X
			[0, 1] //   O
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
			[0, 1], // OO
			[1, 1], // XO
			[0, 0],
			[1, 0]
		],
		[
			[1, -1], //  OO
			[0, -1], // Ox
			[0, 0],
			[-1, 0]
		],
		[
			[-1, -1], // OO    
			[0, -1], //   XO
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
		if (id == 0 || id == 4 || id == 5) {
			for (var i = 0; i < body.length; ++i) {
				body[i] = back ? [-body[i][1], body[i][0]] : [body[i][1], -body[i][0]];
			}
			back = !back;
		} else if (id != 3) {
			b = back || b;
			for (var i = 0; i < body.length; ++i) {
				body[i] = b ? [body[i][1], -body[i][0]] : [-body[i][1], body[i][0]];
			}
		}

	}

	this.getBody = function(index) {
		return [x + body[index][0], y + body[index][1]];
	}

	this.drop = function() {
		++y;
	}
}