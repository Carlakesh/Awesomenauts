game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		//loading level 01 
		me.levelDirector.loadLevel("level01");
		
		this.resetPlayer(0, 420);
		//adds the gamemanager to the game
		var gameTimerManager = me.pool.pull("GameTimerManager", 0 , 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0 , 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0 , 0, {});
		me.game.world.addChild(experienceManager, 0);

		var SpendGold = me.pool.pull("SpendGold", 0 , 0, {});
		me.game.world.addChild(SpendGold, 0);

		game.data.minimap = me.pool.pull("minimap", 10, 10, {});
		me.game.world.addChild(game.data.minimap, 30);
		me.input.bindKey(me.input.KEY.S, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		//when clicking right, character moves right
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//when clicking left, character moves left
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//when clicking space, character will jump
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		//when clicking 'A' , character will attack
		me.input.bindKey(me.input.KEY.A, "attack");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//adding my background music
		me.audio.playTrack("ariana1");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		//adding the player 
		game.data.player = me.pool.pull("player", x, y, {});
		//adding him into the game/ on the screen
		me.game.world.addChild(game.data.player , 5);
	}
});
