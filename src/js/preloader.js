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
      
      this.load.image('sea', 'assets/cuarteado.png');
      this.load.spritesheet('ship', 'assets/barco.png', 99, 75);
      this.load.spritesheet('personaje', 'assets/personaje.png', 30, 65);
      this.load.spritesheet('explosion', 'assets/boom.png', 128, 128);
      this.load.spritesheet('lobo', 'assets/lobo2.png', 80.6, 70);
      this.load.spritesheet('oso', 'assets/oso.png', 61.6, 100);
      this.load.spritesheet('cuervo', 'assets/cuervo.png', 59.5, 60);
      this.load.spritesheet('dragon', 'assets/dragon.png', 135, 150);
      this.load.spritesheet('dragon2', 'assets/dragon2.png', 643, 632);
      this.load.spritesheet('vida', 'assets/vidas.png', 221, 158);

      this.load.image('dcannon', 'assets/dialogo_cannon.png');
      this.load.image('d1', 'assets/dialogos1.png')
      this.load.image('d2', 'assets/dialogos2.png')
      this.load.image('d3', 'assets/dialogos3.png')

      this.load.spritesheet('personajeTierra', 'assets/personajeTierra.png', 53, 99);
      this.load.image('dTierra', 'assets/dialogoTierra.png');
      this.load.tilemap('Final', 'assets/tiledFinal.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.tilemap('Tierra', 'assets/tiledTierra.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tierraTiles', 'assets/plataformasTierra.png');
      this.load.image('finalTiles', 'assets/plataformasFinal.png');

      this.load.image('background', 'assets/PORTADA.png');
      this.load.image('background2', 'assets/fondo_marino.png');
      this.load.image('pcreditos', 'assets/paginaCreditos.png');
      this.load.image('jugar', 'assets/botonJugar.png');
      this.load.image('creditos', 'assets/botonCreditos.png');
      this.load.image('volver', 'assets/botonVolver.png');
      this.load.image('rec1', 'assets/rec1.png');
      this.load.image('rec2', 'assets/rec2.png');
      this.load.image('fuego', 'assets/islaFuego1.png');
      this.load.image('hielo', 'assets/islaHielo.png');
      this.load.image('tierra', 'assets/islaTierra1.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('periaptDerecho', 'assets/periaptDerecho.png');
      this.load.image('periaptReves', 'assets/periaptReves.png');
      this.load.image('ground', 'assets/ground.png');
      this.load.image('cavern', 'assets/fondo.png');
      this.load.image('cannon', 'assets/bullet.png');
      this.load.image('bullet', 'assets/fireball.png');
      this.load.image('castle', 'assets/castillo.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
   
      
      this.load.image('ground_1x1', 'assets/ground_1x1.png');
      this.load.image('mariotiles', 'assets/super_mario.png');
      this.load.image('platformertiles', 'assets/platformer_tiles.png');
      this.load.image('madera', 'assets/madera.png');
      this.load.image('muralla', 'assets/muralla.png');
      this.load.image('cañon', 'assets/cañon.png');

      /*this.load.image('sea', 'assets/seax.jpg');
      this.load.spritesheet('ship', 'assets/barcox.png', 99, 75);
      this.load.spritesheet('personaje', 'assets/personaje.png', 30, 65);
      this.load.spritesheet('explosion', 'assets/boomx.png', 128, 128);
      this.load.spritesheet('momia', 'assets/momiax.png', 37, 45);
      this.load.spritesheet('zombie', 'assets/momiax.png', 128, 128);
      this.load.image('fuego', 'assets/islaFuego1.png');
      this.load.image('hielo', 'assets/islaHielo.png');
      this.load.image('tierra', 'assets/islaTierra1.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('periaptDerecho', 'assets/periaptDerecho.png');
      this.load.image('periaptReves', 'assets/periaptReves.png');
      this.load.image('ground', 'assets/groundx.png');
      this.load.image('cavern', 'assets/fondox.png');
      this.load.image('cannon', 'assets/bulletx.png');
      this.load.image('bullet', 'assets/fireballx.png');
      this.load.image('castle', 'assets/castillox.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.tilemap('map', 'assets/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.tilemap('map2', 'assets/tiledTierra.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('ground_1x1', 'assets/ground_1x1.png');
      this.load.image('mariotiles', 'assets/super_mario.png');
      this.load.image('platformertiles', 'assets/platformer_tiles.png');
      this.load.image('madera', 'assets/maderax.png');
      this.load.image('muralla', 'assets/murallax.png');
      this.load.image('cañon', 'assets/cañonx.png');
*/

    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Preloader = Preloader;

}());
