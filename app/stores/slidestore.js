function SlideStore(slideDispatcher) {
  riot.observable(this); // Riot event emitter

  var _save,
      self = this,
      slideFactory = [
        { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
        { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
      ];

  // LOAD SLIDES
  firebaseRef.child("slides").on("value", function(snapshot) {
    self.slides = snapshot.val() || slideFactory;
    self.trigger('slides:loaded');
  });

  // GET SLIDES
  self.getSlides = function(){
    return self.slides;
  };

  self.dispatchToken = slideDispatcher.register(function(payload) {
    switch(payload.actionType){

      // ADD SLIDE
      case 'slides:add':
        self.slides.push({title: 'New Slide', content: 'Lorum Ipsum...', color: '#0000FF'});
        _save();
        break;

      // REMOVE SLIDE
      case 'slides:remove':
        self.slides.splice(payload.index, 1);
        _save();
        break;

      // EDIT SLIDE
      case 'slides:edit:title':
        self.slides[payload.index]['title'] = payload.title;
        _save();
        break;

      case 'slides:edit:content':
        self.slides[payload.index]['content'] = payload.content;
        _save();
        break;

    }
  });

  // SAVE SLIDES
  _save = function(){
    firebaseRef.set({
      slides: self.slides
    }, function(error) {
      if (error) {
        console.error("data could not be saved." + error);
      } else {
        self.trigger('slides:changed');
      }
    });
  };

  return self;
}
