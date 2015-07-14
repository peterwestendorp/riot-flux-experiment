riot.tag('slidedeck', '<ul> <li each="{slide, i in slides }" class="{ hidden: currentSlide < i, slide: true }" riot-style="background-color: { slide.color }"> <h3 contenteditable="{ inEditMode }" oninput="{ editTitle }">{ slide.title }</h3> <p contenteditable="{ inEditMode }" oninput="{ editContent }">{ slide.content }</p> <button if="{ inEditMode }" onclick="{ parent.remove }">Remove</button> </li> </ul> <button onclick="{ toggleEditMode }" class="{ active:inEditMode }">Edit mode</button> <button if="{ inEditMode }" onclick="{ add }">Add</button> <button onclick="{showPrev}">prev</button> <button onclick="{showNext}">next</button>', 'slidedeck ul, [riot-tag="slidedeck"] ul,slidedeck ul > li, [riot-tag="slidedeck"] ul > li{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; } slidedeck ul > li, [riot-tag="slidedeck"] ul > li{ text-align: center; color: #FFF; -webkit-transition: opacity .5s ease-in-out; } slidedeck ul > li.hidden, [riot-tag="slidedeck"] ul > li.hidden{ opacity: 0; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; } slidedeck ul > li h3, [riot-tag="slidedeck"] ul > li h3{ font-size: 75px; } slidedeck button, [riot-tag="slidedeck"] button{ position: relative; z-index: 99; } slidedeck button.active, [riot-tag="slidedeck"] button.active{ background-color: green; }', function(opts) {
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

    this.add = function() {
      RiotControl.trigger('slides:add')
      self.currentSlide = self.slides.length-1
    }.bind(this);

    this.remove = function(e) {
      RiotControl.trigger('slides:remove', e.item.i)
    }.bind(this);

    this.editTitle = function(e) {
      var newTitle = e.target.innerHTML
      RiotControl.trigger('slides:edit:title', e.item.i, newTitle)
    }.bind(this);

    this.editContent = function(e) {
      var newContent = e.target.innerHTML
      RiotControl.trigger('slides:edit:content', e.item.i, newContent)
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
  
});
