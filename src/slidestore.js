function SlideStore() {
  riot.observable(this); // Riot event emitter

  var self = this;

  // SET SLIDES
  self.slides = JSON.parse(localStorage.getItem('slides')) || [
    { title: 'Slide 1', content: 'Content 1', color: '#FF0000' },
    { title: 'Slide 2', content: 'Content 2', color: '#00FF00' }
  ];

  // ADD SLIDE
  self.on('slides:add', function(newSlide) {
    self.slides.push({title: 'New Slide',content: 'Lorum Ipsum...',color: '#0000FF'});
    self.trigger('slides:changed', self.slides);
  });

  // REMOVE SLIDE
  self.on('slides:remove', function(i) {
    self.slides.splice(i, 1);
    self.trigger('slides:changed', self.slides);
  });

  // EDIT SLIDE
  self.on('slides:edit:title', function(i, newTitle) {
    if(newTitle){
      self.slides[i]['title'] = newTitle;
    }
    self.trigger('slides:changed', self.slides);
  });

  self.on('slides:edit:content', function(i, newContent) {
    if(newContent){
      self.slides[i]['content'] = newContent;
    }
    self.trigger('slides:changed', self.slides);
  });

  // INIT SLIDES
  self.on('slides:init', function() {
    self.trigger('slides:changed', self.slides);
  });

  // STORE SLIDES
  self.on('slides:changed', function(slides){
    localStorage.setItem('slides', JSON.stringify(slides));
  });

}
