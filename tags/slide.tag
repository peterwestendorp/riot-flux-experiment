<slide style="background-color: { slide.color }">
  <h3 contenteditable="{ parent.inEditMode }" oninput="{ editTitle }">{ slide.title }</h3>
  <p contenteditable="{ parent.inEditMode }" oninput="{ editContent }">{ slide.content }</p>
  <button if="{ parent.inEditMode }" onclick="{ removeSlide }">Remove</button>

  <script>
    editTitle(e){
      var newTitle = e.target.innerHTML
      RiotControl.trigger('slides:edit:title', e.item.i, newTitle)
    }

    editContent(e){
      var newContent = e.target.innerHTML
      RiotControl.trigger('slides:edit:content', e.item.i, newContent)
    }

    removeSlide(e){
      RiotControl.trigger('slides:remove', e.item.i)
    }
  </script>

  <style>
    slide {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0;
      text-align: center;
      color: #FFF;
    }
    slide.active {
      display:block;
    }
    slide h3 {
      font-size: 75px;
    }
  </style>
</slide>
