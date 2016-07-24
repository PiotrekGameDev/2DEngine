var canvas = document.getElementById("myCanvas");
/*
var Axis= function(positive, negative){
	this.positive=positive;
	this.negative=negative;
}
*/
var Input = new function() {
	this.keys = {};
	this.keysDown = {};
	this.keysUp = {};
	this.axes = {};

	this.axes["Horizontal"]=[37, 39];
	this.axes["Vertical"]=[38, 40];
	this.mousePosition=new Vector2(0,0);

	this.GetButton=function(index){
		return this.keys[index];
	}
	this.GetButtonDown=function(index){
		return this.keysDown[index];
	}
	this.GetButtonUp=function(index){
		return this.keysUp[index];
	}
	this.GetAxis=function(name){
		var axis=this.axes[name];
		if(this.keys[axis[0]]){
			return -1;
		} else if(this.keys[axis[1]]){
			return 1;
		}else{
			return 0;
		}
	}

	addEventListener("keydown", function(e) {
	  if ( ( e.keycode || e.which ) == 32) {
	     e.preventDefault();
	  }
	  if(!Input.keys[e.keyCode]){
	  	Input.keysDown[e.keyCode] = true;
	  }
	  Input.keys[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function(e) {
	  delete Input.keys[e.keyCode];
	  Input.keysUp[e.keyCode] = true;
	}, false);

	addEventListener("mousemove", function(e) {
		var canvasRect = canvas.getBoundingClientRect();
		Input.mousePosition=new Vector2((e.clientX-canvasRect.left)/4, (e.clientY-canvasRect.top)/4);
	}, false);
}