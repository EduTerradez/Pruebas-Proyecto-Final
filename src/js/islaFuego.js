(function() {
  'use strict';

  function Fuego() {

  }

  Fuego.prototype = {
    
    create: function () {
       this.background = this.game.add.tileSprite(0, 0, 1500, 900, 'cavern');

    this.SHOT_DELAY = 700; 
    this.BULLET_SPEED = 1100; 
    this.NUMBER_OF_BULLETS = 20;
    this.GRAVITY = 980; 

    this.gun = this.game.add.sprite(350, 700, 'cannon');
    this.gun.anchor.setTo(0.5, 0.5);
    this.castle = this.game.add.sprite(-90, 355,'castle');
    // Balas
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);
        bullet.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.kill();
      }

    this.game.physics.arcade.gravity.y = this.GRAVITY;

    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }


    this.explosionGroup = this.game.add.group();

    
    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2 - 100;

    //this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
    },

    update: function () {

    // Check if bullets have collided with the ground
    this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
        // Create an explosion
        this.getExplosion(bullet.x, bullet.y);

        // Kill the bullet
        bullet.kill();
    }, null, this);

    // Rotate all living bullets to match their trajectory
    this.bulletPool.forEachAlive(function(bullet) {
        bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
    }, this);

    // Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);

    // Shoot a bullet
    if (this.game.input.activePointer.isDown) {
        this.shootBullet();
    }
      
    },

    
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