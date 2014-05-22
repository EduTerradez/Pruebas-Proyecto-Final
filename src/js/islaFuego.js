(function() {
  'use strict';

  function Fuego() {

  }

  Fuego.prototype = {
    
    create: function () {
       this.background = this.game.add.tileSprite(0, 0, 1500, 900, 'cavern');

    this.SHOT_DELAY = 1000; 
    this.BULLET_SPEED = 1100; 
    this.NUMBER_OF_BULLETS = 20;
    this.GRAVITY = 1100;


    this.life = 6;
    this.gameStart = false;
    this.wave1active = true;
    this.wave2active = false;
    this.wave3active = false;
    this.wave4active = false; 
    this.wave5active = false;
    this.wave6active = false;  
    //Elementos
    this.dialogo = this.game.add.sprite(600, 100, 'dcannon');

    this.dragon = this.game.add.sprite(1000, 100, 'dragon');
    this.game.physics.enable(this.dragon, Phaser.Physics.ARCADE);
    this.dragon.body.allowGravity = false;
    var animation = this.dragon.animations.add('move', [0,1,2] ,10, true);
    this.dragon.animations.play('move');

    this.vida = this.game.add.sprite(50, 300, 'vida');
    this.gate = this.game.add.sprite(140, 200, 'rec1');
    this.game.physics.enable(this.gate, Phaser.Physics.ARCADE);
    this.gate.body.allowGravity = false;
    this.gate.body.immovable = true;

    this.gun = this.game.add.sprite(340, 685, 'cannon');
    this.gun.anchor.setTo(0.5, 0.5);
    this.wizard = this.game.add.sprite(280, 665,'player');
    this.castle = this.game.add.sprite(-50, 450,'castle');
    this.madera = this.game.add.sprite(250, 730,'madera');
    this.cannon = this.game.add.sprite(300, 680,'cañon');
    //Muro
    this.wall = this.game.add.sprite(400, 600,'muralla');
    this.game.physics.enable(this.wall, Phaser.Physics.ARCADE);
    this.wall.body.immovable = true;
    this.wall.body.allowGravity =  false;

    this.p = true;
    // Balas
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);
        bullet.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.kill();
      }
    //Gravedad
    this.game.physics.arcade.gravity.y = this.GRAVITY;
    //Suelo
    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }


    this.explosionGroup = this.game.add.group();
    this.loboGroup = this.game.add.group();
    this.osoGroup = this.game.add.group();
    this.cuervoGroup = this.game.add.group();

    
    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2 - 100;

  
    },

    update: function () {

        this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
            
            this.getExplosion(bullet.x, bullet.y);

            this.loboGroup.forEachAlive(function(lobo){
                if(Math.abs(lobo.body.x+20 - bullet.x) <= 100){
                    lobo.kill();
                }
            },this);

            this.osoGroup.forEachAlive(function(oso){
                if(Math.abs(oso.body.x+20 - bullet.x) <= 100){
                    oso.kill();
                }
            },this);

            bullet.kill();
        }, null, this);

        this.game.physics.arcade.collide(this.bulletPool, this.cuervoGroup, function(bullet, cuervo) {
            
            this.getExplosion(bullet.x, bullet.y);
            cuervo.kill();
            bullet.kill();
        }, null, this);

        this.game.physics.arcade.collide(this.loboGroup, this.gate, function(gate, lobo) {
            lobo.kill();
            this.life -= 1;
        }, null, this);
        this.game.physics.arcade.collide(this.osoGroup, this.gate, function(gate, oso) {
            oso.kill();
            this.life -= 1;
        }, null, this);
        this.game.physics.arcade.collide(this.cuervoGroup, this.gate, function(gate, cuervo) {
            cuervo.kill();
            this.life -= 1;
        }, null, this);

        this.game.physics.arcade.collide(this.bulletPool, this.wall);
        this.game.physics.arcade.collide(this.bulletPool, this.bulletPool);
        this.game.physics.arcade.collide(this.ground, this.wall);
        this.game.physics.arcade.collide(this.ground, this.loboGroup);
        this.game.physics.arcade.collide(this.ground, this.cuervoGroup);
        this.game.physics.arcade.collide(this.ground, this.osoGroup);
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
          this.dialogo.kill();
          this.dragon.body.velocity.x = -400;
          this.gameStart = true;
        }
        

        if(this.life === 5){
            this.vida.frame = 1;
        }
        else if(this.life === 4){
            this.vida.frame = 2;
        }
        else if(this.life === 3){
            this.vida.frame = 3;
        }
        else if(this.life === 2){
            this.vida.frame = 4;
        }
        else if(this.life === 1){
            this.vida.frame = 5;
        }
        else if(this.life === 0){
            this.vida.frame = 6;
            this.game.state.start('Islands');
        }




        if(this.gameStart){

        this.bulletPool.forEachAlive(function(bullet) {
            bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
        }, this);

        this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);

        if (this.game.input.activePointer.isDown) {
            this.shootBullet();
        }



        if(this.wave1active){
            this.wave1a();
        }
        else if(this.wave2active){
            this.wave2a();

        }
        //this.game.time.events.add(Phaser.Timer.SECOND * 4, this.wave1, this);

        /*if(this.p){   var lobo = this.game.add.sprite(900 , 700, 'lobo');
        this.game.physics.enable(lobo, Phaser.Physics.ARCADE);
        lobo.body.velocity.x = -50; var animation = lobo.animations.add('move',[0,1,2,3] ,6, true); lobo.animations.play('move');this.loboGroup.add(lobo);
        } 
        this.p = false;*/
        //this.momiaGroup.forEach(function(lobo){lobo.animations.play('move');})
        //Math.floor((Math.random() * 10) + 1);
        //game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
        }
    },

    wave1a: function(){
        
        this.addLobos(1);
        this.addOsos(3);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, function(){this.addLobos(2);this.addCuervos(2)}, this);
        
        this.wave1active = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 20, function(){this.wave2active = true}, this);
    },

    wave2a: function(){
        this.addLobos(2);
        this.addOsos(3);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, function(){this.addLobos(2);this.addCuervos(2)}, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 10, function(){this.addOsos(9);this.addCuervos(5)}, this);
        this.addLobos(3);

        this.wave2active = false;
    },

    addLobos: function(number){
        for(var i = 0;i < number;i++){
              var lobo = this.game.add.sprite(1500 , 800, 'lobo');
              this.game.physics.enable(lobo, Phaser.Physics.ARCADE);
              lobo.body.velocity.x = -(Math.floor((Math.random() * 100) + 50));
              var animation = lobo.animations.add('move', [0,1,2,3,4] ,10, true);
              lobo.animations.play('move');
              this.loboGroup.add(lobo);

        }

    },
     addOsos: function(number){
        for(var i = 0;i < number;i++){
              var oso = this.game.add.sprite(1600 , 650, 'oso');
              this.game.physics.enable(oso, Phaser.Physics.ARCADE);
              oso.body.velocity.x = -(Math.floor((Math.random() * 90) + 50));
              var animation = oso.animations.add('move', [0,1,2,3] ,6, true);
              oso.animations.play('move');
              this.osoGroup.add(oso);

        }

    },
     addCuervos: function(number){
        for(var i = 0;i < number;i++){
              var cuervo = this.game.add.sprite(1600 , (Math.floor((Math.random() * 400) + 200)), 'cuervo');
              this.game.physics.enable(cuervo, Phaser.Physics.ARCADE);
              cuervo.body.allowGravity = false;
              cuervo.body.velocity.x = -(Math.floor((Math.random() * 100) + 50));
              var animation = cuervo.animations.add('move', [0,1,2,3] ,6, true);
              cuervo.animations.play('move');
              this.cuervoGroup.add(cuervo);

        }

    }
    
  };

 Fuego.prototype.shootBullet = function() {
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;
    var bullet = this.bulletPool.getFirstDead();
    if (bullet === null || bullet === undefined) return;
    bullet.revive();
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    bullet.reset(this.gun.x, this.gun.y);
    bullet.rotation = this.gun.rotation;
    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
};
Fuego.prototype.getExplosion = function(x, y) {
    var explosion = this.explosionGroup.getFirstDead();
    if (explosion === null) {
        explosion = this.game.add.sprite(x, y, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);
        var animation = explosion.animations.add('boom', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 60, false);
        animation.killOnComplete = true;
        this.explosionGroup.add(explosion);
    }
    explosion.revive();
    explosion.x = x;
    explosion.y = y;
    explosion.angle = this.game.rnd.integerInRange(0, 360);
    explosion.animations.play('boom');
    return explosion;
};
  


  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Fuego = Fuego;

}());