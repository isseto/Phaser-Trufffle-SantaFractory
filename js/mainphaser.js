var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//Get Global Date
var date = new Date();
    userDate = date.getDate();
document.getElementById("userDate").innerHTML = userDate;
console.log("Current date: December " + userDate);

// Get saved score
var starScore = localStorage.getItem('starScore');
var badgeScore = localStorage.getItem('badgeScore');
// If there is no highScore (game is started for the first time on this device) 
  if(starScore  === null) {
    localStorage.setItem('starScore', 0);    
    starScore = 0;
  }
  if(badgeScore  === null) {
    localStorage.setItem('badgeScore', 0);    
    badgeScore = 0;
  }
// Log saved score from local Storage
console.log('Last Save // Stars('+ localStorage.getItem("starScore") + '), Badges(' + localStorage.getItem("badgeScore") + ')')



// BASEMAP Speed and Friction
var speedMult = 0.7;
var friction = 0.99;

function preload() {
  //Spritesheet Guide
  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, 
  //  but in this case there are some blank frames at the end, so we tell the loader how many to load
  //game.load.spritesheet('ms', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

  
  //BACKGROUND IMAGES
  game.load.image('map', 'assets/images/baseMap/basemap_empty.png');
  game.load.image('infoBtn', 'assets/images/infoButton.png');
  //game.load.image('map', 'assets/images/baseMap_start.png');
  game.load.image('star', 'assets/images/star.png');
  game.load.image('emptybadge', 'assets/images/emptybadge.png');
  
  //LOCKS
  game.load.image('lockShadow', 'assets/images/locks/lockShadow.png');
  game.load.image('lockedLetter', 'assets/images/locks/locked_letter.png');
  game.load.spritesheet('badgeWin', 'assets/sprites/elf_badgeWin200100.png', 200, 100);
  
  // ROOMS
  game.load.image('RoomReception', 'assets/images/rooms/reception/reception.png');
  game.load.image('RoomLetter', 'assets/images/rooms/letter/letterRoom.png');
  
  //ELF SPRITESHEETS
  game.load.spritesheet('ms', 'assets/sprites/elfmotion2048.png', 170.7, 170.7, 100);
  //**Library
  game.load.spritesheet('desk', 'assets/sprites/rooms/library/LIBRARY_desk_200200.png', 200, 200);
  
  //AUDIO
  // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
  game.load.audio('blop', ['assets/audio/blop.mp3', 'assets/audio/blop.wav']);
  game.load.audio('lockwin', 'assets/audio/gamewin.mp3');
  game.load.audio('unlock', 'assets/audio/unlock.mp3');
  game.load.audio('badgewin', 'assets/audio/badgewin.mp3');
  game.load.audio('jinglebells', 'assets/audio/jinglebells.mp3');


}//***End preload function




function create() {

  //WORLDMAP TEST
  // the big map to scroll
    scrollingMap = game.add.image(0, 0, "map");
    scrollingMap.anchor.set(0.05,0.5);
    // map will accept inputs
    scrollingMap.inputEnabled = true;
    // map can be dragged
    scrollingMap.input.enableDrag(false);
    // custom property: we save map position
    scrollingMap.savedPosition = new Phaser.Point(scrollingMap.x, scrollingMap.y);
    // custom property: the map is not being dragged at the moment
    scrollingMap.isBeingDragged = false; 
    // custom property: map is not moving (or is moving at no speed)
    scrollingMap.movingSpeed = 0; 
    // map can be dragged only if it entirely remains into this rectangle
    scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - scrollingMap.width, game.height - scrollingMap.height, scrollingMap.width * 2 - game.width, scrollingMap.height * 2 - game.height);
    // when the player starts dragging...
    scrollingMap.events.onDragStart.add(function(){
         // set isBeingDragged property to true
         scrollingMap.isBeingDragged = true;
         // set movingSpeed property to zero. This will stop moving the map
         // if the player wants to drag when it's already moving
         scrollingMap.movingSpeed = 0;
    }, this);
    // when the player stops dragging...
    scrollingMap.events.onDragStop.add(function(){
         // set isBeingDragged property to false
         scrollingMap.isBeingDragged = false;
    }, this);
  
  
  //*** Setting Rooms
  //Add Letter room
  RoomLetter = game.add.sprite(700, 310, 'RoomLetter')
    RoomLetter.anchor.set(0.5);
    RoomLetter.alpha = 0;
    scrollingMap.addChild(RoomLetter);
  // Clone bounds from letter room sprite
  var roomBounds1 = Phaser.Rectangle.clone(RoomLetter);
  RoomReception = game.add.image(210, 232, 'RoomReception')
    scrollingMap.addChild(RoomReception);
  // Make bounds from polygon around letter room
  polyLetter = new Phaser.Polygon([ new Phaser.Point(625, 140), new Phaser.Point(1055, 390), new Phaser.Point(780, 550), new Phaser.Point(350, 300) ]);
    boundsLetter = game.add.graphics(0,0);
    boundsLetter.lineStyle(4, 0xffd900, 1);
    boundsLetter.drawPolygon(polyLetter.points);
    scrollingMap.addChild(boundsLetter);
  
  
  //*** Creating Lock Group
  var lockGroup = game.add.group();
  // Adding lockGroup to Map
  scrollingMap.addChild(lockGroup);
  //  Make Lock all input enabled
  lockGroup.setAll('inputEnabled', true);
  lockGroup.setAll('input.useHandCursor', true);
  // Animate each Lock to pulse scale
  
  //Creating 10 locks one by one
  //lockShadow = game.add.sprite(695,368, 'lockShadow');
    //lockShadow.anchor.set(0.5);
    //lockShadow.scale.setTo(.7);
  locked_one = game.add.sprite(695,350, 'lockedLetter');
    locked_one.anchor.set(0.5, 1);
    locked_one.scale.setTo(1.2,1.2);
    //Add locked_one to lockGroup  
    lockGroup.addChild(locked_one);
    locked_one.inputEnabled = true;
    locked_one.input.useHandCursor = true;
    //locked_one.events.onInputDown.add(openBadge, this);
    //Animating single lock for now
    lockedTween = game.add.tween(locked_one)
      lockedTween.to( {y:360}, 600, Phaser.Easing.Out, true, 0, -1, true);
    //lockShadowTween = game.add.tween(lockShadow.scale)
      //lockShadowTween.to( {x:.9}, 600, Phaser.Easing.Out, true, 0, -1, true);
  
  //Preparing unlock sound
  unlockSound = game.add.audio('unlock');
  winSound = game.add.audio('lockwin');
  //On Click event 
  lockGroup.callAll('events.onInputDown.add', 'events.onInputDown', unlockEvent);
  
  // Badge Win Sprite Animation
  badgeWinSprite = game.add.sprite(game.world.centerX, game.world.centerY - 50, 'badgeWin');
  badgeWinSprite.anchor.set(0.5);
  badgeWinSprite.scale.setTo(4);
  badgeWinSprite.alpha = 0;
  badgeWinSprite.animations.add('badgeWinSprite_anim');
  badgeWinSprite.animations.play('badgeWinSprite_anim', 25, true);
  
  //*** Creating Stars
  //Link Star sound to preload
  staraudio = game.add.audio('blop');
  //Create random Star group
  starGroup = game.add.group();
  scrollingMap.addChild(starGroup);
  //  And add 3 sprites to it
  for (var i = 0; i < 3; i++)
  {starGroup.create(boundsLetter.randomX, boundsLetter.randomY, 'star');}
  //  Make them all input enabled
  starGroup.setAll('inputEnabled', true);
  starGroup.setAll('input.useHandCursor', true);
  // Animate each Star to pulse scale
  starGroup.forEach(function(star) {
    star.anchor.set(0.5);
    game.add.tween(star.scale).to( {x:1.05, y:1.05}, 800, "Sine.easeInOut", true, 0, -1, true);
  }, this);
  // Animate and destroy on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', collectStar);
  // Open modal on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', displayModal);
  
  
  // Elf Spritesheets
  library_desk_s = game.add.sprite(370, 130, 'desk');
  library_desk_s.scale.setTo(0.55,0.55);
  library_desk_s.animations.add('library_desk_anim');
  library_desk_s.animations.play('library_desk_anim', 25, true);
  scrollingMap.addChild(library_desk_s);
  
  //** Adding Info Button
  infoBtn = game.add.sprite(477,443, 'infoBtn');
    infoBtn.anchor.set(0.5, 1);
    infoBtn.scale.setTo(1.2,1.2);
    //Add locked_one to scrollingMap  
    scrollingMap.addChild(infoBtn);
    infoBtn.inputEnabled = true;
    infoBtn.input.useHandCursor = true;
    //Animating single lock for now
    infoBtnTween = game.add.tween(infoBtn)
      infoBtnTween.to( {y:448}, 1200, Phaser.Easing.Out, true, 0, -1, true);
  infoBtn.events.onInputDown.add(infoBtnModal, this);
  infoBtn.events.onInputDown.add(displayModal, this);
  
  
}//***End create function

//Info Button click
function infoBtnModal() {
  infoBtnTweenA = game.add.tween(infoBtn.scale).to( { x:1.4, y:1.4 }, 500, "Elastic.easeOut");
  infoBtnTweenB = game.add.tween(infoBtn.scale).to( { x:1.2, y:1.2 }, 500, "Elastic.easeOut");
  infoBtnTweenA.chain(infoBtnTweenB);
  infoBtnTweenA.start();
}

//Unlock Event for daily Locks
function unlockEvent(locked_one, roomBounds1) {
  // Play star pop sound
  this.unlockSound.play('',0,1);
  this.winSound.play('',0,1);
  
  //Stop bouncing tween
  unlockTweenA = game.add.tween(locked_one.scale).to( { x:.95, y:.95 }, 500, "Elastic.easeOut");
  unlockTweenB = game.add.tween(locked_one.scale).to( { x:2, y:2 }, 800, "Elastic.easeOut");
  unlockTweenC = game.add.tween(locked_one.scale).to( { x:0, y:0 }, 800, "Elastic");
  unlockTweenA.chain(unlockTweenB, unlockTweenC);
  unlockTweenA.start();
  // Add a timer before destroying star
  game.time.events.add(2000, locked_one.destroy, locked_one);
  
  // Room drop down animation tween
  RoomLetter.alpha = 1;
  roomDropTweenA = game.add.tween(RoomLetter).from( { y:10 }, 1100, "Elastic.easeOut");
  roomDropTweenA.start();
  
  //  And add 3 sprites to it
  for (var i = 0; i < 3; i++)
  {starGroup.create( roomBounds1.randomX, roomBounds1.randomY, 'star');}
  starGroup.forEach(makeStarClick);
}

//Make stars clickable and animated
function makeStarClick() {
  starGroup.setAll('inputEnabled', true);
  starGroup.setAll('input.useHandCursor', true);
  // Animate each Star to pulse scale
  starGroup.forEach(function(star) {
    star.anchor.set(0.5);
    game.add.tween(star.scale).to( {x:1.05, y:1.05}, 800, "Sine.easeInOut", true, 0, -1, true);
  }, this);
  // Animate and destroy on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', collectStar);
  // Open modal on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', displayModal);
}

//Star click animation and destroy
function collectStar (star) {
  // Play star pop sound
  this.staraudio.play('',0,1);

  // Add animation to star before destroying
  starRemoveTweenA = game.add.tween(star.scale).to( { x:2, y:2 }, 800, "Elastic.easeOut");
  starRemoveTweenB = game.add.tween(star.scale).to( { x:0, y:0 }, 800, "Elastic");
  starRemoveTweenA.chain(starRemoveTweenB);
  starRemoveTweenA.start();
  
  // Add a timer before destroying star
  game.time.events.add(1000, star.destroy, star);
  
  // Add and update the score
  starScore = JSON.parse(localStorage.getItem('starScore'));
  badgeScore = JSON.parse(localStorage.getItem('badgeScore'));
  
  // Add 10 to starScore var
  starScore += 10;
  // Add new score to console
  console.log('+10 ! new Stars (' + starScore + ')')
    
  // Check for Badges
  if(starScore % 3 == 0) {
    badgeScore += 1;   
    
    // Play badge win audio
    badgewin.play('',0,1);
    jinglebells.play('',0,1);
    badgeWinSprite.alpha = 1;
    console.log('Holy! You got a new badge! You now have ' + badgeScore + ' badges.')
  }
  
  // Update new score to localStorage
  localStorage.setItem("starScore", JSON.stringify(starScore));
  localStorage.setItem("badgeScore", JSON.stringify(badgeScore));
  // Console log new stored score
  console.log(
    'Saved Stars (' 
    + localStorage.getItem("starScore") 
    + '), Badges (' 
    + localStorage.getItem("badgeScore") 
    + ') !')
  
}//***End collectStar function


function update() {
  
  //WORLDMAP TEST
  // if the map is being dragged...
    if(scrollingMap.isBeingDragged){
         // save current map position
         scrollingMap.savedPosition = new Phaser.Point(scrollingMap.x, scrollingMap.y);
    }
    // if the map is NOT being dragged...
    else{
         // if the moving speed is greater than 1...
         if(scrollingMap.movingSpeed > 1){
              // adjusting map x position according to moving speed and angle using trigonometry
              scrollingMap.x += scrollingMap.movingSpeed * Math.cos(scrollingMap.movingangle);
              // adjusting map y position according to moving speed and angle using trigonometry
              scrollingMap.y += scrollingMap.movingSpeed * Math.sin(scrollingMap.movingangle);
              // keep map within boundaries
              if(scrollingMap.x < game.width - scrollingMap.width){
                   scrollingMap.x = game.width - scrollingMap.width;
              }
              // keep map within boundaries
              if(scrollingMap.x > 0){
                   scrollingMap.x = 0;
              }
              // keep map within boundaries
              if(scrollingMap.y < game.height - scrollingMap.height){
                   scrollingMap.y = game.height - scrollingMap.height;
              }
              // keep map within boundaries
              if(scrollingMap.y > 0){
                   scrollingMap.y = 0;
              }
              // applying friction to moving speed
              scrollingMap.movingSpeed *= friction;
              // save current map position
              scrollingMap.savedPosition = new Phaser.Point(scrollingMap.x, scrollingMap.y);
         }
         // if the moving speed is less than 1...
         else{
              // checking distance between current map position and last saved position
              // which is the position in the previous frame
              var distance = scrollingMap.savedPosition.distance(scrollingMap.position);
              // same thing with the angle
              var angle = scrollingMap.savedPosition.angle(scrollingMap.position);
              // if the distance is at least 4 pixels (an arbitrary value to see I am swiping)
              if(distance > 4){
                   // set moving speed value
                   scrollingMap.movingSpeed = distance * speedMult;
                   // set moving angle value
                   scrollingMap.movingangle = angle;
              }
         }
    }
  
  
}//***End update function



//*** Modals Animation
var modal = document.getElementById('modalCard');
var infoModal = document.getElementById('infoModalCard');
var modalContent = document.getElementsByClassName('modal-content');
var modaltl = new TimelineMax();
modaltl
  .set(modal, {
    rotationX:90,
    transformPerspective: 100,
    transformStyle:"preserve-3d",
    transformOrigin:"50% 100%",
  })
  .set(infoModal, {
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
