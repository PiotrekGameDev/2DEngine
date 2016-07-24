var GameObject = Class.create({

  initialize: function(x, y, rotation=0) {
    this.components=[];
    this.position=new Vector2(x,y);
    this.rotation=rotation;
    GameObject.array.push(this);
  },
  addComponent: function(component){
    var nComponent = new component(this);
    this.components.push(nComponent);
    return(nComponent);
  },
  getComponent: function(component){
    for(i=0; i<this.components.length; i++){
      if(this.components[i] instanceof component){
        return this.components[i];
      }
    }
  },
  render:function(context) {
	 this.components.forEach(function (c){
      if (typeof c.render === "function") {
        c.render(context);
      }
    });
  },
  update:function(modifier) {
    this.components.forEach(function (c){
      if (typeof c.update === "function") {
        c.update(modifier);
      }
    });
  }
});
GameObject.array=[];
GameObject.Destroy = function(gameObject){
  GameObject.array.splice(GameObject.array.indexOf(gameObject),1);
}

var SpriteRenderer = function(gameObject){
  this.gameObject=gameObject;  
  this.sprite=new Sprite("", new Rect(0,0,0,0), new Vector2(0,0));
  this.render=function(context) {
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
}

var Player = function(gameObject){
  this.gameObject=gameObject;
  this.update=function(modifier) {
    var direction = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
    direction.normalize();
    gameObject.position.add(direction.multiply(modifier*20));
  }
}

var Enemy = function(gameObject){
  this.gameObject=gameObject;
  this.target=gameObject;
  this.update=function(modifier) {
    var direction=Vector2.subtract(this.target.position, gameObject.position);
    direction.normalize();
    gameObject.position.add(direction.multiply(modifier*10));
  }
}

var Drift = function(gameObject){
  this.gameObject=gameObject;
  this.speed=10;
  this.time=0;
  this.update=function(modifier) {
    gameObject.position.x-=modifier*this.speed;
    if(gameObject.position.x>0){
      this.time+=modifier;
    } else{
      console.log(this.time);
    }
  }
}

var JumpingPlayer = function(gameObject){
  this.gameObject=gameObject;
  this.update=function(modifier) {
    //gameObject.x+=Input.GetAxis("Horizontal")*modifier*20;
    if(gameObject.postion.y<40){
      gameObject.position.y+=0.2;
    }
    if(Input.GetButtonDown(32)&&gameObject.position.y>39){
      gameObject.position.y-=10;
    }
  }
}

var MousePlayer = function(gameObject){
  this.gameObject=gameObject;
  this.update=function(modifier) {
    gameObject.position.x=Input.mousePosition.x;
    gameObject.position.y=Input.mousePosition.y;
    if(Input.GetButtonDown(32)){
      //GameObject.Destroy(gameObject);
    }
  }
}

var TouchKiller = function(gameObject){
  this.gameObject=gameObject;
  this.dist=4;
  this.update=function(modifier) {
    for(i=0; i<GameObject.array.length; i++){
      var check=GameObject.array[i];
      if(gameObject!=check){
        if((check.x-gameObject.position.x<this.dist&&check.x-gameObject.position.x>-this.dist)&&(check.y-gameObject.position.y<this.dist&&check.y-gameObject.position.y>-this.dist)){
          GameObject.Destroy(check);
        }
      }
    }
  }
}

var Collider = function(gameObject){
  this.gameObject=gameObject;
  this.size=new Vector2(10, 10);
  Collider.array.push(this);
  this.boundaries;
  this.__defineGetter__('boundaries', function () {
    var rect=new Rect(gameObject.position.x-this.size.x/2, gameObject.position.y-this.size.y/2, gameObject.position.x+this.size.x/2, gameObject.position.y+this.size.y/2);
    return rect;
  });
  this.render=function(context) {
    var b = this.boundaries;
    context.strokeRect(b.x, b.y, this.size.x, this.size.y);
  }
}
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

var Rigidbody = function(gameObject){
  this.velocity=Vector2.zero;
  this.gravity=new Vector2(0, 0);
  this.drag=10;
  this.update=function(modifier) {
    this.velocity.add(this.gravity);
    var dragVector=new Vector2(this.velocity.x, this.velocity.y).normalized();
    gameObject.position.add(this.velocity.multiply(modifier));
    this.velocity=Vector2.subtract(this.velocity, dragVector.multiply(this.drag*modifier));
  }
}