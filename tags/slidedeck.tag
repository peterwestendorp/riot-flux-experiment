<slidedeck>
  <ul>
    <li each={slide, i in slides }
        class={ hidden: currentSlide < i, slide: true }
        style="background-color: { slide.color }">
      <h3 contenteditable={ inEditMode } oninput={ editTitle }>{ slide.title }</h3>
      <p contenteditable={ inEditMode } oninput={ editContent }>{ slide.content }</p>
      <button if={ inEditMode } onclick={ parent.remove }>Remove</button>
    </li>
  </ul>

  <button onclick={ toggleEditMode } class={ active:inEditMode }>Edit mode</button>
  <button if={ inEditMode } onclick={ add }>Add</button>
  <button onclick={showPrev}>prev</button>
  <button onclick={showNext}>next</button>

  <script>
    var self = this

    self.inEditMode = false
    self.currentSlide = 0

    self.on('mount', function() {
      RiotControl.trigger('slides:init')
    })

    RiotControl.on('slides:changed', function(slides) {
      self.slides = slides
      self.update()
    })

    add() {
      RiotControl.trigger('slides:add')
      self.currentSlide = self.slides.length-1
    }

    remove(e) {
      RiotControl.trigger('slides:remove', e.item.i)
    }

    editTitle(e){
      var newTitle = e.target.innerHTML
      RiotControl.trigger('slides:edit:title', e.item.i, newTitle)
    }

    editContent(e){
      var newContent = e.target.innerHTML
      RiotControl.trigger('slides:edit:content', e.item.i, newContent)
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
  </script>

  <style scoped>
    ul,
    ul > li {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0;
    }
    ul > li {
      text-align: center;
      color: #FFF;
      -webkit-transition: opacity .5s ease-in-out;
    }
    ul > li.hidden {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
    ul > li h3 {
      font-size: 75px;
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
