(function() {
  'use strict';

  function Menu() {
    this.startTxt = null;
    this.titleTxt = null;
    this.textReflect = null;
  }

  Menu.prototype = {
    
    create: function () {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      
      this.titleTxt = this.game.add.sprite(this.game.world.centerX - 150.5, 100, 'periaptDerecho');
      this.textReflect = this.game.add.sprite(this.game.world.centerX -150.5, 800, 'periaptReves');
      // Le restamos 191.5 porque es la mitad de lo que mide la imgaen de 'PERIAPT'

      this.game.physics.enable([this.titleTxt, this.textReflect], Phaser.Physics.ARCADE);

      this.titleTxt.enablebody = true;
      this.textReflect.enablebody = true;
  
      
      this.titleTxt.body.collideWorldBounds = true;
      this.textReflect.body.collideWorldBounds = true;
      
      
      this.titleTxt.body.bounce.set(0.4);
      this.textReflect.body.bounce.set(0.4);

      this.titleTxt.body.gravity.set(0, 180);
      this.textReflect.body.gravity.set(0, -180);

      



      this.startTxt = this.game.add.text(this.game.world.centerX - 50, 650, "Press Enter to start!");
      // Le restamos 191.5 porque es la mitad de lo que mide el texto

      //  Centrar texto
      /*this.startTxt.anchor.set(0.5);
      this.startTxt.align = 'center';*/

      //  Fuente
      this.startTxt.font = 'Arial';
      this.startTxt.fontWeight = 'bold';
      this.startTxt.fontSize = 20;
      this.startTxt.fill = '#ffffff';


    },

    update: function () {

      this.game.physics.arcade.collide(this.titleTxt, this.textReflect);
      
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
    	  this.game.state.start('Islands');
        }
    },

    
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Menu = Menu;

}());