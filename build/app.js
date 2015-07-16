(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var slideDispatcher = new Dispatcher(),
    slideStore = new SlideStore(slideDispatcher);

riot.mount('slidedeck');

},{}],2:[function(require,module,exports){
function SlideStore(slideDispatcher) {
  riot.observable(this); // Riot event emitter

  var self = this;

  self.inEditMode = false;

  // SET SLIDES
  self.slides = JSON.parse(localStorage.getItem('slides')) || [
    { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
    { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
  ];

  // GET SLIDES
  self.getSlides = function(){
    return self.slides;
  };

  // GET EDITMODE
  self.getEditMode = function(){
    return self.inEditMode;
  };

  slideDispatcher.register(function(payload) {
    switch(payload.actionType){
      // ADD SLIDE
      case 'slides:add':
        self.slides.push({title: 'New Slide', content: 'Lorum Ipsum...', color: '#0000FF'});
        self.trigger('slides:changed', self.slides);
        break;

      // REMOVE SLIDE
      case 'slides:remove':
        self.slides.splice(payload.index, 1);
        self.trigger('slides:changed', self.slides);
        break;

      // EDIT SLIDE
      case 'slides:edit:title':
        self.slides[payload.index]['title'] = payload.title;
        self.trigger('slides:changed', self.slides);
        break;

      case 'slides:edit:content':
        self.slides[payload.index]['content'] = payload.content;
        self.trigger('slides:changed', self.slides);
        break;

      case 'slides:toggle-edit-mode':
        self.inEditMode = !self.inEditMode;
        break;

    }
  });

  // STORE SLIDES
  self.on('slides:changed', function(slides){
    localStorage.setItem('slides', JSON.stringify(slides));
  });

  return self;
}

},{}],3:[function(require,module,exports){
riot.tag('slide', '<h3 contenteditable="{ parent.inEditMode }" oninput="{ editTitle }">{ slide.title }</h3> <p contenteditable="{ parent.inEditMode }" oninput="{ editContent }">{ slide.content }</p> <button if="{ parent.inEditMode }" onclick="{ removeSlide }">Remove</button>', 'slide { display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; text-align: center; color: #FFF; } slide.active { display:block; } slide h3 { font-size: 75px; }', 'style="background-color: { slide.color }"', function(opts) {
    this.editTitle = function(e) {
      var newTitle = e.target.innerHTML
      slideDispatcher.dispatch({
        actionType: 'slides:edit:title',
        index: e.item.i,
        title: newTitle
      });
    }.bind(this);

    this.editContent = function(e) {
      var newContent = e.target.innerHTML
      slideDispatcher.dispatch({
        actionType: 'slides:edit:content',
        index: e.item.i,
        content: newContent
      });
    }.bind(this);

    this.removeSlide = function(e) {
      slideDispatcher.dispatch({
        actionType: 'slides:remove',
        index: e.item.i
      });
    }.bind(this);
  
});

},{}],4:[function(require,module,exports){
riot.tag('slidedeck', '<slide each="{slide, i in slides }" class="{active: currentSlide == i}"></slide> <button onclick="{ toggleEditMode }" class="{ active: getEditMode() }">Edit mode</button> <button if="{ inEditMode }" onclick="{ add }">Add</button> <button onclick="{showPrev}">Prev</button> <button onclick="{showNext}">Next</button>', 'slidedeck { position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; } button { position: relative; z-index: 99; } button.active { background-color: green; }', function(opts) {
    var self = this

    this.init = function() {
      self.currentSlide = 0
    }.bind(this);

    self.on('mount', function(){
      self.getSlides()
    })

    slideStore.on('slides:changed', function(){
      self.getSlides()
    })

    this.getSlides = function() {
      self.slides = slideStore.getSlides()
      self.update()
    }.bind(this);

    this.getEditMode = function() {
      return slideStore.getEditMode()
    }.bind(this);

    this.add = function() {
      slideDispatcher.dispatch({
        actionType: 'slides:add'
      });
      self.currentSlide = self.slides.length-1
    }.bind(this);

    this.toggleEditMode = function() {
      slideDispatcher.dispatch({
        actionType: 'slides:toggle-edit-mode'
      })
    }.bind(this);

    this.showPrev = function() {
      if(self.currentSlide){
        self.currentSlide--
      }
    }.bind(this);

    this.showNext = function() {
      if(self.currentSlide < self.slides.length-1){
        self.currentSlide++
      }
    }.bind(this);

    self.init()
  
});

},{}]},{},[2,3,4,1]);
