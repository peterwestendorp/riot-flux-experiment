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
