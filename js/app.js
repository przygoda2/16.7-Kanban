/*
Do tworzenia kolumn wykorzystujemy parametry ID i name. ID jest tworzone przez serwer gdy tworzymy nowy element.

    function randomString() {  //generuje id
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
*/

    //create template mustache

    function generateTemplate(name, data, basicElement) {	// nazwa temlatki w index.html, dane, opcjonalny parametr określający w jaki element zostanie opakowany szablon
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
      };


// ustawienie zmiennych przy komunikacji z serwerem (API KODILLA)

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var prefix = "https://cors-anywhere.herokuapp.com/";
var myHeaders = {
  'X-Client-Id': '3800',
  'X-Auth-Token': '53aaf4837fa7f49bbb961c529a206653'
};

// Pobieranie tablicy metoda GET endpoint to /board + funkcja odpytujaca o zasob tablicy
// po odebraniu odpowiedzi tworzymy kolumny setupColumns

fetch(prefix + baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });

  
 
  function setupColumns(columns) {
    columns.forEach(function (column) {
          var col = new Column(column.id, column.name);
      board.addColumn(col);
      setupCards(col, column.cards);
      console.log('kolumna', columns); // ?
      console.log('kolumna col', col); // ?
      
    });
  }

  function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}