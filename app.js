var Dispatcher = require('flux').Dispatcher,
    slideStore = new SlideStore(); // Create a store instance.

RiotControl.addStore(slideStore); // Register the store in central dispatch.
riot.mount('slidedeck');

console.log("Dispatcher", Dispatcher);
