var Vector2= function(x, y){
	this.x=x;
	this.y=y;
  this.multiply=function(factor){
    return new Vector2(this.x*factor, this.y*factor);
  }
  this.divide=function(divident){
    return new Vector2(this.x/divident, this.y/divident);
  }
  this.add=function(vector){
    this.x+=vector.x
    this.y+=vector.y;
  }
  this.length=function(){
    var a = this.x * this.x + this.y * this.y;
    return Math.sqrt(a);
  }
    this.normalized=function(){
    var length = this.length();
    var nVector=Vector2.zero;
    if (length > 0) {
      nVector.x =this.x / length;
      nVector.y =this.y / length;
    }
    return nVector;
  }
  this.normalize=function(){
    var length = this.length();
    if (length > 0) {
      this.x =this.x / length;
      this.y =this.y / length;
    }
  }
}
Vector2.zero=new Vector2(0,0);
Vector2.one=new Vector2(1,1);

Vector2.up=new Vector2(0,1);
Vector2.down=new Vector2(0,-1);
Vector2.left=new Vector2(-1,0);
Vector2.right=new Vector2(1,0);

Vector2.ofXY= function(xy){
	return new Vector2(xy, xy);
}
Vector2.add = function(vector1, vector2){
  return new Vector2(vector1.x+vector2.x, vector1.y+vector2.y);
}
Vector2.subtract = function(vector1, vector2){
  return new Vector2(vector1.x-vector2.x, vector1.y-vector2.y);
}
Vector2.multiply = function(vector1, vector2){
  return new Vector2(vector1.x*vector2.x, vector1.y*vector2.y);
}
Vector2.divide = function(vector1, vector2){
  return new Vector2(vector1.x/vector2.x, vector1.y/vector2.y);
}
var Rect= function(x,y,w,h){
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
}
Rect.ofWH= function(wh){
  return new Rect(0,0,wh,wh);
}
var Sprite= function(image, position, pivot){
  this.image=new Image;
  this.image.src=image;
  this.position=position;
  this.pivot=pivot;
}