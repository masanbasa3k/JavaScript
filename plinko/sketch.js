var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 15;
var rows = 19;
    
function setup(){
    createCanvas(800,1200);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.5;
    var spacing = width / cols;
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var x = spacing/2 + i * spacing
            if (j % 2 == 0){x += spacing/2}
            var y = spacing + j * spacing
            var p = new Plinko(x, y, 3.5);
            plinkos.push(p)
        }
    }
    var b = new Boundary(width/2, height + 50, width, 100);//horizontal
    bounds.push(b);
    var b = new Boundary(0, 0, 10, height*2);//vertical
    bounds.push(b);
    var b = new Boundary(width, 0, 10, height*2);//vertical
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
    s = random(20, width-20);
    var p = new Particle(s, 10, 22);
    particles.push(p);
}


function draw(){
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

