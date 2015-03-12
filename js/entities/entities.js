//class
game.PlayerEntity = me.Entity.extend({
	//setting function
	init: function(x, y, settings) {
		this.setSuper(x,y);
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();
		
		//the camera follows the player
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH)
		this.addAnimation();

		this.renderable.setCurrentAnimation("idle");
	},


	setSuper: function(x,y){
		//reaches to the constructor of Entity
		this._super(me.Entity, 'init', [x, y, {
			//chooses the player and setting its size .
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				//sets the rectangle the player can walk into
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},

	setPlayerTimers: function(){

		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
	},

	setAttributes: function(){
		//setting the player's health
		this.health = game.data.playerHealth;
		//setting the velocity
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},

	setFlags: function(){
	//keeps track of which direction your character is going
		this.facing = "right";
		this.dead = false;
		this.attacking = false;
		
	},

	addAnimation: function(){
		//adding the pictures of the characters
		this.renderable.addAnimation("idle" , [78]);
		this.renderable.addAnimation("walk", [117, 118 , 119 , 120 , 121 , 122 , 123 , 124 , 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		
	},

	update: function(delta){
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();
		this.checkKeyPressesAndMove();
		
me.audio.play("jump");

	
	this.setAnimation();

		//checks the collision 
	me.collision.check(this, true, this.collideHandler.bind(this), true);

		//updating the game
		this.body.update(delta);
		//reaches to the constructor of Entity
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function(){
		if(this.health <= 0){
			return true;
		}
		return false;
	},

	checkKeyPressesAndMove: function(){
		//checking if the right key is pressed
		if (me.input.isKeyPressed("right")) {
			this.moveRight();

			//if other key is pressed it wont work
		}else if (me.input.isKeyPressed("left")){
			this.moveLeft();
		}else{
			this.body.vel.x = 0; 
		}
		//lets you jump except when you're already jumping or falling
if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
	this.jump();
}
	this.attacking = me.input.isKeyPressed("attack");
	},

	moveRight: function(){

			//adds to  the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;

			//flipping the character
			this.facing = "right";
			this.flipX(true);
		},

		moveLeft: function(){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
		},

		jump: function(){
			this.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		},

		setAnimation: function(){
			if(this.attacking){
		
	if(!this.renderable.isCurrentAnimation("attack")){
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
			},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},
			//sets collision between tower and player it helps so the player wont go through the tower
		collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
		
//helps the player step on the correct level of the floor .
if (ydif<-40 && xdif< 70 && xdif>-35){
this.body.falling = false;
this.body.vel.y = -1;
}

		//stops player from going through from the right
			else if(xdif>-35 && this.facing==='right' && (xdif<0 && ydif>-0)) {
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x -1;
				//stops player from going through from the left
			}else if(xdif<70 && this.facing==='left' && xdif>0) {
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;

			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer){
		
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
		}else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if (xdif>0) {
				//this.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else{
				//this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				this.lastHit = this.now;
				//if the creeps health is less than our attack, execute code in if statement
				if(response.b.Health <= game.data.playerAttack){
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);

				}
				response.b.loseHealth(game.data.playerAttack);
			}
		}
		
	}
});





