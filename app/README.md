Dispatcher.js

A simple dispatcher that supports async through promises.
Apart from that, the basic idea is very similar to that of Facebook's Dispatcher.js


Usage
=====

Initialize
----------

    var disp = new Dispatcher();


.register()
-----------

    disp.register()

Takes a callback function as argument. Callback is fired EVERYTIME the
`disp.dispatch()` method is called.

The `payload` argument has an `actionType` property.
Check for actionType in the callback for specific actions:

    disp.register(function(payload){
      switch(payload.actionType){
        case 'justdo:it':
          console.log("i did it!");
          break;
      }
    });

Returns a handle:

    var handle = disp.register();


.unregister()
-------------

    disp.register()`

Takes dispatch register handle as argument:

    var handle = disp.register();
    disp.unregister(handle);


.dispatch()
-----------

    disp.dispatch({actionType: 'justdo:it'})`

You can send additional data with the object literal in the dispatch method:

    slideDispatcher.dispatch({
      actionType: 'thinkabout:it',
      foo: 'bar'
    });


.waitFor()
----------

    disp.waitFor([handle], 'myActionType', callbackFunction);

Takes an array of register handles, an actionType to wait for, and a callback
function.

If there are no actionTypes in the handle callback that match the given actionType,
the callback function won't fire.

This method should only be used by a callback in response to a dispatched payload.


Example
=======

    var slideDispatcher = new Dispatcher();

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

    slideDispatcher.dispatch({
      actionType: 'thinkabout:it',
      foo: 'bar'
    });

    slideDispatcher.dispatch({
      actionType: 'justdo:it',
      foo: 'bar'
    });
