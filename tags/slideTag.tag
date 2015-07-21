<slide style="background-color: { slide.color }">
  <h3 contenteditable="{ parent.getEditMode() }" oninput="{ editTitle }">{ slide.title }</h3>
  <p contenteditable="{ parent.getEditMode() }" oninput="{ editContent }">{ slide.content }</p>
  <button if="{ parent.getEditMode() }" onclick="{ removeSlide }">Remove</button>

  <script>
    editTitle(e){
      var newTitle = e.target.innerHTML
      slideDispatcher.dispatch({
        actionType: 'slides:edit:title',
        index: e.item.i,
        title: newTitle
      });
    }

    editContent(e){
      var newContent = e.target.innerHTML
      slideDispatcher.dispatch({
        actionType: 'slides:edit:content',
        index: e.item.i,
        content: newContent
      });
    }

    removeSlide(e){
      slideDispatcher.dispatch({
        actionType: 'slides:remove',
        index: e.item.i
      });
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
