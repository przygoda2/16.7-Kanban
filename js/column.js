/*
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var prefix = "https://cors-anywhere.herokuapp.com/";
var myHeaders = {
  'X-Client-Id': 'X-Client-Id',
  'X-Auth-Token': 'X-Auth-Token'
};
*/

function Column(id, name) {
    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
const self = this;
    this.element.querySelector('.column').addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-delete')) {
            self.removeColumn();
      }
  /*
  
  // dodawanie kolumny w mod 15.3
  
        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
              self.removeColumn();
            }
          
            if (event.target.classList.contains('add-card')) {
              self.addCard(new Card(prompt("Enter the name of the card")));
            }
          });
      }
  
  */
  
  // dodawanie kolumny - nazwe karty wydzielamy do osobnej zmiennej (konieczne do wykonania zapytania do serwera przy tworzeniu nowego zasobu)
  
      if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card");
        event.preventDefault();
        var data = new FormData();
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', self.id);

        fetch(prefix + baseUrl + '/card', {
                method: 'POST',
                headers: myHeaders,
                body: data,
            })
        .then(function(res) {
            return res.json();
        })
        .then(function(resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
            console.log('addCard function attr', card)
        });
      }
      
  });
}

Column.prototype = {
  addCard: function(card) {
    this.element.querySelector('ul').appendChild(card.element);
  },
  removeColumn: function() {
    var self = this;
    fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
		  // Po uzyskaniu potwierdzenia z serwera ze element jest usunięty nastepuje usunięcie z widoku
        self.element.parentNode.removeChild(self.element);
      });
  }
};

