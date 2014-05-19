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
    this.GRAVITY = 980;

    
    this.wave1active = true;
    this.wave2 = false;
    this.wave3 = false;
    this.wave4 = false; 
    this.wave5 = false;
    this.wave6 = false;  
    //Elementos
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
                if(Math.abs(lobo.body.x - bullet.x) <= 64){
                    lobo.kill();
                }
            },this);

            bullet.kill();
        }, null, this);


        this.game.physics.arcade.collide(this.bulletPool, this.wall);
        this.game.physics.arcade.collide(this.bulletPool, this.bulletPool);
        this.game.physics.arcade.collide(this.ground, this.wall);
        this.game.physics.arcade.collide(this.ground, this.loboGroup);
        this.game.physics.arcade.collide(this.ground, this.cuervoGroup);
        this.game.physics.arcade.collide(this.ground, this.osoGroup);
        
        
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
        //this.game.time.events.add(Phaser.Timer.SECOND * 4, this.wave1, this);

        /*if(this.p){   var lobo = this.game.add.sprite(900 , 700, 'lobo');
        this.game.physics.enable(lobo, Phaser.Physics.ARCADE);
        lobo.body.velocity.x = -50; var animation = lobo.animations.add('move',[0,1,2,3] ,6, true); lobo.animations.play('move');this.loboGroup.add(lobo);
        } 
        this.p = false;*/
        //this.momiaGroup.forEach(function(lobo){lobo.animations.play('move');})
        //Math.floor((Math.random() * 10) + 1);
        //game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
    },

    wave1a: function(){
        console.log("Hola");
        //this.addLobos(5);
        this.addOsos(6);
        this.wave1active = false;

    },

    addLobos: function(number){
        for(var i = 0;i < number;i++){
              var lobo = this.game.add.sprite(1500 , 600, 'lobo');
              this.game.physics.enable(lobo, Phaser.Physics.ARCADE);
              lobo.body.velocity.x = -(Math.floor((Math.random() * 100) + 50));
              var animation = lobo.animations.add('move', [0,1,2,3,4] ,6, true);
              lobo.animations.play('move');
              this.loboGroup.add(lobo);

        }
        console.log("lobo");

    },
     addOsos: function(number){
        for(var i = 0;i < number;i++){
              var oso = this.game.add.sprite(1500 , 600, 'oso');
              this.game.physics.enable(oso, Phaser.Physics.ARCADE);
              oso.body.velocity.x = -(Math.floor((Math.random() * 100) + 50));
              var animation = oso.animations.add('move', [0,1,2,3] ,6, true);
              oso.animations.play('move');
              this.osoGroup.add(oso);

        }
        console.log("lobo");

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