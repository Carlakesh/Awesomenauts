game.PlayerBaseEntity = me.Entity.extend({
	init: function(x , y, settings) {
		this.setSuper(x, y);
		this.setAttributes();
		this.type = "PlayerBase";

		this.addAnimation();
		
		/*sets the first picture of the tower*/
		this.renderable.setCurrentAnimation("idle");
	},
	setSuper:function(x, y){
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
	},
		//the health of the tower
		this.broken = false;
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		this.type = "PlayerBase";
		//adding pictures of the second tower
		this.renderable.addAnimation("idle" , [0]);
		this.renderable.addAnimation("broken" , [1]);
		//setting the picture of the second tower
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		this.dead = this.checkIfDestroyed();
		//towers health at 0 
		if (this.health<=0) {
			this.broken = true;
			game.data.win = false;
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
