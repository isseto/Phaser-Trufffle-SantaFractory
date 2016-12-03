//******* Elf Icon ********
var eyesOpen = document.getElementsByClassName("eyesOpenGroup");
var eyesClosed = document.getElementsByClassName("eyesClosed");

var mouthClosed = document.getElementsByClassName("mouthClosed");
var mouthOpen = document.getElementsByClassName("mouthOpen");
var mouthO = document.getElementsByClassName("mouthO");



//Elf Icon Blink
var tlblink = new TimelineMax();
tlblink.set(eyesClosed, {opacity: 0})
tlblink.to(eyesOpen, .2, {opacity: 0}, 1.5)
tlblink.to(eyesOpen, .2, {opacity: 1})

var tlmouthOpen = new TimelineMax();
tlmouthOpen.set([mouthO, mouthOpen], {opacity:0})


//Star Click Elf Icon Animation
function iconCollectStar() {
  tlblink.pause();
  
  var tliconCollectStar = new TimelineMax();
  //Set transform Origins
  tliconCollectStar.set(mouthOpen, {transformOrigin:"50% 20%"})
  
  //Change from eyesOpen to eyesClosed
  tliconCollectStar.to(eyesOpen, .2, {opacity:0})
  tliconCollectStar.to(eyesClosed, .01, {opacity: 1},'-=.1')
  
  //Move eyesClosed and mouthClosed down and scale down
  tliconCollectStar.to([eyesClosed, mouthClosed, headmovement], .5, {y:2, scale:.95})
  
  //Move eyesClosed and mouthOpen up and scale up
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, headmovement], 1, {y:-5, scale:1})
  
  //Change from mouthClosed to mouthOpen
  tliconCollectStar.to(mouthClosed, .1, {opacity:0}, '-=1')
  tliconCollectStar.to(mouthOpen, .01, {opacity: 1, scaleY:0},'-=1')
  tliconCollectStar.fromTo(mouthOpen, .5, {scaleY:0}, {scaleY:1}, '-=.8')
  
  //Make openMouth laugh with scaleY
  tliconCollectStar.fromTo(mouthOpen, .2, {scaleY:1}, {scaleY:.9, yoyo:true, repeat:8}, '-=.2')
  
  //Close mouth as head goes back down a bit lower than original
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, headmovement], .7, {y:1, scale:.98}, '-=.5')
  
  //Open eyes back to original
  tliconCollectStar.to([eyesClosed, mouthClosed, mouthOpen, headmovement], .3, {y:0, scale:1})
  tliconCollectStar.to(mouthClosed, .2, {opacity:1}, '-=.1')
  tliconCollectStar.to(mouthOpen, .2, {scaleY:0}, '-=.2')
  tliconCollectStar.to(mouthOpen, .01, {opacity: 0})
  tliconCollectStar.to(eyesOpen, .2, {opacity:1}, '+=.3')
  tliconCollectStar.to(eyesClosed, .01, {opacity:0})
  
  //Return to blink setting
}