export function toFormData(data) {
  var formData = new FormData();
  flatten(data, "", formData.append);
  return formData;
}

function flatten(obj, path, callback) {
  if (Array.isArray(obj)) {
    obj.forEach(function (val, index) {
      flatten(val, path + "[" + index +"]", callback);
    });
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach(function (key) {
      flatten(obj[key], (path ? path + "." : "") + key, callback);
    });    
  } else if (isFunction(obj)) {
    callback(path, obj());
  } else {
    callback(path, obj);
  }
}

export function eachControlOrGroup(tag, callback, context) {
  var key, children;
  if (tag.tags) {
    for (key in tag.tags) {
      if (tag.tags.hasOwnProperty(key)) {
        [].concat(tag.tags[key]).forEach(function (child) {
          if (child.isFormGroup || child.isFormControl) {
            callback.call(context, child, key);
          } else {
            eachControlOrGroup(child, callback, context);
          }
        });
      }
    }    
  }
}

/**
 * Tests is parameter fn is a function.
 */
export function isFunction(fn) {
  return typeof fn === "function";
}

/**
 * If obj[key] is an array, returns it. 
 * Otherwise assigns new empty array to obj[key] and returns it.
 */
export function ensureArray(obj, key) {
  return Array.isArray(obj[key]) ? obj[key] : (obj[key] = []);
}
