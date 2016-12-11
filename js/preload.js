var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
    
    var preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
    preloadBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(preloadBar);
    
    
    //***** BACKGROUND IMAGES
    this.game.load.image('map', 'assets/images/basemap/basemap_empty.png');
    this.game.load.image('infoBtn', 'assets/images/infoButton.png');
    //game.load.image('map', 'assets/images/baseMap_start.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.image('emptybadge', 'assets/images/emptybadge.png');

    //***** LOCKS
    this.game.load.image('lockShadow', 'assets/images/locks/lockShadow.png');
    this.game.load.image('lockedLetter', 'assets/images/locks/locked_100x100.png');
    this.game.load.image('lockToy', 'assets/images/locks/lock_toy.png');
    this.game.load.image('lockLibrary', 'assets/images/locks/lock_library.png');
    this.game.load.image('lockLab', 'assets/images/locks/lock_lab.png');
    this.game.load.image('lockCook', 'assets/images/locks/lock_cook.png');
    this.game.load.image('lockStats', 'assets/images/locks/lock_stats.png');
    this.game.load.image('lockWarehouse', 'assets/images/locks/lock_warehouse.png');
    this.game.load.image('lockGreenhouse', 'assets/images/locks/lock_greenhouse.png');
    this.game.load.image('lockReindeer', 'assets/images/locks/lock_reindeer.png');
    this.game.load.image('lockLaunchpad', 'assets/images/locks/lock_launchpad.png');
    //game.load.spritesheet('badgeWin', 'assets/sprites/elf_badgeWin200100.png', 200, 100);

    //***** ROOMS
    //General
    this.game.load.spritesheet('generalStanding', 'assets/images/rooms/general/general_standing_200200.png', 200, 200);
    this.game.load.spritesheet('generalBack', 'assets/images/rooms/general/general_back_7045.png', 70, 45);
    //Reception
    this.game.load.image('RoomReception', 'assets/images/rooms/reception/reception.png');
    this.game.load.spritesheet('receptionBlackboard', 'assets/images/rooms/reception/reception_blackboard_7045.png', 70, 45);
    this.game.load.spritesheet('receptionSchoolChair1', 'assets/images/rooms/reception/reception_schoolChair1_5545.png', 55, 45);
    this.game.load.spritesheet('receptionSchoolChair2', 'assets/images/rooms/reception/reception_schoolChair1_5545.png', 55, 45);
    //LetterRoom
    this.game.load.image('RoomLetter', 'assets/images/rooms/letter/letterroom.png');
    //game.load.image('RoomLetter', 'assets/images/rooms/letter/letterroom_withanimation.png');
    this.game.load.spritesheet('letterAnimMailbox', 'assets/images/rooms/letter/letterroom_mailbox_120120.png', 120, 120);
    this.game.load.image('letterPouchGroup', 'assets/images/rooms/letter/pouchgroup.png');
    this.game.load.image('letterpouch1', 'assets/images/rooms/letter/pouch1.png');
    this.game.load.image('letterpouch2', 'assets/images/rooms/letter/pouch2.png');
    this.game.load.image('letterpouch3', 'assets/images/rooms/letter/pouch3.png');
    this.game.load.spritesheet('letterFire', 'assets/images/rooms/letter/letterroom_fire_2225.png', 22, 25);
    this.game.load.spritesheet('letterScript', 'assets/images/rooms/letter/letterroom_script_11080.png', 110, 80);
    this.game.load.spritesheet('letterThrow', 'assets/images/rooms/letter/letterroom_letterthrow_8080.png', 80, 80);
    this.game.load.spritesheet('letterFloor', 'assets/images/rooms/letter/letterroom_floorletters_8050.png', 80, 50);
    this.game.load.spritesheet('letterGrab', 'assets/images/rooms/letter/letterroom_lettergrab_5050.png', 50, 50);
    this.game.load.spritesheet('letterSorting', 'assets/images/rooms/letter/letterroom_sortingtable_130100.png', 130, 100);
    this.game.load.spritesheet('santaChair', 'assets/images/rooms/letter/letterroom_santachair_7070.png', 70, 70);

    //***** ELF SPRITESHEETS
    this.game.load.spritesheet('ms', 'assets/sprites/elfmotion2048.png', 170.7, 170.7, 100);
    //**Library
    this.game.load.spritesheet('desk', 'assets/sprites/rooms/library/LIBRARY_desk_200200.png', 200, 200);

    //***** AUDIO
    // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
    this.game.load.audio('blop', ['assets/audio/blop.mp3', 'assets/audio/blop.wav']);
    this.game.load.audio('lockwin', 'assets/audio/gamewin.wav');
    this.game.load.audio('unlock', 'assets/audio/unlock.mp3');
    //game.load.audio('badgewin', 'assets/audio/badgewin.mp3');
    //game.load.audio('jinglebells', 'assets/audio/jinglebells.mp3');
    this.game.load.audio('woohoo', 'assets/audio/woohoo.mp3');
    this.game.load.audio('chime', 'assets/audio/chimes.mp3');
	},
  	create: function(){
		this.game.state.start("GameState");
	}
}