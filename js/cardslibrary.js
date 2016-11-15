var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
if(xhr.readyState === 4 && xhr.status === 200) {
  var cardlibrary = JSON.parse(xhr.responseText);
  var statusHTML = '<ul class="row libraryCard-container">';

  for (var i=0; i<cardlibrary.cards.length; i ++) {

    if (cardlibrary.cards[i].opened === true) {
      statusHTML += '<li class="small-12 small-centered columns libraryCard libraryCard-yellow">';
    } else {
      statusHTML += '<li class="small-12 small-centered columns libraryCard libraryCard-purple">';
    }
    
    statusHTML += '<p>';
    statusHTML += cardlibrary.cards[i].category;
    statusHTML += '</p><h3>';
    statusHTML += cardlibrary.cards[i].title;
    statusHTML += '</h3><p>';
    statusHTML += cardlibrary.cards[i].date;
    statusHTML += ' / ';
    statusHTML += cardlibrary.cards[i].fact;
    statusHTML += '</p>';
  } // end for looop

  statusHTML += '</ul>';
  document.getElementById('libraryList').innerHTML = statusHTML;
}
};
xhr.open('GET', 'js/json/cards.json');
xhr.send();