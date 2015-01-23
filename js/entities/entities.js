//class
game.PlayerEntity = me.Entity.extend({
	//setting function
	init: function(x, y, settings) {
		//extending the function
		this._super(me.Entity, 'init', [x, y, {
			//setting the player image and its width and height
			image: "player", 
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",

			getShape: function(){
				//new shift
				//rectangle to make the character walk into it
				//setting it to the right size
				return (new me.Rect (0, 0, 64, 64)).toPolygon(); 
			}
		}]);
		//setting the velocity
		this.body.setVelocity(5, 20);
	},

	update: function(delta){
		//checking if the right key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to  the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//if other key is pressed it wont work
		}else{
			this.body.vel.x = 0; 
		}
		//updating the game
		this.body.update(delta);
		return true;
	}
});