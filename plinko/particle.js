function Particle(x, y, r){
    var options = {
        restitution: 1, 
        friction: 0
    }
    x += random(-1, 1);
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'particle';
    this.r = r;
    World.add(world, this.body);
}

Particle.prototype.isOffScreen = function(){
    var x = this.body.position.x;
    return (x < -50 || x > width + 50)
}

Particle.prototype.show = function() {
    fill(100,200,300);//(255,255,0) yellow
    stroke(0);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}