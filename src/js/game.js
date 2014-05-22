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
      this.map = this.add.tilemap('Tierra');
      this.map.addTilesetImage('tierraTiles');    
      this.layer = this.map.createLayer('Capa de Patrones 1');
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 12);
      // Player
      this.player = this.game.add.sprite(200, 200, 'personajeTierra');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.bounce.y = 0.2;
      this.player.body.collideWorldBounds = true;
      // Enemigos
      this.bear1 = this.game.add.sprite(2000, 200, 'oso');
      this.game.physics.enable(this.bear1, Phaser.Physics.ARCADE);
      this.bear1.body.bounce.y = 0;
      this.bear1.body.collideWorldBounds = true;
      this.bear1.body.velocity.x = -160;

      this.bear2 = this.game.add.sprite(2000, 200, 'oso');
      this.game.physics.enable(this.bear2, Phaser.Physics.ARCADE);
      this.bear2.body.bounce.y = 0;
      this.bear2.body.collideWorldBounds = true;
      this.bear2.body.velocity.x = 160;

      this.bear3 = this.game.add.sprite(5000, 200, 'oso');
      this.game.physics.enable(this.bear3, Phaser.Physics.ARCADE);
      this.bear3.body.bounce.y = 0;
      this.bear3.body.collideWorldBounds = true;
      this.bear3.body.velocity.x = -160;

      this.lobo1 = this.game.add.sprite(2000, 200, 'lobo');
      this.game.physics.enable(this.lobo1, Phaser.Physics.ARCADE);
      this.lobo1.body.bounce.y = 0;
      this.lobo1.body.collideWorldBounds = true;
      this.lobo1.body.velocity.x = -200;

      this.lobo2 = this.game.add.sprite(2000, 200, 'lobo');
      this.game.physics.enable(this.lobo2, Phaser.Physics.ARCADE);
      this.lobo2.body.bounce.y = 0;
      this.lobo2.body.collideWorldBounds = true;
      this.lobo2.body.velocity.x = 200;

      this.lobo3 = this.game.add.sprite(5000, 200, 'lobo');
      this.game.physics.enable(this.lobo3, Phaser.Physics.ARCADE);
      this.lobo3.body.bounce.y = 0;
      this.lobo3.body.collideWorldBounds = true;
      this.lobo3.body.velocity.x = -200;
      // Colisiones Player-Mapa
          // 648 es el numero total de imagenes que componen en png para el tiled
      for (var i = 0; i < 684; i++) {
        this.map.setCollision(i);
      }
      // Camera
      this.game.camera.follow(this.player);
      // Input setup
      this.cursors = this.game.input.keyboard.createCursorKeys();
     
      this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);

      // Dragón y dialogo (aparecen)
      this.dialogo = this.game.add.sprite(600, 100, 'dTierra');
      this.dragon = this.game.add.sprite(1000, 100, 'dragon');
      this.game.physics.enable(this.dragon, Phaser.Physics.ARCADE);
      this.dragon.body.allowGravity = false;
      var animation = this.dragon.animations.add('move', [0,1,2] ,10, true);
      this.dragon.animations.play('move');

      // Animación para el movimiento del personaje
      var animationLeft = this.player.animations.add('left', [ 6, 7, 8, 9, 10, 11 ], 8, false);
      var animationRight = this.player.animations.add('right', [ 0, 1, 2, 3, 4, 5 ], 8, false);

      // Animacion enemigos
      this.bear1.animations.add('move', [0,1,2,3] ,6, true);
      this.bear2.animations.add('move', [0,1,2,3] ,6, true);
      this.bear3.animations.add('move', [0,1,2,3] ,6, true);

      this.lobo1.animations.add('move', [0,1,2,3,4] ,8, true);
      this.lobo2.animations.add('move', [0,1,2,3,4] ,8, true);
      this.lobo3.animations.add('move', [0,1,2,3,4] ,8, true);

    },

    update: function () {

      this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.bear1, this.layer);
      this.game.physics.arcade.collide(this.bear1, this.player);
      this.bear1.animations.play('move');

      this.game.physics.arcade.collide(this.bear2, this.layer);
      this.game.physics.arcade.collide(this.bear2, this.player);
      this.bear2.animations.play('move');

      this.game.physics.arcade.collide(this.bear3, this.layer);
      this.game.physics.arcade.collide(this.bear3, this.player);
      this.bear3.animations.play('move');

      this.game.physics.arcade.collide(this.lobo1, this.layer);
      this.game.physics.arcade.collide(this.lobo1, this.player);
      this.lobo1.animations.play('move');

      this.game.physics.arcade.collide(this.lobo2, this.layer);
      this.game.physics.arcade.collide(this.lobo2, this.player);
      this.lobo2.animations.play('move');

      this.game.physics.arcade.collide(this.lobo3, this.layer);
      this.game.physics.arcade.collide(this.lobo3, this.player);
      this.lobo3.animations.play('move');

        this.player.body.velocity.x = 0;


    if (this.game.physics.arcade.collide(this.player, this.bear1)) {
      this.player.kill();
    }
    if (this.game.physics.arcade.collide(this.player, this.bear2 )) {
      this.player.kill();
    }
    if (this.game.physics.arcade.collide(this.player, this.bear3 )) {
      this.player.kill();
    }
    if (this.game.physics.arcade.collide(this.player, this.lobo1 )) {
      this.player.kill();
    }
    if (this.game.physics.arcade.collide(this.player, this.lobo2 )) {
      this.player.kill();
    }
    if (this.game.physics.arcade.collide(this.player, this.lobo3 )) {
      this.player.kill();
    }

    if (this.cursors.left.isDown)
    {   
        this.player.body.velocity.x = -280;
        this.player.play('left');   
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 280;
        this.player.play('right');
    }
   
    
    if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
    {
        this.player.body.velocity.y = -425;
        this.jumpTimer = this.game.time.now + 550;
    }

    // Dragon y dialogo (desaparecen)
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
          this.dialogo.kill();
          this.dragon.body.velocity.x = -400;
          this.gameStart = true;
      }        
        
    }


  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Game = Game;

}());
