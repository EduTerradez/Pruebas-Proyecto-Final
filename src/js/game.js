(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.map;
    this.layer;
    this.jumpTimer = 0;
    this.jumpbutton;
  }

  Game.prototype = {

    create: function () {
      // Physics subsystem
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 300;
      // Map
      this.map = this.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');      
      this.layer = this.map.createLayer('layer1');
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 12);
      // Player
      this.player = this.game.add.sprite(200, 200, 'personaje');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.bounce.y = 0.2;
      this.player.body.collideWorldBounds = true;
      // Camera
      this.game.camera.follow(this.player);
      // Input setup
      this.cursors = this.game.input.keyboard.createCursorKeys();
     
      this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    },

    update: function () {
      this.game.physics.arcade.collide(this.player, this.layer);
        this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -150
        this.player.frame = 0;

        
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 150;
        this.player.frame = 1;
    }
   
    
    if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
    {
        this.player.body.velocity.y = -300;
        this.jumpTimer = this.game.time.now + 550;
    }
    	/*if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
          this.player.body.velocity.x = -200;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        	this.player.body.velocity.x = 200;
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        	this.player.body.velocity.x = -200;
            this.player.body.velocity.y = -200;
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        	this.player.body.velocity.x = 200;
            this.player.body.velocity.y = -200;
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        	this.player.body.velocity.y = -300;
        }
        /*
     // Set a variable that is true when the player is touching the ground
        var onTheGround = this.player.body.touching.down;
        if (onTheGround) this.canDoubleJump = true;

        if (this.upInputIsActive(5)) {
            // Allow the player to adjust his jump height by holding the jump button
            if (this.canDoubleJump) this.canVariableJump = true;

            if (this.canDoubleJump || onTheGround) {
                // Jump when the player is touching the ground or they can double jump
                this.player.body.velocity.y = this.JUMP_SPEED;

                // Disable ability to double jump if the player is jumping in the air
                if (!onTheGround) this.canDoubleJump = false;
            }
        }

        // Keep y velocity constant while the jump button is held for up to 150 ms
        if (this.canVariableJump && this.upInputIsActive(150)) {
            this.player.body.velocity.y = this.JUMP_SPEED;
        }

        // Don't allow variable jump height after the jump button is released
        if (!this.upInputIsActive()) {
            this.canVariableJump = false;
        }
*/
        
        
    }
    

  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Game = Game;

}());
