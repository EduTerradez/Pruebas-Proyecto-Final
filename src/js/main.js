window.onload = function () {
  'use strict';

  var game
    , ns = window['pruebitaswey'];

  game = new Phaser.Game(1500, 900, Phaser.AUTO, 'pruebitaswey-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('Islands', ns.Islands);
  game.state.add('game', ns.Game);
  game.state.add('menu', ns.Menu);
  game.state.add('fuego', ns.Fuego);
  game.state.add('creditos', ns.Creditos);

  game.state.start('boot');
};
