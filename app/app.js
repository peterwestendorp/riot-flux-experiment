var firebaseRef = new Firebase("https://flux-test.firebaseio.com/"),
    slideDispatcher = new Dispatcher(),
    slideStore = new SlideStore(slideDispatcher),
    slideDeckStore = new SlideDeckStore(slideDispatcher, slideStore);

var d = new disp();

var first = d.register(function(payload){
  switch(payload.actionType){
    case 'just:doit':
      d.waitFor([second, third], function(){
        console.log("waited for second and third, now it's my turn");
        console.log("1st i did it!");
      });

      break;
  }
});

var second = d.register(function(payload){
  var self = this;
  switch(payload.actionType){
    case 'just:doit':
      setTimeout(function(){
        console.log("2nd i did it!");
        self.done(payload.actionType);
        // second.error('bah');
      }, 2500);

      break;
  }
});

var third = d.register(function(payload){
  var self = this;
  switch(payload.actionType){
    case 'just:doit':
      setTimeout(function(){
        console.log("3rd i did it!");
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
