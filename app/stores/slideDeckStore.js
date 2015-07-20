function SlideDeckStore(slideDispatcher, slideStore) {
  riot.observable(this); // Riot event emitter

  var self = this;

  self.inEditMode = false;
  self.currentSlideIndex = 0;

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
        self.currentSlideIndex = slideStore.getSlides().length-1;
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
        if(self.getCurrentSlideIndex() < slideStore.getSlides().length-1){
          self.currentSlideIndex++;
        }
        break;

      case 'slides:remove':
        self.currentSlideIndex--;
        break;

    }
  });

  return self;
}
