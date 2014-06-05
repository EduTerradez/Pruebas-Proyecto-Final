(function() {
  'use strict';

  function Agua() {
    
  }

  Agua.prototype = {
    
    create: function () {
      this.background = this.game.add.tileSprite(0, 0, 1500, 900, 'background2');
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.gameStart = false;
      //player
      this.player = this.game.add.sprite(100 ,200,'nadador');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      //this.player.body.allowGravity = false;
       
      var animation = this.player.animations.add('move', [0,1,3] ,5, true);
      this.player.animations.play('move');
      //dragon
      this.dialogo = this.game.add.sprite(600, 100, 'dmarino');
      this.dragon = this.game.add.sprite(1000, 100, 'dragon');
      this.game.physics.enable(this.dragon, Phaser.Physics.ARCADE);
      this.dragon.body.allowGravity = false;
      var animation = this.dragon.animations.add('move', [0,1,2] ,10, true);
      this.dragon.animations.play('move');

      //Peces
      this.pezGroup = this.game.add.group();
      this.pezGroup.forEachAlive(function(pez){
                if(pez.body.x === 0){
                    pez.kill();
                    this.addPeces(1);
                }
            },this);


      this.pezEspadaGroup = this.game.add.group();
      this.tiburonGroup = this.game.add.group();
     
      

      var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.salto, this); 


      

      this.t1 = true;
      this.t2 = false;
      
    },

    update: function () {
       if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
          this.dialogo.kill();
          this.dragon.body.velocity.y = -400;
          this.gameStart = true;
        }


      if(this.gameStart){
      this.game.time.events.add(Phaser.Timer.SECOND * 120, this.out, this);
      this.player.body.gravity.y = 1000;
      this.background.tilePosition.x -= 3;
      

      if (this.player.inWorld == false){
        this.out();
         }
         
         if(this.t1){
         this.addPeces(7);
          this.addTiburon(2);
          this.t1 = false;
      }
      if(this.t2){
         this.addPeces(8);
          this.addTiburon(2);
          this.t2 = false;
      }
    }
    },

    addPeces: function(number){
    
        for(var i = 0;i < number;i++){
              var y = Math.floor((Math.random() * 800) + 100);
              var pez = this.game.add.sprite(1500 , y, 'pez');
              this.game.physics.enable(pez, Phaser.Physics.ARCADE); 
              pez.body.velocity.x = -(Math.floor((Math.random() * 200) + 50));
              var animation = pez.animations.add('move', [0,1,2,3] ,10, true);
              pez.animations.play('move');
              this.pezGroup.add(pez);

        
        }
    },
    addTiburon: function(number){
    
        for(var i = 0;i < number;i++){
              var y = Math.floor((Math.random() * 800) + 100);
              var pez = this.game.add.sprite(1500 , y, 'tiburon');
              this.game.physics.enable(pez, Phaser.Physics.ARCADE); 
              pez.body.velocity.x = -(Math.floor((Math.random() * 150) + 50));
              var animation = pez.animations.add('move', [0,3,5] ,3, true);
              pez.animations.play('move');
              this.tiburonGroup.add(pez);

        
        }
    },

    salto: function(){
      this.player.body.velocity.y -= 500;

    },
    out: function(){
      this.game.state.start('Islands');
    },
    render: function() {

    this.game.debug.text("Tiempo restante: " + this.game.time.events.duration, 500, 32);

  }
    
  };

  window['pruebitaswey'] = window['pruebitaswey'] || {};
  window['pruebitaswey'].Agua = Agua;

}());