var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var cols = 12;
var rows = 12;
    
function setup(){
    createCanvas(600,800);
    engine = Engine.create();
    world = engine.world;
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
    }

    for (var i = 0; i < plinkos.length; i++){
        plinkos[i].show();
    }
    
}