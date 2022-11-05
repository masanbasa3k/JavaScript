var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;
    
function setup(){
    createCanvas(600,700);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;
    newParticle();
    var spacing = width / cols;
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var x = spacing/2 + i * spacing
            if (j % 2 == 0){x += spacing/2}
            var y = spacing + j * spacing
            var p = new Plinko(x, y, 5);
            plinkos.push(p)
        }
    }
    var b = new Boundary(width/2, height + 50, width, 100);
    bounds.push(b);
    for (var i = 0; i < cols + 2; i++){
        var x = i * spacing;
        var h = 100;
        var w = 10;
        var y = height - h / 2
        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
}

function newParticle(){
    var p = new Particle(300, 50, 10);
    particles.push(p);
}

function draw(){
    if (frameCount % 60 == 0){newParticle();}

    background(51);
    Engine.update(engine);
    for (var i = 0; i < particles.length; i++){
        particles[i].show();
        if (particles[i].isOffScreen()){
            World.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < plinkos.length; i++){
        plinkos[i].show();
    }

    for (var i = 0; i < bounds.length; i++){
        bounds[i].show();
    }

    
}