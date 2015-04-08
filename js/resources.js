game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 // loading the pictures for the map
	  {name: "background-tiles", type:"image", src: "data/img/Background-tiles.png"},
	  {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	  //added the characters pictures.
	  {name: "player", type:"image", src: "data/img/carla.png"},
	  {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	  //adding the creep pictures
	  {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	  {name: "title-screen", type:"image", src: "data/img/title.png"},
	  {name: "gold-screen", type:"image", src: "data/img/storebackground.jpg"},
	  {name: "load-screen", type:"image", src: "data/img/loadingscreen.jpg"},
	 {name: "new-screen", type:"image", src: "data/img/newpic.png"},
	 {name: "iArrow", type:"image", src: "data/img/iArrow.png"},
	 {name: "miniMapC", type:"image", src: "data/img/miniMapC.png"},
	  
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	 //loading the map 
 	 {name: "level01", type: "tmx", src: "data/map/map.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	 {name: "ariana1", type: "audio", src: "data/bgm/"},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}


	 */
	  {name: "jump", type: "audio", src: "data/sfx/"}
];
