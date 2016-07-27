var Component = Class.create({
  initialize: function(gameObject) {
    this.gameObject=gameObject; 
    this.active=true;
    this.start(); 
  },
  start:function(){

  },
  render:function(context) {
   
  },
  update:function(modifier) {
    
  }
});

var SpriteRenderer = Class.create(Component, {
  start: function(){
    this.sprite=new Sprite("", new Rect(0,0,0,0), new Vector2(0,0));
  },
  render: function(context) {
    gameObject=this.gameObject;
    if(gameObject.rotation!=0){
      context.save();
      context.translate(gameObject.position.x, gameObject.position.y); 
      context.rotate(gameObject.rotation);
      context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
      context.restore();
    } else{
      context.drawImage(this.sprite.image, gameObject.position.x-this.sprite.image.width*this.sprite.pivot.x, gameObject.position.y-this.sprite.image.height*this.sprite.pivot.y);
    }
  }
});

var Player = Class.create(Component, {
  start: function(){
    this.rigidbody=this.gameObject.getComponent(Rigidbody);
  },
  update: function(modifier) {
    var direction = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
    direction.normalize();
    this.rigidbody.velocity=direction.multiply(modifier*1000);
  }
});

var Enemy = Class.create(Component, {
  start: function(){
    this.target=this.gameObject;
  },
  update: function(modifier) {
    var direction=Vector2.subtract(this.target.position, this.gameObject.position);
    direction.normalize();
    this.gameObject.position.add(direction.multiply(modifier*10));
  }
});

var Drift = Class.create(Component, {
  start: function(){
    this.speed=10;
  },
  update: function(modifier) {
    this.gameObject.position.x-=modifier*this.speed;
  }
});

var JumpingPlayer = Class.create(Component, {
  update: function(modifier) {
    gameObject=this.gameObject;
    //gameObject.x+=Input.GetAxis("Horizontal")*modifier*20;
    if(gameObject.position.y<40){
      gameObject.position.y+=0.2;
    }
    if(Input.GetButtonDown(32)&&gameObject.position.y>39){
      gameObject.position.y-=10;
    }
  }
});

var MousePlayer = Class.create(Component, {
  update: function(modifier) {
    gameObject=this.gameObject;
    gameObject.position.x=Input.mousePosition.x;
    gameObject.position.y=Input.mousePosition.y;
    if(Input.GetButtonDown(32)){
      //GameObject.Destroy(gameObject);
    }
  }
});

var TouchKiller = Class.create(Component, {
  start: function(modifier) {
    this.dist=4;
  },
  update: function(modifier) {
    gameObject=this.gameObject;
    for(i=0; i<GameObject.array.length; i++){
      var check=GameObject.array[i];
      if(gameObject!=check){
        if((check.x-gameObject.position.x<this.dist&&check.x-gameObject.position.x>-this.dist)&&(check.y-gameObject.position.y<this.dist&&check.y-gameObject.position.y>-this.dist)){
          GameObject.Destroy(check);
        }
      }
    }
  }
});

var Collider = Class.create(Component, {
  start: function(modifier) {
    this.size=new Vector2(10, 10);
    Collider.array.push(this);
    this.boundaries;
    this.__defineGetter__('boundaries', function () {
      var rect=new Rect(this.gameObject.position.x-this.size.x/2, this.gameObject.position.y-this.size.y/2, this.gameObject.position.x+this.size.x/2, this.gameObject.position.y+this.size.y/2);
      return rect;
    });
  },
  render: function(context) {
    var b = this.boundaries;
    context.strokeRect(b.x-0.5, b.y-0.5, this.size.x+1, this.size.y+1);
  }
});

Collider.array=[];
Collider.checkCollision= function (col1, col2){
  bounds1=col1.boundaries;
  bounds2=col2.boundaries;
  var checkX = (bounds2.x<=bounds1.w&&bounds2.x>=bounds1.x)||(bounds2.w<=bounds1.w&&bounds2.w>=bounds1.x)
  ||(bounds2.x<=bounds1.x&&bounds2.w>=bounds1.w)||(bounds2.w<=bounds1.w&&bounds2.x>=bounds1.x);
  var checkY = (bounds2.y<=bounds1.h&&bounds2.y>=bounds1.y)||(bounds2.h<=bounds1.h&&bounds2.h>=bounds1.y)
  ||(bounds2.y<=bounds1.y&&bounds2.h>=bounds1.h)||(bounds2.h<=bounds1.h&&bounds2.y>=bounds1.y);
  if(checkX&&checkY){
    return true;
  }else{
    return false;
  }
}

var Rigidbody = Class.create(Component, {
  start: function(modifier) {
    this.velocity=Vector2.zero;
    this.gravity=new Vector2(0, 0);
    this.drag=0.75;
  },
  update: function(modifier) {
    this.velocity.add(this.gravity);
    var dragVector=new Vector2(this.velocity.x, this.velocity.y).normalized();
    this.gameObject.position.add(this.velocity.multiply(modifier));
    this.velocity=Vector2.subtract(this.velocity, dragVector.multiply((this.velocity.length()*this.drag)*modifier));
  }
});