var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var touches = []
var cols = 9;
var rows = 9;

var ding;
function preload(){
    ding = loadSound('sounds/bruh.mp3');
    plinkoBG = loadImage('dirt.png');
}



// function mousePressed(){
//     ding.play();
// }


function setup(){
    canvas = createCanvas(500,650);
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.5;

    function collision(event){
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++){
            var labelA = pairs[i].bodyA.label;
            var labelB = pairs[i].bodyB.label;
            if (labelA == 'touchy' && labelB == 'particle'){
                ding.play();
                deleteParticle(i)
            }
            if (labelA == 'particle' && labelB == 'touchy'){
                ding.play();
                deleteParticle(i)
            }
        }
    }
    Events.on(engine, 'collisionStart', collision);

    var spacing = width / cols;
    //creating dots
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var x = spacing/2 + i * spacing
            if (j % 2 == 0){x += spacing/2}
            var y = spacing + j * spacing
            var p = new Plinko(x, y, 3.5);
            plinkos.push(p)
        }
    }
    //Walls
    var b = new Boundary(width/2, height + 50, width, 110);//horizontal
    bounds.push(b);
    var b = new Boundary(0, 0, 10, height*2);//vertical left
    bounds.push(b);
    var b = new Boundary(width, 0, 10, height*2);//vertical right
    bounds.push(b);
    
    // Cells
    for (var i = 1; i < cols; i++){
        var x = i * spacing;
        var h = 80;
        var w = 10;
        var y = height - h / 2
        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
    // touches
    for (var i = 0; i < cols; i++){
        var x = (i * spacing)+5;
        var h = 20;
        var w = 45;
        var y = height - h / 2
        var b = new Touchy(x, y, w, h);
        touches.push(b);
    }
} 

function newParticle(){// create particle function
    s = random(20, width-20);
    var p = new Particle(s, 10, 22);
    particles.push(p);
}

function deleteParticle(index){
    World.remove(world, particles[index].body);
    particles.splice(index, 1);
}


function draw(){
    // background(plinkoBG,[100]);//'transparent'
    background('transparent');
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

    for (var i = 0; i < touches.length; i++){
        touches[i].show();
    }
}

