var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function introModalOpen(){};

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
    
    introModalOpen(this);//send request
    document.getElementById("infoModal").style.display = "block";
  } else {
    document.getElementById("infoModal").style.display = "none";
  }
  if(badgeScore  === null) {
    localStorage.setItem('badgeScore', 0);    
    badgeScore = 0;
  }
// Log saved score from local Storage
console.log('Last Save // Stars('+ localStorage.getItem("starScore") + '), Badges(' + localStorage.getItem("badgeScore") + ')')

//Clearing score
//localStorage.clear()
//starScore = 20;

//Saving Opened Rooms
// Get saved data
var openRoomLetter = localStorage.getItem('openRoomLetter');
// If there is previous data 
  if(openRoomLetter  === null) {
    localStorage.setItem('openRoomLetter', 0);    
    openRoomLetter = 0;
    
    RoomLetterHidden(this);
  } else (
    RoomLetterShown(this)
  )
console.log('Last Rooms You Saved // '+ localStorage.getItem("openRoomLetter"))

var openRoomLibrary = localStorage.getItem('openRoomLibrary');
// If there is previous data 
  if(openRoomLibrary  === null) {
    localStorage.setItem('openRoomLibrary', 0);    
    openRoomLibrary = 0;
    
    RoomLibraryHidden(this);
  } else (
    RoomLibraryShown(this)
  )
console.log('Last Rooms You Saved // '+ localStorage.getItem("openRoomLibrary"))


// BASEMAP Speed and Friction
var speedMult = 0.7;
var friction = 0.99;


function preload() {
  //Spritesheet Guide
  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, 
  //  but in this case there are some blank frames at the end, so we tell the loader how many to load
  //game.load.spritesheet('ms', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

  
  //***** BACKGROUND IMAGES
  game.load.image('map', 'assets/images/basemap/basemap_empty.png');
  game.load.image('infoBtn', 'assets/images/infoButton.png');
  //game.load.image('map', 'assets/images/baseMap_start.png');
  game.load.image('star', 'assets/images/star.png');
  game.load.image('emptybadge', 'assets/images/emptybadge.png');
  
  //***** LOCKS
  game.load.image('lockShadow', 'assets/images/locks/lockShadow.png');
  //Locked
  game.load.image('lockToy', 'assets/images/locks/lock_toy.png');
  game.load.image('lockLibrary', 'assets/images/locks/lock_library.png');
  game.load.image('lockLab', 'assets/images/locks/lock_lab.png');
  game.load.image('lockCook', 'assets/images/locks/lock_cook.png');
  game.load.image('lockStats', 'assets/images/locks/lock_stats.png');
  game.load.image('lockWarehouse', 'assets/images/locks/lock_warehouse.png');
  game.load.image('lockGreenhouse', 'assets/images/locks/lock_greenhouse.png');
  game.load.image('lockReindeer', 'assets/images/locks/lock_reindeer.png');
  game.load.image('lockLaunchpad', 'assets/images/locks/lock_launchpad.png');
  //Unlocked
  game.load.image('lockedLetter', 'assets/images/locks/locked_100x100.png');
  game.load.image('unlockedLibrary', 'assets/images/locks/unlocked_library.png');
  
  //***** ROOMS
  //General
  game.load.spritesheet('generalStanding', 'assets/images/rooms/general/general_standing_200200.png', 200, 200);
  game.load.spritesheet('generalBack', 'assets/images/rooms/general/general_back_7045.png', 70, 45);
  //Reception
  game.load.image('RoomReception', 'assets/images/rooms/reception/reception.png');
  game.load.spritesheet('receptionBlackboard', 'assets/images/rooms/reception/reception_blackboard_7045.png', 70, 45);
  game.load.spritesheet('receptionSchoolChair1', 'assets/images/rooms/reception/reception_schoolChair1_5545.png', 55, 45);
  game.load.spritesheet('receptionSchoolChair2', 'assets/images/rooms/reception/reception_schoolChair1_5545.png', 55, 45);
  //LetterRoom
  game.load.image('RoomLetter', 'assets/images/rooms/letter/letterroom.png');
  //game.load.image('RoomLetter', 'assets/images/rooms/letter/letterroom_withanimation.png');
  game.load.spritesheet('letterAnimMailbox', 'assets/images/rooms/letter/letterroom_mailbox_120120.png', 120, 120);
  game.load.image('letterPouchGroup', 'assets/images/rooms/letter/pouchgroup.png');
  game.load.image('letterpouch1', 'assets/images/rooms/letter/pouch1.png');
  game.load.image('letterpouch2', 'assets/images/rooms/letter/pouch2.png');
  game.load.image('letterpouch3', 'assets/images/rooms/letter/pouch3.png');
  game.load.spritesheet('letterFire', 'assets/images/rooms/letter/letterroom_fire_2225.png', 22, 25);
  game.load.spritesheet('letterScript', 'assets/images/rooms/letter/letterroom_script_11080.png', 110, 80);
  game.load.spritesheet('letterThrow', 'assets/images/rooms/letter/letterroom_letterthrow_8080.png', 80, 80);
  game.load.spritesheet('letterFloor', 'assets/images/rooms/letter/letterroom_floorletters_8050.png', 80, 50);
  game.load.spritesheet('letterGrab', 'assets/images/rooms/letter/letterroom_lettergrab_5050.png', 50, 50);
  game.load.spritesheet('letterSorting', 'assets/images/rooms/letter/letterroom_sortingtable_130100.png', 130, 100);
  game.load.spritesheet('santaChair', 'assets/images/rooms/letter/letterroom_santachair_7070.png', 70, 70);
  //Library
  game.load.image('RoomLibrary', 'assets/images/rooms/library/library.png');
  game.load.spritesheet('librarySorting', 'assets/images/rooms/library/library_desk_200200.png', 200, 200);
  game.load.spritesheet('libraryShelf', 'assets/images/rooms/library/library_shelfbook_200200.png', 200, 200);
  game.load.spritesheet('libraryGlobe', 'assets/images/rooms/library/library_globe_200200.png', 200, 200);
  game.load.spritesheet('libraryBigBook', 'assets/images/rooms/library/library_bigbook_200200.png', 200, 200);
  
  //***** ELF SPRITESHEETS
  game.load.spritesheet('ms', 'assets/sprites/elfmotion2048.png', 170.7, 170.7, 100);
  //**Library
  game.load.spritesheet('desk', 'assets/sprites/rooms/library/LIBRARY_desk_200200.png', 200, 200);
  
  //***** AUDIO
  // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
  game.load.audio('blop', ['assets/audio/blop.mp3', 'assets/audio/blop.wav']);
  game.load.audio('lockwin', 'assets/audio/gamewin.wav');
  game.load.audio('unlock', 'assets/audio/unlock.mp3');
  //game.load.audio('badgewin', 'assets/audio/badgewin.mp3');
  //game.load.audio('jinglebells', 'assets/audio/jinglebells.mp3');
  game.load.audio('woohoo', 'assets/audio/woohoo.mp3');
  game.load.audio('chime', 'assets/audio/chimes.mp3');


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
  
  
  //***** Adding LOCKED Locks
  lockToy = game.add.sprite(1000, 90, 'lockToy'); 
    lockToy.anchor.set(0.5);
    lockToy.scale.setTo(.6,.6);
    scrollingMap.addChild(lockToy);
  
  //lockLibrary = game.add.sprite(320, 110, 'lockLibrary'); 
    //lockLibrary.anchor.set(0.5);
    //lockLibrary.scale.setTo(.6,.6);
    //scrollingMap.addChild(lockLibrary);
  
  lockLab = game.add.sprite(1600, 280, 'lockLab'); 
    lockLab.anchor.set(0.5);
    lockLab.scale.setTo(.6,.6);
    scrollingMap.addChild(lockLab);
  
  lockCook = game.add.sprite(1200, 520, 'lockCook'); 
    lockCook.anchor.set(0.5);
    lockCook.scale.setTo(.6,.6);
    scrollingMap.addChild(lockCook);
  
  lockStats = game.add.sprite(590, -115, 'lockStats'); 
    lockStats.anchor.set(0.5);
    lockStats.scale.setTo(.6,.6);
    scrollingMap.addChild(lockStats);
  
  lockGreenhouse = game.add.sprite(1950, 65, 'lockGreenhouse'); 
    lockGreenhouse.anchor.set(0.5);
    lockGreenhouse.scale.setTo(.6,.6);
    scrollingMap.addChild(lockGreenhouse);
  
  lockWarehouse = game.add.sprite(1550, -165, 'lockWarehouse'); 
    lockWarehouse.anchor.set(0.5);
    lockWarehouse.scale.setTo(.6,.6);
    scrollingMap.addChild(lockWarehouse);
  
  lockReindeer = game.add.sprite(1080, -350, 'lockReindeer'); 
    lockReindeer.anchor.set(0.5);
    lockReindeer.scale.setTo(.6,.6);
    scrollingMap.addChild(lockReindeer);
  
  lockLaunchpad = game.add.sprite(1340, -500, 'lockLaunchpad'); 
    lockLaunchpad.anchor.set(0.5);
    lockLaunchpad.scale.setTo(.6,.6);
    scrollingMap.addChild(lockLaunchpad);
  
  
  //***** Setting Rooms
  //Library
  RoomLibrary = game.add.sprite(-8, -300, 'RoomLibrary')
    scrollingMap.addChild(RoomLibrary);
  roomBoundsLibrary = Phaser.Rectangle.clone(RoomLibrary);
  
  librarySorting = game.add.sprite(380, 440, 'librarySorting');
    librarySorting.scale.setTo(0.5, 0.5);
    librarySorting.animations.add('librarySorting_anim');
    librarySorting.animations.play('librarySorting_anim', 25, true);  
    RoomLibrary.addChild(librarySorting);
  
  libraryShelf = game.add.sprite(163, 258, 'libraryShelf');
    libraryShelf.scale.setTo(0.5, 0.5);
    libraryShelf.animations.add('libraryShelf_anim');
    libraryShelf.animations.play('libraryShelf_anim', 25, true);  
    RoomLibrary.addChild(libraryShelf);
  
  libraryGlobe = game.add.sprite(315, 470, 'libraryGlobe');
    libraryGlobe.scale.setTo(0.5, 0.5);
    libraryGlobe.animations.add('libraryGlobe_anim');
    libraryGlobe.animations.play('libraryGlobe_anim', 25, true);  
    RoomLibrary.addChild(libraryGlobe);
  
  libraryBack = game.add.sprite(275, 380, 'generalBack');
    libraryBack.animations.add('libraryBack_anim');
    libraryBack.animations.play('libraryBack_anim', 25, true);  
    RoomLibrary.addChild(libraryBack);
  
  libraryBigBook = game.add.sprite(410, 290, 'libraryBigBook');
    libraryBigBook.scale.setTo(0.5, 0.5);
    libraryBigBook.animations.add('libraryBigBook_anim');
    libraryBigBook.animations.play('libraryBigBook_anim', 25, true);  
    RoomLibrary.addChild(libraryBigBook);
  
  //****
  RoomLetter = game.add.sprite(350, 73, 'RoomLetter')
  scrollingMap.addChild(RoomLetter);
  // Clone bounds from letter room sprite
  roomBounds1 = Phaser.Rectangle.clone(RoomLetter);
  // LETTER ROOM ANIMATIONS
  //Mailbox Animations
  letterAnimMailbox = game.add.sprite(30, 137, 'letterAnimMailbox');
  letterAnimMailbox.animations.add('letterAnimMailbox_anim');
  letterAnimMailbox.animations.play('letterAnimMailbox_anim', 25, true);  
  RoomLetter.addChild(letterAnimMailbox);
  letterPouchGroup = game.add.image(105, 225, 'letterPouchGroup')
    RoomLetter.addChild(letterPouchGroup);
  
  letterFire = game.add.sprite(563, 230, 'letterFire');
    letterFire.animations.add('letterFire_anim');
    letterFire.animations.play('letterFire_anim', 25, true);  
    RoomLetter.addChild(letterFire);
  
  lettergeneralStanding = game.add.sprite(500, 130, 'generalStanding');
    lettergeneralStanding.scale.setTo(-0.55, .55);
    lettergeneralStanding.animations.add('lettergeneralStanding_anim');
    lettergeneralStanding.animations.play('lettergeneralStanding_anim', 25, true);  
    RoomLetter.addChild(lettergeneralStanding);
  
  letterScript = game.add.sprite(440, 328, 'letterScript');
    letterScript.animations.add('letterScript_anim');
    letterScript.animations.play('letterScript_anim', 25, true);  
    RoomLetter.addChild(letterScript);
  
  letterThrow = game.add.sprite(235, 35, 'letterThrow');
    letterThrow.animations.add('letterThrow_anim');
    letterThrow.animations.play('letterThrow_anim', 25, true);  
    RoomLetter.addChild(letterThrow);
  
  letterGrab = game.add.sprite(420, 295, 'letterGrab');
    letterGrab.animations.add('letterGrab_anim');
    letterGrab.animations.play('letterGrab_anim', 25, true);  
    RoomLetter.addChild(letterGrab);
  
  letterSorting = game.add.sprite(350, 354, 'letterSorting');
    letterSorting.animations.add('letterSorting_anim');
    letterSorting.animations.play('letterSorting_anim', 25, true);  
    RoomLetter.addChild(letterSorting);
  
  letterFloor = game.add.sprite(200, 300, 'letterFloor');
    letterFloor.animations.add('letterFloor_anim');
    letterFloor.animations.play('letterFloor_anim', 25, true);  
    RoomLetter.addChild(letterFloor);
  
  santaChair = game.add.sprite(513, 253, 'santaChair');
    santaChair.animations.add('santaChair_anim');
    santaChair.animations.play('santaChair_anim', 25, true);  
    RoomLetter.addChild(santaChair);
  
  
  RoomReception = game.add.image(210, 232, 'RoomReception')
    scrollingMap.addChild(RoomReception);
  receptionBlackboard = game.add.sprite(420, 252, 'receptionBlackboard');
    receptionBlackboard.animations.add('receptionBlackboard_anim');
    receptionBlackboard.animations.play('receptionBlackboard_anim', 25, true);  
    RoomReception.addChild(receptionBlackboard);
  
  receptionSchoolChair11 = game.add.sprite(370, 265, 'receptionSchoolChair1');
    receptionSchoolChair11.animations.add('receptionSchoolChair11_anim');
    receptionSchoolChair11.animations.play('receptionSchoolChair11_anim', 25, true);  
    RoomReception.addChild(receptionSchoolChair11);
  
  receptionSchoolChair12 = game.add.sprite(418, 295, 'receptionSchoolChair1');
    receptionSchoolChair12.animations.add('receptionSchoolChair12_anim');
    receptionSchoolChair12.animations.play('receptionSchoolChair12_anim', 25, true);  
    RoomReception.addChild(receptionSchoolChair12);
  
  receptionSchoolChair3 = game.add.sprite(420, 330, 'receptionSchoolChair2');
    receptionSchoolChair3.animations.add('receptionSchoolChair3_anim');
    receptionSchoolChair3.animations.play('receptionSchoolChair3_anim', 25, true);  
    RoomReception.addChild(receptionSchoolChair3);
  
  receptionSchoolChair4 = game.add.sprite(350, 300, 'receptionSchoolChair2');
    receptionSchoolChair4.animations.add('receptionSchoolChair4_anim');
    receptionSchoolChair4.animations.play('receptionSchoolChair4_anim', 25, true);  
    RoomReception.addChild(receptionSchoolChair4);
  
  receptionBack1 = game.add.sprite(160, 90, 'generalBack');
    receptionBack1.animations.add('receptionBack1_anim');
    receptionBack1.animations.play('receptionBack1_anim', 25, true);  
    RoomReception.addChild(receptionBack1);
  
  receptionBack2 = game.add.sprite(270, 245, 'generalBack');
    receptionBack2.animations.add('receptionBack2_anim');
    receptionBack2.animations.play('receptionBack2_anim', 25, true);  
    RoomReception.addChild(receptionBack2);
  

  
  //*** Creating Lock Group
  var lockGroup = game.add.group();
  // Adding lockGroup to Map
  scrollingMap.addChild(lockGroup);
  //  Make Lock all input enabled
  lockGroup.setAll('inputEnabled', true);
  lockGroup.setAll('input.useHandCursor', true);
  // Animate each Lock to pulse scale
  locked_one = game.add.sprite(695,350, 'lockedLetter');
    locked_one.anchor.set(0.5, 1);
    locked_one.scale.setTo(.6,.6);
    openRoomLetter = localStorage.getItem('openRoomLetter');
    if(openRoomLetter  === null) {
      locked_one.alpha = 1;
    } else (
      locked_one.alpha = 0
    )
    //Add locked_one to lockGroup  
    lockGroup.addChild(locked_one);
    locked_one.inputEnabled = true;
    locked_one.input.useHandCursor = true;
    locked_one.events.onInputDown.add(unlockEvent, this);
    //locked_one.events.onInputDown.add(openBadge, this);
    //Animating single lock for now
    lockedTween = game.add.tween(locked_one)
      lockedTween.to( {y:360}, 600, Phaser.Easing.Out, true, 0, -1, true);

  unlockedLibrary = game.add.sprite(320,140, 'unlockedLibrary');
    unlockedLibrary.anchor.set(0.5, 1);
    unlockedLibrary.scale.setTo(.6,.6);
    openRoomLibrary = localStorage.getItem('openRoomLibrary');
    if(openRoomLibrary  === null) {
      unlockedLibrary.alpha = 1;
    } else (
      unlockedLibrary.alpha = 0
    )
    //Add locked_one to lockGroup  
    lockGroup.addChild(unlockedLibrary);
    unlockedLibrary.inputEnabled = true;
    unlockedLibrary.input.useHandCursor = true;
    unlockedLibrary.events.onInputDown.add(unlockEventLibrary, this);
    //Animating single lock for now
    unlockedLibraryTween = game.add.tween(unlockedLibrary)
      unlockedLibraryTween.to( {y:150}, 600, Phaser.Easing.Out, true, 0, -1, true);
  
  //Preparing unlock sound
  unlockSound = game.add.audio('unlock');
  winSound = game.add.audio('lockwin');
  //On Click event 
  //lockGroup.callAll('events.onInputDown.add', 'events.onInputDown', unlockEvent);
  
  
  //*** Creating Stars
  //Link Star sound to preload
  staraudio = game.add.audio('blop');
  woohoo = game.add.audio('woohoo');
  chime = game.add.audio('chime');
  //Create random Star group
  starGroup = game.add.group();
  scrollingMap.addChild(starGroup);
  //  And add 3 sprites to it
  //for (var i = 0; i < 3; i++)
  //{starGroup.create(roomBounds1.randomX, roomBounds1.randomY, 'star');}
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
  // Animate elf icon
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', iconCollectStar);
  // Open modal on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', displayModal);
  
  
  // Elf Spritesheets
  //library_desk_s = game.add.sprite(370, 130, 'desk');
  //library_desk_s.scale.setTo(0.55,0.55);
  //library_desk_s.animations.add('library_desk_anim');
  //library_desk_s.animations.play('library_desk_anim', 25, true);
  //scrollingMap.addChild(library_desk_s);
  
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
  
}//***End create function


//Info Button click
function infoBtnModal() {
  infoBtnTweenA = game.add.tween(infoBtn.scale).to( { x:1.4, y:1.4 }, 500, "Elastic.easeOut");
  infoBtnTweenB = game.add.tween(infoBtn.scale).to( { x:1.2, y:1.2 }, 500, "Elastic.easeOut");
  infoBtnTweenA.chain(infoBtnTweenB);
  infoBtnTweenA.start();
  
  tlinfoModalOpen = new TimelineMax();
  tlinfoModalOpen.fromTo(infoModal, 1.2, {
    transformOrigin:"50% 50%",
    scale:0,
    y:500
  }, {
    scale:1,
    y:0,
    ease: Elastic.easeOut.config(1, 0.6),
    delay:.5
  })
}

//Appearing Rooms
function RoomLetterHidden() {  
  RoomLetter.alpha = 0;
}
function RoomLetterShown() {
  RoomLetter.alpha = 1;
  unlocked_one.alpha = 0;
  unlocked_one.destroy;
  unlocked_one.destroy()
}

function RoomLibraryHidden() {  
  RoomLibrary.alpha = 0;
}
function RoomLibraryShown() {
  RoomLibrary.alpha = 1;
  unlockedLibrary.alpha = 0;
  game.time.events.add(1, unlockedLibrary.destroy, unlockedLibrary);
}
  

//Unlock Event for daily Locks
//Unlock Letter Room
function unlockEvent(locked_one) {
  // Play star pop sound
  unlockSound.play('',0,1);
  winSound.play('',0,1);
  
  //Stop bouncing tween
  unlockTweenA = game.add.tween(locked_one.scale).to( { x:.5, y:.5 }, 500, "Elastic.easeOut");
  unlockTweenB = game.add.tween(locked_one.scale).to( { x:1.2, y:1.2 }, 800, "Elastic.easeOut");
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
  
  //Update Data
  openRoomLetter = JSON.parse(localStorage.getItem('openRoomLetter'));
  // Add 1 to openRoomLetter
  openRoomLetter += 1;
  // Add new score to console
  console.log('+1 ! new Room Unlocked!')
  // Update new score to localStorage
  localStorage.setItem("openRoomLetter", JSON.stringify(openRoomLetter));
}
//Unlock Library
function unlockEventLibrary(unlockedLibrary) {
  // Play star pop sound
  unlockSound.play('',0,1);
  winSound.play('',0,1);
  
  //Stop bouncing tween
  unlockTweenA = game.add.tween(unlockedLibrary.scale).to( { x:.5, y:.5 }, 500, "Elastic.easeOut");
  unlockTweenB = game.add.tween(unlockedLibrary.scale).to( { x:1.2, y:1.2 }, 800, "Elastic.easeOut");
  unlockTweenC = game.add.tween(unlockedLibrary.scale).to( { x:0, y:0 }, 800, "Elastic");
  unlockTweenA.chain(unlockTweenB, unlockTweenC);
  unlockTweenA.start();
  // Add a timer before destroying star
  game.time.events.add(2000, unlockedLibrary.destroy, unlockedLibrary);
  
  // Room drop down animation tween
  RoomLibrary.alpha = 1;
  roomDropTweenA = game.add.tween(RoomLibrary).from( { y:10 }, 1100, "Elastic.easeOut");
  roomDropTweenA.start();
  
  //  And add 3 sprites to it
  for (var i = 0; i < 3; i++)
  {starGroup.create( roomBoundsLibrary.randomX, roomBoundsLibrary.randomY, 'star');}
  starGroup.forEach(makeStarClick);
  
  //Update Data
  openRoomLibrary = JSON.parse(localStorage.getItem('openRoomLibrary'));
  openRoomLibrary += 1;
  console.log('room update:' + openRoomLibrary)
  // Update new score to localStorage
  localStorage.setItem("openRoomLibrary", JSON.stringify(openRoomLibrary));
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
  //starGroup.callAll('events.onInputDown.add', 'events.onInputDown', iconCollectStar);
  // Open modal on star click
  starGroup.callAll('events.onInputDown.add', 'events.onInputDown', displayModal);
}

//Star click animation and destroy
function collectStar (star) {
  // Play star pop sound
  this.staraudio.play('',0,1);
  this.chime.play('',0,1);
  this.woohoo.play('',0,1);

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
  //Animate elf icon
  iconCollectStar(this);
  
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



//******* Elf Icon ********
var eyesOpen = document.getElementsByClassName("eyesOpenGroup");
var eyesClosed = document.getElementsByClassName("eyesClosed");

var mouthClosed = document.getElementsByClassName("mouthClosed");
var mouthOpen = document.getElementsByClassName("mouthOpen");
var mouthO = document.getElementsByClassName("mouthO");

var leftEar= document.getElementsByClassName("leftEar");
var rightEar= document.getElementsByClassName("rightEar");
var circleElf= document.getElementsByClassName("circleElf");
var elfHat= document.getElementsByClassName("elfHat");
var hatrim= document.getElementsByClassName("hatrim");

//Elf Icon Blink
var tlblink = new TimelineMax({repeat:-1});
tlblink.set(eyesClosed, {opacity: 0})
tlblink.to(eyesOpen, .2, {opacity: 0}, 3.5)
tlblink.to(eyesOpen, .2, {opacity: 1})

var tlmouthOpen = new TimelineMax();
tlmouthOpen.set([mouthO, mouthOpen], {opacity:0})


//Star Click Elf Icon Animation
function iconCollectStar() {
  
  var tliconCollectStar = new TimelineMax();
  //Set transform Origins
  tliconCollectStar.set(mouthOpen, {transformOrigin:"50% 20%"})
  
  //Change from eyesOpen to eyesClosed
  tliconCollectStar.to(eyesOpen, .2, {opacity:0})
  tliconCollectStar.to(eyesClosed, .01, {opacity: 1},'-=.1')
  
  //Move eyesClosed and mouthClosed down and scale down
  tliconCollectStar.to([eyesClosed, mouthClosed, hatrim], .2, {y:2, scale:.95}, '-=.1')
  
  //Move eyesClosed and mouthOpen up and scale up
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, hatrim], .5, {y:-5, scale:1})
  
  //Change from mouthClosed to mouthOpen
  tliconCollectStar.to(mouthClosed, .1, {opacity:0}, '-=1')
  tliconCollectStar.to(mouthOpen, .01, {opacity: 1, scaleY:0},'-=1')
  tliconCollectStar.fromTo(mouthOpen, .2, {scaleY:0}, {scaleY:1}, '-=.8')
  
  //Make openMouth laugh with scaleY
  tliconCollectStar.fromTo(mouthOpen, .2, {scaleY:1}, {scaleY:.9, yoyo:true, repeat:8}, '-=.2')
  
  //Close mouth as head goes back down a bit lower than original
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, hatrim], .5, {y:1, scale:.98}, '-=.5')
  
  //Open eyes back to original
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, hatrim], .3, {y:0, scale:1})
  tliconCollectStar.to(mouthClosed, .2, {opacity:1}, '-=.1')
  tliconCollectStar.to(mouthOpen, .2, {scaleY:0}, '-=.2')
  tliconCollectStar.to(mouthOpen, .01, {opacity: 0})
  tliconCollectStar.to(eyesOpen, .2, {opacity:1}, '+=.3')
  tliconCollectStar.to(eyesClosed, .01, {opacity:0})
  
  //Return to blink setting
}

//Badge Win Elf Icon Animation
function iconBadgeWin() {
  var tliconBadgeWin = new TimelineMax();
  //Set transform Origins
  tliconBadgeWin.set(mouthOpen, {transformOrigin:"50% 20%"})
  tliconBadgeWin.set(mouthO, {transformOrigin:"50% 50%"})
  tliconBadgeWin.set(eyesOpen, {transformOrigin:"50% 50%"})
  
  //Change to surprised mouth
  tliconBadgeWin.to(mouthClosed, .2, {opacity:0})
  tliconBadgeWin.to(mouthO, .01, {opacity: 1},'-=.1')
  //Move eyesOpen and surprised mouth down and scale down
  tliconBadgeWin.to([eyesOpen, mouthO, hatrim], .2, {y:2, scale:.95}, '-=.1')
  //Move eyesOpen and mouthOpen up and scale up
  tliconBadgeWin.to([eyesOpen, mouthO, mouthClosed, mouthOpen, hatrim], .5, {y:-5, scale:1})
  //Scale eyes a lot more
  tliconBadgeWin.to([eyesOpen], 1, {scale:1.2, ease: Elastic.easeInOut.config(1, 0.3)}, '-=.5')
  tliconBadgeWin.to([eyesOpen], 1, {scale:1, ease: Elastic.easeInOut.config(1, 0.3)}, '+=2')
  //Change to eyes closed and mouth open
  tliconBadgeWin.to(eyesOpen, .2, {opacity:0}, '+=.5')
  tliconBadgeWin.to(eyesClosed, .01, {opacity: 1},'-=.1')
  tliconBadgeWin.to(mouthO, .2, {opacity:0})
  tliconBadgeWin.to(mouthOpen, .01, {opacity: 1},'-=.1')
  //Make mouth open laugh
  tliconBadgeWin.fromTo(mouthOpen, .2, {scaleY:1}, {scaleY:.9, yoyo:true, repeat:8}, '-=.2')
  //Move eyes closed and mouth down
  tliconBadgeWin.to([eyesClosed, eyesOpen, mouthClosed, mouthO, mouthOpen, hatrim], .5, {y:1, scale:.98}, '-=.5')
  //Change mouth open to original while going down
  tliconBadgeWin.to(mouthOpen, .2, {opacity:0})
  tliconBadgeWin.to(mouthClosed, .01, {opacity: 1},'-=.1')
  //Open back eyes to original
  tliconBadgeWin.to([eyesClosed, mouthClosed, mouthOpen, hatrim], .3, {y:0, scale:1})
  tliconBadgeWin.to(mouthClosed, .2, {opacity:1}, '-=.1')
  tliconBadgeWin.to(mouthOpen, .2, {scaleY:0}, '-=.2')
  tliconBadgeWin.to(mouthOpen, .01, {opacity: 0})
  tliconBadgeWin.to(eyesOpen, .2, {opacity:1}, '+=.3')
  tliconBadgeWin.to(eyesClosed, .01, {opacity:0})
}


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
  .set(modalContent, {
    y:300
  })

function displayModal() {  
  var cardxhr = new XMLHttpRequest();
  cardxhr.onreadystatechange = function () {
  if(cardxhr.readyState === 4 && cardxhr.status === 200) {
    var cardlibrary = JSON.parse(cardxhr.responseText);
    var cardContentHTML;

    
    for (var i=0; i<cardlibrary.cards.length; i ++) {
      var currentScore = starScore / 10;
      var cardNumber = currentScore - 1;
      console.log('currentScore =' + currentScore)
      
       if (cardlibrary.cards[i].cardNumber == currentScore) {
        console.log('Card Number: ' + cardlibrary.cards[cardNumber].cardNumber)
        
        cardContentHTML = '<h5>';
        cardContentHTML += cardlibrary.cards[cardNumber].category;
        cardContentHTML += '</h5><h3>';
        cardContentHTML += cardlibrary.cards[cardNumber].title;
        cardContentHTML += '</h3><p>';
        cardContentHTML += cardlibrary.cards[cardNumber].fact;
        cardContentHTML += '</p>';
       }
    }

    document.getElementById('modalDataContent').innerHTML = cardContentHTML;
  }
  };
  cardxhr.open('GET', 'js/json/cards.json');
  cardxhr.send();
  
  
  //Display the modal
  modal.style.display = "block";
  //Animate modal on display
  modaltl
    .fromTo(modal, .5, {
      rotationX:90,
      transformPerspective: 100,
      transformStyle:"preserve-3d",
      transformOrigin:"50% 100%",},{
      rotationX:0, 
      ease: Back.easeOut.config(.8),
      delay:.1
    })
    .fromTo(modalContent, .4, {y:300}, {y:0}, '-=.3') 
}
