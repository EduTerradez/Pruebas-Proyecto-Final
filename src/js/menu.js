(function() {
  'use strict';

  function Menu() {
    this.startTxt = null;
    this.titleTxt = null;
    this.textReflect = null;
  }

  Menu.prototype = {
    
    create: function () {
      this.background = this.game.add.tileSprite(0, 0, 1500, 900, 'background');
      this.buttonJugar = this.game.add.button(600, 700, 'jugar', function(){this.game.state.start('Islands')}, this, 0, 0, 0);
      this.buttonCreditos = this.game.add.button(900, 700, 'creditos', function(){this.game.state.start('creditos')}, this, 0, 0, 0);
     

    },

    update: function () {

  
    },

    
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Menu = Menu;

}());