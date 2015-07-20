<slidedeck>
  <slide each="{slide, i in slides }" class="{active: getCurrentSlideIndex() == i}"></slide>

  <button onclick="{ toggleEditMode }"
          class="{ active: getEditMode() }">Edit mode</button>
  <button if="{ getEditMode() }" onclick="{ add }">Add</button>
  <button onclick="{showPrev}">Prev</button>
  <button onclick="{showNext}">Next</button>

  <script>
    var self = this

    slideStore.on('slides:loaded', function(){
      self.getSlides()
      self.getCurrentSlideIndex()
    })

    slideStore.on('slides:changed', function(){
      self.getSlides()
    })

    getSlides(){
      self.slides = slideStore.getSlides()
      self.update()
    }

    getCurrentSlideIndex(){
      return slideDeckStore.getCurrentSlideIndex()
    }

    getEditMode(){
      return slideDeckStore.getEditMode()
    }

    add(){
      slideDispatcher.dispatch({
        actionType: 'slides:add'
      });
    }

    toggleEditMode() {
      slideDispatcher.dispatch({
        actionType: 'slides:toggle-edit-mode'
      })
    }

    showPrev(){
      slideDispatcher.dispatch({
        actionType: 'slides:prev'
      })
    }

    showNext(){
      slideDispatcher.dispatch({
        actionType: 'slides:next'
      })
    }
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
