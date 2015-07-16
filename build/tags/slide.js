riot.tag('slide', '<h3 contenteditable="{ parent.inEditMode }" oninput="{ editTitle }">{ slide.title }</h3> <p contenteditable="{ parent.inEditMode }" oninput="{ editContent }">{ slide.content }</p> <button if="{ parent.inEditMode }" onclick="{ removeSlide }">Remove</button>', 'slide { display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; text-align: center; color: #FFF; } slide.active { display:block; } slide h3 { font-size: 75px; }', 'style="background-color: { slide.color }"', function(opts) {
    this.editTitle = function(e) {
      var newTitle = e.target.innerHTML
      RiotControl.trigger('slides:edit:title', e.item.i, newTitle)
    }.bind(this);

    this.editContent = function(e) {
      var newContent = e.target.innerHTML
      RiotControl.trigger('slides:edit:content', e.item.i, newContent)
    }.bind(this);

    this.removeSlide = function(e) {
      RiotControl.trigger('slides:remove', e.item.i)
    }.bind(this);
  
});
