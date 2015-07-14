var slideStore = new SlideStore(),
    slidedeck;

document.body.innerHTML = '<slidedeck></slidedeck>';
RiotControl.addStore(slideStore);
slidedeck = riot.mount('slidedeck')[0];

describe('slidedeck', function() {
    it('should have an add function defined', function () {
        expect(slidedeck.add).toBeDefined();
    });

    it('add function should add a todo item to this.items', function () {
      var initCount = slideStore.slides.length;

      slidedeck.add();

      expect(slideStore.slides.length).toEqual(initCount+1)
      // slidedeck.update();
    })
});







