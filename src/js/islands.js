(function() {
  'use strict';

  function Islands() {
    this.titleTxt = null;
    this.startTxt = null;
    this.island1;
    this.island2;
    this.island3;
    this.island4;

    this.DRAG = 600;
  }

  Islands.prototype = {

    create: function () {
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	
    	this.background = this.game.add.tileSprite(0, 0, 1920, 1200, 'sea');
    	
      this.player = this.game.add.sprite(900, 500, 'ship');
      this.player.animations.add('left', [0], 10, true);
      this.player.animations.add('right', [1], 10, true);
      

      this.island1 = this.game.add.sprite(200, 310, 'fuego');
      this.island2 = this.game.add.sprite(1100, 320, 'tierra');
      this.island3 = this.game.add.sprite(500, 420, 'hielo');
      this.game.physics.enable( [this.player,this.island1,this.island2,this.island3], Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      this.player.body.drag.setTo(this.DRAG, 200);
    	
    	this.scale = 1;
    	
      

    },

    update: function () {
      
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if(this.player.x >= 0){
    		      this.player.body.velocity.x = -100;
              this.player.animations.play('left');
            }
           
          }
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        	  if(this.player.x <= 1450){
        	  this.player.body.velocity.x = 100;
            this.player.animations.play('right');
        	  }
            
          }         
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    		if(this.player.y >= 325){
    		this.player.body.velocity.y = -100;
    		}
          }          
    	if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    		if(this.player.y <= 820){
    		this.player.body.velocity.y = 100;
    		}
          }
    	
    	if(this.player.body.velocity.x > 0){
    		this.player.body.velocity.x -=1;
    	}
    	if(this.player.body.velocity.x < 0){
    		this.player.body.velocity.x +=1;
    	}
    	
		this.player.scale.x = this.player.y * 0.0012;
		this.player.scale.y = this.player.y * 0.0012;
    	
    	this.game.physics.arcade.collide(this.player, this.island2,
        function( player, island2 ){
          this.game.state.start('game');
        },
        null, this);
      this.game.physics.arcade.collide(this.player, this.island1,
        function( player, island2 ){
          this.game.state.start('fuego');
        },
        null, this);

      /*this.physics.arcade.overlap(this.player, this.island2, function (player, coin) {
            coin.kill();
            console.log("caca")
        }, null, this);*/

      /*this.physics.arcade.collide(this.player, this.island2, function (player, coin) {
            coin.kill();
            console.log("caca")
        }, null, this);*/
    },


/*ender: function() {
  this.game.debug.body(this.island2);
  this.game.debug.bodyInfo(this.player, 16, 24);
  this.game.debug.bodyInfo(this.island2, 16, 124);
  this.game.debug.bodyInfo(this.island1, 16, 124);

},*/

    onDown: function () {
     
    }
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Islands = Islands;

}());
