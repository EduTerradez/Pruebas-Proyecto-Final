(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('player', 'assets/cabezon.png');
      
      this.load.image('sea', 'assets/sea.jpg');
      this.load.spritesheet('ship', 'assets/barco.png', 99, 75);
      this.load.spritesheet('personaje', 'assets/personaje.png', 30, 65);
      this.load.spritesheet('explosion', 'assets/boom.png', 128, 128);
      this.load.image('fuego', 'assets/islaFuego1.png');
      this.load.image('hielo', 'assets/islaHielo.png');
      this.load.image('tierra', 'assets/islaTierra1.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('periaptDerecho', 'assets/periaptDerecho.png');
      this.load.image('periaptReves', 'assets/periaptReves.png');
      this.load.image('ground', 'assets/factory.png');
      this.load.image('cavern', 'assets/cavern1.png');
      this.load.image('cannon', 'assets/bullet.png');
      this.load.image('bullet', 'assets/fireball.png');
      this.load.image('castle', 'assets/castillo.jpeg');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.tilemap('map', 'assets/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('ground_1x1', 'assets/ground_1x1.png');


    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('fuego');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Preloader = Preloader;

}());
