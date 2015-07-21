"use strict";

var disp = function(){
  var self = this,
      _handleID = 0,
      _registeredCallbacks = [];

  // forEach(arr, fn, obj)
  self.forEach = function(arr, fn, thisObj) {
    var i = 0, l = arr && arr.length || 0;
    if(thisObj){
      for(; i < l; ++i){
        fn.call(thisObj, arr[i], i, arr);
      }
    }else{
      for(; i < l; ++i){
        fn(arr[i], i, arr);
      }
    }
  };

  // register(str, fn) returns handle
  self.register = function(cb){
    var deferred = Q.defer(),
        obj;

    _handleID++;
    obj = {
      id: "ID_"+_handleID,
      callback: cb,
      promise: deferred.promise,
      done: deferred.resolve,
      error: deferred.reject
    };

    _registeredCallbacks.push(obj);

    return obj;
  };

  // unregister(handle)
  self.unregister = function(handle){
    var location = false;
    self.forEach(_registeredCallbacks, function(obj, i){
      if(obj.id ===  handle.id){
        location = i;
        return false;
      }
    });

    if(location >= 0){
      _registeredCallbacks.splice(location, 1);
    }
  };

  // dispatch(obj)
  self.dispatch = function(args){
    if(!args.hasOwnProperty('actionType')){
      console.error("No actionType was defined for dispatch().");
      return;
    }

    self.forEach(_registeredCallbacks, function(obj, i){
      obj.callback(args);
    });
  };

  self.waitFor = function(handles, actionType, cb){
    var promises = [];

    self.forEach(handles, function(handle){
      promises.push(handle.promise);
    });

    Q.all(promises).then(function(){
      var actionTypeMatch = false;

      self.forEach(arguments[0], function(arg){
        if(arg === actionType){
          actionTypeMatch = true;
        }
      });

      actionTypeMatch ? cb() : console.error("waitFor(); no actionType matches "+
        "fulfilled promises. \n"+
        "Pass 'actionType' as argument into '.done()' method.\n"+
        "And make sure this actionType is calling '.done()' at least once in "+
        "any 'dispatcher.register()'.");
    });
  };

  return self;

};
