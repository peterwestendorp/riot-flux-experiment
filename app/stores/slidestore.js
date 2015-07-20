function SlideStore(slideDispatcher) {
  riot.observable(this); // Riot event emitter

  var self = this,
      slideFactory = [
        { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
        { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
      ];

  // GET SLIDES FROM FIREBASE
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
        self.trigger('slides:save');
        break;

      // REMOVE SLIDE
      case 'slides:remove':
        self.slides.splice(payload.index, 1);
        self.trigger('slides:save');
        break;

      // EDIT SLIDE
      case 'slides:edit:title':
        self.slides[payload.index]['title'] = payload.title;
        self.trigger('slides:save');
        break;

      case 'slides:edit:content':
        self.slides[payload.index]['content'] = payload.content;
        self.trigger('slides:save');
        break;

    }
  });

  // STORE SLIDES
  self.on('slides:save', function(){
    firebaseRef.set({
      slides: self.slides
    }, function(error) {
      if (error) {
        console.error("Data could not be saved." + error);
      } else {
        self.trigger('slides:changed');
      }
    });
  });

  return self;
}
