// Our cat data model
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

// Cat Controller
var catController = {
  getCats: function(){
    return cats;
  }

};

// Cat app view
// When you click on a cat name, it appears in the viewer

// Cat list view
var catListView = {
  _data: catController.getCats(),
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
