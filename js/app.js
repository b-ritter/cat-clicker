// Our cat data model
// Simulates a JSON-like source
var cats = [];
var catNames = ['Ludwig', 'Grimes', 'Prince', 'Miles', 'Pete',
'Wolfgang', 'Pierre', 'Pablo'];
var catUrl = 'images/lorempixel-cxx.jpg';
var imageIndexNum;
for (var i = 0, numCats = catNames.length; i < numCats; i++){
  var newUrl = catUrl.split('xx');
  imageIndexNum = i + 1;
  newUrl.splice(1, 0, ( imageIndexNum < 10 ? ("0" + imageIndexNum) : imageIndexNum ) );
  cats.push({
    'name': catNames[i],
    'url': newUrl.join(''),
    'clicks': 0
  });
}

// Cat app view
var catApp = {
  // currentCat undefined for now, but initialize it as random
  // keeps track of state
  currentCat: undefined

};


catApp.Model = {
  _data: cats,
  getData: function(){
    return this._data;
  },
  getNumberOfItems: function() {
    return this._data.length;
  },
  getItemByNumber: function(n) {
    return this._data[n];
  },
  getItemByName: function(name) {
    for(var i = 0, items = this.getNumberOfItems(); i < items; i++){
      if( name === this._data[i].name){
        return this._data[i];
      }
    }
  },
  getItemByIndex: function(i) {
    return this._data[i];
  },
  updateClicks: function(name) {
    var item = this.getItemByName(name);
    item.clicks++;
  }
};

// Cat Controller
catApp.Controller = {
  model: catApp.Model,
  getRandomItem: function() {
    var randNum = Math.floor(Math.random() * this.model.getNumberOfItems());
    return this.model.getItemByNumber(randNum);
  },
  getAllItems: function() {
    return this.model.getData();
  },
  getItemByIndex: function(i) {
    return this.model.getItemByIndex(i);
  },
  getCurrentCat: function() {
    return catApp.currentCat;
  },
  updateItem: function(name) {
    this.model.updateClicks(name);
  },
  updateView: function(data) {
    catApp.currentCat = data;
    catApp.ImageView.update();
  }
};

catApp.ListView = {
  controller: catApp.Controller,
  _template: document.getElementById('catListTemplate').content,
  _el: document.getElementById('catButtonContainer'),
  init: function() {
    var items = this.controller.getAllItems();
    var newElement;
    var self = this;
    items.forEach( function() {
      newElement = document.importNode(self._template, true);
      self._el.appendChild(newElement);
    });
    this.render();
  },
  render: function() {
    var self = this;
    var listItems = this._el.getElementsByTagName('li');
    // console.log(listItems.length);
    for( var i = 0, numListItems = listItems.length; i < numListItems; i++ ){
      (function(i_temp){
        var item = listItems[i_temp];
        var data = self.controller.getItemByIndex(i_temp);
        item.querySelector('.catButtonName').innerHTML = self.controller.getItemByIndex(i_temp).name;
        item.addEventListener('click', function(){
          self.controller.updateView(data);
        });
      })(i);
    }
  }
};

catApp.ImageView = {
  controller: catApp.Controller,
  _template: document.getElementById('catViewerTemplate').content,
  _el: document.getElementById('catViewer'),
  init: function() {
    var self = this;
    var newElement = document.importNode(this._template, true);
    this._el.appendChild(newElement);
    var img = this._el.querySelector('.catImg');
    img.addEventListener('click', function(){
      self.controller.updateItem(self.controller.getCurrentCat().name);
      self.updateClicks();
    });
  },
  update: function() {
    var item = this.controller.getCurrentCat();
    this._el.querySelector('.catName').innerHTML = item.name;
    this.updateClicks();
    this._el.querySelector('.catImg').setAttribute('src', item.url);
  },
  updateClicks: function() {
    var item = this.controller.getCurrentCat();
    this._el.querySelector('.clickDisplay').innerHTML = item.clicks;
  }
};

catApp.View = {
  controller: catApp.Controller,
  views: [catApp.ListView, catApp.ImageView],
  init: function() {
    this.views.forEach(function(item){
      item.init();
    });
    this.controller.updateView(this.controller.getRandomItem());
  }
};

catApp.View.init();
