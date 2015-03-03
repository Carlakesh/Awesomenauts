game.EnemyBaseEntity = me.Entity.extend({
	init: function(x , y, settings) {
		this.setSuper(x, y);
		this.setAttributes();
		this.type = "EnemyBaseEntity";

		this.addAnimation();
		
		//sets the first picture of the tower
		this.renderable.setCurrentAnimation("idle");
	},

	setSuper: function(x, y) {
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
		this.health = game.data.enemyBaseHealth;
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
		this.dead = this.checkIfDestroyed();
		//the tower when it has no hits yet , (health is at 0 )
		if (this.health<=0) {
			this.broken = true;
			game.data.win = true;
			//sets the picture of the tower on fire when health is at 0
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	onCollision: function(){
		
	}
});

