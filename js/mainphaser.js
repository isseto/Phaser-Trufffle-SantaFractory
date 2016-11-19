var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//Get Global Date
var date = new Date();
    userDate = date.getDate();
document.getElementById("userDate").innerHTML = userDate;
console.log("Current date: December " + userDate);


// BASEMAP Speed and Friction
var speedMult = 0.7;
var friction = 0.99

function preload() {
    
  game.load.image('map', 'assets/images/baseMap.png');
  game.load.image('star', 'assets/images/star.png');
  game.load.image('emptyBadge', 'assets/images/emptyBadge.png');
  game.load.spritesheet('dude', 'assets/sprites/SantaF_test1.png', 32, 48);
  game.load.atlasJSONHash('elfhat', 'assets/sprites/elfhat0.png', 'assets/sprites/elfhat0.json');
  game.load.atlasJSONHash('elfhat1', 'assets/sprites/elfhat1.png', 'assets/sprites/elfhat1.json');
  game.load.atlasJSONHash('elfhat2', 'assets/sprites/elfhat2.png', 'assets/sprites/elfhat2.json');
  game.load.atlasJSONHash('elfhat3', 'assets/sprites/elfhat3.png', 'assets/sprites/elfhat3.json');
  
  game.load.spritesheet('ms', 'assets/sprites/elfmotion.png', 400, 400, 120);
  
  //Audio
  // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
  game.load.audio('blop', ['assets/audio/blop.mp3', 'assets/audio/blop.wav']);

}//***End preload function

function create() {
  
  //WORLDMAP TEST
  // the big map to scroll
    this.scrollingMap = game.add.image(0, 0, "map");
    this.scrollingMap.anchor.set(0.05,0.5);
    // map will accept inputs
    this.scrollingMap.inputEnabled = true;
    // map can be dragged
    this.scrollingMap.input.enableDrag(false);
    // custom property: we save map position
    this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    // custom property: the map is not being dragged at the moment
    this.scrollingMap.isBeingDragged = false; 
    // custom property: map is not moving (or is moving at no speed)
    this.scrollingMap.movingSpeed = 0; 
    // map can be dragged only if it entirely remains into this rectangle
    this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);
    // when the player starts dragging...
    this.scrollingMap.events.onDragStart.add(function(){
         // set isBeingDragged property to true
         this.scrollingMap.isBeingDragged = true;
         // set movingSpeed property to zero. This will stop moving the map
         // if the player wants to drag when it's already moving
         this.scrollingMap.movingSpeed = 0;
    }, this);
    // when the player stops dragging...
    this.scrollingMap.events.onDragStop.add(function(){
         // set isBeingDragged property to false
         this.scrollingMap.isBeingDragged = false;
    }, this);
  
  
  //Create Single Star
  var star = game.add.sprite(200, 200, 'star');
  star.inputEnabled = true;
  star.input.useHandCursor = true;
  star.events.onInputDown.add(starClick, this); 
  
  //Testing Elf Spritesheet
  sprite = game.add.sprite(40, 100, 'ms');
  sprite.scale.setTo(0.16,0.16);
  sprite.animations.add('walk');
  sprite.animations.play('walk', 50, true);
  game.add.tween(sprite).to({ x: 300 }, 5000, Phaser.Easing.Linear.None, true);
  
  //Link Star sound to preload
  staraudio = game.add.audio('blop');
  
  //Create random Star group
  starGroup = game.add.group();
  //starGroup.create(0, 0, 'map');
  //  And add 10 sprites to it
  for (var i = 0; i < 10; i++)
  {starGroup.create(game.world.randomX, game.world.randomY, 'star');}
  //  Make them all input enabled
  starGroup.setAll('inputEnabled', true);
  starGroup.setAll('input.useHandCursor', true);
  // Call all in group
  //starGroup.callAll('events.onInputDown.add', 'events.onInputDown', removeStar);
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', starClick);
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', displayModal);
  //  And allow them all to be dragged
  //world.callAll('input.enableDrag', 'input');
  // Animate each Star to pulse scale
  starGroup.forEach(function(star) {
    star.anchor.set(0.5);
    game.add.tween(star.scale).to( {x:1.05, y:1.05}, 800, "Sine.easeInOut", true, 0, -1, true);
  }, this);
  
}//***End create function

function starClick (star) {
  this.staraudio.play('',0,1);

  starRemoveTweenA = game.add.tween(star.scale).to( { x:2, y:2 }, 800, "Elastic.easeOut");
  starRemoveTweenB = game.add.tween(star.scale).to( { x:0, y:0 }, 800, "Elastic");
  starRemoveTweenA.chain(starRemoveTweenB);
  starRemoveTweenA.start();
  //game.add.tween(star).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 0);
  //star.destroy();
  //game.time.events.add(2000, functionDestroy, this);
  game.time.events.add(1000, star.destroy, star);
  
}//***End removeStar function

function update() {
  
  //WORLDMAP TEST
  // if the map is being dragged...
    if(this.scrollingMap.isBeingDragged){
         // save current map position
         this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
    }
    // if the map is NOT being dragged...
    else{
         // if the moving speed is greater than 1...
         if(this.scrollingMap.movingSpeed > 1){
              // adjusting map x position according to moving speed and angle using trigonometry
              this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
              // adjusting map y position according to moving speed and angle using trigonometry
              this.scrollingMap.y += this.scrollingMap.movingSpeed * Math.sin(this.scrollingMap.movingangle);
              // keep map within boundaries
              if(this.scrollingMap.x < game.width - this.scrollingMap.width){
                   this.scrollingMap.x = game.width - this.scrollingMap.width;
              }
              // keep map within boundaries
              if(this.scrollingMap.x > 0){
                   this.scrollingMap.x = 0;
              }
              // keep map within boundaries
              if(this.scrollingMap.y < game.height - this.scrollingMap.height){
                   this.scrollingMap.y = game.height - this.scrollingMap.height;
              }
              // keep map within boundaries
              if(this.scrollingMap.y > 0){
                   this.scrollingMap.y = 0;
              }
              // applying friction to moving speed
              this.scrollingMap.movingSpeed *= friction;
              // save current map position
              this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
         }
         // if the moving speed is less than 1...
         else{
              // checking distance between current map position and last saved position
              // which is the position in the previous frame
              var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
              // same thing with the angle
              var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
              // if the distance is at least 4 pixels (an arbitrary value to see I am swiping)
              if(distance > 4){
                   // set moving speed value
                   this.scrollingMap.movingSpeed = distance * speedMult;
                   // set moving angle value
                   this.scrollingMap.movingangle = angle;
              }
         }
    }
  
  
}//***End update function

var modal = document.getElementById('modalCard');
var modalContent = document.getElementsByClassName('modal-content');
var modaltl = new TimelineMax();
modaltl
  .set(modal, {
    rotationX:90,
    transformPerspective: 100,
    transformStyle:"preserve-3d",
    transformOrigin:"50% 100%",
  })
  .set(modalContent, {
    y:300
  })
function displayModal() {
    modal.style.display = "block";
      modaltl
        .fromTo(modal, .5, {
          rotationX:90,
          transformPerspective: 100,
          transformStyle:"preserve-3d",
          transformOrigin:"50% 100%",
        },{
          rotationX:0, 
          ease: Back.easeOut.config(.8),
          delay:1
        })
        .fromTo(modalContent, .4, {y:300}, {y:0}, '-=.3')

    for (var i = 0; i < modalBtn.length; i++) {
        var thismodalBtn = modalBtn[i];
        thismodalBtn.addEventListener("click", function () {
            var modal = document.getElementById(this.dataset.modal);
            //modal.style.display = "block";
            modal.addEventListener("click", function () { modal.style.display = "none"; modal.removeEventListener("click"); });
        }, false);
    }
}
