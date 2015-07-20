function SlideStore(slideDispatcher) {
  riot.observable(this); // Riot event emitter

  var self = this,
      slideFactory = [
        { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
        { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
      ];

  self.inEditMode = false;
  self.currentSlideIndex = 0;

  // GET SLIDES FROM FIREBASE
  firebaseRef.child("slides").on("value", function(snapshot) {
    self.slides = snapshot.val() || slideFactory;
    self.trigger('slides:loaded', self.slides);
  });

  // GET SLIDES
  self.getSlides = function(){
    return self.slides;
  };

  // GET EDITMODE
  self.getEditMode = function(){
    return self.inEditMode;
  };

  // GET CURRENT SLIDE INDEX
  self.getCurrentSlideIndex = function(){
    return self.currentSlideIndex;
  };

  self.dispatchToken = slideDispatcher.register(function(payload) {
    switch(payload.actionType){
      // ADD SLIDE
      case 'slides:add':
        // slideDispatcher.waitFor([self.loadedDispatchToken]);
        self.slides.push({title: 'New Slide', content: 'Lorum Ipsum...', color: '#0000FF'});

        self.currentSlideIndex = self.slides.length-1;
        self.trigger('slides:changed', self.slides);
        break;

      // REMOVE SLIDE
      case 'slides:remove':
        self.slides.splice(payload.index, 1);
        self.trigger('slides:changed', self.slides);
        break;

      // EDIT SLIDE
      case 'slides:edit:title':
        self.slides[payload.index]['title'] = payload.title;
        self.trigger('slides:changed', self.slides);
        break;

      case 'slides:edit:content':
        self.slides[payload.index]['content'] = payload.content;
        self.trigger('slides:changed', self.slides);
        break;

      // EDIT MODE TOGGLE
      case 'slides:toggle-edit-mode':
        self.inEditMode = !self.inEditMode;
        break;

      // PREVIOUS SLIDE
      case 'slides:prev':
        if(self.getCurrentSlideIndex()){
          self.currentSlideIndex--;
        }
        break;

      // NEXT SLIDE
      case 'slides:next':
        if(self.getCurrentSlideIndex() < self.slides.length-1){
          self.currentSlideIndex++;
        }
        break;

    }
  });

  // STORE SLIDES
  self.on('slides:changed', function(slides){
    firebaseRef.set({
      slides: self.slides
    }, function(error) {
      if (error) {
        console.error("Data could not be saved." + error);
      } else {
        console.log("Data saved successfully.");
      }
    });
  });

  return self;
}
