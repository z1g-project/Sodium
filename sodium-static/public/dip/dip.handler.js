/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 160:
/***/ ((module) => {

// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ 174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _window = self || window;
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(window) {
    if (window === void 0) { window = _window; }
    window.__DIP.message = function (target) {
        if (target === void 0) { target = window; }
        return function () {
            if (target instanceof (target.MessagePort || /** @class */ (function () {
                function MessagePort() {
                }
                return MessagePort;
            }())) || target instanceof (window.MessagePort || /** @class */ (function () {
                function MessagePort() {
                }
                return MessagePort;
            }())))
                return target.postMessage.apply(target, arguments);
            var origin = '*';
            var ports = false;
            var portArg = undefined;
            var noOrigin = false;
            if (Array.isArray(arguments[2]) && (JSON.stringify(arguments[2].map(function (e) { return e instanceof window.MessagePort; })) == JSON.stringify(arguments[2].map(function (e) { return true; }))))
                ports = true;
            if (target instanceof window.MessagePort) {
                noOrigin = true;
                origin = undefined;
            }
            ;
            if (target instanceof window.Worker) {
                noOrigin = true;
                origin = undefined;
            }
            ;
            if (target instanceof (window.DedicatedWorkerGlobalScope || /** @class */ (function () {
                function DedicatedWorkerGlobalScope() {
                }
                return DedicatedWorkerGlobalScope;
            }()))) {
                origin = undefined;
                noOrigin = true;
            }
            ;
            if (noOrigin && ports)
                origin = arguments[2];
            if (ports)
                portArg = arguments[2];
            var finalArgs = [];
            finalArgs.push({ data: arguments[0], __origin: arguments[1] });
            if (origin)
                finalArgs.push(origin);
            if (portArg)
                finalArgs.push(portArg);
            return target.postMessage.apply(target, finalArgs);
        };
    };
    var MessageEvent = /** @class */ (function () {
        function MessageEvent(event) {
            this.message = { origin: '*', data: null };
            for (var entry in (event)) {
                if (entry == 'data' && !event[entry].__origin)
                    event[entry].__origin = '';
                if (entry !== 'origin')
                    this[entry] = event[entry];
            }
        }
        Object.defineProperty(MessageEvent.prototype, "origin", {
            get: function () {
                return this.message.origin;
            },
            set: function (val) {
                this.message.origin = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MessageEvent.prototype, "data", {
            get: function () {
                return this.message.data;
            },
            set: function (val) {
                if (val.__origin !== undefined && val.data) {
                    this.message.origin = val.__origin;
                    this.message.data = val.data;
                }
                if (val.__origin !== undefined && val.data)
                    val = val.data;
                this.message.data = val;
            },
            enumerable: false,
            configurable: true
        });
        return MessageEvent;
    }());
    Object.defineProperty(window, 'onmessage', {
        get: function () {
            return window.messageListener;
        },
        set: function (val) {
            if (window.messageListener)
                window.removeEventListener('message', window.messageListener);
            window.messageListener = val;
            window.addEventListener('message', val);
        }
    });
    window.addEventListener = new Proxy(window.addEventListener, {
        apply: function (t, g, a) {
            if (a[0] == 'message') {
                var original_1 = a[1];
                if (!a[1])
                    return Reflect.apply(t, g, a);
                a[1] = function (event) {
                    event = new MessageEvent(event);
                    return original_1(event);
                };
            }
            return Reflect.apply(t, g, a);
        }
    });
    window.Worker.prototype.addEventListener = new Proxy(window.Worker.prototype.addEventListener, {
        apply: function (t, g, a) {
            if (a[0] == 'message') {
                var original_2 = a[1];
                a[1] = function (event) {
                    event = new MessageEvent(event);
                    return original_2(event);
                };
            }
            return Reflect.apply(t, g, a);
        }
    });
}
/*var _window = self||window

export default function(window = _window) {

  window.__DIP.message = function(target = window) {
    return function() {
      //if (target instanceof target.MessagePort||target instanceof window.MessagePort) return target.postMessage(...arguments);
      var origin = '*';
      var ports = false;
      var portArg = undefined;
      var noOrigin = false;
      if (Array.isArray(arguments[2])&&arguments[2].length&&(JSON.stringify(arguments[2].map(e=>e instanceof window.MessagePort))==JSON.stringify(arguments[2].map(e=>true)))) ports = true;
      if (target instanceof window.MessagePort) {noOrigin = true; origin = undefined;};
      if (target instanceof window.Worker) {noOrigin = true; origin = undefined;};
      if (target instanceof (window.DedicatedWorkerGlobalScope||class{})) {
        origin = undefined;
        noOrigin = true;
      };

      if (noOrigin&&ports) origin = arguments[2];
      if (ports) portArg = arguments[2];

      var finalArgs = [];

      finalArgs.push({data: arguments[0], __origin: arguments[1]});
      if (origin) finalArgs.push(origin);
      if (portArg) finalArgs.push(portArg);


      return target.postMessage(...finalArgs);
    }
  }

  class MessageEvent {
    #message = {origin: '*', data: null};
    change = true;
    
    constructor(event) {
      if (event.data&&event.data.__origin=='*') this.change = false;
      if (!event.data||!event.data.data||!event.data.__origin) this.change = false;
      for (var entry in (event)) {
        if (entry == 'data'&&!event[entry].__origin) event[entry].__origin = '';
        if (entry!=='origin') this[entry] = event[entry];
      }

      console.log(this);
    }
  
    get origin() {
      return this.#message.origin;
    }
    set origin(val) {
      return this.#message.origin = val;
    }
  
    get data() {
      return this.#message.data
    }
    set data(val) {
      if (val.__origin!==undefined&&val.data==undefined) {
        this.#message.origin = val.__origin;
        this.#message.data = val.data;
      }
      if (val.__origin!==undefined&&val.data!==undefined) val = val.data;
      return this.#message.data = val;
    }
  }
  
  Object.defineProperty(window, 'onmessage', {
    get() {
      return window.messageListener;
    },
    set(val) {
      if (window.messageListener) window.removeEventListener('message', window.messageListener);
      window.messageListener = val;
      window.addEventListener('message', val);
    }
  })

  Object.defineProperty(window.Worker.prototype, 'onmessage', {
    get() {
      return this.messageListener;
    },
    set(val) {
      if (this.messageListener) this.removeEventListener('message', this.messageListener);
      this.messageListener = val;
      this.addEventListener('message', val);
    }
  })
  
  window.addEventListener = new Proxy(window.addEventListener, {
    apply(t, g, a) {
      if (a[0]=='message') {
        const original = a[1];
        
        a[1] = function(event) {
          //var og = event;
          event = new MessageEvent(event);

          //if (!event.change) event = og;
  
          return original(event);
        }
      }
      return Reflect.apply(t, g, a);
    }
  })

  window.Worker.prototype.addEventListener = new Proxy(window.Worker.prototype.addEventListener, {
    apply(t, g, a) {
      if (a[0]=='message') {
        const original = a[1];
        
        a[1] = function(event) {
          //var og = event;
          event = new MessageEvent(event);

          if (!event.change) event = og;
  
          //return original(event);
        }
      }
      return Reflect.apply(t, g, a);
    }
  })

  /*window.MessagePort.prototype.addEventListener = new Proxy(window.MessagePort.prototype.addEventListener, {
    apply(t, g, a) {
      if (a[0]=='message') {
        const original = a[1];

        delete a[2];
        
        a[1] = function(event) {
          event = new MessageEvent(event);
  
          return original(event);
        }
      }
      return Reflect.apply(t, g, a);
    }
  })

  window.MessageChannel = new Proxy(window.MessageChannel, {
    construct(t, a) {
      var fake = Reflect.construct(t, a);

      return fake;
    }
  })
}*/ 


/***/ }),

/***/ 181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _window = self || window;
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(window) {
    if (window === void 0) { window = _window; }
    window._ReflectGet = window.Reflect.get;
    window._ReflectSet = window.Reflect.set;
    window.Reflect.get = new Proxy(window.Reflect.get, {
        apply: function (t, g, a) {
            var _a, _b;
            var obj = a[0];
            var prop = a[1];
            var ObjWindow = ((_b = (_a = obj === null || obj === void 0 ? void 0 : obj.window) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.globalThis) !== undefined;
            if (obj instanceof window.Location)
                obj = window.__DIP.location;
            //if (ObjWindow) obj = obj.__DIP.window;
            return obj[prop];
        }
    });
    window.Reflect.set = new Proxy(window.Reflect.set, {
        apply: function (t, g, a) {
            var obj = a[0];
            var prop = a[1];
            var value = a[2];
            if (obj == window)
                obj = window.__DIP.window;
            if (prop == 'location')
                obj = window.__DIP.location;
        }
    });
}
;


/***/ }),

/***/ 173:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _window = self || window;
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(window) {
    if (window === void 0) { window = _window; }
    window.__DIP.window = new Proxy(window, {
        get: function (obj, prop) {
            if (prop == 'location')
                return window.__DIP.location;
            if (prop == 'top')
                return window.top.__DIP.window;
            if (prop == 'parent')
                return window.parent.__DIP.window;
            return window._ReflectGet(window, prop);
        },
        set: function (obj, prop, value) {
            window[prop] = value;
            return !value ? true : value;
        }
    });
}


/***/ }),

/***/ 159:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var xor = {
    key: 2,
    encode: function (str, key) {
        if (!key)
            key = xor.key;
        if (!str)
            return str;
        var encoded = encodeURIComponent((str).split('').map(function (char, ind) { return ind % key ? String.fromCharCode(char.charCodeAt() ^ key) : char; }).join(''));
        if (!encoded.endsWith('/'))
            return encoded + '/';
        else
            return encoded;
    },
    decode: function (str, key) {
        if (!key)
            key = xor.key;
        if (!str)
            return str;
        str = str.replace(new RegExp('\/$', 'g'), '');
        var encoded = (decodeURIComponent(str).split('').map(function (char, ind) { return ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char; }).join(''));
        return encoded;
    }
};
var plain = {
    encode: function (str) {
        if (!str)
            return str;
        var encoded = (str);
        return encoded;
    },
    decode: function (str) {
        if (!str)
            return str;
        var encoded = decodeURIComponent(decodeURIComponent(str));
        return str.replace('https://', 'https:/').replace('https:/', 'https://');
    }
};
var base64 = {
    encode: function (str) {
        if (!str)
            return str;
        var encoded = btoa(encodeURIComponent(str));
        if (!encoded.endsWith('/'))
            return encoded + '/';
        else
            return encoded;
    },
    decode: function (str) {
        if (!str)
            return str;
        str = str.replace(new RegExp('\/$', 'g'), '');
        var encoded = decodeURIComponent(atob(str));
        return encoded;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ xor: xor, plain: plain, base64: base64 });


/***/ }),

/***/ 158:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _encoding_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(159);
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160);
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path_browserify__WEBPACK_IMPORTED_MODULE_1__);


var urlRewriter = /** @class */ (function () {
    function urlRewriter(proxy) {
        this.proxy = proxy;
    }
    urlRewriter.prototype.encoding = function () {
        var encoding;
        switch (this.proxy.config.encoding) {
            case "xor":
                encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_0__["default"].xor;
                break;
            case "plain":
                encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_0__["default"].plain;
                break;
            case "base64":
                encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_0__["default"].base64;
                break;
            case "shuffle":
            default:
                encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_0__["default"].plain;
                break;
        }
        this.proxy.encodeURL = encoding.encode;
        this.proxy.decodeURL = encoding.decode;
    };
    urlRewriter.prototype.encode = function (url, meta) {
        if (!url && url !== '')
            return url;
        if (!this.proxy.decodeURL)
            this.encoding();
        if (!meta.url)
            meta.url = meta;
        url = String(url);
        if (url == '')
            url = meta.url.href;
        if (url.match(/^(data:|#|about:|javascript:|mailto:|blob:)/g))
            return url;
        url = url.replace(/^\/\//g, meta.url.protocol + '//');
        if (url.startsWith(this.proxy.config.prefix))
            return url;
        url = url.replace(location.host, meta.url.host);
        if (url.match(/^(\.\.\/|\.\/)/gi)) {
            var dir = (path_browserify__WEBPACK_IMPORTED_MODULE_1___default().parse(meta.url.pathname)).dir;
            url = path_browserify__WEBPACK_IMPORTED_MODULE_1___default().join(dir, url);
        }
        if ((!url.startsWith('http')) && (!url.startsWith('/'))) {
            var parsed = path_browserify__WEBPACK_IMPORTED_MODULE_1___default().parse(meta.url.pathname);
            //console.log(parsed)
            //if (!parsed.ext) parsed.dir = parsed.root+parsed.base;
            if (parsed.dir == '/')
                parsed.dir = '';
            url = (meta.origin + parsed.dir + '/' + url);
            //console.log(url, parsed)
            //url = meta.origin+url
        }
        if (!url.startsWith('http')) {
            url = meta.origin + (url.startsWith('/') ? url : '/' + url);
        }
        ;
        if (this.proxy.config.replit)
            url = url.replace('https://', 'https:/');
        return this.proxy.config.prefix + this.proxy.encodeURL(url);
    };
    urlRewriter.prototype.decode = function (url) {
        if (!url)
            return url;
        if (!this.proxy.decodeURL)
            this.encoding();
        var index = url.indexOf(this.proxy.config.prefix);
        if (index == -1) {
            throw new Error('bad URL');
        }
        url = url.slice(index + this.proxy.config.prefix.length)
            .replace('https://', 'https:/')
            .replace('https:/', 'https://');
        if (this.proxy.config.replit != undefined)
            url = url.replace('https://', 'https:/');
        if (this.proxy.config.encoding !== 'plain' && url.split('/').length > 1) {
            var one = url.split('/');
            var two = one.map(function (e, i) { if (i !== 0 && e)
                return e + '/';
            else
                return ''; }).join('');
            if (!url.endsWith('/'))
                two = two.replace(/\/$/g, '');
            one = one[0];
            if (two && (!this.proxy.decodeURL(one).endsWith('/')))
                two = '/' + two;
            try {
                url = this.proxy.encodeURL(this.proxy.decodeURL(one) + two);
            }
            catch (e) {
                console.log(e);
            }
        }
        url = new URL(this.proxy.decodeURL(url));
        return url;
    };
    return urlRewriter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (urlRewriter);
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dip_client_message_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(174);
/* harmony import */ var _dip_client_window_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(173);
/* harmony import */ var _dip_client_reflect_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(181);
/* harmony import */ var _encoding_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(159);
/* harmony import */ var _rewrite_url_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(158);
if (!self.__DIP)
    importScripts('/dip/dip.config.js');





(function (self) {
    var encoding;
    switch (self.__DIP.config.encoding) {
        case "xor":
            encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_3__["default"].xor;
            break;
        case "plain":
            encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_3__["default"].plain;
            break;
        case "base64":
            encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_3__["default"].base64;
            break;
        case "shuffle":
        default:
            encoding = _encoding_ts__WEBPACK_IMPORTED_MODULE_3__["default"].plain;
            break;
    }
    self.__DIP.encodeURL = encoding.encode;
    self.__DIP.decodeURL = encoding.decode;
    self.__DIP.URL = new URL((self.__DIP.decodeURL((location.pathname).split(self.__DIP.config.prefix)[1]) + (location.search + location.hash)));
    self.__DIP.location = self.__DIP.URL;
    self.__DIP.url = new _rewrite_url_ts__WEBPACK_IMPORTED_MODULE_4__["default"](self.__DIP);
    (0,_dip_client_message_ts__WEBPACK_IMPORTED_MODULE_0__["default"])(self);
    (0,_dip_client_reflect_ts__WEBPACK_IMPORTED_MODULE_2__["default"])(self);
    (0,_dip_client_window_ts__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
    self.importScripts = new Proxy(self.importScripts, {
        apply: function (t, g, a) {
            a.forEach(function (arg, i) { return a[i] = self.__DIP.url.encode(arg, self.__DIP.URL); });
            console.log(a, 'importScripts');
            return _dip_client_reflect_ts__WEBPACK_IMPORTED_MODULE_2__["default"].apply(t, g, a);
        }
    });
});

})();

/******/ })()
;