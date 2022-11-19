function Touchy(x, y, w, h){
    var options = {
        isStatic: true
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = 'touchy';
    this.w = w;
    this.h = h;
    World.add(world, this.body);

}

Touchy.prototype.show = function() {
    fill(100,0,200);
    stroke(51);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    // rect(0, 0, this.w, this.h);
    rect(0, 0, this.w, this.h);
    pop();
}