(function() {
  'use strict';

  function Islands() {
    this.titleTxt = null;
    this.startTxt = null;
    this.island1;
    this.island2;
    this.island3;
    this.island4;
  }

  Islands.prototype = {

    create: function () {
    	//this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	
    	this.background = this.game.add.tileSprite(0, 0, 1920, 1200, 'sea');
    	this.island1 = this.game.add.sprite(200, 310, 'fuego');;
        this.island2 = this.game.add.sprite(1100, 320, 'tierra');;
        this.player = this.game.add.sprite(300,800, 'ship');
    	this.island3 = this.game.add.sprite(500, 420, 'hielo');
    	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    	this.input.onDown.add(this.onDown, this);
    	this.scale = 1;
    	
    },

    update: function () {
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if(this.player.x >= 0){
    		this.player.x -= 2;
            }
          }
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        	  if(this.player.x <= 1450){
        	  this.player.x += 2;
        	  }
          }         
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    		if(this.player.y >= 325){
    		this.player.y -= 2;
    		}
          }          
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    		if(this.player.y <= 820){
    		this.player.y += 2;
    		}
          }
    	
		this.player.scale.x = this.player.y * 0.0012;
		this.player.scale.y = this.player.y * 0.0012;
    	
    	
    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Islands = Islands;

}());
