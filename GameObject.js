var GameObject = Class.create({

  initialize: function(x, y, rotation=0) {
    this.components=[];
    this.active=true;
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
      if(c.active)c.render(context);
    });
  },
  update:function(modifier) {
    this.components.forEach(function (c){
      if(c.active)c.update(modifier);
    });
  }
});
GameObject.array=[];
GameObject.Destroy = function(gameObject){
  GameObject.array.splice(GameObject.array.indexOf(gameObject),1);
}