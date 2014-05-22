(function() {
  'use strict';

  function Creditos() {
  
  }

  Creditos.prototype = {
    
    create: function () {
      this.background = this.game.add.tileSprite(0, 0, 1500, 900, 'pcreditos');
      this.buttonVolver = this.game.add.button(650, 700, 'volver', function(){this.game.state.start('menu')}, this, 0, 0, 0);

    },

    update: function () {

     
    },

    
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Creditos = Creditos;

  }());
