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
  getItemByName: function(name) {
    return this.model.getItemByName(name);
  },
  getItemByIndex: function(i) {
    return this.model.getItemByIndex(i);
  },
  updateItem: function(name) {
    this.model.updateClicks(name);
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
        item.querySelector('.catButtonName').innerHTML = 'cat ' + i_temp;
        item.addEventListener('click', function(){
          catApp.currentCat = data;
          catApp.ImageView.update();
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
    console.log('image viewer');
  },
  render: function() {

  },
  update: function() {
    console.log(catApp.currentCat);
  }
};

catApp.View = {
  views: [catApp.ListView, catApp.ImageView],
  init: function() {
    this.views.forEach(function(item){
      item.init();
    });
  }
};

catApp.View.init();

// When you click on a cat name, it appears in the viewer
/*
// Cat list view
var catListView = {
  _data: catApp.catController.getCats(),
  _template: document.getElementById('catListTemplate'),
  _el: document.getElementById('catButtonContainer'),
  kats: [],
  init: function(){
    var currentCat = this._data[Math.floor( Math.random() * this._data.length)];
    this.render();
    catView.init(currentCat);
  },
  loadTemplate: function(){
    var newElement;
    var self = this;
    for (var i = 0, numCats = this._data.length; i < numCats; i++){
      newElement = document.importNode(self._template.content, true);
      self._el.appendChild(newElement);
    }
  },
  bind: function(){
    this.kats = document.querySelectorAll('.catButtonContainer');
    var self = this;
    for( var i = 0, numKats = this.kats.length; i < numKats; i++){
      (function(k){
        k.name = self._data[i].name;
        k.url = self._data[i].url;
        k.clicks = self._data[i].clicks;
        k.addEventListener('click', function(){
            catView.render(k);
          }
        );
      })(this.kats[i]);
    }
  },
  render: function(){
    this.loadTemplate();
    this.bind();
    for (var i = 0, numKats = this.kats.length; i < numKats; i++){
      this.kats[i].querySelector('.catButtonName').innerHTML = this.kats[i].name;
    }
  }
};
// Cat image view
var catView = {
  _template: document.getElementById('catViewerTemplate').content,
  _el: document.getElementById('catViewer'),
  init: function(cat) {
    var newElement = document.importNode(this._template, true);
    this._el.appendChild(newElement);
    this._el.querySelector('.catImg').addEventListener('click', function(){

    });
    this.render(cat);
  },
  render: function(cat) {
    this._el.querySelector('.catName').innerHTML = cat.name;
    this._el.querySelector('.catImg').setAttribute('src', cat.url);
    this._el.querySelector('.clickDisplay').innerHTML = cat.clicks;
  }
};

catListView.init();
*/
