window.onload=function(){

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var playerSprite=new Sprite("player.png", Rect.ofWH(8), Vector2.ofXY(0.5));

var player, enemy, box;
var loadlevel = function(){
  GameObject.array=[];
  player = new GameObject(32,32);
  player.addComponent(Rigidbody);
  player.addComponent(Player);
  player.addComponent(Collider);
  player.addComponent(SpriteRenderer).sprite=playerSprite;

  enemy = new GameObject(64,32);
  enemy.addComponent(Enemy).target=player;
  enemy.addComponent(Collider);
  enemy.addComponent(SpriteRenderer).sprite=playerSprite;

  box = new GameObject(32,16);
  box.addComponent(Rigidbody).velocity=Vector2.one.multiply(20);
  box.addComponent(Collider);
  box.addComponent(SpriteRenderer).sprite=new Sprite("box.png", Rect.ofWH(8), Vector2.ofXY(0.5));
}
loadlevel();

// Update game objects
var update = function(modifier) {
  if(Collider.checkCollision(player.getComponent(Collider), enemy.getComponent(Collider))) {
    //loadlevel();
  }
  GameObject.array.forEach(function (go){
    if(go.active)go.update(modifier);
  });
};
var camera={
  position:Vector2.zero
};
// Draw everything
var render = function() {
  camera.position=new Vector2(-player.position.x+32, -player.position.y+32);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(camera.position.x, camera.position.y);
  GameObject.array.forEach(function (go){
    if(go.active)go.render(ctx);
  });
  ctx.restore();
};

// The main game loop
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  Input.keysDown={};
  Input.keysUp={};

  then = now;
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();

main();

}