riot.tag('slidedeck', '<slide each="{slide, i in slides }" class="{active: currentSlide == i}"></slide> <button onclick="{ toggleEditMode }" class="{ active:inEditMode }">Edit mode</button> <button if="{ inEditMode }" onclick="{ add }">Add</button> <button onclick="{showPrev}">Prev</button> <button onclick="{showNext}">Next</button>', 'slidedeck { position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; } button { position: relative; z-index: 99; } button.active { background-color: green; }', function(opts) {
    var self = this

    this.init = function() {
      self.inEditMode = false
      self.currentSlide = 0

      self.on('mount', function() {
        RiotControl.trigger('slides:init')
      })

      RiotControl.on('slides:changed', function(slides) {
        self.slides = slides
        self.update()
      })
    }.bind(this);

    this.add = function() {
      RiotControl.trigger('slides:add')
      self.currentSlide = self.slides.length-1
    }.bind(this);

    this.toggleEditMode = function() {
      self.inEditMode = !self.inEditMode
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
