Dispatcher.js

A simple dispatcher that supports async through promises.
Apart from that the basic idea is very similar to that of Facebook's Dispatcher.js


USAGE
=====

Initialize
----------

`var disp = new Dispatcher();`

Register
--------

`disp.register()`

Takes  callback function as argument. Callback is fired EVERYTIME the
`disp.dispatch()` method is called.

The `payload` argument has an `actionType` property.
Check for actionType in the callback for specific actions:

`disp.register(function(payload){
  switch(payload.actionType){
    case 'justdo:it':
      console.log("i did it!");
      break;
  }
});`


Unregister
----------
`disp.register()`

Takes dispatch register handle as argument:

`var handle = disp.register();

disp.unregister(handle);
`


Dispatch
--------
`disp.dispatch({actionType: 'justdo:it'})`

You can send additional data with the object literal in the dispatch method:

`slideDispatcher.dispatch({
  actionType: 'thinkabout:it',
  foo: 'bar'
});`


waitFor
-------
fjhfjhf


EXAMPLE
=======

`var slideDispatcher = new Dispatcher();

var first = slideDispatcher.register(function(payload){
  switch(payload.actionType){
    case 'justdo:it':
      console.log("1st i did it!");
      break;

    case 'thinkabout:it':
      slideDispatcher.waitFor([second, third], payload.actionType, function(){
        console.log("waited for second and third, now it's my turn:");
        console.log("1st thought about it");
      });
      break;
  }
});

var second = slideDispatcher.register(function(payload){
  var self = this;

  switch(payload.actionType){
    case 'thinkabout:it':
      setTimeout(function(){
        console.log("2nd thought about it!");
        self.done(payload.actionType);
        // second.error('bah');
      }, 2500);
      break;
  }
});

var third = slideDispatcher.register(function(payload){
  var self = this;

  switch(payload.actionType){
    case 'thinkabout:it':
      setTimeout(function henk(){
        console.log("3rd thought about it!");
        self.done(payload.actionType);
        // second.error('bah');
      }, 1500);
      break;
  }
});

// slideDispatcher.unregister(first);

slideDispatcher.dispatch({
  actionType: 'thinkabout:it',
  foo: 'bar'
});

slideDispatcher.dispatch({
  actionType: 'justdo:it',
  foo: 'bar'
});`