"use strict";

var disp = function(){
  var self = this,
      _handleID = 0,
      _registeredCallbacks = [];

  // proxy(obj, fn)
  self.proxy = function(scope, fn){
    return function(){
      fn.apply(scope, arguments || []);
    };
  };

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

  self.waitFor = function(handles, cb){
    var promises = [];

    self.forEach(handles, function(handle){
      promises.push(handle.promise);
    });

    Q.all(promises).then(cb);
  };

  return self;

};
