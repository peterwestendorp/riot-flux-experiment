function SlideStore(slideDispatcher) {
  riot.observable(this); // Riot event emitter

  var self = this;

  self.inEditMode = false;
  self.currentSlideIndex = 0;

  // SET SLIDES
  self.slides = JSON.parse(localStorage.getItem('slides')) || [
    { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
    { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
  ];

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

  slideDispatcher.register(function(payload) {
    switch(payload.actionType){
      // ADD SLIDE
      case 'slides:add':
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
    localStorage.setItem('slides', JSON.stringify(slides));
  });

  return self;
}
