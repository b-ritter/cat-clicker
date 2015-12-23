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
    catView.render(currentCat);
  },
  bind: function(){
    var newElement;
    var self = this;
    for (var i = 0, numCats = this._data.length; i < numCats; i++){
      (function(k){
        newElement = document.importNode(self._template.content, true);
        newElement.name = k.name;
        newElement.url = k.url;
        newElement.clicks = k.clicks;
        self._el.appendChild(newElement);
      })(this._data[i]);
    }
  },
  render: function(){
    this.bind();
    this.kats = document.querySelectorAll('.catButtonContainer');
    for (var i = 0, numKats = this.kats.length; i < numKats; i++){
      this.kats[i].querySelector('.catButtonName').innerHTML = this.kats[i].name;
    }
  }
};
// Cat image view
var catView = {
  _template: document.getElementById('catViewerTemplate'),
  _el: document.getElementById('catViewer'),
  render: function(cat){

  }
};

catListView.init();
