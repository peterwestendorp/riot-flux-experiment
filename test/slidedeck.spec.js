document.write('<script src="http://localhost:8080/vendor/riotcontrol.js"></script>');

// Create mounting point in DOM
document.body.innerHTML = '<slidedeck></slidedeck>';

// Define required tag module
var slidedeck = riot.mount('slidedeck')[0];

// Test to your heart's content!
describe('slidedeck', function() {

    // it('should have an add function defined', function () {
    //     expect(todo.add).toBeDefined();
    // });

    it('add function should add a todo item to this.items', function () {
        var initCount = slidedeck.slides.length;

        slidedeck.add();

        slidedeck.update();

        expect(slidedeck.slides.length).toEqual(initCount + 1);
    })
});







