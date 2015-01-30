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
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH)
		this.renderable.addAnimation("idle" , [78]);
		this.renderable.addAnimation("walk", [117, 118 , 119 , 120 , 121 , 122 , 123 , 124 , 125], 80);
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		//checking if the right key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to  the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);

			//if other key is pressed it wont work
		}else{
			this.body.vel.x = 0; 
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			this.renderable.setCurrentAnimation("idle");
		}
		//updating the game
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

game.EnemyBaseEntity = me.Entity.extend({
	init: function(x , y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);

		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBaseEntity";
		this.renderable.addAnimation("idle" , [0]);
		this.renderable.addAnimation("broken" , [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		if (this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	onCollision: function(){
		
	}
});

game.PlayerBaseEntity = me.Entity.extend({
	init: function(x , y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);

		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle" , [0]);
		this.renderable.addAnimation("broken" , [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		if (this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	onCollision: function(){

	}
});