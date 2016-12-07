

///******** Menu Button States ********///


///******** Audio Control ********///
function toggleSound() {
  var audio = document.getElementById('audio');
  if (audio.paused)
    audio.play();
  else 
    audio.pause();
}

var blopAudio = new Audio('assets/audio/blop.mp3');
    


///******** Cards Modals ********///
// Get the modal
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

// Get the button that opens the modal
// Get the <span> element that closes the modal
var modalSpan = document.getElementById("modalSpan");
// When the user clicks on the button, open the modal 
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
          ease: Back.easeOut.config(.8)
        })
        .fromTo(modalContent, .4, {y:300}, {y:0}, '-=.3')
}
// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function modalTrigger() {
  blopAudio.play();
    modaltl
      .fromTo(modalContent, .3, {y:0}, {y:300})
      .fromTo(modal, .5, {
        rotationX:0, 
        toLocaleStringransformPerspective: 100,
        transformStyle:"preserve-3d",
        transformOrigin:"50% 100%",
      },{
        rotationX:90,
        ease: Back.easeIn.config(.8)
      }, "-=.5")
  //modal.style.display = "none";
  
  // Check for Badges
  if(starScore % 3 == 0) {
    badgeScore += 1;   
    
    // Play badge win audio
    iconBadgeWin(this);
    newBadgeModalReveal(this);
    var badgewinAudio = new Audio('assets/audio/badgewin.mp3');
    badgewinAudio.play();
    var jinglebellsAudio = new Audio('assets/audio/jinglebells.mp3');
    jinglebellsAudio.play();
    console.log('Holy! You got a new badge! You now have ' + badgeScore + ' badges.')
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}



///******** Library Effect ********///
// Get the library
var library = document.getElementById('library');
var libraryContent = document.getElementsByClassName('library-content');
var librarytl = new TimelineMax();
librarytl
  .set(library, {
    rotationX:90,
    transformPerspective: 100,
    transformStyle:"preserve-3d",
    transformOrigin:"50% 100%",
  })
  .set(libraryContent, {
    y:300
  })

// Get the button that opens the library
var libraryBtn = document.getElementById("libraryBtn");

// Get the <span> element that closes the library
var librarySpan = document.getElementById("librarySpan");

// When the user clicks on the button, open the library 
libraryBtn.onclick = function() {
    library.style.display = "block";
      librarytl
        .fromTo(library, .5, {
          rotationX:90,
          transformPerspective: 100,
          transformStyle:"preserve-3d",
          transformOrigin:"50% 100%",
        },{
          rotationX:0, 
          ease: Back.easeOut.config(.8)
        })
        .fromTo(libraryContent, .4, {y:300}, {y:0}, '-=.3')

    for (var i = 0; i < libraryBtn.length; i++) {
        var thislibraryBtn = libraryBtn[i];
        thislibraryBtn.addEventListener("click", function () {
            var library = document.getElementById(this.dataset.library);
            //library.style.display = "block";
            library.addEventListener("click", function () { library.style.display = "none"; library.removeEventListener("click"); });
        }, false);
    }
}

// When the user clicks on <span> (x), close the library
librarySpan.onclick = function() {
  blopAudio.play();
    librarytl
      .fromTo(libraryContent, .3, {y:0}, {y:300})
      .fromTo(library, .5, {
        rotationX:0, 
        toLocaleStringransformPerspective: 100,
        transformStyle:"preserve-3d",
        transformOrigin:"50% 100%",
      },{
        rotationX:90,
        ease: Back.easeIn.config(.8)
      }, "-=.5")
  //library.style.display = "none";
}

// When the user clicks anywhere outside of the library, close it
window.onclick = function(event) {
    if (event.target == library) {
      library.style.display = "none";
    }
}



//****** Intro Card ******//
var infoModal = document.getElementById('infoModal');
var introModalBtn = document.getElementById('introModalBtn');
//Open Intro Modal
function infoModalOpen() {
  document.getElementById("infoModal").style.display = "block";
  tlinfoModalOpen = new TimelineMax();
  tlinfoModalOpen.fromTo(infoModal, 1.2, {
    transformOrigin:"50% 50%",
    opacity:1,
    scale:0,
    y:500
  }, {
    scale:1,
    y:0,
    ease: Elastic.easeOut.config(1, 0.6),
    delay:.5
  })
}
//Close Intro Modal
introModalBtn.onclick = function() {
  blopAudio.play();
  var tlintroModalClose = new TimelineMax();
  tlintroModalClose
    .to(infoModal, .75, {
      scale:0, 
      ease: Back.easeIn.config(1.7), y: 500,
      transformOrigin:"50% 50%"
    });
  //library.style.display = "none";  
}



//****** Badge Win Card ******//
var newBadgeModal = document.getElementById('newBadgeModal');
document.getElementById("newBadgeModal").style.display = "none";
//Open Intro Modal
function newBadgeModalReveal() {
  document.getElementById("newBadgeModal").style.display = "block";
  tlnewBadgeModalOpen = new TimelineMax();
  tlnewBadgeModalOpen.fromTo(newBadgeModal, 1.2, {
    transformOrigin:"50% 50%",
    opacity:1,
    scale:0,
    y:500
  }, {
    scale:1,
    y:0,
    ease: Elastic.easeOut.config(1, 0.6),
    delay:.5
  })
  tlnewBadgeModalOpen.to(newBadgeModal, .8, {y:-7, yoyo:true, repeat:-1, ease:"easeOut"});
}
//Close Intro Modal
newBadgeModal.onclick = function() {
  blopAudio.play();
  var tlnewBadgeModalClose = new TimelineMax();
  tlnewBadgeModalClose
    .to(newBadgeModal, .75, {
      scale:0, 
      ease: Back.easeIn.config(1.7), y: 500,
      transformOrigin:"50% 50%"
    });
}


