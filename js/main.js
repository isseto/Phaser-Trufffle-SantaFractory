///******** Menu Button States ********///


///******** Audio Control ********///
function toggleSound() {
  var audio = document.getElementById('audio');
  if (audio.paused)
    audio.play();
  else 
    audio.pause();
}


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
var modalBtn = document.getElementsByClassName("modalBtn")[0];

// Get the <span> element that closes the modal
var modalSpan = document.getElementById("modalSpan");

// When the user clicks on the button, open the modal 
modalBtn.onclick = function() {
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

    for (var i = 0; i < modalBtn.length; i++) {
        var thismodalBtn = modalBtn[i];
        thismodalBtn.addEventListener("click", function () {
            var modal = document.getElementById(this.dataset.modal);
            //modal.style.display = "block";
            modal.addEventListener("click", function () { modal.style.display = "none"; modal.removeEventListener("click"); });
        }, false);
    }
}

// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function() {
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






