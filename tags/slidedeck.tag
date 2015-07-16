<slidedeck>
  <slide each="{slide, i in slides }" class="{active: currentSlide == i}"></slide>

  <button onclick="{ toggleEditMode }"
          class="{ active: getEditMode() }">Edit mode</button>
  <button if="{ inEditMode }" onclick="{ add }">Add</button>
  <button onclick="{showPrev}">Prev</button>
  <button onclick="{showNext}">Next</button>

  <script>
    var self = this

    init(){
      self.currentSlide = 0
    }

    self.on('mount', function(){
      self.getSlides()
    })

    slideStore.on('slides:changed', function(){
      self.getSlides()
    })

    getSlides(){
      self.slides = slideStore.getSlides()
      self.update()
    }

    getEditMode(){
      return slideStore.getEditMode()
    }

    add(){
      slideDispatcher.dispatch({
        actionType: 'slides:add'
      });
      self.currentSlide = self.slides.length-1
    }

    toggleEditMode() {
      slideDispatcher.dispatch({
        actionType: 'slides:toggle-edit-mode'
      })
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
