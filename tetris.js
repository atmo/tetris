var figures = [
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
        [0, 1], //  XO
        [0, 0],
        [1, 0]
    ],
    [
        [0, 1], //  O    
        [1, 0], // OXO
        [0, 0],
        [-1, 0]
    ]
];

var pixel = 20;
var canvas, context;

var x, y;

var width = 500,
    height = 800;

function init() {
    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;

    x = width / 2;
    y = 2 * pixel;
    context = canvas.getContext('2d');
    run();
}

function run() {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    var figureId = 1;
    draw(context, figureId, x, y);
    y += pixel;
    setTimeout(run, 500);
}

function draw(context, id, x, y) {
    context.fillStyle = "black";
    for (var i = 0; i < figures[id].length; ++i) {
        context.fillRect(x + figures[id][i][0] * pixel, y + figures[id][i][1] * pixel, pixel, pixel);
    }
}