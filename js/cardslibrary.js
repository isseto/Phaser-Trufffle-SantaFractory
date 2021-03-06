//JSON for Displaying Cards in Library
document.getElementsByClassName('badgeLibrary')[0].onclick = function(e){
  var target = e.target;
  //if (target.tagName == 'A') {
  //if (target.tagName.toLowerCase() === 'img') {
  if (target.classList.contains('dateBadge')) {
    var dataDay = target.getAttribute('data-day');
    obtainData(dataDay);//send request
    displaySavedBadges();//send request
  }
}

function obtainData(dataDay){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var cardlibrary = JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="row libraryCard-container">';

    for (var i=0; i<cardlibrary.cards.length; i ++) {

      //If selected card data is equal to a data attribute 
      if (cardlibrary.cards[i].day == dataDay) {
        statusHTML += '<li class="small-12 small-centered columns libraryCard libraryCard-purple">';
        statusHTML += '<p>';
        statusHTML += cardlibrary.cards[i].category;
        statusHTML += '</p><h3>';
        statusHTML += cardlibrary.cards[i].title;
        statusHTML += '</h3><p>';
        statusHTML += cardlibrary.cards[i].date;
        statusHTML += ' / ';
        statusHTML += cardlibrary.cards[i].fact;
        statusHTML += '</p>';
      } 

    } // end for loop


    statusHTML += '</ul>';
    document.getElementById('libraryList').innerHTML = statusHTML;
  }
  };
  xhr.open('GET', 'js/json/cards.json');
  xhr.send();
}

function displaySavedBadges(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var cardlibrary = JSON.parse(xhr.responseText);
    var displayBadgesHTML;

    console.log('Library Badge Score' + badgescore)
    for (var i=0; i<badgeScore; i ++) {

        displayBadgesHTML += '<img src="';
        displayBadgesHTML += cardlibrary.cards[i].badgeimg;
        displayBadgesHTML += '">';

    } // end for loop

    document.getElementsByClassName('dateBadge').innerHTML = displayBadgesHTML;
  }
  };
  xhr.open('GET', 'js/json/cards.json');
  xhr.send();
}