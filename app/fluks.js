if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    function Temp() {}
    var hasOwn = Object.prototype.hasOwnProperty;
    return function (O) {
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null;
      if (arguments.length > 1) {
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }
      return obj;
    };
  })();
}

if (!Array.prototype.forEach) {
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

var fluks = (function(){
  var _storeHandleID = 0;

  return {
    observable: function(argObj){
      var _registeredCallbacks = [],
          _methods = {};

      argObj.on = function(e, cb){
        _storeHandleID++;

        _registeredCallbacks.push({
          id: _storeHandleID,
          event: e,
          callback: cb
        });

        return _storeHandleID;
      };

      argObj.off = function(id){
        var location = false;

        _registeredCallbacks.forEach(function(obj, i){
          if(obj.id === id){
            location = i;
          }

          if(location >= 0){
            _registeredCallbacks.splice(location, 1);
          }
        });
      };

      argObj.trigger = function(event){
        _registeredCallbacks.forEach(function(obj, i){
          if(obj.event === event){
            obj.callback();
          }
        });
      };

      return argObj;
    },
    Dispatcher: function(){
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

      // register(fn) returns handle
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

      // unregister(obj)
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

      // waitFor(arr, str, fn)
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
        }, function(error){
          console.error(".waitFor() promise rejected: ", error);
        });
      };

      return self;
    }
  };
})();
