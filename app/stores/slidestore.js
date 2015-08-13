function SlideStore(args) {
  fluks.observable(this); // fluks event emitter

  var _save,
      self = this,
      slideDispatcher = args.dispatcher,
      firebaseRef = args.fbRef,
      slideFactory = [
        { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
        { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
      ],
      history = [];

  // LOAD SLIDES
  firebaseRef.child("slides").on("value", function(snapshot) {
    var slides = snapshot.val() || slideFactory;

    slides.forEach(function(slide, i){
      self.slides = (i === 0) ? Immutable.List.of(slide) : self.slides.push(slide);
    });
    self.trigger('slides:loaded');
  });

  // GET SLIDES
  self.getSlides = function(){
    return self.slides.toArray();
  };

  self.hasHistory = function(){
    return history.length > 0;
  };

  self.dispatchToken = slideDispatcher.register(function(payload) {
    switch(payload.actionType){

      // ADD SLIDE
      case 'slides:add':
        history.push(self.slides)
        self.slides = self.slides.push({title: 'New Slide', content: 'Lorum Ipsum...', color: '#0000FF'});
        _save(payload.actionType);
        break;

      // REMOVE SLIDE
      case 'slides:remove':
        history.push(self.slides)
        self.slides = self.slides.splice(payload.index, 1);
        _save(payload.actionType);
        break;

      // EDIT SLIDE
      case 'slides:edit:title':
        history.push(self.slides)
        self.slides = self.slides[payload.index]['title'] = payload.title;
        _save(payload.actionType);
        break;

      case 'slides:edit:content':
        history.push(self.slides)
        self.slides = self.slides[payload.index]['content'] = payload.content;
        _save(payload.actionType);
        break;

      // UNDO ACTION
      case 'slides:undo':
        if(history.length > 0){
          self.slides = history.pop()
        }
        break;

    }
  });

  // SAVE SLIDES
  _save = function(actionType){
    firebaseRef.set({
      slides: self.slides.toJSON()
    }, function(error) {
      if (error) {
        console.error("data could not be saved." + error);
        self.dispatchToken.error(actionType);
      } else {
        self.dispatchToken.done(actionType);
      }
    });
  };

  return self;
}
