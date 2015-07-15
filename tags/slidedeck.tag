<slidedeck>
  <slide each={slide, i in slides } class="{active: currentSlide == i}"></slide>

  <button onclick={ toggleEditMode } class={ active:inEditMode }>Edit mode</button>
  <button if={ inEditMode } onclick={ add }>Add</button>
  <button onclick={showPrev}>Prev</button>
  <button onclick={showNext}>Next</button>

  <script>
    var self = this

    init(){
      self.inEditMode = false
      self.currentSlide = 0

      self.on('mount', function() {
        RiotControl.trigger('slides:init')
      })

      RiotControl.on('slides:changed', function(slides) {
        self.slides = slides
        self.update()
      })
    }

    add(){
      RiotControl.trigger('slides:add')
      self.currentSlide = self.slides.length-1
    }

    toggleEditMode() {
      self.inEditMode = !self.inEditMode
    }

    showPrev(){
      if(self.currentSlide){
        self.currentSlide--
      }
    }

    showNext(){
      if(self.currentSlide < self.slides.length-1){
        self.currentSlide++
      }
    }

    self.init()
  </script>

  <style>
    slidedeck {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0;
    }
    button {
      position: relative;
      z-index: 99;
    }
    button.active {
      background-color: green;
    }
  </style>
</slidedeck>
