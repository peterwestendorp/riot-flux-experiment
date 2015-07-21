var firebaseRef = new Firebase("https://flux-test.firebaseio.com/"),
    slideDispatcher = new Dispatcher(),
    slideStore = new SlideStore(slideDispatcher),
    slideDeckStore = new SlideDeckStore(slideDispatcher, slideStore);

var d = new disp();

var first = d.register(function(payload){
  switch(payload.actionType){
    case 'just:doit':
      second.waitUntilDone.then(function(actionType){
        console.log("1st i did it!", actionType);
      });
      break;
  }
});

var second = d.register(function(payload){
  var self = this;
  switch(payload.actionType){
    case 'just:doit':
      console.log("2nd i did it!");

      setTimeout(function(){
        self.done(payload.actionType);
        // second.error('bah');
      }, 1500);

      break;
  }
});

// d.unregister(first);

d.dispatch({
  actionType: 'just:doit',
  foo: 'bar'
});

riot.mount('slidedeck');
