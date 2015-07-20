var firebaseRef = new Firebase("https://flux-test.firebaseio.com/"),
    slideDispatcher = new Dispatcher(),
    slideStore = new SlideStore(slideDispatcher);

riot.mount('slidedeck');
