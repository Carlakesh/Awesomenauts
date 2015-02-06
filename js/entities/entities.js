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
		//keeps track of which direction your character is going
		this.facing = "right";

		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
		//the camera follows the player
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH)
		//adding the pictures of the characters
		this.renderable.addAnimation("idle" , [78]);
		this.renderable.addAnimation("walk", [117, 118 , 119 , 120 , 121 , 122 , 123 , 124 , 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		this.now = new Date().getTime();
		//checking if the right key is pressed
		if (me.input.isKeyPressed("right")) {
			//adds to  the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;

			//flipping the character
			this.facing = "right";
			this.flipX(true);

			//if other key is pressed it wont work
		}else if (me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}else{
			this.body.vel.x = 0; 
		}
if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
this.jumping = true;
this.body.vel.y -= this.body.accel.y * me.timer.tick;
}
	

if(me.input.isKeyPressed("attack")){
		
	if(!this.renderable.isCurrentAnimation("attack")){
		console.log(!this.renderable.isCurrentAnimation("attack"));
		//sets the current animation to attack and once that is over
	//goes back to the idle animation
	this.renderable.setCurrentAnimation("attack" , "idle");
	//makes it so that the next time we start this sequence we begin
	//from the first animation, not wherever we left off when we
	//switched to another animation
	this.renderable.setAnimationFrame();
	}
}





		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			//sets the animation of walking
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}else if (!this.renderable.isCurrentAnimation("attack")){ 
			//when no keys are pressed the character sets to idle
			this.renderable.setCurrentAnimation("idle");
		}



	me.collision.check(this, true, this.collideHandler.bind(this), true);
		//updating the game
		this.body.update(delta);
		//reaches to the constructor of Entity
		this._super(me.Entity, "update", [delta]);
		return true;
	},

		collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
		

if (ydif<-40 && xdif< 70 && xdif>-35){
this.body.falling = false;
this.body.vel.y = -1;
}

			else if(xdif>-35 && this.facing==='right' && (xdif<0 && ydif>-0)) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this.facing==='left' && xdif>0) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;

			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= 1000){
				this.lastHit = this.now;
				response.b.loseHealth();
			}
		}
	}
});

game.EnemyBaseEntity = me.Entity.extend({
	init: function(x , y, settings) {
		this._super(me.Entity, 'init', [x, y, {

			//adding the tower image , and setting its size
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				//setting the rectangle thats for the tower
				return (new me.Rect(0, 0, 100, 80)).toPolygon();
			}
		}]);
		//the health of the power .. if you hit it more than 10 times , then it will blow up
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "EnemyBaseEntity";
		//adding the pictures of the tower
		this.renderable.addAnimation("idle" , [0]);
		this.renderable.addAnimation("broken" , [1]);
		//setting the picture
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		//the tower when it has no hits yet , (health is at 0 )
		if (this.health<=0) {
			this.broken = true;
			//sets the picture of the tower on fire when health is at 0
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
		// the constructor of Entity
		this._super(me.Entity, 'init', [x, y, {
			//choosing the second tower and setting its size
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				//setting the rectangle that the tower is in
				return (new me.Rect(0, 0, 100, 80)).toPolygon();
			}
		}]);
		//the health of the tower
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBaseEntity";
		//adding pictures of the second tower
		this.renderable.addAnimation("idle" , [0]);
		this.renderable.addAnimation("broken" , [1]);
		//setting the picture of the second tower
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		//towers health at 0 
		if (this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	onCollision: function(){

	},
	loseHealth: function(){
		this.health--;
	}
});

game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;

		this.body.setVelocity(3, 20);
		this.type = "EnemyCreep";
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},
	update: function(){

	}
})

game.GameManager = Object.extend({
init: function(x, y, settings){
this.now = new Date().getTime();
this.lastCreep = new Date().getTime();
this.alwaysUpdate = true;
},
update: function(){
this.now = new Date().getTime();

if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
	this.lastCreep = this.now;
	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
	me.game.world.addChild(Creepe, 5);
	}
	return true;
}
});