var firebaseRef = new Firebase("https://flux-test.firebaseio.com/"),
    slideDispatcher = new Dispatcher(),
    slideStore = new SlideStore(slideDispatcher),
    slideDeckStore = new SlideDeckStore(slideDispatcher, slideStore);

var d = new disp();

var first = d.register(function(payload){
  switch(payload.actionType){
    case 'just:doit':
      console.log("1st i did it!");

      break;
    case 'think:aboutit':
      d.waitFor([second, third], payload.actionType, function(){
        console.log("waited for second and third, now it's my turn:");
        console.log("1st thought about it");
      });
      break;
  }
});

var second = d.register(function(payload){
  var self = this;

  switch(payload.actionType){
    case 'think:aboutit':
      setTimeout(function(){
        console.log("2nd thought about it!");
        self.done(payload.actionType);
        // second.error('bah');
      }, 2500);

      break;
  }
});

var third = d.register(function(payload){
  var self = this;

  switch(payload.actionType){
    case 'think:aboutit':
      setTimeout(function henk(){
        console.log("3rd thought about it!");
        self.done(payload.actionType);
        // second.error('bah');
      }, 1500);

      break;
  }
});

// d.unregister(first);

d.dispatch({
  actionType: 'think:aboutit',
  foo: 'bar'
});

d.dispatch({
  actionType: 'just:doit',
  foo: 'bar'
});

riot.mount('slidedeck');
